import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { generateRandomString } from "@/src/lib/utils";
import {
  PaymentRequestParameters,
  PaymentRequest,
} from "xendit-node/payment_request/models";
import xenditClient from "@/src/lib/xendit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courtId, date, startTime, customerName, amount } = body;

    if (!courtId || !date || !startTime || !customerName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const bookingDate = new Date(`${date}T00:00:00Z`);

    const existingBooking = await prisma.booking.findFirst({
      where: {
        courtId,
        date: bookingDate,
        startTime,
        OR: [{ status: "confirmed" }, { status: "pending" }],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "Slot is already booked. Please choose another time." },
        { status: 409 },
      );
    }

    let redirectPaymentUrl = "/";

    const newBooking = await prisma.booking.create({
      data: {
        courtId,
        date: bookingDate,
        startTime,
        customerName,
        status: "pending",
        code: generateRandomString(15),
      },
    });

    if (!newBooking.code) {
      return NextResponse.json(
        { error: "Failed to generate booking code." },
        { status: 500 },
      );
    }

    const data: PaymentRequestParameters = {
      amount: amount,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
          },
          channelCode: "SHOPEEPAY",
        },
        reusability: "ONE_TIME_USE",
        type: "EWALLET",
      },
      currency: "IDR",
      referenceId: newBooking.code.toString(),
    };

    const response: PaymentRequest =
      await xenditClient.PaymentRequest.createPaymentRequest({
        data,
      });

    redirectPaymentUrl =
      response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ?? "/";

    return NextResponse.json(
      {
        message: "Booking successful",
        redirectPaymentUrl,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slot has just been taken by another user." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

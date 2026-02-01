import { createBookingTransaction } from "@/src/services/bookingServices";
import { NextResponse } from "next/server";

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

    const result = await createBookingTransaction({
      courtId,
      date,
      startTime,
      customerName,
      amount,
    });

    return NextResponse.json(
      {
        message: "Booking successful",
        redirectPaymentUrl: result.redirectPaymentUrl,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.message === "SLOT_UNAVAILABLE") {
      return NextResponse.json(
        { error: "Slot is already booked. Please choose another time." },
        { status: 409 },
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slot has just been taken by another user." },
        { status: 409 },
      );
    }

    console.error("Booking Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

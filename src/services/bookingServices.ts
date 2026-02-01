import prisma from "@/src/lib/prisma";
import { generateRandomString } from "@/src/lib/utils";
import xenditClient from "@/src/lib/xendit";
import { PaymentRequestParameters } from "xendit-node/payment_request/models";
import { BookingParams } from "../lib/reservationData";

export const createBookingTransaction = async ({
  courtId,
  date,
  startTime,
  customerName,
  amount,
}: BookingParams) => {
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
    throw new Error("SLOT_UNAVAILABLE");
  }

  const code = generateRandomString(15);
  const newBooking = await prisma.booking.create({
    data: {
      courtId,
      date: bookingDate,
      startTime,
      customerName,
      status: "pending",
      code,
    },
  });

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
    referenceId: code,
  };

  const response = await xenditClient.PaymentRequest.createPaymentRequest({
    data,
  });
  const redirectPaymentUrl =
    response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ?? "/";

  return { newBooking, redirectPaymentUrl };
};

import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courtId, date, startTime, customerName } = body;

    if (!courtId || !date || !startTime || !customerName) {
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

    const newBooking = await prisma.booking.create({
      data: {
        courtId,
        date: bookingDate,
        startTime,
        customerName,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        message: "Booking successful",
        data: newBooking,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Booking error:", error);

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

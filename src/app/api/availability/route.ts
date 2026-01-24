import prisma from "@/src/lib/prisma";
import { TIME_SLOTS } from "@/src/utils/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bookedSlots = await prisma.booking.findMany({
      where: {
        courtId: 26,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        status: "confirmed",
      },
      select: { startTime: true },
    });

    const bookedTimes = bookedSlots.map((b) => b.startTime);

    const availableSlots = TIME_SLOTS.map((time) => ({
      time,
      isAvailable: !bookedTimes.includes(time),
    }));

    return NextResponse.json({ data: availableSlots }, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

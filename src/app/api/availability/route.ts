import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { TIME_SLOTS } from "@/src/utils/constants";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courtIdParam = searchParams.get("courtId");
    const dateParam = searchParams.get("date");

    if (!courtIdParam || !dateParam) {
      return NextResponse.json(
        { error: "Missing courtId or date" },
        { status: 400 },
      );
    }

    const cleanDateStr = dateParam.split(" ")[0];

    const startOfDay = new Date(`${cleanDateStr}T00:00:00.000Z`);
    const endOfDay = new Date(`${cleanDateStr}T23:58:58.000Z`);

    if (isNaN(startOfDay.getTime())) {
      return NextResponse.json({ error: "Invalid Date" }, { status: 400 });
    }

    const bookedSlots = await prisma.booking.findMany({
      where: {
        courtId: Number(courtIdParam),
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { in: ["confirmed", "pending"] },
      },
      select: { startTime: true },
    });

    const bookedTimes = bookedSlots.map((b) => b.startTime);

    console.log(`Availability Check untuk ${cleanDateStr}:`, bookedTimes);

    const availableSlots = TIME_SLOTS.map((slotLabel) => {
      const slotStartTime = slotLabel.split(" - ")[0];

      const isTaken = bookedTimes.some((dbTime) => {
        if (dbTime === slotLabel) return true;
        if (dbTime.startsWith(slotStartTime)) return true;
        return false;
      });

      return {
        time: slotLabel,
        isAvailable: !isTaken,
      };
    });

    return NextResponse.json({ data: availableSlots }, { status: 200 });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

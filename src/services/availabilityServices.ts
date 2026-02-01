import prisma from "@/src/lib/prisma";
import { TIME_SLOTS } from "@/src/utils/constants";

export const getAvailableSlots = async (courtId: number, dateStr: string) => {
  const cleanDateStr = dateStr.split(" ")[0];
  const startOfDay = new Date(`${cleanDateStr}T00:00:00.000Z`);
  const endOfDay = new Date(`${cleanDateStr}T23:58:58.000Z`);

  if (isNaN(startOfDay.getTime())) {
    throw new Error("INVALID_DATE");
  }

  const bookedSlots = await prisma.booking.findMany({
    where: {
      courtId: courtId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: { in: ["confirmed", "pending"] },
    },
    select: { startTime: true },
  });

  const bookedTimes = bookedSlots.map((b) => b.startTime);

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

  return availableSlots;
};

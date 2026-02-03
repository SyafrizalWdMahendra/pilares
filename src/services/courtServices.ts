import { NextResponse } from "next/server";
import prisma from "../lib/prisma";

export const courtServices = async () => {
  try {
    const courts = await prisma.court.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        available: true,
        image: true,
        amount: true,
      },
    });

    return NextResponse.json({ data: courts }, { status: 200 });
  } catch (error) {
    console.error("Court Fetching Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

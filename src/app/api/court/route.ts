import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

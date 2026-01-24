import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const courts = await prisma.court.findMany();

    return NextResponse.json({ data: courts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courts:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

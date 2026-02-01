import { getAvailableSlots } from "@/src/services/availabilityServices";
import { NextResponse } from "next/server";

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

    const availableSlots = await getAvailableSlots(
      Number(courtIdParam),
      dateParam,
    );

    return NextResponse.json({ data: availableSlots }, { status: 200 });
  } catch (error: any) {
    if (error.message === "INVALID_DATE") {
      return NextResponse.json(
        { error: "Invalid Date Format" },
        { status: 400 },
      );
    }

    console.error("Availability Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

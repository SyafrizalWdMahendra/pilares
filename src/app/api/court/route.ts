import { NextResponse } from "next/server";
import { courtServices } from "@/src/services/courtServices";

export async function GET() {
  try {
    const result = await courtServices();
    return result;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

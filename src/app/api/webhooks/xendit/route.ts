import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = body?.data?.reference_id;
    const status = body?.data?.status === "SUCCEEDED" ? "confirmed" : "failed";

    if (!code) {
      console.error("reference_id missing in webhook body");
      return NextResponse.json(
        { error: "reference_id missing" },
        { status: 400 },
      );
    }

    const updated = await prisma.booking.updateMany({
      where: { code },
      data: { status },
    });

    if (updated.count === 0) {
      console.warn(`No booking found with code: ${code}`);
      return NextResponse.json(
        { status: "no booking updated" },
        { status: 200 },
      );
    }

    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const headerPayload = headers();
    const xenditToken = (await headerPayload).get("x-callback-token");

    if (xenditToken !== process.env.XENDIT_CALLBACK_TOKEN) {
      console.warn("Unauthorized webhook attempt detected");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (body.event === "test") {
      return NextResponse.json({ status: "success" }, { status: 200 });
    }

    const code = body?.data?.reference_id;
    const isSuccess = body?.data?.status === "SUCCEEDED";
    const status = isSuccess ? "confirmed" : "failed";

    if (!code) {
      return NextResponse.json(
        { error: "reference_id missing" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findFirst({ where: { code } });

      if (!booking) {
        throw new Error(`Booking with code ${code} not found`);
      }

      if (booking.status === "confirmed") return;

      await tx.booking.update({
        where: { id: booking.id },
        data: { status },
      });
    });

    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

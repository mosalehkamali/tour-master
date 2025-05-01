export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import connectToDB from "base/configs/db";
import receiptModel from "base/models/Receipt";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectToDB();

    const receipts = await receiptModel
      .find({})
      .populate("tour")
      .populate("traveler")
      .sort({ _id: -1 }); // جدیدترین‌ها اول

    return NextResponse.json(
      { receipts },
      {
        status: 200,
        headers: {
          // این هدر باعث می‌شود پروکسی، CDN یا مرورگر کش نکنند:
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching all receipts:", error);
    return NextResponse.json(
      { error: "خطا در دریافت رسیدها" },
      { status: 500 }
    );
  }
}

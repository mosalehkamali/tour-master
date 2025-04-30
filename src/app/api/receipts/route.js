import connectToDB from "base/configs/db";
import receiptModel from "base/models/Receipt";
import { NextResponse } from "next/server";
import travelerModel from "base/models/Traveler";
import tourModel from "base/models/Tour";

export async function GET() {
  try {
    await connectToDB();

    const receipts = await receiptModel.find({})
      .populate("tour")
      .populate("traveler")
      .sort({ _id: -1 }); // جدیدترین‌ها اول

    return NextResponse.json({ receipts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all receipts:", error);
    return NextResponse.json(
      { error: "خطا در دریافت رسیدها" },
      { status: 500 }
    );
  }
}

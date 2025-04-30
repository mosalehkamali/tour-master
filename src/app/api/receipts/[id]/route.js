import connectToDB from "@/base/configs/db";
import receiptModel from "@/base/models/Receipt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;

    const receipt = await receiptModel.findById(id)
      .populate("traveler") // اطلاعات پرداخت‌کننده
      .populate("tour");     // اطلاعات تور

    if (!receipt) {
      return NextResponse.json({ error: "رسید یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ receipt }, { status: 200 });
  } catch (error) {
    console.error("Error in getting receipt:", error);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

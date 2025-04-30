// app/api/receipts/delete/[id]/route.js

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDB from "base/configs/db";
import Receipt from "base/models/Receipt";
import User from "base/models/Traveler";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    // یافتن رسید
    const receipt = await Receipt.findById(id);
    if (!receipt) {
      return NextResponse.json({ error: "رسید پیدا نشد" }, { status: 404 });
    }

    // مسیر فایل
    const receiptPath = path.join(
      process.cwd(),
      "receipts",
      receipt.image.replace("/api/receipts/image/", "")
    );

    // حذف فایل از سیستم
    if (fs.existsSync(receiptPath)) {
      fs.unlinkSync(receiptPath);
    }

    const user = await User.findById(receipt.traveler)
    
    user.receipts = user.receipts.filter((id) => id.toString() !== (receipt._id).toString());
    await user.save();
    
    // حذف رسید از دیتابیس
    await Receipt.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "رسید با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Receipt Error:", error);
    return NextResponse.json(
      { error: "خطای سرور هنگام حذف رسید" },
      { status: 500 }
    );
  }
}

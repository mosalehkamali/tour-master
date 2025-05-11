import { writeFile } from "fs/promises";
import path from "path";
import connectToDB from "base/configs/db";
import Receipt from "base/models/Receipt";
import { NextResponse } from "next/server";
import travelerModel from "base/models/Traveler";

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const tour = formData.get("tour");
    const traveler = formData.get("traveler");
    const amount = Number(formData.get("amount") || 0);
    const status = formData.get("status") || "paid";
    const description = formData.get("description") || "";
    const file = formData.get("image");

    if (!file || !file.name || !file.stream) {
      return NextResponse.json(
        { error: "تصویر ارسال نشده است." },
        { status: 400 }
      );
    }

    // مرحله 1: ایجاد رسید اولیه بدون عکس
    const tempReceipt = await Receipt.create({
      tour,
      traveler,
      amount,
      image: "pending",
      status,
      decription: description,
    });

    // مرحله 2: ذخیره فایل عکس در مسیر Receipts/
    const ext = path.extname(file.name); // .jpg / .png ...
    const filename = `${tempReceipt._id}${ext}`;
    const filePath = path.join(process.cwd(), "Receipts", filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // مرحله 3: ساخت مسیر دسترسی به عکس (از طریق API)
    const imageUrl = `/api/receipts/image/${filename}`;

    // مرحله 4: آپدیت رسید با مسیر عکس
    tempReceipt.image = imageUrl;
    await tempReceipt.save();

    const user = await travelerModel.findById(traveler);

    if (!user) {
      return NextResponse.json(
        { error: "مسافر مورد نظر یافت نشد." },
        { status: 404 }
      );
    }

    const receiptId = tempReceipt._id;

    if (!user.receipts.some((id) => id.toString() === receiptId.toString())) {
      user.receipts.push(receiptId);
    }


    return NextResponse.json(
      { message: "رسید با موفقیت ایجاد شد", receipt: tempReceipt },
      { status: 201 }
    );
  } catch (err) {
    console.error("خطا در ایجاد رسید:", err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

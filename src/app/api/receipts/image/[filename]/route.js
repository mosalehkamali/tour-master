import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(req, { params }) {
  try {
    const { filename } = params;

    const filePath = path.join(process.cwd(), "Receipts", filename);
    const fileBuffer = await fs.readFile(filePath);

    // تعیین نوع محتوا بر اساس پسوند فایل
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
        ? "image/png"
        : "application/octet-stream"; // fallback

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (err) {
    console.error("خطا در دریافت تصویر:", err);
    return NextResponse.json({ error: "تصویر یافت نشد" }, { status: 404 });
  }
}

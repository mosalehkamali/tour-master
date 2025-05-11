import { NextResponse } from "next/server";
import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import Tour from "base/models/Tour";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectToDB();

    // گرفتن شناسه کاربر از کوکی
    const userId = cookies().get("user")?.value;
    if (!userId) {
      return NextResponse.json(
        { error: "کاربر یافت نشد. لطفاً وارد شوید." },
        { status: 401 }
      );
    }

    // پیدا کردن مسافر و populate کردن هر آیتم carts.tour
    const traveler = await travelerModel
      .findById(userId)
      .populate({
        path: "carts.tour",
        model: Tour,
        select: "name price date image description", // فقط فیلدهای لازم
      })
      .lean();

    if (!traveler) {
      return NextResponse.json(
        { error: "اطلاعات کاربر موجود نیست." },
        { status: 404 }
      );
    }

    // برعکس کردن ترتیب اگر لازم باشه
    const carts = Array.isArray(traveler.carts)
      ? traveler.carts.slice().reverse()
      : [];

    // پاسخ شامل هر آیتم سبد: { tour: { …تور }, companions: [ … ] }
    return NextResponse.json({ carts }, { status: 200 });
  } catch (err) {
    console.error("GET /api/travelers/basket error:", err);
    return NextResponse.json(
      { error: "خطای سرور در دریافت سبد خرید." },
      { status: 500 }
    );
  }
}

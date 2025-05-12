// File: app/api/travelers/basket/[id]/route.js

import { NextResponse } from "next/server";
import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import Tour from "base/models/Tour";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    // ۱) شناسهٔ کاربر را از مسیر بگیر
    const userId = params.user;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "شناسهٔ کاربر نامعتبر است." },
        { status: 400 }
      );
    }

    // ۲) اگر می‌خواهی از کوکی استفاده نکنی، می‌توانی همین userId را به‌صورت params بفرستی
    //    یا از کوکی بخوانی. اگر از کوکی می‌خوانی، حتماً آن را هم اعتبارسنجی کن.

    // ۳) پیدا کردن مسافر و populate کردن آیتم‌های carts
    const traveler = await travelerModel
      .findById(userId)
      .populate({
        path: "carts.tour",
        model: Tour,
        select: "name price date image description",
      })
      .lean();

    if (!traveler) {
      return NextResponse.json(
        { error: "مسافر یافت نشد." },
        { status: 404 }
      );
    }

    // ۴) گرفتن آرایهٔ carts و وارونه کردن (اختیاری)
    const carts = Array.isArray(traveler.carts)
      ? traveler.carts.slice().reverse()
      : [];

    // ۵) حتماً برگردانید فیلد carts به‌صورت آرایه
    return NextResponse.json({ carts }, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/travelers/basket/[id]", err);
    return NextResponse.json(
      { error: "خطای سرور در دریافت سبد خرید." },
      { status: 500 }
    );
  }
}

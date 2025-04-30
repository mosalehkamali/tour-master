import { NextResponse } from "next/server";
import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import tourModel from "base/models/Tour";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectToDB();

    const cookieStore = cookies();
    const userId = cookieStore.get("user")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "کاربر یافت نشد. لطفاً وارد شوید." },
        { status: 401 }
      );
    }

    // پیدا کردن مسافر
    const traveler = await travelerModel
      .findById(userId)
      .populate({ path: "carts", model: tourModel })
      .lean();

    const carts = traveler.carts.slice().reverse();
    if (!traveler) {
      return NextResponse.json(
        { error: "اطلاعات کاربر موجود نیست." },
        { status: 404 }
      );
    }

    return NextResponse.json({ tours: carts }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطای سرور در دریافت سبد خرید." },
      { status: 500 }
    );
  }
}

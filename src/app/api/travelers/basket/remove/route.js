// File: app/api/travelers/basket/remove/route.js

import { NextResponse } from 'next/server';
import connectToDB from 'base/configs/db';
import travelerModel from 'base/models/Traveler';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    await connectToDB();

    // 1. دریافت tourId از بدنه‌ی درخواست
    const { tourId } = await request.json();
    if (!tourId || !mongoose.Types.ObjectId.isValid(tourId)) {
      return NextResponse.json(
        { error: 'شناسهٔ تور نامعتبر است.' },
        { status: 400 }
      );
    }

    // 2. خواندن شناسهٔ کاربر از کوکی
    const cookieStore = cookies();
    const userId = cookieStore.get('user')?.value;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'کاربر یافت نشد. لطفاً وارد شوید.' },
        { status: 401 }
      );
    }

    // 3. پیدا کردن سند Traveler
    const traveler = await travelerModel.findById(userId);
    if (!traveler) {
      return NextResponse.json(
        { error: 'مسافر مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    // 4. فیلتر کردن carts: حذف آیتم‌هایی که tour برابر tourId دارند
    const originalCount = traveler.carts.length;
    traveler.carts = traveler.carts.filter(
      (item) => item.tour.toString() !== tourId
    );

    if (traveler.carts.length === originalCount) {
      // هیچ آیتمی حذف نشده
      return NextResponse.json(
        { error: 'تور در سبد خرید یافت نشد.' },
        { status: 404 }
      );
    }

    // 5. ذخیرهٔ تغییرات
    await traveler.save();

    return NextResponse.json(
      { message: 'تور با موفقیت از سبد خرید حذف شد.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error removing from cart:', err);
    return NextResponse.json(
      { error: 'خطا در حذف تور از سبد خرید.' },
      { status: 500 }
    );
  }
}

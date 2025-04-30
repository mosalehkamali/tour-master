import { NextResponse } from 'next/server';
import connectToDB from 'base/configs/db';
import travelerModel from 'base/models/Traveler';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    await connectToDB();

    const { tourId } = await req.json();

    const cookieStore = cookies();
    const userId = cookieStore.get('user')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'کاربر یافت نشد.' },
        { status: 401 }
      );
    }

    const traveler = await travelerModel.findById(userId);
    
    if (!traveler) {
        return NextResponse.json(
            { error: 'مسافر مورد نظر یافت نشد.' },
            { status: 404 }
        );
    }
    
    // حذف تور از سبد خرید
    traveler.carts = traveler.carts.filter(
        (id) => id.toString() !== tourId
    );

    await traveler.save();

    return NextResponse.json(
      { message: 'تور با موفقیت از سبد خرید حذف شد.' },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'خطا در حذف تور از سبد خرید.' },
      { status: 500 }
    );
  }
}

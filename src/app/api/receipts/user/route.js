import { cookies } from 'next/headers';
import connectToDB from 'base/configs/db';
import travelerModel from 'base/models/Traveler';
import receiptModel from 'base/models/Receipt';

export async function GET() {
  try {
    await connectToDB();

    const cookieStore = cookies();
    const userId = cookieStore.get('user')?.value;

    if (!userId) {
      return Response.json({ error: 'کاربر یافت نشد.' }, { status: 401 });
    }

    const traveler = await travelerModel.findById(userId);

    if (!traveler) {
      return Response.json({ error: 'مسافر پیدا نشد.' }, { status: 404 });
    }

    const receipts = await receiptModel
      .find({ traveler: userId })
      .sort({ _id: -1 }) // 👈 جدیدترین ابتدا
      .populate('tour');

    return Response.json({ receipts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

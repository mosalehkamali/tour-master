import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import tourModel from "base/models/Tour";
import receiptModel from "base/models/Receipt";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const travelerId = params.id;

    // پیدا کردن مسافر
    const traveler = await travelerModel.findById(travelerId).populate("tours");
    if (!traveler) {
      return Response.json({ error: "مسافر پیدا نشد." }, { status: 404 });
    }

    // اگر تور نداشت
    if (!traveler.tours || traveler.tours.length === 0) {
      return Response.json({ tours: [] }, { status: 200 });
    }

    // آماده‌سازی خروجی
    const result = await Promise.all(
      traveler.tours.map(async (tour) => {
        // مجموع پرداخت‌های تایید شده برای این تور
        const confirmedReceipts = await receiptModel.find({
          tour: tour._id,
          traveler: travelerId,
          status: "confirmed",
        });

        const totalPaid = confirmedReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
        const remainingDebt = Math.max(tour.price - totalPaid, 0); // از منفی شدن جلوگیری می‌کنیم

        return {
          ...tour.toObject(),
          remainingDebt,
        };
      })
    );

    return Response.json({ tours: result }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "خطا در دریافت تورها." }, { status: 500 });
  }
}

import connectToDB from "base/configs/db";
import receiptModel from "base/models/Receipt";
import tourModel from "base/models/Tour";
import travelerModel from "base/models/Traveler";

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const receiptId = params.id;
    const body = await req.json();

    // دریافت رسید فعلی
    const existingReceipt = await receiptModel.findById(receiptId);
    if (!existingReceipt) {
      return Response.json({ error: "رسید پیدا نشد." }, { status: 404 });
    }


    // آپدیت فیلدها (به جز عکس)
    existingReceipt.amount = body.amount ?? existingReceipt.amount;
    existingReceipt.status = body.status ?? existingReceipt.status;
    existingReceipt.decription = body.decription ?? existingReceipt.decription;

    await existingReceipt.save();

    // اگر وضعیت به "confirmed" تغییر کرده، مسافر را به تور اضافه کن
    if ( body.status === "confirmed") {
      const tour = await tourModel.findById(existingReceipt.tour);
      const traveler = await travelerModel.findById(existingReceipt.traveler);
      
      const tourId = existingReceipt.tour;

      if (
        !traveler.tours.some((id) => id.toString() === tourId.toString())
      ) {
        traveler.tours.push(tourId);
        await traveler.save();
      }          

      if (!tour) {
        return Response.json({ error: "تور پیدا نشد." }, { status: 404 });
      }

      // فقط در صورتی که قبلاً اضافه نشده باشد
      const travelerId = existingReceipt.traveler;

      if (
        !tour.travelers.some((id) => id.toString() === travelerId.toString())
      ) {
        tour.travelers.push(travelerId);
        await tour.save();
      }

    }

    return Response.json(
      { message: "رسید با موفقیت به‌روزرسانی شد." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "خطای سرور در به‌روزرسانی رسید." },
      { status: 500 }
    );
  }
}

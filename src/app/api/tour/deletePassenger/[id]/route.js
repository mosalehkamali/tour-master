import dbConnect from "base/configs/db";
import Tour from "base/models/Tour";
import Traveler from "base/models/Traveler";

export async function DELETE(request, { params }) {
  await dbConnect();

  const travelerId = params.id;

  try {
    const traveler = await Traveler.findById(travelerId);
    if (!traveler) {
      return new Response(JSON.stringify({ error: "مسافر پیدا نشد" }), {
        status: 404,
      });
    }

    // حذف مسافر از تورها
    await Tour.updateMany(
      { travelers: travelerId },
      { $pull: { travelers: travelerId } }
    );

    // حذف شناسه تورها از خود Traveler
    await Traveler.findByIdAndUpdate(travelerId, {
      $set: { tours: [] },
    });

    return new Response(JSON.stringify({ message: "مسافر حذف شد" }), {
      status: 200,
    });
  } catch (err) {
    console.error("خطا:", err);
    return new Response(JSON.stringify({ error: "خطای سرور" }), {
      status: 500,
    });
  }
}

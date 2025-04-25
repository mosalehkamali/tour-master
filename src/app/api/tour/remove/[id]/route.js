import connectToDB from "base/configs/db";
import tourModel from "base/models/Tour";
import travelerModel from "base/models/Traveler";
import fs from "fs";
import path from "path";

export async function DELETE(request, { params }) {
  const { id } = params;
   await connectToDB();

   const tour = await tourModel.findById(id);
    if (!tour) {
      return new Response(JSON.stringify({ error: "Tour not found" }), { status: 404 });
    }

  await tourModel.deleteOne({ _id: id });
  await travelerModel.deleteMany({tour:id})
  if (tour.image) {
    const imagePath = path.join(process.cwd(), "uploads", tour.image.replace("/api/uploads/", ""));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  return new Response(JSON.stringify({ message: 'Tour deleted' }), { status: 200 });
}

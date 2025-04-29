
import connectToDB from "base/configs/db";
import tourModel from "base/models/Tour"; // مدل تور
import travelerModel from "base/models/Traveler"; // مدل مسافر

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const tourId = id;
    if (!tourId) {
      return Response.json({ error: "Tour ID is required." }, { status: 400 });
    }

    const tour = await tourModel
      .findById(tourId)
      .populate({
        path: "travelers",
        model: travelerModel,
      })
      .lean();

    if (!tour) {
      return Response.json({ error: "Tour not found." }, { status: 404 });
    }

    return Response.json({ tour }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error." }, { status: 500 });
  }
}

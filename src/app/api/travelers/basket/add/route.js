import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import tourModel from "base/models/Tour";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectToDB();

    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return Response.json({ error: "User not authenticated." }, { status: 401 });
    }

    const userId = userCookie.value;
    const { tourId, companions } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return Response.json({ error: "Invalid tour ID." }, { status: 400 });
    }

    const traveler = await travelerModel.findById(userId);
    if (!traveler) {
      return Response.json({ error: "Traveler not found." }, { status: 404 });
    }

    const tourExists = await tourModel.exists({ _id: tourId });
    if (!tourExists) {
      return Response.json({ error: "Tour not found." }, { status: 404 });
    }

    // بررسی اینکه آیا این تور از قبل در سبد هست
    const alreadyExists = traveler.carts.some(item => item.tour.toString() === tourId);
    if (alreadyExists) {
      return Response.json({ message: "Tour already exists in cart." }, { status: 409 });
    }

    // افزودن آیتم به سبد خرید
    traveler.carts.push({
      tour: tourId,
      companions: companions || []
    });

    await traveler.save();

    return Response.json({ message: "Tour added to cart.", cart: traveler.carts }, { status: 200 });

  } catch (err) {
    console.error("Cart Add Error:", err);
    return Response.json({ error: "Internal Server Error." }, { status: 500 });
  }
}

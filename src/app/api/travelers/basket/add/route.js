import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
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
    const { tourId } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return Response.json({ error: "Invalid tour ID." }, { status: 400 });
    }

    const traveler = await travelerModel.findById(userId);

    if (!traveler) {
      return Response.json({ error: "Traveler not found." }, { status: 404 });
    }

    // بررسی تکراری نبودن tourId در carts
    const alreadyExists = traveler.carts?.some(id => id.toString() === tourId);
    if (alreadyExists) {
      return Response.json({ message: "Tour already in cart." }, { status: 200 });
    }

    traveler.carts.push(tourId);
    await traveler.save();

    return Response.json({ message: "Tour added to cart." }, { status: 200 });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error." }, { status: 500 });
  }
}

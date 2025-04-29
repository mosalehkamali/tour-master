import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    await connectToDB();

    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return Response.json(
        { error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const userId = userCookie.value;

    const traveler = await travelerModel.findById(userId).lean();

    if (!traveler) {
      return Response.json(
        { error: "Traveler not found." },
        { status: 404 }
      );
    }

    return Response.json({ ...traveler }, { status: 200 });

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}

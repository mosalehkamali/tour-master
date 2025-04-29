import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";

export async function POST(req) {
  try {
    await connectToDB();

    const { personalId } = await req.json();
    console.log(personalId);

    if (!personalId) {
      return Response.json(
        { error: "Personal ID is required!" },
        { status: 400 }
      );
    }

    const traveler = await travelerModel.findOne({ personalId });

    if (!traveler) {
      return Response.json(
        { error: "Traveler not found." },
        { status: 404 }
      );
    }

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `user=${traveler._id}; Path=/; Max-Age=${7 * 24 * 60 * 60};`
    );

    return Response.json(
      { message: "Login successful :)", userId: traveler._id },
      { status: 200, headers }
    );

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Unknown Internal Server Error!" },
      { status: 500 }
    );
  }
}

import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";

export async function POST(req) {
  try {
    await connectToDB();
    const { name, personalId, birthDate, gender, phone, address } =
      await req.json();

    await travelerModel.create({
      name,
      personalId,
      birthDate,
      gender,
      phone,
      address,
    });

    const traveler = await travelerModel.findOne({ personalId });

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `user=${traveler._id};path=/;Max-Age = ${7 * 24 * 60 * 60}`
    );

    return Response.json(
      { message: "Traveler added successfully :))" },
      { status: 201, headers }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      { status: 500 }
    );
  }
}

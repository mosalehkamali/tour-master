import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";

export async function POST(req) {
  try {
    await connectToDB();
    const {
      tour,
      name,
      personalId,
      birthDate,
      gender,
      phone,
      address
      // month,
      // vehicule,
      // place,
      // food,
      // payment,
    } = await req.json();

    await travelerModel.create({
      tour,
      name,
      personalId,
      birthDate,
      gender,
      phone,
      address
      // month,
      // vehicule,
      // place,
      // food,
      // payment,
    });

    return Response.json(
      { message: "Traveler added successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      { status: 500 }
    );
  }
}

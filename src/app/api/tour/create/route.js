import connectToDB from "base/configs/db";
import path from "path";
import fs from "fs";
import tourModel from "base/models/Tour";

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const date = formData.get("date");
    const price = formData.get("price");
    const description = formData.get("description");
    const image = formData.get("image");

    const fillName = Date.now() + image.name;
    const buffer = Buffer.from(await image.arrayBuffer());
    const pathImage = path.join(process.cwd(), "uploads" , fillName);
    fs.writeFileSync(pathImage, buffer);

    await tourModel.create({
      name,
      date,
      price,
      description,
      image: `/api/uploads/${fillName}`,
    });

    return Response.json(
      { message: "Tour Added Successfully :))" },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "UnKnown Internal Server Error !!!" },
      {
        status: 500,
      }
    );
  }
}

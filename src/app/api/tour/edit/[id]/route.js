import connectToDB from "base/configs/db";
import tourModel from "base/models/Tour";

export async function PUT(request, { params }) {
  const { id } = params;
  await connectToDB();

  const { name, date, price, description } = await request.json();
  await tourModel.findByIdAndUpdate(id, { name, date, price, description });
  return new Response(JSON.stringify({ message: "Tour deleted" }), {
    status: 200,
  });
}

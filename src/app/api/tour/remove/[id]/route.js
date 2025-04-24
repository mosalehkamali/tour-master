import connectToDB from "base/configs/db";
import tourModel from "base/models/Tour";

export async function DELETE(request, { params }) {
  const { id } = params;
   await connectToDB();
  await tourModel.deleteOne({ _id: id });
  return new Response(JSON.stringify({ message: 'Tour deleted' }), { status: 200 });
}

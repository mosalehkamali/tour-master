// app/api/tours/route.js
export const revalidate = 0;

import connectToDB from "base/configs/db";
import tourModel from "base/models/Tour";

export async function GET() {
  await connectToDB();
  const tours = await tourModel.find({}).sort({ _id: -1 }).lean();
  return new Response(JSON.stringify(tours), { status: 200 });
}

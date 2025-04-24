import connectToDB from "base/configs/db";
import travelerModel from "base/models/Traveler";
import tourModel from "base/models/Tour";

export async function GET(request, { params }) {
  const { id } = params;

  await connectToDB();
  
    const tour = await tourModel.findOne({ _id : id });
    const passengers = await travelerModel.find({ tour: id },"-__v -_id -tour");
    
      const response = {
            tour,
            passengers,
          };

  return new Response(JSON.stringify(response), { status: 200 });
}

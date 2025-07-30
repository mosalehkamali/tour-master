// app/api/admin/tours/[id]/travelers/route.js

import { NextResponse } from "next/server";
import connectToDB from "base/configs/db";
import tourModel from "base/models/Tour";
import travelerModel from "base/models/Traveler";
import receiptModel from "base/models/Receipt";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const tourId = params.id;

    // 1) Validate tourId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return NextResponse.json(
        { error: "شناسهٔ تور نامعتبر است." },
        { status: 400 }
      );
    }

    // 2) Load the tour including its travelers array
    const tour = await tourModel
      .findById(tourId)
      .select("name date price image description travelers")
      .lean();
    if (!tour) {
      return NextResponse.json(
        { error: "تور یافت نشد." },
        { status: 404 }
      );
    }

    // 3) If no travelers listed on tour, return empty list
    const travelerIds = Array.isArray(tour.travelers)
      ? tour.travelers.map(String)
      : [];
    if (travelerIds.length === 0) {
      return NextResponse.json(
        { tour, travelers: [] },
        { status: 200 }
      );
    }

    // 4) Fetch only those travelers whose IDs are in tour.travelers
    const travelers = await travelerModel
      .find({ _id: { $in: travelerIds } })
      .select("name personalId phone carts address")
      .lean();

    // 5) For each traveler, extract companions & compute debt
    const result = await Promise.all(
      travelers.map(async (trav) => {
        // find the cart item for this tour
        const cartItem = Array.isArray(trav.carts)
          ? trav.carts.find(item => item.tour.toString() === tourId)
          : null;
        const companions = cartItem?.companions || [];
        const numPeople = companions.length + 1;
        const expectedTotal = tour.price * numPeople;

        // sum paid receipts for this traveler & tour (status confirmed)
        const receipts = await receiptModel
          .find({ tour: tourId, traveler: trav._id, status: "confirmed" })
          .select("amount")
          .lean();
        const paidSum = receipts.reduce((sum, r) => sum + (r.amount || 0), 0);
        const debt = Math.max(0, expectedTotal - paidSum);

        return {
          travelerId: trav._id,
          name: trav.name,
          personalId: trav.personalId,
          phone: trav.phone,
          address: trav.address,
          companions,
          expectedTotal,
          paidSum,
          debt,
        };
      })
    );

    return NextResponse.json(
      { tour, travelers: result },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/admin/tours/[id]/travelers error:", err);
    return NextResponse.json(
      { error: "خطای سرور در بازیابی اطلاعات تور و مسافران." },
      { status: 500 }
    );
  }
}

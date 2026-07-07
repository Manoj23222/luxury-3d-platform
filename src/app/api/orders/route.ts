import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Login required", orders: [] },
        { status: 401 }
      );
    }

    const orders = await Order.find({
      userId: user.id,
      status: "Paid",
      downloadEnabled: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Orders fetch failed" },
      { status: 500 }
    );
  }
}
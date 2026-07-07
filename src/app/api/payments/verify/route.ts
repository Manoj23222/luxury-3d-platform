import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Login required" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    const order = await Order.findOneAndUpdate(
      {
        razorpayOrderId,
        userId: user.id,
      },
      {
        status: "Paid",
        razorpayPaymentId: razorpayPaymentId || "",
        razorpaySignature: razorpaySignature || "",
        downloadEnabled: true,
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Payment verify failed" },
      { status: 500 }
    );
  }
}
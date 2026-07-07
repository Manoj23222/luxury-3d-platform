import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
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
    const { productId, customerPhone } = body;

    const product = await Product.findById(productId).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Asset not found" },
        { status: 404 }
      );
    }

    if (product.isFree) {
      return NextResponse.json(
        { success: false, message: "This asset is free" },
        { status: 400 }
      );
    }

    const amount = Number(product.price || 0);

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid asset price" },
        { status: 400 }
      );
    }

    const existingPaidOrder = await Order.findOne({
      userId: user.id,
      productId,
      status: "Paid",
      downloadEnabled: true,
    });

    if (existingPaidOrder) {
      return NextResponse.json({
        success: true,
        alreadyPurchased: true,
        message: "Already purchased",
        order: existingPaidOrder,
        razorpayOrder: {
          id: existingPaidOrder.razorpayOrderId,
          amount: amount * 100,
          currency: "INR",
        },
      });
    }

    const razorpayOrderId = `order_${crypto.randomBytes(10).toString("hex")}`;

    const order = await Order.create({
      userId: user.id,
      productId,
      productName: product.name || "",
      productImage: product.thumbnail || "",
      customerName: user.name || "",
      customerEmail: user.email || "",
      customerPhone: customerPhone || "",
      amount,
      currency: "INR",
      status: "Pending",
      razorpayOrderId,
      downloadEnabled: false,
    });

    return NextResponse.json({
      success: true,
      order,
      razorpayOrder: {
        id: razorpayOrderId,
        amount: amount * 100,
        currency: "INR",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Payment order failed" },
      { status: 500 }
    );
  }
}
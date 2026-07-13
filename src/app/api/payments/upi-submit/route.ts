import { NextResponse } from "next/server";
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
        {
          success: false,
          message: "Login required",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      productId,
      customerPhone,
      upiTransactionId,
      paymentScreenshot,
    } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID required",
        },
        { status: 400 }
      );
    }

    if (!upiTransactionId?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "UPI transaction ID / UTR required",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found",
        },
        { status: 404 }
      );
    }

    if (product.isFree) {
      return NextResponse.json(
        {
          success: false,
          message: "This asset is free",
        },
        { status: 400 }
      );
    }

    const amount = Number(product.price || 0);

    if (amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid asset price",
        },
        { status: 400 }
      );
    }

    const transactionId = String(upiTransactionId).trim();

    const duplicateTransaction = await Order.findOne({
      upiTransactionId: transactionId,
    });

    if (duplicateTransaction) {
      return NextResponse.json(
        {
          success: false,
          message: "This UPI transaction ID has already been submitted",
        },
        { status: 409 }
      );
    }

    const existingPurchasedOrder = await Order.findOne({
      userId: user.id,
      productId,
      status: "Paid",
      downloadEnabled: true,
    });

    if (existingPurchasedOrder) {
      return NextResponse.json({
        success: true,
        alreadyPurchased: true,
        message: "You have already purchased this asset",
        order: existingPurchasedOrder,
      });
    }

    const existingPendingOrder = await Order.findOne({
      userId: user.id,
      productId,
      paymentMethod: "UPI",
      status: "Payment Submitted",
    });

    if (existingPendingOrder) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your payment is already submitted and waiting for verification",
        },
        { status: 409 }
      );
    }

    const upiId = process.env.NEXT_PUBLIC_UPI_ID || "lux3d@pytes";
    const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "lux3d platform";

    const order = await Order.create({
      userId: user.id,

      customerName: user.name || "",
      customerEmail: user.email || "",
      customerPhone: customerPhone || "",

      productId,
      productName: product.name || "",
      productImage: product.thumbnail || "",

      amount,
      currency: "INR",

      status: "Payment Submitted",

      paymentMethod: "UPI",
      paymentProvider: "Manual UPI",

      upiId,
      upiTransactionId: transactionId,
      paymentScreenshot: paymentScreenshot || "",
      paymentSubmittedAt: new Date(),

      downloadEnabled: false,
    });

    return NextResponse.json({
      success: true,
      message: "Payment submitted for admin verification",
      order,
    });
  } catch (error: any) {
    console.error("UPI PAYMENT SUBMIT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Payment submission failed",
      },
      { status: 500 }
    );
  }
}
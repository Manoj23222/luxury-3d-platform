import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
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
    const id = body.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid asset ID" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { downloads: 1 } },
      { new: true }
    ).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Asset not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      downloads: product.downloads || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Download update failed" },
      { status: 500 }
    );
  }
}
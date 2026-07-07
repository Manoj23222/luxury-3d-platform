import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).lean();
console.log({
  modelUrl: product?.modelUrl,
  modelFileName: product?.modelFileName,
  modelFileType: product?.modelFileType,
});

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Project fetch failed" },
      { status: 500 }
    );
  }
}
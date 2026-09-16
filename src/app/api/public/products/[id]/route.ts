import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check fallback items first if it's a fallback ID or slug
    const fallbackItem = FALLBACK_3D_PRODUCTS.find(
      (p) => p._id === id || p.slug === id
    );

    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        await connectDB();
        product = await Product.findById(id).lean();
      } catch {
        product = null;
      }
    } else {
      try {
        await connectDB();
        product = await Product.findOne({ slug: id }).lean();
      } catch {
        product = null;
      }
    }

    const finalProduct = product || fallbackItem;

    if (!finalProduct) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: finalProduct });
  } catch (error: any) {
    const { id } = await params;
    const fallbackItem = FALLBACK_3D_PRODUCTS.find(
      (p) => p._id === id || p.slug === id
    );
    if (fallbackItem) {
      return NextResponse.json({ success: true, product: fallbackItem });
    }

    return NextResponse.json(
      { success: false, message: error.message || "Project fetch failed" },
      { status: 500 }
    );
  }
}
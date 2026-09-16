import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";

export async function GET() {
  try {
    let dbProducts: any[] = [];
    try {
      await connectDB();
      dbProducts = await Product.find({ status: "Published" })
        .sort({ createdAt: -1 })
        .lean();
    } catch {
      dbProducts = [];
    }

    const products = dbProducts.length > 0 ? dbProducts : FALLBACK_3D_PRODUCTS;

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json(
      { success: true, products: FALLBACK_3D_PRODUCTS, message: error.message },
      { status: 200 }
    );
  }
}
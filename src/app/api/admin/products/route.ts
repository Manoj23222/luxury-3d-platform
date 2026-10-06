import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";
import { filterOutDeletedAssets } from "@/lib/deleted-assets";
import { applyCustomOrders } from "@/lib/custom-orders";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let dbProducts: any[] = [];
    try {
      await connectDB();
      dbProducts = await Product.find({})
        .sort({ serialNumber: 1, createdAt: -1 })
        .lean();
    } catch {
      dbProducts = [];
    }

    let products: any[] = [];
    if (dbProducts.length > 0) {
      const dbNames = new Set(
        dbProducts.map((p: any) => String(p.name || "").toLowerCase().trim())
      );
      const replacedFallbackIds = new Set(
        dbProducts
          .flatMap((p: any) => {
            const tags: string[] = Array.isArray(p.tags) ? p.tags : [];
            const fbTag = tags.find((t: string) => t.startsWith("fallbackId:"));
            return fbTag ? [fbTag.replace("fallbackId:", "")] : [];
          })
          .filter(Boolean)
      );

      const remainingFallbacks = FALLBACK_3D_PRODUCTS.filter(
        (f) =>
          !replacedFallbackIds.has(f._id) &&
          !dbNames.has(String(f.name || "").toLowerCase().trim())
      );
      products = [...dbProducts, ...remainingFallbacks];
    } else {
      products = FALLBACK_3D_PRODUCTS;
    }

    products = await filterOutDeletedAssets(products);
    products = await applyCustomOrders(products);

    products.sort((a: any, b: any) => {
      const aSn = Number(a.serialNumber || a.displayOrder || 0);
      const bSn = Number(b.serialNumber || b.displayOrder || 0);
      if (aSn > 0 && bSn > 0) return aSn - bSn;
      if (aSn > 0) return -1;
      if (bSn > 0) return 1;
      return 0;
    });

    return NextResponse.json(
      { success: true, products },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    let safeFallback = await filterOutDeletedAssets(FALLBACK_3D_PRODUCTS);
    safeFallback = await applyCustomOrders(safeFallback);
    return NextResponse.json(
      {
        success: true,
        products: safeFallback,
        message: error.message || "Using fallback catalog",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
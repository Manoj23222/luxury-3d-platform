import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import PhotoWork from "@/models/PhotoWork";
import { requireAdmin } from "@/lib/admin";
import { saveCustomOrders } from "@/lib/custom-orders";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";
import { FALLBACK_PHOTO_WORKS } from "@/data/photoWorksData";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAdmin();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const items = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      );
    }

    // 1. Immediately persist to JSON orders mapping (fast and resilient)
    await saveCustomOrders(
      items.map((i: any) => ({
        id: String(i.id),
        serialNumber: Number(i.serialNumber) || 0,
      }))
    );

    // 2. Persist to MongoDB
    try {
      await connectDB();

      await Promise.all(
        items.map(async (item: any) => {
          const rawId = String(item.id || "");
          const cleanId = rawId.replace(/^prod-/, "");
          const sn = Number(item.serialNumber) || 0;
          if (sn <= 0) return;

          if (mongoose.Types.ObjectId.isValid(cleanId)) {
            if (item.itemType === "3d") {
              await Product.findByIdAndUpdate(cleanId, {
                serialNumber: sn,
                displayOrder: sn,
              });
            } else {
              await PhotoWork.findByIdAndUpdate(cleanId, {
                serialNumber: sn,
                displayOrder: sn,
              });
            }
          } else {
            // Fallback item customized for first time
            if (item.itemType === "3d") {
              const fb = FALLBACK_3D_PRODUCTS.find((p) => p._id === rawId || p._id === cleanId);
              if (fb) {
                await Product.findOneAndUpdate(
                  { tags: `fallbackId:${rawId}` },
                  {
                    $set: {
                      serialNumber: sn,
                      displayOrder: sn,
                    },
                    $setOnInsert: {
                      name: fb.name,
                      slug: fb.slug,
                      category: fb.category,
                      thumbnail: fb.thumbnail,
                      modelUrl: fb.modelUrl,
                      softwareUsed: fb.softwareUsed,
                      status: fb.status,
                      tags: [...fb.tags, `fallbackId:${rawId}`],
                      creatorId: user.id || "admin-master",
                    },
                  },
                  { upsert: true, new: true }
                );
              }
            } else {
              const fb = FALLBACK_PHOTO_WORKS.find((p) => p._id === rawId || p._id === cleanId);
              if (fb) {
                await PhotoWork.findOneAndUpdate(
                  { tags: `fallbackId:${rawId}` },
                  {
                    $set: {
                      serialNumber: sn,
                      displayOrder: sn,
                    },
                    $setOnInsert: {
                      title: fb.title,
                      slug: fb.slug,
                      category: fb.category,
                      thumbnail: fb.thumbnail,
                      afterImage: fb.afterImage,
                      beforeImage: fb.beforeImage,
                      softwareUsed: fb.softwareUsed,
                      status: "Published",
                      tags: [...(fb.tags || []), `fallbackId:${rawId}`],
                    },
                  },
                  { upsert: true, new: true }
                );
              }
            }
          }
        })
      );
    } catch {
      // MongoDB may be offline, file storage already handled
    }

    return NextResponse.json({
      success: true,
      message: "Serial numbers updated successfully",
      updatedCount: items.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update serial numbers" },
      { status: 500 }
    );
  }
}

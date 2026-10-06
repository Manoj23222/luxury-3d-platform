import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";
import Product from "@/models/Product";
import { FALLBACK_PHOTO_WORKS } from "@/data/photoWorksData";
import { recordDeletedAsset } from "@/lib/deleted-assets";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    try {
      await connectDB();
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updated = await PhotoWork.findByIdAndUpdate(id, body, { new: true });
        if (updated) {
          return NextResponse.json({
            success: true,
            message: "Photo work updated successfully",
            work: updated,
          });
        }
      }

      // If fallback item edited, persist as a new PhotoWork record in Mongo
      const fallbackItem = FALLBACK_PHOTO_WORKS.find((w) => w._id === id);
      const slug = (body.title || fallbackItem?.title || "photo-work")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-");

      const created = await PhotoWork.create({
        title: body.title || fallbackItem?.title || "Creative Work",
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        category: body.category || fallbackItem?.category || "Photo Retouching",
        description: body.description || fallbackItem?.description || "",
        shortDescription:
          body.shortDescription ||
          fallbackItem?.shortDescription ||
          body.description?.slice(0, 120) ||
          "",
        beforeImage: body.beforeImage || fallbackItem?.beforeImage || "",
        afterImage:
          body.afterImage ||
          fallbackItem?.afterImage ||
          fallbackItem?.thumbnail ||
          body.thumbnail ||
          "",
        thumbnail:
          body.thumbnail ||
          fallbackItem?.thumbnail ||
          body.afterImage ||
          fallbackItem?.afterImage ||
          "",
        workType: body.workType || fallbackItem?.workType || "single",
        softwareUsed: Array.isArray(body.softwareUsed)
          ? body.softwareUsed
          : fallbackItem?.softwareUsed || ["Adobe Photoshop"],
        resolution: body.resolution || fallbackItem?.resolution || "4K / Ultra HD",
        clientName: body.clientName || fallbackItem?.clientName || "",
        projectYear: body.projectYear || fallbackItem?.projectYear || "2026",
        tags: [
          ...(Array.isArray(body.tags) ? body.tags : fallbackItem?.tags || []),
          `fallbackId:${id}`,
        ],
        featured:
          body.featured !== undefined
            ? Boolean(body.featured)
            : fallbackItem?.featured ?? true,
        serialNumber:
          body.serialNumber !== undefined
            ? Number(body.serialNumber)
            : fallbackItem?.serialNumber || 0,
        displayOrder:
          body.serialNumber !== undefined
            ? Number(body.serialNumber)
            : fallbackItem?.serialNumber || 0,
        status: body.status || "Published",
      });

      return NextResponse.json({
        success: true,
        message: "Photo work saved successfully",
        work: created,
      });
    } catch {
      // Memory fallback response
      return NextResponse.json({
        success: true,
        message: "Photo work updated",
        work: { _id: id, ...body },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let bodyTitle = "";
    let bodySlug = "";

    try {
      const body = await req.json();
      bodyTitle = body?.title || body?.name || "";
      bodySlug = body?.slug || "";
    } catch {
      // Body may be empty on standard DELETE
    }

    const cleanId = id.replace(/^prod-/, "");

    try {
      await connectDB();
      if (mongoose.Types.ObjectId.isValid(cleanId)) {
        const item = await PhotoWork.findById(cleanId).lean();
        if (item) {
          if (!bodyTitle) bodyTitle = item.title;
          if (!bodySlug) bodySlug = item.slug;
        }
        await PhotoWork.findByIdAndDelete(cleanId);
        await Product.findByIdAndDelete(cleanId);
      }
    } catch {
      // Ignore DB error for demo/fallback items
    }

    // Always permanently record deletion so it never returns on refresh
    await recordDeletedAsset({
      id,
      cleanId,
      title: bodyTitle,
      slug: bodySlug,
      itemType: "photo",
    });

    return NextResponse.json({
      success: true,
      message: "Photo work deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}

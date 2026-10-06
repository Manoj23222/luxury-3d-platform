import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import PhotoWork from "@/models/PhotoWork";
import { requireAdmin } from "@/lib/admin";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";
import { recordDeletedAsset } from "@/lib/deleted-assets";

const allowedStatus = ["Draft", "Published"];
const allowedVisibility = ["Public", "Private"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const updateData: any = {};

    if (body.name) updateData.name = body.name.trim();
    if (body.category !== undefined) updateData.category = body.category;
    if (body.softwareUsed !== undefined) {
      updateData.softwareUsed = Array.isArray(body.softwareUsed)
        ? body.softwareUsed
        : String(body.softwareUsed).split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    if (body.description !== undefined) updateData.description = body.description;
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription;
    if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail;
    if (body.modelUrl !== undefined) updateData.modelUrl = body.modelUrl;
    if (body.modelFileName !== undefined) updateData.modelFileName = body.modelFileName;

    if (body.status) {
      if (!allowedStatus.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updateData.status = body.status;
    }

    if (body.visibility) {
      if (!allowedVisibility.includes(body.visibility)) {
        return NextResponse.json(
          { error: "Invalid visibility" },
          { status: 400 }
        );
      }
      updateData.visibility = body.visibility;
    }

    if (typeof body.featured === "boolean") {
      updateData.featured = body.featured;
    }

    if (body.tags) {
      updateData.tags = Array.isArray(body.tags)
        ? body.tags
        : String(body.tags).split(",").map((t: string) => t.trim()).filter(Boolean);
    }

    if (body.serialNumber !== undefined) {
      updateData.serialNumber = Number(body.serialNumber) || 0;
      updateData.displayOrder = Number(body.serialNumber) || 0;
    }

    try {
      await connectDB();

      if (mongoose.Types.ObjectId.isValid(id)) {
        const product = await Product.findByIdAndUpdate(id, updateData, {
          new: true,
        });

        if (product) {
          return NextResponse.json({ success: true, product });
        }
      }

      // If it's a fallback product being customized for the first time, persist it to DB
      const fallbackItem = FALLBACK_3D_PRODUCTS.find((p) => p._id === id);
      const created = await Product.create({
        name: updateData.name || fallbackItem?.name || "3D Model Asset",
        slug: (updateData.name || fallbackItem?.name || "3d-model")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
        category: updateData.category || fallbackItem?.category || "3D Assets",
        description: updateData.description || fallbackItem?.description || "",
        shortDescription: updateData.shortDescription || fallbackItem?.shortDescription || "",
        thumbnail: updateData.thumbnail || fallbackItem?.thumbnail || "",
        modelUrl: updateData.modelUrl || fallbackItem?.modelUrl || "",
        modelFileName: updateData.modelFileName || fallbackItem?.modelFileName || "",
        modelFileType: "glb",
        softwareUsed: updateData.softwareUsed || fallbackItem?.softwareUsed || ["Blender"],
        tags: [
          ...(updateData.tags || fallbackItem?.tags || []),
          `fallbackId:${id}`,
        ],
        serialNumber: updateData.serialNumber ?? fallbackItem?.serialNumber ?? 0,
        displayOrder: updateData.displayOrder ?? fallbackItem?.displayOrder ?? 0,
        status: updateData.status || fallbackItem?.status || "Published",
        visibility: updateData.visibility || fallbackItem?.visibility || "Public",
        featured: updateData.featured ?? fallbackItem?.featured ?? true,
        creatorId: user.id || "admin-master",
        creatorName: user.name || "Master Studio Admin",
        creatorEmail: user.email || "3ddesigner5546@gmail.com",
      });

      return NextResponse.json({ success: true, product: created });
    } catch {
      // Fallback response for offline memory update
      return NextResponse.json({
        success: true,
        product: { _id: id, ...updateData },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

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
        const prod = await Product.findById(cleanId).lean();
        if (prod) {
          if (!bodyTitle) bodyTitle = prod.name;
          if (!bodySlug) bodySlug = prod.slug;
        }
        await Product.findByIdAndDelete(cleanId);
        await PhotoWork.findByIdAndDelete(cleanId);
      }
    } catch {
      // Ignore DB error for fallback items
    }

    // Always permanently record deletion so it never returns on refresh
    await recordDeletedAsset({
      id,
      cleanId,
      title: bodyTitle,
      slug: bodySlug,
      itemType: "3d",
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
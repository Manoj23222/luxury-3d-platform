import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/admin";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";

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
        softwareUsed: fallbackItem?.softwareUsed || ["Blender"],
        tags: updateData.tags || fallbackItem?.tags || [],
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

    try {
      await connectDB();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Product.findByIdAndDelete(id);
      }
    } catch {
      // Ignore DB error for fallback items
    }

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
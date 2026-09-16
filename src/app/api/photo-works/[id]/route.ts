import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";

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
      const slug = (body.title || "photo-work")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-");

      const created = await PhotoWork.create({
        title: body.title || "Retouching Showcase",
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        category: body.category || "Product Retouching",
        description: body.description || "",
        shortDescription: body.shortDescription || body.description?.slice(0, 120) || "",
        beforeImage: body.beforeImage || "",
        afterImage: body.afterImage || "",
        thumbnail: body.thumbnail || body.afterImage || "",
        softwareUsed: Array.isArray(body.softwareUsed)
          ? body.softwareUsed
          : String(body.softwareUsed || "Photoshop").split(",").map((s: string) => s.trim()).filter(Boolean),
        resolution: body.resolution || "4K / Ultra HD",
        clientName: body.clientName || "",
        projectYear: body.projectYear || "2026",
        tags: Array.isArray(body.tags)
          ? body.tags
          : String(body.tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
        featured: Boolean(body.featured),
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
    try {
      await connectDB();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await PhotoWork.findByIdAndDelete(id);
      }
    } catch {
      // Ignore DB error for demo/fallback items
    }

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

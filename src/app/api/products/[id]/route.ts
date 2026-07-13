import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

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

    const currentUser = await getCurrentUser();

if (!currentUser) {
  return NextResponse.json(
    { success: false, message: "Login required" },
    { status: 401 }
  );
}

const product = await Product.findById(id).lean();

if (!product) {
  return NextResponse.json(
    { success: false, message: "Project not found" },
    { status: 404 }
  );
}

if (
  currentUser.role !== "admin" &&
  String(product.creatorId || "") !== currentUser.id
) {
  return NextResponse.json(
    { success: false, message: "Access denied" },
    { status: 403 }
  );
}

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

export async function PUT(
  req: Request,
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

    const currentUser = await getCurrentUser();

if (!currentUser) {
  return NextResponse.json(
    { success: false, message: "Login required" },
    { status: 401 }
  );
}

const existing = await Product.findById(id);

if (!existing) {
  return NextResponse.json(
    { success: false, message: "Project not found" },
    { status: 404 }
  );
}

if (
  currentUser.role !== "admin" &&
  String(existing.creatorId || "") !== currentUser.id
) {
  return NextResponse.json(
    { success: false, message: "Access denied" },
    { status: 403 }
  );
}

    const body = await req.json();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: body.name,
        category: body.category,
        subCategory: body.subCategory,
        childCategory: body.childCategory,
        description: body.description,
        shortDescription: body.shortDescription,
        status: body.status,
        featured: body.featured,
        softwareUsed: body.softwareUsed,
        projectYear: body.projectYear,
        tags:
          typeof body.tags === "string"
            ? body.tags
                .split(",")
                .map((x: string) => x.trim())
                .filter(Boolean)
            : body.tags || [],
        videoUrl: body.videoUrl,
        thumbnail: body.thumbnail,
galleryImages: Array.isArray(body.galleryImages) ? body.galleryImages : [],
modelUrl: body.modelUrl,

price: Number(body.price || 0),
isFree: body.isFree === true || body.isFree === "true",
downloadType: body.downloadType || "Free",
downloadZipUrl: body.downloadZipUrl || "",
license: body.license || "",
      },
      { new: true }
      
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const currentUser = await getCurrentUser();

if (!currentUser) {
  return NextResponse.json(
    { success: false, message: "Login required" },
    { status: 401 }
  );
}

const product = await Product.findById(id);

if (!product) {
  return NextResponse.json(
    { success: false, message: "Project not found" },
    { status: 404 }
  );
}

if (
  currentUser.role !== "admin" &&
  String(product.creatorId || "") !== currentUser.id
) {
  return NextResponse.json(
    { success: false, message: "Access denied" },
    { status: 403 }
  );
}

await product.deleteOne();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
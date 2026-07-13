import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

const allowedFormats = [
  "zip",
  "glb",
  "gltf",
  "fbx",
  "blend",
  "obj",
  "stl",
] as const;

type DownloadFormat = (typeof allowedFormats)[number];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Login required",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid asset ID",
        },
        { status: 400 }
      );
    }

    const format = req.nextUrl.searchParams
      .get("format")
      ?.toLowerCase() as DownloadFormat | undefined;

    if (!format || !allowedFormats.includes(format)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid download format",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found",
        },
        { status: 404 }
      );
    }

    const isOwner =
      String(product.creatorId || "") === currentUser.id;

    const isAdmin = currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot download another creator's files",
        },
        { status: 403 }
      );
    }

    const urls: Record<DownloadFormat, string> = {
      zip: String(product.zipUrl || product.downloadZipUrl || ""),
      glb: String(product.glbUrl || ""),
      gltf: String(product.gltfUrl || ""),
      fbx: String(product.fbxUrl || ""),
      blend: String(product.blendUrl || ""),
      obj: String(product.objUrl || ""),
      stl: String(product.stlUrl || ""),
    };

    const downloadUrl = urls[format];

    if (!downloadUrl) {
      return NextResponse.json(
        {
          success: false,
          message: `${format.toUpperCase()} file is not available`,
        },
        { status: 404 }
      );
    }

    return NextResponse.redirect(downloadUrl);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Download failed";

    console.error("OWNER DOWNLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
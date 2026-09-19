import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/admin";

const MB = 1024 * 1024;

const MAX_SIZE_BY_TYPE: Record<string, number> = {
  thumbnail: 15 * MB,
  model: 250 * MB,
  glb: 250 * MB,
  gltf: 250 * MB,
  fbx: 250 * MB,
  blend: 250 * MB,
  obj: 250 * MB,
  stl: 250 * MB,
  zip: 500 * MB,
  paymentScreenshot: 15 * MB,
};

function getExt(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function formatMB(bytes: number) {
  return `${(bytes / MB).toFixed(1)} MB`;
}

export async function GET() {
  try {
    const currentUser = await requireAdmin();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Login required",
          media: [],
        },
        { status: 401 }
      );
    }

    try {
      await connectDB();
      const filter =
        currentUser.role === "admin"
          ? {}
          : {
              creatorId: currentUser.id,
            };

      const media = await Media.find(filter)
        .sort({ createdAt: -1 })
        .lean();

      return NextResponse.json({
        success: true,
        media,
      });
    } catch {
      return NextResponse.json({
        success: true,
        media: [],
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Media fetch failed",
        media: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await requireAdmin();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = String(formData.get("title") || "");
    const uploadType = String(formData.get("uploadType") || "model");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File required" },
        { status: 400 }
      );
    }

    const maxSize = MAX_SIZE_BY_TYPE[uploadType] || 250 * MB;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: `${file.name} is too large. Selected ${formatMB(
            file.size
          )}, maximum allowed ${formatMB(maxSize)}.`,
        },
        { status: 400 }
      );
    }

    const ext = getExt(file.name);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let finalUrl = "";

    // 1. Attempt Cloudinary upload if configured
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const uploadResult: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type:
                  uploadType === "thumbnail" || uploadType === "paymentScreenshot"
                    ? "image"
                    : "raw",
                folder: `lux3d-media-library/${uploadType}`,
                use_filename: true,
                unique_filename: true,
                filename_override: file.name,
                format: ext || undefined,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        finalUrl = uploadResult?.secure_url || uploadResult?.url || "";
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to local storage:", cloudErr);
      }
    }

    // 2. Fallback to saving to public/uploads directory locally
    if (!finalUrl) {
      const sanitizedName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const fileName = `${Date.now()}-${sanitizedName}`;
      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      await fs.mkdir(uploadsDir, { recursive: true });
      await fs.writeFile(path.join(uploadsDir, fileName), buffer);

      finalUrl = `/uploads/${fileName}`;
    }

    // 3. Save to MongoDB if available
    let mediaRecord = null;
    try {
      await connectDB();
      mediaRecord = await Media.create({
        title: title || file.name,
        url: finalUrl,
        fileType: uploadType,
        folder: `lux3d-media-library/${uploadType}`,
        size: file.size,
        creatorId: currentUser.id || "admin-master",
        creatorName: currentUser.name || "Ashok Meena",
        creatorEmail: currentUser.email || "ashokm3414@gmail.com",
      });
    } catch {
      // Ignore DB error if offline
    }

    return NextResponse.json({
      success: true,
      url: finalUrl,
      media: mediaRecord || {
        title: title || file.name,
        url: finalUrl,
        fileType: uploadType,
        size: file.size,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
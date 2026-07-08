import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import cloudinary from "@/lib/cloudinary";

const MB = 1024 * 1024;

const MAX_SIZE_BY_TYPE: Record<string, number> = {
  thumbnail: 10 * MB,
  model: 200 * MB,
  glb: 200 * MB,
  gltf: 200 * MB,
  fbx: 200 * MB,
  blend: 200 * MB,
  obj: 200 * MB,
  stl: 200 * MB,
  zip: 400 * MB,
};

function getExt(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function formatMB(bytes: number) {
  return `${(bytes / MB).toFixed(1)} MB`;
}

export async function GET() {
  await connectDB();

  const media = await Media.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    success: true,
    media,
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

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

    const maxSize = MAX_SIZE_BY_TYPE[uploadType] || 200 * MB;

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

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: uploadType === "thumbnail" ? "image" : "raw",
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

    const media = await Media.create({
      title: title || file.name,
      url: uploadResult.secure_url,
      fileType: uploadType,
      folder: `lux3d-media-library/${uploadType}`,
      size: file.size,
    });

    return NextResponse.json({
      success: true,
      media,
      url: uploadResult.secure_url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
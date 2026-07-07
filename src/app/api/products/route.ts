import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function toList(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function getExt(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function isFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "raw" | "auto"
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = getExt(file.name);
  const publicId = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-");

  return await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: resourceType,
          folder,
          public_id: publicId,
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
}

async function uploadOptionalFile(
  formData: FormData,
  key: string,
  folder: string
) {
  const file = formData.get(key);

  if (!isFile(file)) return "";

  const upload = await uploadToCloudinary(file, folder, "raw");
  return upload.secure_url || "";
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch projects",
        products: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name =
      String(formData.get("name") || "").trim() ||
      `Untitled Project ${Date.now()}`;

    const slug = String(formData.get("slug") || "") || slugify(name);
    const shortDescription = String(formData.get("shortDescription") || "");
    const description = String(formData.get("description") || "");

    const category = String(formData.get("category") || "");
    const subCategory = String(formData.get("subCategory") || "");
    const childCategory = String(formData.get("childCategory") || "");

    const clientName = String(formData.get("clientName") || "");
    const brandName = String(formData.get("brandName") || "");
    const projectYear = String(formData.get("projectYear") || "");
    const duration = String(formData.get("duration") || "");

    const videoUrl = String(formData.get("videoUrl") || "");
    const hdriUrl = String(formData.get("hdriUrl") || "");

    const price = Number(formData.get("price") || 0);
    const isFree = String(formData.get("isFree") || "true") === "true";
    const downloadType = String(formData.get("downloadType") || "Free");
    const downloadZipUrl = String(formData.get("downloadZipUrl") || "");
    const license = String(formData.get("license") || "");

    const seoTitle = String(formData.get("seoTitle") || "");
    const seoDescription = String(formData.get("seoDescription") || "");

    const status = String(formData.get("status") || "Draft");
    const featured = String(formData.get("featured") || "false") === "true";
    const visibility = String(formData.get("visibility") || "Public");

    let thumbnail = String(formData.get("thumbnail") || "");

    const thumbnailFile = formData.get("thumbnailFile");
    const modelFile = formData.get("model");

    const tags = toList(formData.get("tags"));
    const softwareUsed = toList(formData.get("softwareUsed"));
    const seoKeywords = toList(formData.get("seoKeywords"));

    if (!isFile(modelFile)) {
      return NextResponse.json(
        { success: false, message: "Preview GLB/GLTF model file is required" },
        { status: 400 }
      );
    }

    const modelFileName = modelFile.name;
    const modelFileType = getExt(modelFile.name);

    const modelUpload = await uploadToCloudinary(
      modelFile,
      "luxury-3d-products/preview",
      "raw"
    );

    if (isFile(thumbnailFile)) {
      const thumbUpload = await uploadToCloudinary(
        thumbnailFile,
        "lux3d-thumbnails",
        "image"
      );

      thumbnail = thumbUpload.secure_url || "";
    }

    const glbUrl = await uploadOptionalFile(
      formData,
      "glbFile",
      "luxury-3d-products/glb"
    );

    const gltfUrl = await uploadOptionalFile(
      formData,
      "gltfFile",
      "luxury-3d-products/gltf"
    );

    const fbxUrl = await uploadOptionalFile(
      formData,
      "fbxFile",
      "luxury-3d-products/fbx"
    );

    const blendUrl = await uploadOptionalFile(
      formData,
      "blendFile",
      "luxury-3d-products/blend"
    );

    const objUrl = await uploadOptionalFile(
      formData,
      "objFile",
      "luxury-3d-products/obj"
    );

    const stlUrl = await uploadOptionalFile(
      formData,
      "stlFile",
      "luxury-3d-products/stl"
    );

    const zipUrl =
      (await uploadOptionalFile(
        formData,
        "zipFile",
        "luxury-3d-products/zip"
      )) || downloadZipUrl;

    const product = await Product.create({
      name,
      slug,
      shortDescription,
      description,

      category,
      subCategory,
      childCategory,
      categoryPath: [category, subCategory, childCategory].filter(Boolean),

      thumbnail,
      galleryImages: [],

      modelUrl: modelUpload.secure_url,
      modelFileName,
      modelFileType,

      glbUrl: glbUrl || modelUpload.secure_url,
      gltfUrl,
      fbxUrl,
      blendUrl,
      objUrl,
      stlUrl,
      zipUrl,

      videoUrl,
      hdriUrl,

      clientName,
      brandName,
      softwareUsed,
      projectYear,
      duration,

      tags,

      price,
      isFree,
      downloadType,
      downloadZipUrl: zipUrl || downloadZipUrl,
      license,

      seoTitle,
      seoDescription,
      seoKeywords,

      status,
      featured,
      visibility,

      creatorId: "personal-admin",
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
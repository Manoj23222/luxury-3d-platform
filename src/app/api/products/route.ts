import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth";

const MB = 1024 * 1024;

const FILE_RULES: Record<string, { maxSize: number; folder: string }> = {
  model: { maxSize: 200 * MB, folder: "luxury-3d-products/preview" },
  thumbnailFile: { maxSize: 10 * MB, folder: "lux3d-thumbnails" },
  glbFile: { maxSize: 200 * MB, folder: "luxury-3d-products/glb" },
  gltfFile: { maxSize: 200 * MB, folder: "luxury-3d-products/gltf" },
  fbxFile: { maxSize: 200 * MB, folder: "luxury-3d-products/fbx" },
  blendFile: { maxSize: 200 * MB, folder: "luxury-3d-products/blend" },
  objFile: { maxSize: 200 * MB, folder: "luxury-3d-products/obj" },
  stlFile: { maxSize: 200 * MB, folder: "luxury-3d-products/stl" },
  zipFile: { maxSize: 400 * MB, folder: "luxury-3d-products/zip" },
};

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

function formatMB(bytes: number) {
  return `${(bytes / MB).toFixed(1)} MB`;
}

function validateFile(key: string, file: File) {
  const rule = FILE_RULES[key];

  if (!rule) return;

  if (file.size > rule.maxSize) {
    throw new Error(
      `${file.name} is too large. Selected ${formatMB(
        file.size
      )}, maximum allowed ${formatMB(rule.maxSize)}.`
    );
  }
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

async function uploadFormFile(
  formData: FormData,
  key: string,
  resourceType: "image" | "raw"
) {
  const file = formData.get(key);

  if (!isFile(file)) return null;

  validateFile(key, file);

  const rule = FILE_RULES[key];

  const upload = await uploadToCloudinary(file, rule.folder, resourceType);

  return {
    key,
    file,
    url: upload.secure_url || "",
    type: getExt(file.name),
    name: file.name,
  };
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Login required",
          products: [],
        },
        { status: 401 }
      );
    }

    await connectDB();

    const filter =
      currentUser.role === "admin"
        ? {}
        : {
            creatorId: currentUser.id,
          };

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      products,
    });
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

    const formData = await req.formData();

    const name =
      String(formData.get("name") || "").trim() ||
      `Untitled Project ${Date.now()}`;
      const modelUrlInput = String(formData.get("modelUrl") || "");
const modelFileNameInput = String(formData.get("modelFileName") || "");
const modelFileTypeInput = String(formData.get("modelFileType") || "");

const thumbnailUrlInput = String(formData.get("thumbnailUrl") || "");
const glbUrlInput = String(formData.get("glbUrl") || "");
const gltfUrlInput = String(formData.get("gltfUrl") || "");
const fbxUrlInput = String(formData.get("fbxUrl") || "");
const blendUrlInput = String(formData.get("blendUrl") || "");
const objUrlInput = String(formData.get("objUrl") || "");
const stlUrlInput = String(formData.get("stlUrl") || "");
const zipUrlInput = String(formData.get("zipUrl") || "");
 
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

    const tags = toList(formData.get("tags"));
    const softwareUsed = toList(formData.get("softwareUsed"));
    const seoKeywords = toList(formData.get("seoKeywords"));

    const modelFile = formData.get("model");

    if (!isFile(modelFile) && !modelUrlInput) {
  return NextResponse.json(
    { success: false, message: "Preview GLB/GLTF model file is required" },
    { status: 400 }
  );
}

    if (isFile(modelFile)) {
  validateFile("model", modelFile);
}

    const uploads = await Promise.all([
  isFile(modelFile) ? uploadFormFile(formData, "model", "raw") : null,
  uploadFormFile(formData, "thumbnailFile", "image"),
  uploadFormFile(formData, "glbFile", "raw"),
  uploadFormFile(formData, "gltfFile", "raw"),
  uploadFormFile(formData, "fbxFile", "raw"),
  uploadFormFile(formData, "blendFile", "raw"),
  uploadFormFile(formData, "objFile", "raw"),
  uploadFormFile(formData, "stlFile", "raw"),
  uploadFormFile(formData, "zipFile", "raw"),
]);

    const uploaded = Object.fromEntries(
      uploads.filter(Boolean).map((item: any) => [item.key, item])
    );

    const modelUpload = uploaded.model;
    const finalModelUrl = modelUpload?.url || modelUrlInput;
const finalModelName = modelUpload?.name || modelFileNameInput;
const finalModelType = modelUpload?.type || modelFileTypeInput;
    const thumbnailUpload = uploaded.thumbnailFile;

    const zipUrl = uploaded.zipFile?.url || downloadZipUrl;

    const product = await Product.create({
      name,
      slug,
      shortDescription,
      description,

      category,
      subCategory,
      childCategory,
      categoryPath: [category, subCategory, childCategory].filter(Boolean),

      thumbnail: thumbnailUpload?.url || thumbnailUrlInput || String(formData.get("thumbnail") || ""),

modelUrl: finalModelUrl,
modelFileName: finalModelName,
modelFileType: finalModelType,

glbUrl: uploaded.glbFile?.url || glbUrlInput || finalModelUrl,
gltfUrl: uploaded.gltfFile?.url || gltfUrlInput,
fbxUrl: uploaded.fbxFile?.url || fbxUrlInput,
blendUrl: uploaded.blendFile?.url || blendUrlInput,
objUrl: uploaded.objFile?.url || objUrlInput,
stlUrl: uploaded.stlFile?.url || stlUrlInput,
zipUrl: uploaded.zipFile?.url || zipUrlInput || downloadZipUrl,

downloadZipUrl: uploaded.zipFile?.url || zipUrlInput || downloadZipUrl,

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
    
      license,

      seoTitle,
      seoDescription,
      seoKeywords,

      status,
      featured,
      visibility,

     creatorId: currentUser.id,
creatorName: currentUser.name || "",
creatorEmail: currentUser.email || "",
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
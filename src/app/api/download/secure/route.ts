import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

const allowedFormats = ["glb", "gltf", "fbx", "blend", "obj", "stl", "zip"];

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Login required" },
        { status: 401 }
      );
    }

    const { orderId, format = "zip" } = await req.json();

    if (!allowedFormats.includes(format)) {
      return NextResponse.json(
        { success: false, message: "Invalid file format" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      _id: orderId,
      userId: user.id,
      status: "Paid",
      downloadEnabled: true,
    }).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Download not allowed" },
        { status: 403 }
      );
    }

    const product = await Product.findById(order.productId).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Asset not found" },
        { status: 404 }
      );
    }

    const urls: Record<string, string> = {
      glb: product.glbUrl || product.modelUrl || "",
      gltf: product.gltfUrl || "",
      fbx: product.fbxUrl || "",
      blend: product.blendUrl || "",
      obj: product.objUrl || "",
      stl: product.stlUrl || "",
      zip: product.zipUrl || product.downloadZipUrl || "",
    };

    const url = urls[format];

    if (!url) {
      return NextResponse.json(
        { success: false, message: `${format.toUpperCase()} file not available` },
        { status: 404 }
      );
    }
await Product.findByIdAndUpdate(product._id, {
  $inc: { downloads: 1 },
});

await Order.findByIdAndUpdate(order._id, {
  $inc: { downloadCount: 1 },
  lastDownloadedAt: new Date(),
  $push: {
    downloadHistory: {
      format,
      downloadedAt: new Date(),
    },
  },
});
    return NextResponse.json({
      success: true,
      format,
      url,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Secure download failed",
      },
      { status: 500 }
    );
  }
}
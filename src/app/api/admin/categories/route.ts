import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { getCurrentUser } from "@/lib/auth";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectDB();

    const categories = await Category.find({})
      .sort({ level: 1, sortOrder: 1, name: 1 })
      .lean();

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectDB();

    const body = await req.json();
    const name = String(body.name || "").trim();
    const parentId = String(body.parentId || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Category name required" }, { status: 400 });
    }

    let level = 0;
    let path: string[] = [];

    if (parentId) {
      const parent = await Category.findById(parentId).lean();

      if (!parent) {
        return NextResponse.json({ error: "Parent category not found" }, { status: 404 });
      }

      level = Number(parent.level || 0) + 1;
      path = [...(parent.path || []), parent.name];
    }

   const baseSlug = slugify(name);
let slug = parentId ? `${baseSlug}-${Date.now()}` : baseSlug;

const existing = await Category.findOne({ slug }).lean();

if (existing) {
  slug = `${baseSlug}-${Date.now()}`;
}

    const category = await Category.create({
      name,
      slug,
      parentId,
      level,
      path,
      active: true,
      sortOrder: 0,
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
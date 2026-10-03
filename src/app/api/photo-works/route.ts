import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";
import Product from "@/models/Product";
import { FALLBACK_PHOTO_WORKS } from "@/data/photoWorksData";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const workType = searchParams.get("workType");
    const search = searchParams.get("search");

    let dbItems: any[] = [];
    try {
      await connectDB();
      const filter: any = { status: "Published" };

      if (category && category !== "All") {
        filter.category = category;
      }
      if (workType && workType !== "All") {
        filter.workType = workType;
      }
      if (search && search.trim()) {
        filter.$or = [
          { title: { $regex: search.trim(), $options: "i" } },
          { description: { $regex: search.trim(), $options: "i" } },
          { tags: { $in: [new RegExp(search.trim(), "i")] } },
        ];
      }

      const [photos, prods] = await Promise.all([
        PhotoWork.find(filter).sort({ featured: -1, createdAt: -1 }).lean(),
        Product.find({ status: "Published" }).sort({ featured: -1, createdAt: -1 }).lean(),
      ]);

      const productsSource =
        prods && prods.length > 0 ? prods : FALLBACK_3D_PRODUCTS;

      const mappedProds = productsSource.map((p: any) => ({
        _id: String(p._id).startsWith("prod-") ? String(p._id) : `prod-${p._id.toString()}`,
        title: p.name || "3D Asset",
        slug: p.slug,
        workType: "single",
        category: p.category || "3D Models & Assets",
        shortDescription: p.shortDescription || p.description?.slice(0, 120),
        description: p.description,
        beforeImage: "",
        afterImage: p.thumbnail,
        thumbnail: p.thumbnail,
        softwareUsed: ["Blender"],
        resolution: "3D GLB / PBR",
        clientName: p.brandName || "Luxury 3D Studio",
        projectYear: "2026",
        tags: ["Blender", "3D Model", p.category].filter(Boolean),
        modelUrl: p.glbUrl || p.modelUrl || "",
        featured: Boolean(p.featured),
        views: p.views || 100,
        likes: p.likes || 25,
        isPortfolio3D: true,
      }));

      dbItems = [...(photos || []), ...mappedProds];
    } catch {
      dbItems = [];
    }

    // Combine DB items with fallback catalog (DB items first)
    let allWorks: any[] = [];
    if (dbItems.length > 0) {
      const dbTitles = new Set(
        dbItems.map((x: any) => String(x.title || "").toLowerCase().trim())
      );
      const nonDuplicateFallbacks = FALLBACK_PHOTO_WORKS.filter(
        (f) => !dbTitles.has(String(f.title || "").toLowerCase().trim())
      );
      allWorks = [...dbItems, ...nonDuplicateFallbacks];
    } else {
      allWorks = FALLBACK_PHOTO_WORKS;
    }

    if (category && category !== "All") {
      allWorks = allWorks.filter((item) => item.category === category);
    }

    if (workType && workType !== "All") {
      allWorks = allWorks.filter((item) => (item.workType || "before_after") === workType);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      allWorks = allWorks.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.tags?.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      works: allWorks,
      total: allWorks.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch photo works",
        works: FALLBACK_PHOTO_WORKS,
        total: FALLBACK_PHOTO_WORKS.length,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      workType = "before_after",
      category,
      description,
      shortDescription,
      beforeImage,
      afterImage,
      thumbnail,
      softwareUsed,
      resolution,
      clientName,
      projectYear,
      tags,
      featured,
      status,
    } = body;

    // Validation: Title and Main/Single Image are mandatory
    if (!title || !afterImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and Image are required",
        },
        { status: 400 }
      );
    }

    // If it's before_after mode, beforeImage is also required
    if (workType === "before_after" && !beforeImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Before Image is required for Before & After comparison",
        },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const assignedWorkType =
      workType === "single"
        ? "single"
        : workType === "banner"
        ? "banner"
        : workType === "before_after"
        ? "before_after"
        : beforeImage && beforeImage !== afterImage
        ? "before_after"
        : "single";

    const newWork = await PhotoWork.create({
      title,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      workType: assignedWorkType,
      category: category || (assignedWorkType === "before_after" ? "Product Retouching" : "Creative Design"),
      description: description || "",
      shortDescription: shortDescription || description?.slice(0, 120) || "",
      beforeImage: assignedWorkType === "before_after" ? (beforeImage || "") : "",
      afterImage,
      thumbnail: thumbnail || afterImage,
      softwareUsed: Array.isArray(softwareUsed)
        ? softwareUsed
        : String(softwareUsed || "Adobe Photoshop")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      resolution: resolution || "4K / Ultra HD",
      clientName: clientName || "",
      projectYear: projectYear || "2026",
      tags: Array.isArray(tags)
        ? tags
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      featured: Boolean(featured),
      status: status || "Published",
    });

    try {
      revalidatePath("/work");
      revalidatePath("/photo-editing");
      revalidatePath("/admin/photos");
    } catch {
      // Ignore in non-ISR contexts
    }

    return NextResponse.json({
      success: true,
      message: "Photo work created successfully",
      work: newWork,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create photo work",
      },
      { status: 500 }
    );
  }
}

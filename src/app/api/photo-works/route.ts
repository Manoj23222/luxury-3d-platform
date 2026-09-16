import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";

// Curated high-end showcase items for instant presentation
const FALLBACK_PHOTO_WORKS = [
  {
    _id: "pw-white-background-resize",
    title: "White background & Resize",
    slug: "white-background-and-resize",
    category: "White background & Resize",
    shortDescription:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048",
    description:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048. High-precision studio product isolation to seamless pure white background with natural drop shadow retention and proportional resize.",
    beforeImage:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Capture One", "Wacom Intuos Pro"],
    resolution: "3448×5168 ➔ 1366×2048",
    clientName: "E-Commerce Studio",
    projectYear: "2026",
    tags: ["White Background", "Resize", "Product", "Isolation", "Dimensions"],
    featured: true,
    views: 1850,
    likes: 490,
  },
  {
    _id: "pw-background-change-resize",
    title: "Background change & Resize",
    slug: "background-change-and-resize",
    category: "Background change & Resize",
    shortDescription:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048",
    description:
      "Original images Dimensions: 3448 × 5168 to White background And Resize 1366 × 2048. Seamless background cutout, edge refinement, lighting harmonization, and dimension resizing for high-conversion web listings.",
    beforeImage:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Pen Tool", "Lightroom"],
    resolution: "3448×5168 ➔ 1366×2048",
    clientName: "Apparel Brand",
    projectYear: "2026",
    tags: ["Background Change", "Resize", "Cutout", "E-Commerce", "Dimensions"],
    featured: true,
    views: 1620,
    likes: 415,
  },
  {
    _id: "pw-luxury-perfume",
    title: "Luxury Perfume Bottle High-End Commercial Retouching",
    slug: "luxury-perfume-bottle-retouching",
    category: "Product Retouching",
    shortDescription:
      "Advanced dust/scratch cleanup, metallic highlight sculpting, glass reflection enhancement and background color harmonization.",
    description:
      "Commercial e-commerce and billboard retouching for a luxury fragrance campaign. Project involved complete glass refractive enhancement, precise reflection sculpting, dust and seam removal, gold typography enhancement, and studio shadow creation.",
    beforeImage:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Capture One", "Wacom Intuos Pro"],
    resolution: "6000 x 4000 (24 MP)",
    clientName: "Aura Luxe Fragrances",
    projectYear: "2026",
    tags: ["Product", "Perfume", "Commercial", "Reflections", "Glass"],
    featured: true,
    views: 1420,
    likes: 384,
  },
  {
    _id: "pw-editorial-fashion",
    title: "High-Fashion Editorial Beauty & Skin Micro-Dodge & Burn",
    slug: "high-fashion-editorial-beauty-retouching",
    category: "Fashion & Portrait",
    shortDescription:
      "Natural skin texture preservation with frequency separation, micro dodge & burn, hair flyaway cleanup and subtle color toning.",
    description:
      "High-end magazine cover retouching emphasizing natural skin pores without artificial blur. Non-destructive workflow utilizing frequency separation, 16-bit color precision, micro dodge & burn, eye luminance enhancement, and color balance grading.",
    beforeImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Frequency Separation", "Capture One Pro"],
    resolution: "50 MP Raw (Hasselblad)",
    clientName: "Vogue Creative Series",
    projectYear: "2026",
    tags: ["Fashion", "Portrait", "Beauty", "Dodge & Burn", "Skin Retouching"],
    featured: true,
    views: 2180,
    likes: 612,
  },
  {
    _id: "pw-cinematic-color",
    title: "Cinematic Mood & Atmospheric Teal/Orange Color Grading",
    slug: "cinematic-mood-atmospheric-color-grading",
    category: "Color Grading",
    shortDescription:
      "Hollywood-style cinematic color grading, highlights roll-off, film grain emulation, and dynamic range exposure blending.",
    description:
      "Commercial campaign color grading for lifestyle brand. Transformed flat lighting into a rich, emotive twilight ambiance using custom 3D LUTs, curves adjustment, split-toning, and atmospheric depth mask enhancement.",
    beforeImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Lightroom", "Adobe Photoshop", "3D LUT Creator"],
    resolution: "8K Ultra HD",
    clientName: "Alpine Odyssey Campaign",
    projectYear: "2026",
    tags: ["Color Grading", "Cinematic", "Landscape", "Mood", "Film Grain"],
    featured: true,
    views: 1890,
    likes: 479,
  },
  {
    _id: "pw-luxury-watch",
    title: "Swiss Chronograph Watch Metal & Crystal Micro Retouching",
    slug: "swiss-chronograph-watch-retouching",
    category: "Jewelry & Luxury",
    shortDescription:
      "Sapphire crystal anti-glare cleanup, brushed titanium bevel sharpening, dial alignment, and studio glare correction.",
    description:
      "Ultra-detailed luxury timepiece advertising retouching. Multi-exposure composite to create pristine dial clarity, bevel highlight alignment, zero scratches on titanium casing, and realistic cast shadow reconstruction.",
    beforeImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Focus Stacking", "Helicon Focus"],
    resolution: "100 MP Medium Format",
    clientName: "Geneva Timepieces",
    projectYear: "2026",
    tags: ["Watch", "Jewelry", "Macro", "Titanium", "Luxury Retouch"],
    featured: true,
    views: 1650,
    likes: 420,
  },
  {
    _id: "pw-creative-manipulation",
    title: "Surreal Floating Product Island Creative Manipulation",
    slug: "surreal-creative-photo-manipulation",
    category: "Photo Manipulation",
    shortDescription:
      "Multi-plate photo compositing with accurate shadow projection, volumetric lighting, particle effects, and atmospheric fog.",
    description:
      "Complex advertising composite combining 14 distinct photographic elements into a seamless fantasy landscape. Realistic light wrap, contact shadows, atmospheric particles, depth fog, and global color harmonization.",
    beforeImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Procreate", "Blender Lighting Plate"],
    resolution: "7680 x 4320 (8K)",
    clientName: "Cosmic Beverages",
    projectYear: "2026",
    tags: ["Compositing", "Surreal", "Advertising", "Lighting Wrap", "Fantasy"],
    featured: false,
    views: 1320,
    likes: 310,
  },
  {
    _id: "pw-ecommerce-apparel",
    title: "Ghost Mannequin & Apparel Wrinkle Removal Retouching",
    slug: "ghost-mannequin-apparel-retouching",
    category: "Background Replacement",
    shortDescription:
      "Seamless neck joint ghost mannequin stitching, fabric smoothing, symmetrical shape warping, and shadow alignment.",
    description:
      "E-commerce catalog post-production for luxury streetwear collection. Seamless collar stitching, symmetrical sleeve alignment, fiber artifact reduction, fabric crease moderation, and neutral studio gradient backdrop.",
    beforeImage:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Photoshop", "Pen Tool Precision Masking"],
    resolution: "4K E-Commerce Master",
    clientName: "Nordic Apparel Co.",
    projectYear: "2026",
    tags: ["Ghost Mannequin", "Apparel", "E-commerce", "Fabric Smoothing"],
    featured: false,
    views: 940,
    likes: 245,
  },
  {
    _id: "pw-real-estate-hdr",
    title: "Luxury Architecture & Real Estate Twilight HDR Blending",
    slug: "luxury-architecture-real-estate-hdr",
    category: "Real Estate & HDR",
    shortDescription:
      "Window view pull, interior/exterior exposure bracket blending, vertical perspective straightening, and warm ambient glow.",
    description:
      "Premium architectural showcase combining 5-bracket RAW exposures. Window views preserved with zero blowout, vertical lens correction, color cast neutralization, and realistic dusk sky replacement with warm interior lamp glows.",
    beforeImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    softwareUsed: ["Adobe Lightroom Classic", "Photoshop HDR Pro", "PTGui"],
    resolution: "6000 x 4000 Ultra Res",
    clientName: "Sotheby's Realty Portfolio",
    projectYear: "2026",
    tags: ["Architecture", "Real Estate", "HDR", "Twilight", "Perspective"],
    featured: true,
    views: 1120,
    likes: 295,
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let dbItems: any[] = [];

    try {
      await connectDB();
      const filter: Record<string, any> = { status: "Published" };

      if (category && category !== "All") {
        filter.category = category;
      }

      if (search && search.trim()) {
        filter.$or = [
          { title: { $regex: search.trim(), $options: "i" } },
          { description: { $regex: search.trim(), $options: "i" } },
          { tags: { $in: [new RegExp(search.trim(), "i")] } },
        ];
      }

      dbItems = await PhotoWork.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .lean();
    } catch {
      // If DB is offline or empty, fallback gracefully
      dbItems = [];
    }

    // Combine DB items with fallback catalog
    let allWorks = dbItems.length > 0 ? dbItems : FALLBACK_PHOTO_WORKS;

    if (category && category !== "All") {
      allWorks = allWorks.filter((item) => item.category === category);
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

    if (!title || !beforeImage || !afterImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, Before Image, and After Image are required",
        },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newWork = await PhotoWork.create({
      title,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      category: category || "Product Retouching",
      description: description || "",
      shortDescription: shortDescription || description?.slice(0, 120) || "",
      beforeImage,
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

    return NextResponse.json({
      success: true,
      message: "Photo retouching work created successfully",
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

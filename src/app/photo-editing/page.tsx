import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PhotoEditingGrid from "@/components/photo-editing/PhotoEditingGrid";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";

export const metadata: Metadata = {
  title: "Photo Editing Work Library — High-End Retouching & Grading | LUX3D",
  description:
    "Explore luxury photo editing, commercial product retouching, frequency separation, and color grading showcase with interactive Before & After comparisons.",
};

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

async function getPhotoWorks() {
  try {
    await connectDB();
    const items = await PhotoWork.find({ status: "Published" })
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    if (items.length > 0) {
      return items.map((x: any) => ({
        ...x,
        _id: x._id.toString(),
      }));
    }
    return FALLBACK_PHOTO_WORKS;
  } catch {
    return FALLBACK_PHOTO_WORKS;
  }
}

export default async function PhotoEditingPage() {
  const works = await getPhotoWorks();

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-white pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 shadow-sm">
                Photo Editing Work Library
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-6xl">
                High-End Photo Retouching & Color Grading.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Explore our commercial photo editing portfolio with interactive
                Before & After sliders. From e-commerce product enhancement and
                luxury jewelry retouching to editorial beauty and cinematic color
                grading.
              </p>

              {/* Stats Counters */}
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
                  <p className="text-xl font-black text-black">100%</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-neutral-500">
                    Hand Retouched
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
                  <p className="text-xl font-black text-black">16-Bit</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-neutral-500">
                    RAW Precision
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 text-center">
                  <p className="text-xl font-black text-black">4K - 8K</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-neutral-500">
                    Ultra Resolution
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action CTA */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact?subject=Custom%20Photo%20Editing%20Order"
                className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white shadow-md transition hover:bg-neutral-800"
              >
                Hire for Photo Editing
              </Link>

              <Link
                href="/portfolio"
                className="rounded-full border border-neutral-300 bg-white px-8 py-4 text-center text-sm font-bold text-black transition hover:border-black"
              >
                View 3D Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <PhotoEditingGrid initialWorks={works} />

      {/* Service Capabilities Strip */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Post-Production Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-black text-black">
              Comprehensive Post-Processing Services
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Product Retouching",
                desc: "Dust, scratch, reflection cleanup, shadow creation, pure white background for Amazon/Shopify.",
              },
              {
                title: "High-End Beauty",
                desc: "Natural skin texture preservation, frequency separation, micro dodge & burn, hair flyaway removal.",
              },
              {
                title: "Color Grading & LUTs",
                desc: "Cinematic tone mapping, highlight roll-off, film grain emulation, and commercial palette matching.",
              },
              {
                title: "Complex Compositing",
                desc: "Multi-image blending, light wrapping, atmospheric fog, perspective matching and surreal VFX.",
              },
            ].map((srv) => (
              <div
                key={srv.title}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-black text-white">
                  ✦
                </div>
                <h3 className="mt-4 text-base font-bold text-black">
                  {srv.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-12 rounded-3xl border border-neutral-200 bg-black p-8 text-white text-center sm:p-12">
            <h3 className="text-2xl font-black sm:text-3xl">
              Need custom photo editing or batch e-commerce retouching?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-400">
              Fast turnaround, high-resolution masters, and dedicated support for
              brands, photographers, and agencies.
            </p>
            <Link
              href="/contact?subject=Photo%20Retouching%20Quote"
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition hover:bg-neutral-200"
            >
              Get Free Sample & Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PhotoEditingGrid from "@/components/photo-editing/PhotoEditingGrid";
import connectDB from "@/lib/mongodb";
import PhotoWork from "@/models/PhotoWork";
import { FALLBACK_PHOTO_WORKS } from "@/data/photoWorksData";

export const metadata: Metadata = {
  title: "Photo Retouching & Commercial Graphic Design Showcase | LUX3D",
  description:
    "Explore luxury photo retouching, Adobe Illustrator vector art, Blender 3D models and CGI, and commercial advertising creatives.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getPhotoWorks() {
  try {
    await connectDB();
    const items = await PhotoWork.find({ status: "Published" })
      .sort({ createdAt: -1 })
      .lean();

    if (items && items.length > 0) {
      const dbTitles = new Set(
        items.map((x: any) => String(x.title || "").toLowerCase().trim())
      );
      const nonDuplicateFallbacks = FALLBACK_PHOTO_WORKS.filter(
        (f) => !dbTitles.has(String(f.title || "").toLowerCase().trim())
      );

      return [
        ...items.map((x: any) => ({
          ...x,
          _id: x._id.toString(),
        })),
        ...nonDuplicateFallbacks,
      ];
    }
    return FALLBACK_PHOTO_WORKS;
  } catch {
    return FALLBACK_PHOTO_WORKS;
  }
}

export default async function PhotoEditingPage() {
  const works = await getPhotoWorks();

  return (
    <main className="min-h-screen bg-[#faf8f5] text-neutral-900 selection:bg-amber-500/20 selection:text-amber-950">
      <Navbar />

      {/* Luxury Hero Banner Section */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-[#fbfbfd] via-[#f7f6f2] to-[#faf8f5] pt-28 pb-14 text-neutral-950">
        {/* Background Banner Image with Luxury Pearl Light Grading */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/creative-portfolio-hero-banner.png"
            alt="Creative Portfolio Luxury Banner"
            className="h-full w-full object-cover object-center opacity-20 filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-[#fbfbfd]/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {/* Luxury Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-white/90 px-3.5 py-1 text-xs font-bold text-stone-800 backdrop-blur-md shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ashok Meena • Selected Creative Showcase</span>
              </span>

              {/* Main Headline */}
              <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl lg:text-5xl">
                Photo Retouching & Creative Gallery
              </h1>

              {/* Luxury Domain & Skills Strip */}
              <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm font-semibold text-neutral-600">
                <span className="text-neutral-950 font-bold">All</span>
                <span className="text-stone-300">•</span>
                <span>Adobe Photoshop</span>
                <span className="text-stone-300">•</span>
                <span>Adobe Illustrator</span>
                <span className="text-stone-300">•</span>
                <span>Canva</span>
                <span className="text-stone-300">•</span>
                <span>Blender 3D</span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <Link
                href="/contact?subject=Creative%20Design%20%26%203D%20Order"
                className="rounded-full bg-neutral-950 px-6 py-3 text-center text-xs font-black text-white shadow-lg transition hover:bg-neutral-800 hover:scale-105"
              >
                Hire for Project ✉️
              </Link>

              <Link
                href="/portfolio"
                className="rounded-full border border-stone-300 bg-white/90 backdrop-blur-md px-5 py-3 text-center text-xs font-bold text-neutral-800 shadow-xs transition hover:border-neutral-400 hover:bg-white"
              >
                Explore 3D Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Normal Photo Editing & Artwork Gallery Grid */}
      <PhotoEditingGrid initialWorks={works} />
    </main>
  );
}

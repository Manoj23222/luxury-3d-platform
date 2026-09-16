"use client";

import { useMemo, useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import PhotoWorkModal, { PhotoWorkItem } from "./PhotoWorkModal";

interface PhotoEditingGridProps {
  initialWorks: PhotoWorkItem[];
}

const PRESET_CATEGORIES = [
  "Background change & Resize",
  "White background & Resize",
  "Product Retouching",
  "Fashion & Portrait",
  "Color Grading",
  "Photo Manipulation",
  "Jewelry & Luxury",
  "Real Estate & HDR",
  "Background Replacement",
];

export default function PhotoEditingGrid({
  initialWorks,
}: PhotoEditingGridProps) {
  const [works] = useState<PhotoWorkItem[]>(initialWorks);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWork, setActiveWork] = useState<PhotoWorkItem | null>(null);

  // Dynamically compute all categories including custom added categories
  const categories = useMemo(() => {
    const fromWorks = works
      .map((x) => x.category)
      .filter((x): x is string => Boolean(x) && x.trim().length > 0);
    return ["All", ...Array.from(new Set([...PRESET_CATEGORIES, ...fromWorks]))];
  }, [works]);

  const filteredWorks = useMemo(() => {
    let result = [...works];

    if (selectedCategory !== "All") {
      result = result.filter(
        (item) =>
          item.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [works, selectedCategory, searchQuery]);

  return (
    <>
      {/* Category Pills & Search */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Category Filter Pills (Auto-updates with Custom Categories) */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: selectedCategory === cat ? "#000000" : "#ffffff",
                  color: selectedCategory === cat ? "#ffffff" : "#404040",
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition shadow-xs cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:border-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-64 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search retouching..."
              className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
          <span>
            Showing <b>{filteredWorks.length}</b> photo editing showcases
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-black underline font-semibold cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </section>

      {/* Grid of Photo Editing Showcases - Compact, Tightly Spaced & Image-Dominant */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredWorks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-bold text-black">No photo works found</p>
            <p className="mt-2 text-sm text-neutral-500">
              Try adjusting your category filter or search terms.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredWorks.map((work) => (
              <article
                key={work._id}
                className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white p-2.5 sm:p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Before/After Interactive Slider with Mouse Follow & Full Image Contain */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950">
                  <BeforeAfterSlider
                    beforeImage={work.beforeImage}
                    afterImage={work.afterImage}
                    aspectRatio="aspect-[4/3]"
                    fitMode="contain"
                    enableAutoScan={true}
                  />

                  {/* Discrete Lightbox Fullscreen Trigger on Image Corner */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveWork(work);
                    }}
                    title="Open Fullscreen Lightbox"
                    className="absolute right-2.5 bottom-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md opacity-80 transition hover:opacity-100 hover:scale-110 hover:bg-black cursor-pointer shadow-md"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>

                {/* Compact Card Details: Small tight typography, clean category & resolution badges */}
                <div className="mt-2.5 flex flex-col gap-1 px-1 pb-1">
                  {/* Category & Resolution / Dimensions Row */}
                  <div className="flex items-center justify-between gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-700">
                        {work.category}
                      </span>
                      {work.resolution && (
                        <span className="rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-neutral-600">
                          {work.resolution}
                        </span>
                      )}
                    </div>

                    {work.featured && (
                      <span className="rounded-md bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 text-[9.5px] font-black uppercase text-amber-800">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Compact Title */}
                  <h3
                    onClick={() => setActiveWork(work)}
                    className="mt-0.5 line-clamp-1 text-xs sm:text-sm font-bold text-black group-hover:text-neutral-700 cursor-pointer transition"
                  >
                    {work.title}
                  </h3>

                  {/* Compact Description */}
                  <p className="line-clamp-1 text-[11px] leading-tight text-neutral-500">
                    {work.shortDescription || work.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Detail Lightbox Modal */}
      <PhotoWorkModal
        work={activeWork}
        onClose={() => setActiveWork(null)}
      />
    </>
  );
}

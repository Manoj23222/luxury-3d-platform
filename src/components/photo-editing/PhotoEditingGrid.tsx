"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";

export type PhotoWorkItem = {
  _id: string;
  title: string;
  slug?: string;
  workType?: "before_after" | "banner" | "single";
  category: string;
  shortDescription?: string;
  description?: string;
  beforeImage?: string;
  afterImage: string;
  thumbnail?: string;
  softwareUsed?: string[];
  resolution?: string;
  clientName?: string;
  projectYear?: string;
  tags?: string[];
  featured?: boolean;
  views?: number;
  likes?: number;
};

interface PhotoEditingGridProps {
  initialWorks: PhotoWorkItem[];
}

export default function PhotoEditingGrid({ initialWorks }: PhotoEditingGridProps) {
  const [works, setWorks] = useState<PhotoWorkItem[]>(initialWorks || []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fetch latest uploaded photos on mount
  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.works) && data.works.length > 0) {
          // Merge newly fetched DB works with initial fallbacks
          const dbIds = new Set(data.works.map((w: PhotoWorkItem) => w._id));
          const uniqueInitial = initialWorks.filter((w) => !dbIds.has(w._id));
          setWorks([...data.works, ...uniqueInitial]);
        }
      })
      .catch(() => {});
  }, [initialWorks]);

  // Extract all categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    works.forEach((w) => {
      if (w.category && w.category.trim()) {
        set.add(w.category.trim());
      }
    });
    return ["All", "Before & After", "Single Artworks", ...Array.from(set)];
  }, [works]);

  // Filtered works based on selected category
  const filteredWorks = useMemo(() => {
    if (selectedCategory === "All") return works;
    if (selectedCategory === "Before & After") {
      return works.filter((w) => {
        const hasBefore = Boolean(w.beforeImage && w.beforeImage.trim());
        const isNotSame = w.beforeImage !== w.afterImage;
        return (w.workType === "before_after" || hasBefore) && isNotSame;
      });
    }
    if (selectedCategory === "Single Artworks") {
      return works.filter((w) => {
        if (w.workType === "single" || w.workType === "banner") return true;
        if (!w.beforeImage || !w.beforeImage.trim()) return true;
        return w.beforeImage === w.afterImage;
      });
    }
    return works.filter((w) => w.category === selectedCategory);
  }, [works, selectedCategory]);

  // Lightbox navigation
  const activeItem = lightboxIndex !== null ? filteredWorks[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredWorks.length : null));
  }, [lightboxIndex, filteredWorks.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredWorks.length) % filteredWorks.length : null
    );
  }, [lightboxIndex, filteredWorks.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  // Lock scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section className="relative w-full bg-[#faf8f5] px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ========================================================= */}
        {/* FILTER CATEGORY PILLS BAR                                 */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white shadow-sm"
                      : "bg-white/80 text-stone-600 border border-stone-200/90 hover:bg-white hover:text-neutral-950"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono font-medium text-stone-500 shrink-0">
            {filteredWorks.length} Photographs / Artworks
          </span>
        </div>

        {/* ========================================================= */}
        {/* NORMAL CLEAN IMAGE GALLERY GRID (BINA DETAILS KE)         */}
        {/* ========================================================= */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, idx) => {
              const displayImg = work.afterImage || work.thumbnail || work.beforeImage || "";
              const hasBeforeAfter =
                Boolean(work.beforeImage && work.beforeImage.trim()) &&
                work.beforeImage !== work.afterImage;

              return (
                <motion.div
                  key={work._id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-[3/4] sm:aspect-[4/5] cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-stone-200/80 bg-stone-100 shadow-xs hover:shadow-xl transition-all duration-300"
                >
                  {/* Clean Gallery Image Tile */}
                  <img
                    src={displayImg}
                    alt={work.title || "Photo Artwork"}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Clean Subtle Top-Right Badge for Before/After Items */}
                  {hasBeforeAfter && (
                    <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white border border-white/20">
                      Before / After
                    </div>
                  )}

                  {/* Hover Overlay with Clean Zoom Indicator */}
                  <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-950 shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* FULL-SCREEN CLEAN LIGHTBOX MODAL                         */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 select-none"
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-50 text-white">
              <span className="text-xs font-mono tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                {lightboxIndex + 1} / {filteredWorks.length}
              </span>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white transition-colors cursor-pointer text-lg"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>

            {/* Navigation Previous Button */}
            {filteredWorks.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white transition-all cursor-pointer text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Main Lightbox Content Area */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] lg:max-w-5xl w-full flex items-center justify-center"
            >
              {activeItem.beforeImage &&
              activeItem.afterImage &&
              activeItem.beforeImage !== activeItem.afterImage ? (
                /* Interactive Before & After Split Slider in Fullscreen */
                <div className="w-full max-w-4xl aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                  <BeforeAfterSlider
                    beforeImage={activeItem.beforeImage}
                    afterImage={activeItem.afterImage}
                    beforeLabel="ORIGINAL RAW"
                    afterLabel="POLISHED RETOUCH"
                    fitMode="contain"
                    showFitToggle={true}
                    className="h-full w-full"
                  />
                </div>
              ) : (
                /* High-Res Single Image View */
                <div className="relative max-h-[85vh] w-auto flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-white/15 bg-black/40">
                  <img
                    src={activeItem.afterImage || activeItem.thumbnail || activeItem.beforeImage}
                    alt={activeItem.title || "Full Artwork"}
                    className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-2xl"
                  />
                </div>
              )}
            </div>

            {/* Navigation Next Button */}
            {filteredWorks.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white transition-all cursor-pointer text-xl"
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

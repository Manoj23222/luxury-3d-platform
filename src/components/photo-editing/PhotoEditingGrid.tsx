"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const SOFTWARE_TABS = [
  { id: "all", label: "All", badge: "✦" },
  { id: "photoshop", label: "Adobe Photoshop", badge: "Ps" },
  { id: "illustrator", label: "Adobe Illustrator", badge: "Ai" },
  { id: "canva", label: "Canva", badge: "C" },
  { id: "blender", label: "Blender", badge: "3D" },
] as const;

type SoftwareTabId = (typeof SOFTWARE_TABS)[number]["id"];

export default function PhotoEditingGrid({ initialWorks }: PhotoEditingGridProps) {
  const [works, setWorks] = useState<PhotoWorkItem[]>(initialWorks || []);
  const [selectedTab, setSelectedTab] = useState<SoftwareTabId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fetch latest uploaded photos on mount
  useEffect(() => {
    fetch("/api/photo-works")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.works) && data.works.length > 0) {
          const dbIds = new Set(data.works.map((w: PhotoWorkItem) => w._id));
          const uniqueInitial = initialWorks.filter((w) => !dbIds.has(w._id));
          setWorks([...data.works, ...uniqueInitial]);
        }
      })
      .catch(() => {});
  }, [initialWorks]);

  // Filtered works based on the selected software tab
  const filteredWorks = useMemo(() => {
    if (selectedTab === "all") {
      // Show all Photoshop, Illustrator, and Blender works
      return works.filter((w) => {
        const sw = (w.softwareUsed || []).map((s) => s.toLowerCase());
        return !sw.includes("canva") || sw.includes("photoshop");
      });
    }

    if (selectedTab === "canva") {
      // Canva is empty as explicitly requested: "Canva - emty"
      return [];
    }

    return works.filter((w) => {
      const sw = (w.softwareUsed || []).map((s) => s.toLowerCase());
      const cat = (w.category || "").toLowerCase();
      const tags = (w.tags || []).join(" ").toLowerCase();
      const title = (w.title || "").toLowerCase();
      const img = (w.afterImage || w.thumbnail || "").toLowerCase();

      if (selectedTab === "photoshop") {
        const isAi = img.includes("illustrator");
        const isBlend = sw.some((s) => s.includes("blender")) || cat.includes("3d") || img.includes("blender") || Boolean((w as any).modelUrl);
        if (isAi || isBlend) return false;

        const hasPhotoshop = sw.some(
          (s) =>
            s.includes("photoshop") ||
            s.includes("lightroom") ||
            s.includes("capture one") ||
            s.includes("retouch")
        );
        return (
          hasPhotoshop ||
          w.workType === "before_after" ||
          cat.includes("retouch") ||
          cat.includes("background") ||
          cat.includes("grading") ||
          cat.includes("portrait") ||
          cat.includes("fashion") ||
          tags.includes("retouch") ||
          title.includes("retouch")
        );
      }

      if (selectedTab === "illustrator") {
        // Only images from /public/illustrator
        const isAiImg = img.includes("illustrator");
        const hasIllustrator = sw.some((s) => s.includes("illustrator"));
        return isAiImg || hasIllustrator;
      }

      if (selectedTab === "blender") {
        // All 3D Models from /portfolio and Blender renders
        const hasBlender = sw.some((s) => s.includes("blender") || s.includes("3d"));
        const hasModelUrl = Boolean((w as any).modelUrl);
        const isBlendImg =
          img.includes("blender") ||
          img.includes("cloudinary") ||
          img.includes("burger") ||
          img.includes("aura") ||
          img.includes("34.png") ||
          img.includes("ice.png") ||
          img.includes("123.png");

        return (
          hasBlender ||
          hasModelUrl ||
          isBlendImg ||
          cat.includes("3d") ||
          cat.includes("models") ||
          cat.includes("cgi") ||
          tags.includes("3d") ||
          tags.includes("blender")
        );
      }

      return true;
    });
  }, [works, selectedTab]);

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
    <section className="relative w-full bg-[#faf8f5] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ========================================================= */}
        {/* EXACT SOFTWARE TABS (All, Photoshop, Illustrator, Canva, Blender) */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center border-b border-stone-200/80 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {SOFTWARE_TABS.map((tab) => {
              const isSelected = selectedTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white shadow-md scale-[1.02]"
                      : "bg-white/90 text-stone-700 border border-stone-300/80 hover:bg-white hover:border-neutral-400 hover:text-neutral-950 shadow-2xs"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-mono font-black ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-stone-100 text-stone-800 border border-stone-200"
                    }`}
                  >
                    {tab.badge}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* NORMAL CLEAN IMAGE GALLERY GRID (BINA DETAILS KE)         */}
        {/* ========================================================= */}
        {filteredWorks.length === 0 ? (
          <div className="py-24 text-center rounded-3xl border border-dashed border-stone-300 bg-white/50 backdrop-blur-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-500 border border-stone-200 text-xl font-bold font-mono">
              C
            </div>
            <h3 className="mt-4 text-base font-bold text-neutral-800">Canva Projects</h3>
            <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto">
              No Canva projects uploaded yet.
            </p>
          </div>
        ) : (
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
        )}
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

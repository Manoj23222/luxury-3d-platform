"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

const Luxury3DShowroom = dynamic(
  () => import("@/components/3d/Luxury3DShowroom"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] min-h-[460px] w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#08080c] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        <span className="mt-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
          Loading 3D WebGL Scene...
        </span>
      </div>
    ),
  }
);

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
  modelUrl?: string;
  isPortfolio3D?: boolean;
  serialNumber?: number;
  displayOrder?: number;
  createdAt?: string;
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
  const [works, setWorks] = useState<PhotoWorkItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("admin_deleted_assets") || "[]");
        if (Array.isArray(stored) && stored.length > 0) {
          const delSet = new Set(stored.map((s: string) => String(s).toLowerCase().trim()));
          return (initialWorks || []).filter((w) => {
            const rawId = String(w._id).toLowerCase();
            const cleanId = rawId.replace(/^prod-/, "");
            const title = String(w.title || "").toLowerCase().trim();
            return !delSet.has(rawId) && !delSet.has(cleanId) && !delSet.has(`prod-${cleanId}`) && !delSet.has(title);
          });
        }
      } catch {}
    }
    return initialWorks || [];
  });

  const [selectedTab, setSelectedTab] = useState<SoftwareTabId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"3d" | "render">("3d");

  // Restore saved tab on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const urlTab = p.get("tab");
    const saved = localStorage.getItem("portfolio_tab");
    const target = urlTab || saved;
    if (
      target === "photoshop" ||
      target === "illustrator" ||
      target === "canva" ||
      target === "blender" ||
      target === "all"
    ) {
      setSelectedTab(target as SoftwareTabId);
    }
  }, []);

  const handleTabClick = (tabId: SoftwareTabId) => {
    setSelectedTab(tabId);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_tab", tabId);
      const url = new URL(window.location.href);
      if (tabId === "all") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tabId);
      }
      window.history.replaceState(null, "", url.pathname + (url.search ? url.search : ""));
    }
  };

  // Fetch latest uploaded photos on mount
  useEffect(() => {
    fetch(`/api/photo-works?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.works) && data.works.length > 0) {
          let list = data.works;
          if (typeof window !== "undefined") {
            try {
              const stored = JSON.parse(localStorage.getItem("admin_deleted_assets") || "[]");
              if (Array.isArray(stored) && stored.length > 0) {
                const delSet = new Set(stored.map((s: string) => String(s).toLowerCase().trim()));
                list = list.filter((w: any) => {
                  const rawId = String(w._id).toLowerCase();
                  const cleanId = rawId.replace(/^prod-/, "");
                  const title = String(w.title || "").toLowerCase().trim();
                  return !delSet.has(rawId) && !delSet.has(cleanId) && !delSet.has(`prod-${cleanId}`) && !delSet.has(title);
                });
              }
            } catch {}
          }
          setWorks(list);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered works based on the selected software tab
  const filteredWorks = useMemo(() => {
    const list =
      selectedTab === "all"
        ? works
        : works.filter((w) => {
            const sw = (w.softwareUsed || []).map((s) => s.toLowerCase());
            const cat = (w.category || "").toLowerCase();
            const tags = (w.tags || []).join(" ").toLowerCase();
            const title = (w.title || "").toLowerCase();
            const img = (w.afterImage || w.thumbnail || "").toLowerCase();

            if (selectedTab === "canva") {
              return (
                sw.some((s) => s.includes("canva")) ||
                cat.includes("canva") ||
                tags.includes("canva") ||
                title.includes("canva")
              );
            }

            if (selectedTab === "illustrator") {
              return (
                sw.some((s) => s.includes("illustrator") || s.includes("vector")) ||
                cat.includes("illustrator") ||
                cat.includes("vector") ||
                cat.includes("typography") ||
                tags.includes("illustrator") ||
                tags.includes("vector") ||
                img.includes("illustrator-previews") ||
                img.includes("/illustrator/") ||
                w._id.startsWith("ai-")
              );
            }

            if (selectedTab === "photoshop") {
              const isAi =
                sw.some((s) => s.includes("illustrator")) ||
                (cat.includes("illustrator") && !sw.some((s) => s.includes("photoshop")));
              const isCanva =
                sw.some((s) => s.includes("canva")) ||
                (cat.includes("canva") && !sw.some((s) => s.includes("photoshop")));
              if (isAi || isCanva) return false;

              const hasPhotoshop = sw.some(
                (s) =>
                  s.includes("photoshop") ||
                  s.includes("lightroom") ||
                  s.includes("capture one") ||
                  s.includes("retouch")
              );
              if (hasPhotoshop) return true;

              if (sw.some((s) => s.includes("blender"))) return false;

              return (
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

            if (selectedTab === "blender") {
              const hasBlender = sw.some((s) => s.includes("blender"));
              const hasAdobe = sw.some(
                (s) =>
                  s.includes("photoshop") ||
                  s.includes("illustrator") ||
                  s.includes("canva")
              );

              if (hasBlender) return true;
              if (hasAdobe) return false;

              return (
                w._id.startsWith("prod-") ||
                Boolean((w as any).isPortfolio3D) ||
                Boolean((w as any).modelUrl) ||
                cat.includes("3d")
              );
            }

            return true;
          });

    return [...list].sort((a, b) => {
      const aSn = Number(a.serialNumber || a.displayOrder || 0);
      const bSn = Number(b.serialNumber || b.displayOrder || 0);
      if (aSn > 0 && bSn > 0) return aSn - bSn;
      if (aSn > 0) return -1;
      if (bSn > 0) return 1;
      return 0;
    });
  }, [works, selectedTab]);

  // Lightbox navigation
  const activeItem = lightboxIndex !== null ? filteredWorks[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const nextIdx = (prev + 1) % filteredWorks.length;
      setViewMode(filteredWorks[nextIdx]?.modelUrl ? "3d" : "render");
      return nextIdx;
    });
  }, [lightboxIndex, filteredWorks]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const nextIdx = (prev - 1 + filteredWorks.length) % filteredWorks.length;
      setViewMode(filteredWorks[nextIdx]?.modelUrl ? "3d" : "render");
      return nextIdx;
    });
  }, [lightboxIndex, filteredWorks]);

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
                  onClick={() => handleTabClick(tab.id)}
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
                const has3DModel = Boolean(work.modelUrl);

                const isIllustrator =
                  displayImg.includes("illustrator-previews") ||
                  displayImg.includes("/illustrator/") ||
                  work._id.startsWith("ai-") ||
                  (work.softwareUsed || []).some((s) => s.toLowerCase().includes("illustrator")) ||
                  selectedTab === "illustrator";

                return (
                  <motion.div
                    key={work._id || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setViewMode(has3DModel ? "3d" : "render");
                    }}
                    className={`group relative ${
                      isIllustrator && selectedTab === "illustrator"
                        ? "aspect-square"
                        : "aspect-[3/4] sm:aspect-[4/5]"
                    } cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-stone-200/80 ${
                      isIllustrator ? "bg-white" : "bg-stone-100"
                    } shadow-xs hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Clean Gallery Image Tile - Correct uncropped scaling for Illustrator */}
                    {isIllustrator ? (
                      <div className="flex h-full w-full items-center justify-center p-3.5 sm:p-5">
                        <img
                          src={displayImg}
                          alt={work.title || "Illustrator Artwork"}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <img
                        src={displayImg}
                        alt={work.title || "Photo Artwork"}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Clean Subtle Top-Right Badge for 3D View or Before/After */}
                    {has3DModel ? (
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white border border-white/20 shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>3D View</span>
                      </div>
                    ) : hasBeforeAfter ? (
                      <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white border border-white/20">
                        Before / After
                      </div>
                    ) : null}

                    {/* Hover Overlay with Clean Zoom / 3D Indicator */}
                    <div className="pointer-events-none absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {has3DModel ? (
                        <div className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-200">
                          <span className="text-sm">🎮</span>
                          <span>Open 3D View</span>
                        </div>
                      ) : (
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
                      )}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-2xl p-2 sm:p-5 select-none"
            style={{
              background:
                "radial-gradient(ellipse 95% 75% at 50% 45%, #ffffff 0%, #faf8f5 55%, #f2eee6 100%)",
            }}
          >
            {/* Top Bar with Counter, 3D Toggle, and Close Button */}
            <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-8 flex items-center justify-between z-50 text-stone-900 gap-2 sm:gap-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-stone-300/80 text-stone-800 shadow-xs">
                {lightboxIndex + 1} / {filteredWorks.length}
              </span>

              {/* 3D Model Toggle Switch if modelUrl exists */}
              {activeItem.modelUrl && (
                <div className="flex items-center gap-1 rounded-full bg-stone-100 p-1 border border-stone-300/80 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setViewMode("3d")}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "3d"
                        ? "bg-neutral-950 text-white shadow-xs scale-102"
                        : "text-stone-600 hover:text-stone-950"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>3D Interactive</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("render")}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "render"
                        ? "bg-neutral-950 text-white shadow-xs scale-102"
                        : "text-stone-600 hover:text-stone-950"
                    }`}
                  >
                    2D Render
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white hover:bg-neutral-950 hover:text-white border border-stone-300/80 text-stone-800 shadow-md transition-colors cursor-pointer text-lg font-bold"
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
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 hover:bg-neutral-950 hover:text-white border border-stone-300/80 text-stone-800 shadow-md transition-all cursor-pointer text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Main Lightbox Content Area */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] max-w-[95vw] lg:max-w-6xl w-full flex items-center justify-center"
            >
              {activeItem.modelUrl && viewMode === "3d" ? (
                /* Interactive 3D WebGL Showroom View in Pure Luxury White Studio */
                <div className="relative w-full max-w-5xl h-[68vh] sm:h-[76vh] max-h-[780px] min-h-[460px] overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] bg-[#faf8f5]">
                  <Luxury3DShowroom
                    url={activeItem.modelUrl}
                    fileName={activeItem.title}
                    category={activeItem.category}
                    projectName={activeItem.title}
                    fallbackImage={activeItem.afterImage || activeItem.thumbnail}
                    className="!h-full !min-h-full !max-h-full"
                    whiteTheme={true}
                  />
                </div>
              ) : activeItem.beforeImage &&
                activeItem.afterImage &&
                activeItem.beforeImage !== activeItem.afterImage ? (
                /* Interactive Before & After Split Slider in Fullscreen with Luxury White Frame */
                <div className="w-full max-w-4xl sm:max-w-5xl aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] bg-white p-1.5 sm:p-2">
                  <BeforeAfterSlider
                    beforeImage={activeItem.beforeImage}
                    afterImage={activeItem.afterImage}
                    beforeLabel="ORIGINAL RAW"
                    afterLabel="POLISHED RETOUCH"
                    fitMode="contain"
                    showFitToggle={true}
                    className="h-full w-full !rounded-xl sm:!rounded-2xl"
                  />
                </div>
              ) : (
                /* High-Res Single Image View with Luxury White Frame */
                <div className="relative max-h-[85vh] w-auto flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] border border-stone-200/90 bg-white p-3 sm:p-5">
                  <img
                    src={activeItem.afterImage || activeItem.thumbnail || activeItem.beforeImage}
                    alt={activeItem.title || "Full Artwork"}
                    className="max-h-[80vh] max-w-[86vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl"
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
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 hover:bg-neutral-950 hover:text-white border border-stone-300/80 text-stone-800 shadow-md transition-all cursor-pointer text-xl"
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

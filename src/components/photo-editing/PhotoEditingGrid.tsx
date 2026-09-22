"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import PhotoWorkModal, { PhotoWorkItem } from "./PhotoWorkModal";

interface PhotoEditingGridProps {
  initialWorks: PhotoWorkItem[];
}

// Individual Living Canvas Image Card
function LivingCanvasImage({
  work,
  index,
  isHovered,
  hasAnyHovered,
  isSpotlight,
  onHover,
  onLeave,
  onClick,
  isReducedMotion,
}: {
  work: PhotoWorkItem;
  index: number;
  isHovered: boolean;
  hasAnyHovered: boolean;
  isSpotlight: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: () => void;
  isReducedMotion: boolean | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollYOffset, setScrollYOffset] = useState(0);

  // Column index (0, 1, 2, 3) for controlled directional reveal
  const colIndex = index % 4;

  // Controlled Reveal Direction Pattern:
  // Col 0: slight upward reveal
  // Col 1: slight downward reveal
  // Col 2: slight upward + tiny rotate (1.2deg)
  // Col 3: slight downward + tiny rotate (-1.2deg)
  const initialVariants = useMemo(() => {
    if (isReducedMotion) {
      return { opacity: 0, scale: 1, y: 0, rotate: 0 };
    }
    if (colIndex === 0) {
      return {
        opacity: 0,
        scale: 0.92,
        y: 35,
        rotate: 0,
        clipPath: "inset(8% 8% 8% 8% round 26px)",
      };
    }
    if (colIndex === 1) {
      return {
        opacity: 0,
        scale: 0.92,
        y: -25,
        rotate: 0,
        clipPath: "inset(8% 8% 8% 8% round 26px)",
      };
    }
    if (colIndex === 2) {
      return {
        opacity: 0,
        scale: 0.92,
        y: 30,
        rotate: 1.2,
        clipPath: "inset(8% 8% 8% 8% round 26px)",
      };
    }
    return {
      opacity: 0,
      scale: 0.92,
      y: -20,
      rotate: -1.2,
      clipPath: "inset(8% 8% 8% 8% round 26px)",
    };
  }, [colIndex, isReducedMotion]);

  // Subtle Scroll Parallax (moves inside the stable frame -6px to +6px)
  useEffect(() => {
    if (isReducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      const delta = (cardCenter - viewportCenter) / window.innerHeight; // -1 to 1 approx
      const clampedOffset = Math.max(-8, Math.min(8, delta * 14));
      setScrollYOffset(clampedOffset);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // Desktop 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xNorm = (x / rect.width - 0.5) * 2; // -1 to 1
      const yNorm = (y / rect.height - 0.5) * 2;

      // Max: rotateX 2deg, rotateY 3deg
      setTilt({
        x: -yNorm * 2.0,
        y: xNorm * 3.0,
      });
    },
    [isReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    onHover(work._id);
  }, [onHover, work._id]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  }, [onLeave]);

  const isBeforeAfter =
    (work.workType === "before_after" || !work.workType) &&
    Boolean(work.beforeImage) &&
    work.beforeImage !== work.afterImage;

  return (
    <motion.div
      ref={containerRef}
      layout
      initial={initialVariants}
      whileInView={{
        opacity: hasAnyHovered && !isHovered ? 0.94 : 1,
        scale: isHovered ? 1.025 : isSpotlight ? 1.015 : hasAnyHovered ? 0.995 : 1,
        y: 0,
        rotate: 0,
        clipPath: "inset(0% 0% 0% 0% round 26px)",
      }}
      viewport={{ once: false, amount: 0.15 }}
      exit={{
        opacity: 0,
        scale: 0.92,
        clipPath: "inset(6% 6% 6% 6% round 26px)",
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      transition={{
        layout: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.65 },
        scale: { duration: 0.45, ease: "easeOut" },
        clipPath: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 },
      }}
      style={{
        perspective: "1000px",
        zIndex: isHovered ? 20 : isSpotlight ? 10 : 1,
      }}
      className="group relative select-none cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* 1. "IMAGE ECHO" / PHOTOGRAPHIC EXPOSURE TRAIL */}
      <div
        className={`pointer-events-none absolute -inset-1 rounded-[30px] bg-white/10 blur-md transition-all duration-700 ease-out ${
          isHovered
            ? "opacity-35 scale-105"
            : isSpotlight
            ? "opacity-20 scale-102"
            : "opacity-0 scale-95"
        }`}
      />

      {/* 2. LIVING CANVAS 3D TILT CONTAINER */}
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[26px] border bg-neutral-900 shadow-xl backdrop-blur-2xl transition-all duration-500 ease-out ${
          isHovered
            ? "border-white/40 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.85)]"
            : isSpotlight
            ? "border-white/25 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.7)]"
            : "border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:border-white/30"
        }`}
        style={{
          transform:
            !isReducedMotion && isHovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
          filter: isSpotlight
            ? "contrast(104%) brightness(103%)"
            : "contrast(100%) brightness(100%)",
        }}
      >
        {/* Animated Accent Border Perimeter Light on Spotlight / Hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[26px] border border-white/30 transition-opacity duration-700 ${
            isHovered || isSpotlight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 3. MEDIA: BEFORE/AFTER SLIDER OR PURE CANVAS ARTWORK */}
        {isBeforeAfter ? (
          <div className="relative h-full w-full overflow-hidden">
            <BeforeAfterSlider
              beforeImage={work.beforeImage!}
              afterImage={work.afterImage}
              aspectRatio="aspect-[4/3]"
              fitMode="cover"
              enableAutoScan={true}
              className="rounded-[26px]"
            />
          </div>
        ) : (
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={work.afterImage || work.thumbnail}
              alt="Artwork"
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 will-change-transform"
              style={{
                transform: !isReducedMotion
                  ? `translateY(${scrollYOffset}px)`
                  : "none",
              }}
            />
          </div>
        )}

        {/* 4. STUDIO LIGHT DIAGONAL REFLECTION SWEEP ON HOVER */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-transform duration-800 ease-out group-hover:translate-x-full" />

        {/* 5. VIGNETTE CINEMATIC OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>
    </motion.div>
  );
}

export default function PhotoEditingGrid({
  initialWorks,
}: PhotoEditingGridProps) {
  const [works] = useState<PhotoWorkItem[]>(initialWorks);
  const [activeWork, setActiveWork] = useState<PhotoWorkItem | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  const isReducedMotion = useReducedMotion();

  // Extract Categories Dynamically
  const categories = useMemo(() => {
    const list = works
      .map((x) => x.category)
      .filter((x): x is string => Boolean(x) && x !== "Free" && x !== "Paid");
    return ["All", ...Array.from(new Set(list))];
  }, [works]);

  // Filtered Artworks
  const filteredWorks = useMemo(() => {
    let list = [...works];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (x) =>
          x.title?.toLowerCase().includes(q) ||
          x.description?.toLowerCase().includes(q) ||
          x.category?.toLowerCase().includes(q) ||
          x.tags?.join(" ").toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      list = list.filter(
        (x) =>
          String(x.category || "").toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    return list;
  }, [works, search, selectedCategory]);

  return (
    <>
      {/* ================= CATEGORY FILTERS & SEARCH BAR (LUXURY DARK GLASS) ================= */}
      <section className="sticky top-16 z-20 border-b border-white/10 bg-[#070709]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Horizontal Category Filter Pills */}
          <div className="flex w-full sm:w-auto items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 active:scale-95 ${
                    isSelected
                      ? "text-neutral-950"
                      : "text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activePhotoCategoryPill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-white shadow-md"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 group shrink-0">
            <input
              type="text"
              placeholder="Search visual gallery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/5 backdrop-blur-md py-2 pl-9 pr-8 text-xs font-semibold text-white placeholder-neutral-400 shadow-sm transition-all duration-300 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:scale-[1.01] focus:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400 transition-colors group-focus-within:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-neutral-300 hover:bg-white hover:text-black transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= PURE VISUAL KINETIC IMAGE GALLERY (4 COLUMNS) ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredWorks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-14 text-center shadow-xs"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-neutral-300">
              🖼️
            </div>
            <p className="mt-4 text-base font-bold text-white">
              No artworks match your search
            </p>
            <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
              Try adjusting your search terms or select another category filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-neutral-200"
            >
              Reset Gallery Filters
            </button>
          </motion.div>
        ) : (
          /* 4-Column Responsive Living Canvas Exhibition Grid */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work, index) => (
                <LivingCanvasImage
                  key={work._id}
                  work={work}
                  index={index}
                  isHovered={hoveredId === work._id}
                  hasAnyHovered={hoveredId !== null}
                  isSpotlight={spotlightId === work._id}
                  onHover={(id) => setHoveredId(id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => setActiveWork(work)}
                  isReducedMotion={isReducedMotion}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* High-Resolution Artwork Lightbox Modal */}
      <PhotoWorkModal
        work={activeWork}
        onClose={() => setActiveWork(null)}
      />
    </>
  );
}

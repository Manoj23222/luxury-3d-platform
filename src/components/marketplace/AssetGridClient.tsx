"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Asset {
  _id: string;
  name: string;
  category?: string;
  description?: string;
  thumbnail?: string;
  galleryImages?: string[];
  modelUrl?: string;
  views?: number;
  tags?: string[];
  createdAt?: string;
}

// Category Specific Luxury Accents (Border, Glows, Badges)
function getCategoryAccent(category: string = "") {
  const cat = category.toLowerCase();
  if (cat.includes("fashion") || cat.includes("apparel") || cat.includes("clothing") || cat.includes("clo")) {
    return {
      border: "border-rose-500/30 group-hover:border-rose-400/90",
      glow: "rgba(244, 63, 94, 0.3)",
      glowClass: "group-hover:shadow-[0_20px_55px_rgba(244,63,94,0.25)]",
      indicator: "bg-rose-400",
      name: "Fashion & Apparel",
    };
  }
  if (cat.includes("electronic") || cat.includes("device") || cat.includes("gadget") || cat.includes("tech")) {
    return {
      border: "border-blue-500/30 group-hover:border-blue-400/90",
      glow: "rgba(59, 130, 246, 0.3)",
      glowClass: "group-hover:shadow-[0_20px_55px_rgba(59,130,246,0.25)]",
      indicator: "bg-blue-400",
      name: "Electronics",
    };
  }
  if (cat.includes("furniture") || cat.includes("interior") || cat.includes("wood") || cat.includes("home")) {
    return {
      border: "border-amber-500/30 group-hover:border-amber-400/90",
      glow: "rgba(245, 158, 11, 0.3)",
      glowClass: "group-hover:shadow-[0_20px_55px_rgba(245,158,11,0.25)]",
      indicator: "bg-amber-400",
      name: "Furniture & Decor",
    };
  }
  if (cat.includes("book") || cat.includes("note") || cat.includes("editorial") || cat.includes("print")) {
    return {
      border: "border-purple-500/30 group-hover:border-purple-400/90",
      glow: "rgba(168, 85, 247, 0.3)",
      glowClass: "group-hover:shadow-[0_20px_55px_rgba(168,85,247,0.25)]",
      indicator: "bg-purple-400",
      name: "Editorial & Books",
    };
  }
  if (cat.includes("apple") || cat.includes("mac") || cat.includes("iphone")) {
    return {
      border: "border-neutral-400/30 group-hover:border-neutral-200/90",
      glow: "rgba(226, 232, 240, 0.25)",
      glowClass: "group-hover:shadow-[0_20px_55px_rgba(226,232,240,0.2)]",
      indicator: "bg-neutral-300",
      name: "Apple Products",
    };
  }
  // Default / 3D Visualization / CGI
  return {
    border: "border-emerald-500/30 group-hover:border-emerald-400/90",
    glow: "rgba(16, 185, 129, 0.3)",
    glowClass: "group-hover:shadow-[0_20px_55px_rgba(16,185,129,0.25)]",
    indicator: "bg-emerald-400",
    name: category || "3D Visualization",
  };
}

// Individual 3D Interactive Pure Image Card Component
function PortfolioCard({
  item,
  index,
  isHovered,
  hasAnyHovered,
  onHover,
  onLeave,
  isReducedMotion,
}: {
  item: Asset;
  index: number;
  isHovered: boolean;
  hasAnyHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  isReducedMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const accent = useMemo(() => getCategoryAccent(item.category), [item.category]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
      const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

      // Physical 3D tilt
      setTilt({
        x: -yPct * 4.2,
        y: xPct * 4.2,
      });
    },
    [isReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    onHover(item._id);
  }, [onHover, item._id]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  }, [onLeave]);

  // Subtle entrance rotation variation
  const entryRotation = index % 3 === 0 ? 0.3 : index % 3 === 1 ? -0.3 : 0;

  return (
    <motion.div
      layout
      initial={
        isReducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 28,
              scale: 0.96,
              rotateZ: entryRotation,
            }
      }
      animate={{
        opacity: hasAnyHovered && !isHovered ? 0.93 : 1,
        y: 0,
        scale: isHovered ? 1.03 : hasAnyHovered ? 0.995 : 1,
        rotateZ: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.93,
        transition: { duration: 0.28, ease: "easeInOut" },
      }}
      transition={{
        layout: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.4 },
        y: { duration: 0.45, delay: Math.min((index % 12) * 0.05, 0.45) },
        scale: { duration: 0.35, ease: "easeOut" },
      }}
      style={{
        perspective: "900px",
        zIndex: isHovered ? 20 : 1,
      }}
      className="relative"
    >
      <Link
        ref={cardRef}
        href={`/portfolio/${item._id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group block relative aspect-square w-full overflow-hidden rounded-2xl border ${
          accent.border
        } bg-neutral-900/90 shadow-md backdrop-blur-xl transition-all duration-500 ease-out focus:outline-none ${
          isHovered
            ? `shadow-[0_20px_50px_-10px_${accent.glow}]`
            : "shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-2xl"
        }`}
        style={{
          transform:
            !isReducedMotion && isHovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Full Image Container */}
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.name || "3D Project"}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 will-change-transform"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-500 bg-neutral-900">
            <span className="text-2xl">🏺</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              No Preview
            </span>
          </div>
        )}

        {/* Studio Light / Diagonal Reflection Sweep on Hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

        {/* Ambient Hover Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Optional 3D Room Live Indicator Pill */}
        {item.modelUrl && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-white backdrop-blur-md uppercase border border-white/15 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D Room</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default function AssetGridClient({ assets }: { assets: Asset[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Hero Mouse Parallax
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const isReducedMotion = useReducedMotion();

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isReducedMotion || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
      setHeroMouse({
        x: xNorm * 18,
        y: yNorm * 14,
      });
    },
    [isReducedMotion]
  );

  const handleHeroMouseLeave = useCallback(() => {
    setHeroMouse({ x: 0, y: 0 });
  }, []);

  const categories = useMemo(() => {
    const list = assets
      .map((x) => x.category)
      .filter((x): x is string => Boolean(x) && x !== "Free" && x !== "Paid");
    return ["All", ...Array.from(new Set(list))];
  }, [assets]);

  const filteredAssets = useMemo(() => {
    let data = [...assets];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (x) =>
          x.name?.toLowerCase().includes(q) ||
          x.description?.toLowerCase().includes(q) ||
          x.category?.toLowerCase().includes(q) ||
          x.tags?.join(" ").toLowerCase().includes(q)
      );
    }

    if (filter !== "All") {
      data = data.filter(
        (x) => String(x.category || "").toLowerCase() === filter.toLowerCase()
      );
    }

    if (sort === "Most Viewed") {
      data.sort((a, b) => Number(b.views || 0) - Number(a.views || 0));
    } else if (sort === "Name A-Z") {
      data.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    } else {
      data.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }

    return data;
  }, [assets, search, filter, sort]);

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* ================= 1. LUXURY 3D PORTFOLIO HERO WITH CINEMATIC PARALLAX ================= */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative overflow-hidden border-b border-white/10 bg-[#070709] pt-28 pb-14 text-white"
      >
        {/* Layer 1: Background Banner Image with Dark Luxury Grading */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="h-full w-full transition-transform duration-300 ease-out"
            style={{
              transform: !isReducedMotion
                ? `translate3d(${-heroMouse.x * 0.8}px, ${-heroMouse.y * 0.8}px, 0) scale(1.08)`
                : "scale(1)",
            }}
          >
            <img
              src="/portfolio-3d-hero-banner.png"
              alt="Luxury 3D Archive Banner"
              className="h-full w-full object-cover object-center opacity-40 filter brightness-75 contrast-125"
            />
          </div>
          {/* Gradients to Blend Seamlessly into Luxury Dark Obsidian Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/90 via-transparent to-[#070709]/90" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div
          className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-[120px] transition-transform duration-500 ease-out"
          style={{
            transform: !isReducedMotion
              ? `translate3d(${heroMouse.x * 1.2}px, ${heroMouse.y * 1.2}px, 0)`
              : "none",
          }}
        />
        <div
          className="pointer-events-none absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] transition-transform duration-500 ease-out"
          style={{
            transform: !isReducedMotion
              ? `translate3d(${-heroMouse.x * 1.0}px, ${-heroMouse.y * 1.0}px, 0)`
              : "none",
          }}
        />

        {/* Cyber Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Left Content Area */}
            <div
              className="max-w-2xl transition-transform duration-300 ease-out"
              style={{
                transform: !isReducedMotion
                  ? `translate3d(${heroMouse.x * 0.4}px, ${heroMouse.y * 0.3}px, 0)`
                  : "none",
              }}
            >
              {/* Creator Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ashok Meena • 3D Creative Studio</span>
              </motion.div>

              {/* Sub-label */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-neutral-400"
              >
                Luxury 3D Archive
              </motion.p>

              {/* Hero Title with Metallic Luxury Gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 22, letterSpacing: "-0.01em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "-0.03em" }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-1 text-3xl font-black tracking-tight text-white sm:text-5xl"
              >
                3D Portfolio & Models
              </motion.h1>

              {/* Hero Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 text-xs sm:text-sm font-semibold text-neutral-300"
              >
                Explore interactive 3D visualizations, CGI renders, and custom assets.
              </motion.p>

              {/* Skills/Tags Mini Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold text-neutral-300"
              >
                <span className="text-white font-extrabold">Architecture</span>
                <span className="text-neutral-600">•</span>
                <span>Product</span>
                <span className="text-neutral-600">•</span>
                <span>Game Assets</span>
                <span className="text-neutral-600">•</span>
                <span>Interior</span>
                <span className="text-neutral-600">•</span>
                <span>Characters</span>
                <span className="text-neutral-600">•</span>
                <span>3D Fashion</span>
              </motion.div>
            </div>

            {/* Right Side: Search Input & Sort Controls */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5"
            >
              {/* Search Box */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search 3D works..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-56 sm:w-64 rounded-full border border-white/15 bg-white/5 backdrop-blur-md py-2.5 pl-9 pr-8 text-xs font-semibold text-white placeholder-neutral-400 shadow-sm transition-all duration-300 focus:w-64 sm:focus:w-72 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:scale-[1.01] focus:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                />
                <svg
                  className="absolute left-3 top-3 h-4 w-4 text-neutral-400 transition-colors group-focus-within:text-white"
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
                    className="absolute right-3 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-neutral-300 hover:bg-white hover:text-black transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-white/15 bg-[#0f1015] backdrop-blur-md px-4 py-2.5 text-xs font-bold text-neutral-200 shadow-sm transition-all duration-300 hover:border-white/40 focus:border-white/50 focus:outline-none focus:scale-[1.01] focus:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
              >
                <option value="Newest" className="bg-neutral-900 text-white">Newest First</option>
                <option value="Most Viewed" className="bg-neutral-900 text-white">Most Viewed</option>
                <option value="Name A-Z" className="bg-neutral-900 text-white">Name (A-Z)</option>
              </select>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 2. CATEGORY FILTERS PILLS WITH FLIP ANIMATION ================= */}
      <section className="sticky top-16 z-20 border-b border-white/10 bg-[#070709]/90 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3.5 sm:px-6 lg:px-8 scrollbar-none">
          {categories.map((x) => {
            const isSelected = filter === x;
            return (
              <button
                key={x}
                onClick={() => setFilter(x)}
                className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 active:scale-95 ${
                  isSelected
                    ? "text-neutral-950"
                    : "text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {/* FLIP Active Pill Sliding Background */}
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white shadow-md"
                  />
                )}
                <span className="relative z-10">{x}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= 3. PURE IMAGE 3D DIGITAL GALLERY GRID ================= */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Stats */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-semibold text-neutral-400">
            Showing <span className="text-white font-extrabold">{filteredAssets.length}</span>{" "}
            curated 3D works
          </p>

          {filter !== "All" && (
            <button
              onClick={() => setFilter("All")}
              className="text-xs font-bold text-neutral-400 hover:text-white transition-colors"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredAssets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-14 text-center shadow-xs"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-neutral-300">
              🔍
            </div>
            <p className="mt-4 text-base font-bold text-white">No 3D projects found</p>
            <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
              We couldn't find any matching 3D models. Try adjusting your search query or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-5 rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-neutral-200"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          /* Responsive 6-Column Gallery with Pure Image Cards & FLIP Layout */
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredAssets.map((item: Asset, index: number) => (
                <PortfolioCard
                  key={item._id}
                  item={item}
                  index={index}
                  isHovered={hoveredCardId === item._id}
                  hasAnyHovered={hoveredCardId !== null}
                  onHover={(id) => setHoveredCardId(id)}
                  onLeave={() => setHoveredCardId(null)}
                  isReducedMotion={isReducedMotion}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
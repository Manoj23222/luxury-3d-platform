"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";

export type PhotoWorkItem = {
  _id: string;
  title: string;
  slug?: string;
  workType?: "before_after" | "banner" | "single";
  category: string;
  shortDescription?: string;
  description: string;
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

/* ========================================================================= */
/* REUSABLE 3D PHYSICAL BOOK COMPONENT                                      */
/* ========================================================================= */
interface PhysicalBookProps {
  works: PhotoWorkItem[];
  bookType: "single" | "before_after";
  bookVolume: string;
  bookTitle: string;
  bookSubtitle: string;
}

function PhysicalBook({
  works,
  bookType,
  bookVolume,
  bookTitle,
  bookSubtitle,
}: PhysicalBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoverAnimating, setIsCoverAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFlipping, setIsFlipping] = useState(false);

  const isReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const total = works.length;
  const currentWork = works[currentIndex] || works[0];
  const nextWork = works[(currentIndex + 1) % total] || currentWork;
  const prevWork = works[(currentIndex - 1 + total) % total] || currentWork;

  const handleOpenBook = useCallback(() => {
    if (isCoverAnimating || isFlipping) return;
    setIsCoverAnimating(true);
    setIsOpen(true);
  }, [isCoverAnimating, isFlipping]);

  const handleCloseBook = useCallback(() => {
    if (isCoverAnimating || isFlipping) return;
    setIsCoverAnimating(true);
    setIsOpen(false);
  }, [isCoverAnimating, isFlipping]);

  // Turn to Next Page (Forward flip: Right page flips over to Left)
  const handleNext = useCallback(() => {
    if (total <= 1 || isFlipping || isCoverAnimating || !isOpen) return;
    setIsFlipping(true);
    setDirection(1);
    const nextIdx = (currentIndex + 1) % total;
    setTargetIndex(nextIdx);
  }, [total, isFlipping, isCoverAnimating, isOpen, currentIndex]);

  // Turn to Previous Page (Reverse flip: Left page flips over to Right)
  const handlePrev = useCallback(() => {
    if (total <= 1 || isFlipping || isCoverAnimating || !isOpen) return;
    setIsFlipping(true);
    setDirection(-1);
    const prevIdx = (currentIndex - 1 + total) % total;
    setTargetIndex(prevIdx);
  }, [total, isFlipping, isCoverAnimating, isOpen, currentIndex]);

  // Flip animation completion handler
  const handleFlipComplete = () => {
    setCurrentIndex(targetIndex);
    setIsFlipping(false);
  };

  // Touch Swipe for Mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -45) {
      handleNext();
    } else if (deltaX > 45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Preload all images in the book for instant zero-lag rendering
  useEffect(() => {
    if (typeof window === "undefined" || !works || works.length === 0) return;
    works.forEach((w) => {
      const preload = (url?: string) => {
        if (!url) return;
        const img = new window.Image();
        img.src = url;
      };
      preload(w.afterImage || w.thumbnail);
      preload(w.beforeImage);
    });
  }, [works]);

  const formattedCurrent = String(total > 0 ? currentIndex + 1 : 0).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  if (total === 0) return null;

  /* ========================================================================= */
  /* ========================================================================= */
  /* LEFT PAGE RENDERER (Warm Luminous Archival Paper - NOT Full Dark)         */
  /* ========================================================================= */
  const renderLeftPage = (item: PhotoWorkItem, index: number) => {
    if (bookType === "before_after") {
      // Before & After Book: Left Page is RAW BEFORE IMAGE on Warm Ivory Paper
      return (
        <div className="relative h-full w-full flex flex-col justify-between p-1.5 sm:p-2.5 lg:p-3 bg-gradient-to-r from-[#fbf9f4] via-[#f7f3e9] to-[#efe9dc] text-stone-900 select-none shadow-[inset_-16px_0_24px_-8px_rgba(0,0,0,0.16)]">
          {/* Top Label */}
          <div className="flex items-center justify-between z-10 px-2 pt-1 pb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/70 bg-amber-100/90 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-950 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
              RAW • BEFORE IMAGE
            </span>
            <span className="text-[10px] font-mono tracking-widest text-stone-500 font-bold uppercase">
              ORIGINAL CAPTURE
            </span>
          </div>

          {/* Center Image Container: Enlarged size with minimal padding */}
          <div className="relative flex-1 w-full flex items-center justify-center p-0.5 sm:p-1 overflow-hidden my-auto">
            <img
              key={`left-img-${item.title}-${index}-${item.beforeImage || item.thumbnail || item.afterImage}`}
              src={item.beforeImage || item.thumbnail || item.afterImage}
              alt={`${item.title} - Raw Before`}
              className="h-full w-full max-h-[98%] max-w-[98%] object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.22)] will-change-transform rounded-xs"
              loading="eager"
            />
          </div>

          {/* Bottom Left Page Footer */}
          <div className="flex items-center justify-between border-t border-stone-300/80 pt-1 text-[10.5px] font-medium text-stone-600 z-10 px-2">
            <span className="truncate max-w-[200px] sm:max-w-[320px] font-semibold text-stone-800">
              {item.title}
            </span>
            <span className="font-serif text-stone-600 font-bold">
              p. {String(index * 2 + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Subtle Hover Turn Prompt on Left Page */}
          <div className="pointer-events-none absolute bottom-8 left-6 rounded-full border border-stone-300 bg-stone-900/85 backdrop-blur-md px-3.5 py-1 text-[10.5px] font-bold text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            ← Click page to turn back
          </div>
        </div>
      );
    }

    // Single Images Book: Left Page is Editorial Typography & Project Story on Warm Ivory Paper
    return (
      <div className="relative h-full w-full flex flex-col justify-between p-4 sm:p-7 lg:p-10 bg-gradient-to-r from-[#fbf9f4] via-[#f7f3e9] to-[#efe9dc] text-stone-900 select-none shadow-[inset_-16px_0_24px_-8px_rgba(0,0,0,0.16)]">
        {/* Category Pill */}
        <div className="flex items-center justify-between border-b border-stone-300/70 pb-2.5">
          <span className="rounded-full border border-stone-300 bg-stone-200/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-800">
            {item.category}
          </span>
          <span className="text-[10.5px] font-mono tracking-widest text-stone-500 font-semibold">
            EDITION {item.projectYear || "2026"}
          </span>
        </div>

        {/* Project Title & Story matching Editorial Monograph Layout */}
        <div className="my-auto space-y-3 sm:space-y-4 py-2">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-950 leading-tight">
            {item.title}
          </h3>

          <div className="w-16 h-[2px] bg-amber-600" />

          {item.shortDescription ? (
            <p className="text-xs sm:text-sm lg:text-base text-stone-700 line-clamp-4 sm:line-clamp-6 leading-relaxed font-normal">
              {item.shortDescription}
            </p>
          ) : (
            <p className="text-xs sm:text-sm lg:text-base text-stone-700 line-clamp-4 sm:line-clamp-6 leading-relaxed font-normal">
              Curated fine art photography and commercial creative visual advertisement. Features meticulous color balance, lighting sculpture, and graphic precision layout.
            </p>
          )}

          {/* Project Metadata Details */}
          <div className="pt-2 sm:pt-3 grid grid-cols-2 gap-2 text-[11px] text-stone-600 border-t border-stone-300/80">
            <div>
              <span className="block text-[9.5px] uppercase font-bold text-stone-500">
                Software Tools
              </span>
              <span className="font-bold text-stone-900 truncate block">
                {item.softwareUsed?.slice(0, 2).join(", ") || "Adobe Photoshop"}
              </span>
            </div>
            <div>
              <span className="block text-[9.5px] uppercase font-bold text-stone-500">
                Resolution & Format
              </span>
              <span className="font-bold text-stone-900 truncate block">
                {item.resolution || "4K Ultra HD"}
              </span>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="flex items-center justify-between border-t border-stone-300/80 pt-2 text-[10.5px] text-stone-600">
          <Link
            href={`/contact?subject=${encodeURIComponent(`Inquiry: ${item.title}`)}`}
            className="rounded-full bg-stone-950 hover:bg-stone-800 text-stone-50 px-4 py-1.5 text-[11px] font-bold transition shadow-xs"
            onClick={(e) => e.stopPropagation()}
          >
            Inquire Project ✉️
          </Link>
          <span className="font-serif text-stone-600 font-bold text-xs">
            p. {String(index * 2 + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Hover Turn Prompt on Left Page */}
        <div className="pointer-events-none absolute bottom-8 left-6 rounded-full border border-stone-300 bg-stone-900/85 backdrop-blur-md px-3.5 py-1 text-[10.5px] font-bold text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          ← Click page to turn back
        </div>
      </div>
    );
  };

  /* ========================================================================= */
  /* RIGHT PAGE RENDERER (Enlarged Artwork on Warm Ivory Paper)                */
  /* ========================================================================= */
  const renderRightPage = (item: PhotoWorkItem, index: number) => {
    return (
      <div className="relative h-full w-full flex flex-col justify-between p-1.5 sm:p-2.5 lg:p-3 bg-gradient-to-r from-[#efe9dc] via-[#f7f3e9] to-[#fbf9f4] text-stone-900 select-none shadow-[inset_16px_0_24px_-8px_rgba(0,0,0,0.16)]">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between z-10 px-2 pt-1 pb-1">
          {bookType === "before_after" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/70 bg-emerald-100/90 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-950 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              FINAL • RETOUCHED
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-200/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              EXHIBITION ART PLATE
            </span>
          )}

          <span className="text-[10px] font-mono tracking-widest text-stone-500 font-bold uppercase">
            {item.resolution || "4K ULTRA HD"}
          </span>
        </div>

        {/* Central High-Resolution Artwork (Enlarged size with minimal padding) */}
        <div className="relative flex-1 w-full flex items-center justify-center p-0.5 sm:p-1 overflow-hidden my-auto">
          <img
            key={`right-img-${item.title}-${index}-${item.afterImage || item.thumbnail || item.beforeImage}`}
            src={item.afterImage || item.thumbnail || item.beforeImage}
            alt={`${item.title} - Final Artwork`}
            className="h-full w-full max-h-[98%] max-w-[98%] object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,0.24)] will-change-transform rounded-xs"
            loading="eager"
          />
        </div>

        {/* Bottom Right Page Footer */}
        <div className="flex items-center justify-between border-t border-stone-300/80 pt-1 text-[10.5px] font-medium text-stone-600 z-10 px-2">
          <span className="truncate max-w-[200px] sm:max-w-[320px] font-semibold text-stone-800">
            {item.category}
          </span>
          <span className="font-serif text-stone-600 font-bold">
            p. {String(index * 2 + 2).padStart(2, "0")}
          </span>
        </div>

        {/* Hover Turn Prompt on Right Page */}
        <div className="pointer-events-none absolute bottom-8 right-6 rounded-full border border-stone-300 bg-stone-900/85 backdrop-blur-md px-3.5 py-1 text-[10.5px] font-bold text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          Click page to flip next →
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full py-10 sm:py-14">
      {/* ===================================================================== */}
      {/* 3D PHYSICAL REAL HARDCOVER BOOK (SWINGS OPEN/SHUT IN 3D PERSPECTIVE)  */}
      {/* ===================================================================== */}
      <div className="relative mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1560px] px-3 sm:px-6 lg:px-8">
        {/* Top Bar with Plate Counter & Close Book Action */}
        <div
          className={`flex items-center justify-between mb-3 px-1 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none select-none"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400/90 uppercase">
              📖 SPREAD OPEN
            </span>
            <span className="text-stone-500">•</span>
            <span className="font-mono text-xs text-stone-300">
              PLATE <span className="text-amber-300 font-black">{formattedCurrent}</span>
              <span className="text-stone-500 mx-1">/</span>
              <span className="text-stone-400">{formattedTotal}</span>
            </span>
          </div>
          <button
            onClick={handleCloseBook}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-600/80 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-300 px-3.5 py-1 text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <span>📕 Close Book</span>
            <span className="text-stone-400 text-xs">✕</span>
          </button>
        </div>

        {/* Outer Animated Translation: Centers closed book when closed, centers spread when open */}
        <motion.div
          animate={{
            x: isOpen ? "0%" : "-25%",
          }}
          transition={{
            duration: 0.95,
            ease: [0.25, 1, 0.45, 1],
          }}
          style={{
            perspective: "3000px",
            transformStyle: "preserve-3d",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Hardcover Outer Leather/Cloth Board Base */}
          <div
            className="relative mx-auto rounded-[28px] sm:rounded-[38px] p-2.5 sm:p-4 lg:p-5 bg-gradient-to-b from-[#3a2c20] via-[#261d15] to-[#17120c] border-2 border-amber-600/40 ring-1 ring-amber-400/20 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.95),0_20px_50px_-10px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.18)]"
            style={{
              clipPath: isOpen ? "inset(-30px -30px -50px 0%)" : "inset(-30px -30px -50px 50%)",
              transition: "clip-path 0.95s cubic-bezier(0.25, 1, 0.45, 1)",
            }}
          >
            {/* Decorative Gilded Perimeter Stitch Line on Leather Cover */}
            <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-[24px] sm:rounded-[32px] border border-amber-500/25 opacity-80" />

            {/* Gilded Brass Corner Protectors (Antique Bookbinders Metal Corners) */}
            <div className="pointer-events-none absolute -top-1 -left-1 w-8 sm:w-10 h-8 sm:w-10 border-t-2 border-l-2 border-amber-400/80 rounded-tl-2xl bg-gradient-to-br from-amber-300/40 via-amber-500/15 to-transparent shadow-xs">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
            </div>
            <div className="pointer-events-none absolute -top-1 -right-1 w-8 sm:w-10 h-8 sm:w-10 border-t-2 border-r-2 border-amber-400/80 rounded-tr-2xl bg-gradient-to-bl from-amber-300/40 via-amber-500/15 to-transparent shadow-xs">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
            </div>
            <div className="pointer-events-none absolute -bottom-1 -left-1 w-8 sm:w-10 h-8 sm:w-10 border-b-2 border-l-2 border-amber-400/80 rounded-bl-2xl bg-gradient-to-tr from-amber-300/40 via-amber-500/15 to-transparent shadow-xs">
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
            </div>
            <div className="pointer-events-none absolute -bottom-1 -right-1 w-8 sm:w-10 h-8 sm:w-10 border-b-2 border-r-2 border-amber-400/80 rounded-br-2xl bg-gradient-to-tl from-amber-300/40 via-amber-500/15 to-transparent shadow-xs">
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
            </div>

            {/* Fore-edge Stacked Page Block: Left & Right side thickness */}
            <div
              className="pointer-events-none absolute -left-3 sm:-left-4 inset-y-6 sm:inset-y-8 w-3 sm:w-4 rounded-l-md border-l border-stone-400/50 shadow-md"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #eae4d8 0px, #eae4d8 1.5px, #c8beae 1.5px, #c8beae 3px)",
              }}
            />
            <div
              className="pointer-events-none absolute -right-3 sm:-right-4 inset-y-6 sm:inset-y-8 w-3 sm:w-4 rounded-r-md border-r border-stone-400/50 shadow-md"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #eae4d8 0px, #eae4d8 1.5px, #c8beae 1.5px, #c8beae 3px)",
              }}
            />

            {/* Bottom Stacked Page Block: Multi-tiered depth curving to spine */}
            <div
              className="pointer-events-none absolute -bottom-3 sm:-bottom-4 inset-x-8 sm:inset-x-14 h-3.5 sm:h-4.5 rounded-b-xl border-b border-stone-500/50 shadow-md"
              style={{
                background:
                  "repeating-linear-gradient(to right, #cfc7b8 0px, #ded8cc 3px, #cfc7b8 6px)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-6 sm:-bottom-7 inset-x-16 sm:inset-x-24 h-2.5 sm:h-3.5 rounded-b-lg border-b border-stone-600/40 opacity-75 shadow-sm"
              style={{
                background:
                  "repeating-linear-gradient(to right, #b8b09f 0px, #c8c0af 3px, #b8b09f 6px)",
              }}
            />

            {/* Bottom Spine Hinge Dip / Cutout */}
            <div className="pointer-events-none absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-3 bg-[#18120d] rounded-b-md border-b border-amber-600/40 shadow-inner z-20" />

            {/* Woven Silk Headband Ribbons (Top and Bottom of Spine) */}
            <div
              className="pointer-events-none absolute top-1.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-2 sm:h-2.5 rounded-xs shadow-md z-30 opacity-95 border-b border-black/30"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #b45309 0px, #b45309 3px, #fbbf24 3px, #fbbf24 6px)",
              }}
            />
            <div
              className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-2 sm:h-2.5 rounded-xs shadow-md z-30 opacity-95 border-t border-black/30"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #b45309 0px, #b45309 3px, #fbbf24 3px, #fbbf24 6px)",
              }}
            />

            {/* Physical Open Book Spread Frame */}
            <div
              className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] lg:h-[540px] xl:h-[580px] 2xl:h-[620px] flex overflow-hidden rounded-xl sm:rounded-2xl border border-stone-400/40 bg-[#f7f3e9] shadow-inner"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ================= LEFT SPREAD (CLICK TO GO PREVIOUS) ================= */}
              <div
                onClick={isOpen && !isCoverAnimating ? handlePrev : undefined}
                className={`group relative w-1/2 h-full overflow-hidden border-r border-stone-300 transition-opacity duration-700 z-20 ${
                  isOpen ? "cursor-pointer opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Underlying Static Left Page */}
                {isFlipping && direction === -1
                  ? renderLeftPage(prevWork, (currentIndex - 1 + total) % total)
                  : renderLeftPage(currentWork, currentIndex)}

                {/* Left Spine Crease Shadow (Realistic 3D valley shadow) */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-transparent via-stone-400/25 to-stone-900/40 z-20" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[1px] bg-stone-300/60 z-20" />

                {/* Dynamic landing shadow when turning page lands on left */}
                {isFlipping && direction === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 bg-gradient-to-r from-stone-900/40 via-stone-900/20 to-transparent pointer-events-none z-25"
                  />
                )}
              </div>

              {/* ================= RIGHT SPREAD (CLICK TO GO NEXT) =================== */}
              <div
                onClick={isOpen && !isCoverAnimating ? handleNext : undefined}
                className={`group relative w-1/2 h-full overflow-hidden border-l border-stone-300 z-20 ${
                  isOpen ? "cursor-pointer" : ""
                }`}
              >
                {/* Underlying Static Right Page */}
                {isFlipping && direction === 1
                  ? renderRightPage(nextWork, (currentIndex + 1) % total)
                  : renderRightPage(currentWork, currentIndex)}

                {/* Right Spine Crease Shadow (Realistic 3D valley shadow) */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-transparent via-stone-400/25 to-stone-900/40 z-20" />
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[1px] bg-stone-300/60 z-20" />

                {/* Dynamic shadow when turning page lifts off right */}
                {isFlipping && direction === -1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 bg-gradient-to-l from-stone-900/40 via-stone-900/20 to-transparent pointer-events-none z-25"
                  />
                )}
              </div>

              {/* Central Spine Fold Line */}
              <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-stone-400/70 z-25 shadow-xs" />

              {/* ================================================================= */}
              {/* 3D HARDCOVER FRONT COVER LEAF (SWINGS OPEN/CLOSED PHYSICALLY)     */}
              {/* ================================================================= */}
              <motion.div
                initial={false}
                animate={{
                  rotateY: isOpen ? -180 : 0,
                }}
                transition={{
                  duration: 0.95,
                  ease: [0.25, 1, 0.45, 1],
                }}
                onAnimationStart={() => setIsCoverAnimating(true)}
                onAnimationComplete={() => {
                  setIsCoverAnimating(false);
                  if (!isOpen) {
                    setCurrentIndex(0);
                  }
                }}
                className={`absolute top-0 bottom-0 right-0 w-1/2 ${
                  !isOpen || isCoverAnimating ? "z-40" : "z-10 pointer-events-none"
                } ${
                  isOpen ? "" : "cursor-pointer"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                }}
                onClick={!isOpen ? handleOpenBook : undefined}
              >
                {/* FRONT FACE: Physical Hardcover Leather Front Cover (visible when closed) */}
                <div
                  className="absolute inset-0 h-full w-full overflow-hidden rounded-r-xl sm:rounded-r-2xl bg-gradient-to-b from-[#3a2c20] via-[#261d15] to-[#17120c] border-2 border-l-0 border-amber-600/40 shadow-2xl flex flex-col justify-between p-4 sm:p-7 md:p-9 group"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "translateZ(1px)",
                  }}
                >
                  {/* Decorative Gilded Perimeter Stitch Line on Leather Cover */}
                  <div className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-r-[18px] sm:rounded-r-[26px] border border-amber-500/30 opacity-80 group-hover:border-amber-400/60 transition-colors" />
                  <div className="pointer-events-none absolute inset-3.5 sm:inset-4 rounded-r-[14px] sm:rounded-r-[22px] border border-amber-500/15" />

                  {/* Gilded Brass Corner Protectors */}
                  <div className="pointer-events-none absolute -top-1 -right-1 w-8 sm:w-11 h-8 sm:h-11 border-t-2 border-r-2 border-amber-400/80 rounded-tr-2xl bg-gradient-to-bl from-amber-300/40 via-amber-500/15 to-transparent shadow-xs">
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                  </div>
                  <div className="pointer-events-none absolute -bottom-1 -right-1 w-8 sm:w-11 h-8 sm:h-11 border-b-2 border-r-2 border-amber-400/80 rounded-br-2xl bg-gradient-to-tl from-amber-300/40 via-amber-500/15 to-transparent shadow-xs">
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                  </div>

                  {/* Fore-edge Stacked Page Block along Right Side */}
                  <div
                    className="pointer-events-none absolute -right-3 sm:-right-4 inset-y-6 sm:inset-y-8 w-3 sm:w-4 rounded-r-md border-r border-stone-400/50 shadow-md"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, #eae4d8 0px, #eae4d8 1.5px, #c8beae 1.5px, #c8beae 3px)",
                    }}
                  />

                  {/* Cover Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-300 backdrop-blur-md">
                      {bookVolume}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-amber-200/60 uppercase">
                      COLLECTION 2026
                    </span>
                  </div>

                  {/* Cover Center Emblem & Title */}
                  <div className="relative z-10 my-auto text-center space-y-2.5 sm:space-y-3 py-2">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-amber-400/20 via-amber-600/10 to-transparent flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                      <span className="text-base sm:text-2xl font-serif font-black text-amber-300">
                        {bookType === "before_after" ? "B&A" : "LUX"}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-amber-100 drop-shadow-md leading-tight">
                      {bookTitle}
                    </h3>

                    <div className="w-12 h-0.5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                    <p className="text-[11px] sm:text-xs lg:text-sm text-stone-300 max-w-sm mx-auto line-clamp-2 font-normal leading-relaxed">
                      {bookSubtitle}
                    </p>

                    <div className="pt-0.5">
                      <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                        {total} CURATED PLATES • DOUBLE-SPREAD ALBUM
                      </span>
                    </div>
                  </div>

                  {/* Cover Bottom Call-to-action */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400 bg-amber-400/20 hover:bg-amber-400/30 backdrop-blur-md px-4 sm:px-6 py-2 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.35)] group-hover:scale-105 transition-all">
                      <span>📖 Click to Open Book</span>
                      <span className="text-amber-400">➔</span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium">
                      Tap to open physically in 3D
                    </span>
                  </div>

                  {/* Dynamic lighting shadow overlay as cover rotates */}
                  <motion.div
                    animate={{ opacity: isOpen ? 0.8 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none"
                  />
                </div>

                {/* BACK FACE: Left Page (lands at -180deg when open) */}
                <div
                  className="absolute inset-0 h-full w-full overflow-hidden rounded-l-xl sm:rounded-l-2xl bg-[#f7f3e9]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg) translateZ(1px)",
                  }}
                >
                  {renderLeftPage(currentWork, currentIndex)}

                  {/* Dynamic landing shadow overlay */}
                  <motion.div
                    animate={{ opacity: isOpen ? 0 : 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-l from-stone-900/60 via-stone-700/20 to-transparent pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* ================================================================= */}
              {/* 3D TURNING PAGE LEAF: NEXT (Right flips over to Left)             */}
              {/* ================================================================= */}
              {isFlipping && direction === 1 && !isReducedMotion && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 1, 0.4, 1],
                  }}
                  onAnimationComplete={handleFlipComplete}
                  className="absolute top-0 bottom-0 right-0 w-1/2 z-50 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                  }}
                >
                  {/* Front Face: Current Right Page (Turns away from viewer, disappears cleanly at 90deg) */}
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.48, 0.5, 1],
                      ease: "linear",
                    }}
                    className="absolute inset-0 h-full w-full overflow-hidden bg-[#f7f3e9] rounded-r-xl sm:rounded-r-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(1px)",
                    }}
                  >
                    {renderRightPage(currentWork, currentIndex)}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-700/25 to-transparent pointer-events-none"
                    />
                  </motion.div>

                  {/* Back Face: Next Left Page (Becomes visible at 90deg, lands onto left spread) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 1] }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.5, 0.52, 1],
                      ease: "linear",
                    }}
                    className="absolute inset-0 h-full w-full overflow-hidden bg-[#f7f3e9] rounded-l-xl sm:rounded-l-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg) translateZ(1px)",
                    }}
                  >
                    {renderLeftPage(nextWork, (currentIndex + 1) % total)}
                    <motion.div
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-l from-stone-900/70 via-stone-700/25 to-transparent pointer-events-none"
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* 3D TURNING PAGE LEAF: PREVIOUS (Left flips over to Right)         */}
              {/* ================================================================= */}
              {isFlipping && direction === -1 && !isReducedMotion && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 1, 0.4, 1],
                  }}
                  onAnimationComplete={handleFlipComplete}
                  className="absolute top-0 bottom-0 left-0 w-1/2 z-50 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "right center",
                  }}
                >
                  {/* Front Face: Current Left Page (Turns away from viewer, disappears cleanly at 90deg) */}
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.48, 0.5, 1],
                      ease: "linear",
                    }}
                    className="absolute inset-0 h-full w-full overflow-hidden bg-[#f7f3e9] rounded-l-xl sm:rounded-l-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(1px)",
                    }}
                  >
                    {renderLeftPage(currentWork, currentIndex)}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-l from-stone-900/70 via-stone-700/25 to-transparent pointer-events-none"
                    />
                  </motion.div>

                  {/* Back Face: Previous Right Page (Becomes visible at 90deg, lands onto right spread) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 1] }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.5, 0.52, 1],
                      ease: "linear",
                    }}
                    className="absolute inset-0 h-full w-full overflow-hidden bg-[#f7f3e9] rounded-r-xl sm:rounded-r-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg) translateZ(1px)",
                    }}
                  >
                    {renderRightPage(prevWork, (currentIndex - 1 + total) % total)}
                    <motion.div
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-700/25 to-transparent pointer-events-none"
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* MAIN PHOTO EDITING PAGE WITH 2 BOOKS (TOP: SINGLE, BELOW: BEFORE/AFTER)  */
/* ========================================================================= */
export default function PhotoEditingGrid({
  initialWorks,
}: PhotoEditingGridProps) {
  const [works, setWorks] = useState<PhotoWorkItem[]>(initialWorks);

  // Sync state if server initialWorks changes
  useEffect(() => {
    if (initialWorks && initialWorks.length > 0) {
      setWorks(initialWorks);
    }
  }, [initialWorks]);

  // Real-time client-side sync to guarantee newly uploaded images appear immediately
  useEffect(() => {
    fetch("/api/photo-works", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.works) && data.works.length > 0) {
          setWorks(data.works);
        }
      })
      .catch(() => {});
  }, []);

  // Book 1 Works: Single Artworks / Banners / Monograph Images
  const singleWorks = useMemo(() => {
    return works.filter((w) => {
      if (w.workType === "single" || w.workType === "banner") return true;
      if (!w.beforeImage || !w.beforeImage.trim()) return true;
      return w.beforeImage === w.afterImage;
    });
  }, [works]);

  // Book 2 Works: Before & After Retouching Projects
  const beforeAfterWorks = useMemo(() => {
    return works.filter((w) => {
      if (w.workType === "before_after") return true;
      if (w.workType === "single" || w.workType === "banner") return false;
      const hasBefore = typeof w.beforeImage === "string" && w.beforeImage.trim().length > 0;
      const hasAfter = typeof w.afterImage === "string" && w.afterImage.trim().length > 0;
      return hasBefore && hasAfter && w.beforeImage !== w.afterImage;
    });
  }, [works]);

  return (
    <div className="w-full">
      {/* ================================================================= */}
      {/* BOOK 1 (TOP): SINGLE IMAGES PORTFOLIO MONOGRAPH                   */}
      {/* ================================================================= */}
      <section
        id="single-images-book"
        className="relative overflow-hidden border-b border-amber-900/20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 36%, rgba(220, 180, 125, 0.13), rgba(24, 21, 18, 0.88) 65%, #12100e 100%)",
        }}
      >
        <PhysicalBook
          works={singleWorks}
          bookType="single"
          bookVolume="BOOK 1 • CREATIVE MONOGRAPH"
          bookTitle="Selected Artworks & Creative Monograph"
          bookSubtitle="Click the right page to flip forward, or click the left page to turn backward. Experience single artworks as curated museum monograph spreads."
        />
      </section>

      {/* ================================================================= */}
      {/* BOOK 2 (BELOW): BEFORE & AFTER RETOUCHING STUDIO BOOK             */}
      {/* ================================================================= */}
      <section
        id="before-after-book"
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 36%, rgba(210, 175, 120, 0.12), rgba(22, 19, 17, 0.88) 65%, #100e0d 100%)",
        }}
      >
        <PhysicalBook
          works={beforeAfterWorks}
          bookType="before_after"
          bookVolume="BOOK 2 • RETOUCHING COMPARISON"
          bookTitle="Before & After Retouching Studio Book"
          bookSubtitle="Left page reveals the raw untouched capture; right page reveals the final polished retouch. Click the pages to flip through the comparison album."
        />
      </section>
    </div>
  );
}

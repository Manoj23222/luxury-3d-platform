"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BeforeAfterSlider from "./BeforeAfterSlider";

export type PhotoWorkItem = {
  _id: string;
  title: string;
  slug?: string;
  workType?: "before_after" | "banner";
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

interface PhotoWorkModalProps {
  work: PhotoWorkItem | null;
  onClose: () => void;
}

export default function PhotoWorkModal({ work, onClose }: PhotoWorkModalProps) {
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!work) return null;

  const isBeforeAfter =
    (work.workType === "before_after" || !work.workType) &&
    Boolean(work.beforeImage) &&
    work.beforeImage !== work.afterImage;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-5 lg:p-8 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-h-[95vh] w-full max-w-6xl rounded-3xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Title, Category & Controls */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-800/80 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-200 border border-white/10 shrink-0">
              {work.category}
            </span>
            <span className="rounded-full bg-emerald-950 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 shrink-0">
              {isBeforeAfter ? "⚡ Before / After" : "🎨 Creative Banner"}
            </span>
            <h2 className="text-sm sm:text-base font-black text-white truncate max-w-md hidden sm:inline">
              {work.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode Switcher for Before/After */}
            {isBeforeAfter && (
              <div className="hidden sm:flex rounded-full border border-neutral-800 bg-neutral-900 p-1 text-xs font-bold">
                <button
                  onClick={() => setViewMode("slider")}
                  className={`rounded-full px-3.5 py-1 transition cursor-pointer ${
                    viewMode === "slider"
                      ? "bg-white text-black shadow-xs"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Slider
                </button>
                <button
                  onClick={() => setViewMode("side-by-side")}
                  className={`rounded-full px-3.5 py-1 transition cursor-pointer ${
                    viewMode === "side-by-side"
                      ? "bg-white text-black shadow-xs"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Side-by-Side
                </button>
              </div>
            )}

            {/* Direct Inquiry Link */}
            <Link
              href={`/contact?subject=${encodeURIComponent(
                `Inquiry for Artwork: ${work.title}`
              )}`}
              className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-black hover:bg-neutral-200 transition hidden sm:inline-block"
            >
              Inquire Design ✉️
            </Link>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-sm font-bold text-white transition hover:bg-white hover:text-black cursor-pointer shadow-xs"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Viewport */}
        <div className="mt-4 flex-1 min-h-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center">
          {isBeforeAfter ? (
            viewMode === "slider" ? (
              <div className="w-full h-[65vh] sm:h-[72vh]">
                <BeforeAfterSlider
                  beforeImage={work.beforeImage!}
                  afterImage={work.afterImage}
                  aspectRatio="h-full w-full"
                  fitMode="contain"
                  showFitToggle={true}
                  enableAutoScan={true}
                />
              </div>
            ) : (
              <div className="grid gap-3 p-3 w-full h-[65vh] sm:h-[72vh] sm:grid-cols-2">
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900/80 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center border border-neutral-800/60">
                  <img
                    src={work.beforeImage!}
                    alt="Original RAW"
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/80 border border-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                    RAW / BEFORE
                  </span>
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900/80 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center border border-neutral-800/60">
                  <img
                    src={work.afterImage}
                    alt="Retouched AFTER"
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-950/90 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-xs">
                    RETOUCHED / AFTER
                  </span>
                </div>
              </div>
            )
          ) : (
            /* Single Creative Banner / Artwork Fullscreen View */
            <div className="relative w-full h-[65vh] sm:h-[72vh] flex items-center justify-center p-3 sm:p-6 bg-neutral-900/80 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:12px_12px]">
              <img
                src={work.afterImage || work.thumbnail}
                alt={work.title}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Bottom Details Strip */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm">{work.title}</span>
            {work.resolution && (
              <span className="rounded-md border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-neutral-300">
                {work.resolution}
              </span>
            )}
            {Array.isArray(work.softwareUsed) && work.softwareUsed.length > 0 && (
              <span className="text-[11px] text-neutral-400">
                Tools: {work.softwareUsed.join(", ")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/contact?subject=${encodeURIComponent(
                `Inquiry for Artwork: ${work.title}`
              )}`}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black hover:bg-neutral-200 transition sm:hidden"
            >
              Inquire Design ✉️
            </Link>
            <span className="text-[11px] text-neutral-500">
              {work.projectYear || "2026"} • {work.clientName || "Commercial Portfolio"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

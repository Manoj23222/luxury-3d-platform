"use client";

import { useEffect, useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";

export type PhotoWorkItem = {
  _id: string;
  title: string;
  slug?: string;
  category: string;
  shortDescription?: string;
  description: string;
  beforeImage: string;
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-5 lg:p-8 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-h-[95vh] w-full max-w-6xl rounded-3xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Minimal Header: Title, Category & Close Button */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-200 border border-white/10">
              {work.category}
            </span>
            <h2 className="text-base sm:text-lg font-black text-white truncate max-w-md">
              {work.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
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

        {/* Pure Full Image Comparison Container (ONLY IMAGES SHOW FULL - NO OTHER DETAILS) */}
        <div className="mt-4 flex-1 min-h-0 overflow-hidden rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
          {viewMode === "slider" ? (
            <div className="w-full h-[65vh] sm:h-[75vh]">
              <BeforeAfterSlider
                beforeImage={work.beforeImage}
                afterImage={work.afterImage}
                aspectRatio="h-full w-full"
                fitMode="contain"
                showFitToggle={true}
                enableAutoScan={true}
              />
            </div>
          ) : (
            <div className="grid gap-3 p-3 w-full h-[65vh] sm:h-[75vh] sm:grid-cols-2">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800/60">
                <img
                  src={work.beforeImage}
                  alt="Original RAW"
                  className="h-full w-full object-contain"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/80 border border-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                  RAW / BEFORE
                </span>
              </div>
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800/60">
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
          )}
        </div>
      </div>
    </div>
  );
}

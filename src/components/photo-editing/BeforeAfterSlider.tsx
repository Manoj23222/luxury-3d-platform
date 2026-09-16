"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
  defaultPosition?: number;
  enableAutoScan?: boolean;
  fitMode?: "contain" | "cover";
  showFitToggle?: boolean;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  className = "",
  aspectRatio = "aspect-[4/3]",
  defaultPosition = 50,
  enableAutoScan = true,
  fitMode: initialFitMode = "contain",
  showFitToggle = false,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(defaultPosition);
  const [isInteracting, setIsInteracting] = useState(false);
  const [fitMode, setFitMode] = useState<"contain" | "cover">(initialFitMode);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const autoScanDirectionRef = useRef<number>(1);

  // Position calculation helper
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Mouse Move: Follows mouse position immediately on hover (Auto Move)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    updatePosition(e.clientX);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsInteracting(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    setIsHovered(true);
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    setIsHovered(false);
  };

  // Mouse Down/Up for explicit drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsInteracting(true);
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  // Gentle Auto-Scan sweep animation when not hovered/interacting
  useEffect(() => {
    if (!enableAutoScan) return;

    let pos = sliderPosition;
    let direction = autoScanDirectionRef.current;

    const animate = () => {
      if (!isHovered && !isInteracting) {
        pos += direction * 0.25;
        if (pos >= 85) {
          pos = 85;
          direction = -1;
          autoScanDirectionRef.current = -1;
        } else if (pos <= 15) {
          pos = 15;
          direction = 1;
          autoScanDirectionRef.current = 1;
        }
        setSliderPosition(pos);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [enableAutoScan, isHovered, isInteracting, sliderPosition]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`group relative select-none overflow-hidden rounded-2xl bg-neutral-950 ${aspectRatio} ${className} cursor-ew-resize`}
      style={{ touchAction: "none" }}
    >
      {/* 1. AFTER / RETOUCHED IMAGE (Full Base Layer) */}
      <img
        src={afterImage}
        alt="Retouched result"
        className={`pointer-events-none absolute inset-0 h-full w-full ${
          fitMode === "contain" ? "object-contain" : "object-cover"
        }`}
        draggable={false}
      />

      {/* 2. BEFORE / RAW IMAGE (Pixel-Perfect Overlay using CSS Clip-Path) */}
      <img
        src={beforeImage}
        alt="Original unedited photo"
        className={`pointer-events-none absolute inset-0 h-full w-full ${
          fitMode === "contain" ? "object-contain" : "object-cover"
        }`}
        style={{
          clipPath: `inset(0 ${Math.max(0, 100 - sliderPosition)}% 0 0)`,
          WebkitClipPath: `inset(0 ${Math.max(0, 100 - sliderPosition)}% 0 0)`,
        }}
        draggable={false}
      />

      {/* 3. LABELS */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span>{beforeLabel}</span>
      </div>

      <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>{afterLabel}</span>
      </div>

      {/* 4. OPTIONAL FIT TOGGLE (Fit: Full Image vs Fill: Cover) */}
      {showFitToggle && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFitMode((prev) => (prev === "contain" ? "cover" : "contain"));
          }}
          className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-[10.5px] font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-black cursor-pointer"
        >
          <span>{fitMode === "contain" ? "🔍 Fill Mode" : "📐 Full Image"}</span>
        </button>
      )}

      {/* 5. SLIDER DIVIDER LINE & HANDLE */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black/90 text-white shadow-2xl backdrop-blur-md transition-transform group-hover:scale-110 active:scale-95">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l-4 3 4 3m8-6l4 3-4 3"
            />
          </svg>
        </div>
      </div>

    </div>
  );
}

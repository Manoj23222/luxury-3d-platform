"use client";

import { useState, useRef, useCallback } from "react";

export default function ProductionShowcase() {
  // Before / After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // High-End Retouching Images (Commercial Luxury Product / Fragrance)
  const beforeImage =
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80";
  const afterImage =
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80";

  // Draggable slider handler
  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <section className="relative border-b border-neutral-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-5 border-b border-neutral-100">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-xs font-bold text-neutral-800 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Production Work Showcase</span>
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
            High-End Photo Retouching, 3D Modeling
          </h2>
        </div>

        {/* 2-Column Side-by-Side: Equal Sized Cards (Left Image Before/After | Right Auto-Playing Video) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* ======================================================= */}
          {/* LEFT CARD: PHOTO RETOUCHING (ONE FULL BEFORE / AFTER)   */}
          {/* ======================================================= */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-3 sm:p-4 shadow-sm transition duration-300 hover:border-black hover:shadow-md flex flex-col justify-between">
            <div
              ref={sliderRef}
              className="relative select-none overflow-hidden rounded-2xl bg-neutral-900 aspect-[16/10] w-full shadow-xs cursor-ew-resize border border-neutral-200"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Full background) */}
              <img
                src={afterImage}
                alt="Retouched After"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              {/* Before Image (Clipped overlay) */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={beforeImage}
                  alt="Raw Before"
                  className="pointer-events-none absolute inset-0 h-full max-w-none object-cover"
                  style={{
                    width: sliderRef.current
                      ? `${sliderRef.current.clientWidth}px`
                      : "100%",
                    height: "100%",
                  }}
                  draggable={false}
                />
              </div>

              {/* Badges */}
              <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                🔴 BEFORE
              </div>
              <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                🟢 AFTER
              </div>

              {/* Divider Bar & Handle */}
              <div
                className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-xl">
                  <span className="text-[10px] font-black tracking-tighter">⟷</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400 px-1">
              <span>← Drag slider horizontally</span>
              <span className="font-semibold text-neutral-700">{sliderPosition.toFixed(0)}% Split</span>
            </div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT CARD: 3D ANIMATION VIDEO (AUTO-PLAYING VIDEO ONLY) */}
          {/* ======================================================= */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-3 sm:p-4 shadow-sm transition duration-300 hover:border-black hover:shadow-md flex flex-col justify-between">
            <div className="relative aspect-[20/14] w-full overflow-hidden rounded-2xl bg-black shadow-xs border border-neutral-200">
              <video
                src="/Second_Action_Cinematic_Prom.mp4"
                playsInline
                autoPlay
                loop
                muted
                className="h-full w-full object-cover"
              />

              {/* Top Badge */}
              <div className="pointer-events-none absolute left-3 top-3 z-10">
                
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400 px-1">
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

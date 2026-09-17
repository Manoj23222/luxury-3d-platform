"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";

const SAMPLE_BANNERS = [
  {
    id: "pw-banner-burger-menu",
    title: "Super Delicious Burger Menu Social Media Creative",
    category: "Food & Beverage Ads",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    tags: ["Food Ad", "Burger", "Poster"],
    client: "Gourmet Burgers Co.",
  },
  {
    id: "pw-banner-cosmetics-botanical",
    title: "Organic Aloe Vera Skincare Social Media Ad",
    category: "Cosmetics & Beauty Ads",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    tags: ["Skincare", "Cosmetics", "Banner"],
    client: "Pores Organic",
  },
  {
    id: "pw-banner-jewelry-rings",
    title: "Luxury Gold & Diamond Rings Commercial Showcase",
    category: "Jewelry & Luxury Ads",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    tags: ["Jewelry", "Diamonds", "Luxury"],
    client: "Aura Royale Jewels",
  },
  {
    id: "pw-banner-ghar-jaisa-khana",
    title: "Ghar Jaisa Khana Traditional Food Delivery Creative",
    category: "Food & Beverage Ads",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    tags: ["Indian Food", "Creative", "Delivery"],
    client: "Khozzo Kitchens",
  },
];

export default function MyWorkSection() {
  const [activeTab, setActiveTab] = useState<"all" | "3d" | "photo">("all");

  // Before / After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const beforeImage =
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80";
  const afterImage =
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80";

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

  const standout3d = FALLBACK_3D_PRODUCTS.slice(0, 3);

  return (
    <section
      id="my-work"
      className="relative border-b border-neutral-200 bg-white py-8 sm:py-2 text-neutral-900 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
      

        {/* ======================================================== */}
        {/* ROW 1: LIVE INTERACTIVE BEFORE/AFTER SLIDER + 3D VIDEO   */}
        {/* ======================================================== */}
        {(activeTab === "all" || activeTab === "photo" || activeTab === "3d") && (
          <div className="mt-10">
            <div className="grid gap-6 lg:grid-cols-2 items-stretch">
              {/* LEFT CARD: PHOTO RETOUCHING (BEFORE/AFTER SLIDER) */}
              {(activeTab === "all" || activeTab === "photo") && (
                <div className="rounded-3xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-xs transition duration-300 hover:border-black hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-xs text-white">
                          ✨
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-black">
                            Photo Retouching & Color Grading
                          </h3>
                          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            Interactive Split Comparison
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/photo-editing"
                        className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold text-neutral-800 transition hover:bg-black hover:text-white"
                      >
                        Explore Gallery →
                      </Link>
                    </div>

                    <div
                      ref={sliderRef}
                      className="mt-4 relative select-none overflow-hidden rounded-2xl bg-neutral-900 aspect-[16/10] w-full shadow-xs cursor-ew-resize border border-neutral-200"
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      onMouseLeave={() => setIsDragging(false)}
                      onMouseMove={handleMouseMove}
                      onTouchStart={() => setIsDragging(true)}
                      onTouchEnd={() => setIsDragging(false)}
                      onTouchMove={handleTouchMove}
                    >
                      {/* After Image */}
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
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                    <span>← Drag slider horizontally to compare</span>
                    <span className="font-bold text-neutral-800">{sliderPosition.toFixed(0)}% Split</span>
                  </div>
                </div>
              )}

              {/* RIGHT CARD: 3D ANIMATION & CGI MOTION REEL */}
              {(activeTab === "all" || activeTab === "3d") && (
                <div className="rounded-3xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-xs transition duration-300 hover:border-black hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-xs text-white">
                          🧊
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-black">
                            3D CGI Animation & Motion
                          </h3>
                          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            Cinematic Product Reel
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/portfolio"
                        className="rounded-full bg-black px-3 py-1 text-[11px] font-bold text-white transition hover:bg-neutral-800"
                      >
                        View 3D Archive →
                      </Link>
                    </div>

                    <div className="mt-4 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black shadow-xs border border-neutral-200">
                      <video
                        src="/Second_Action_Cinematic_Prom.mp4"
                        playsInline
                        autoPlay
                        loop
                        muted
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                        ▶ HD 60 FPS Turntable
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                    <span>Precision Cloth & Hard-Surface CGI</span>
                    <span className="font-bold text-emerald-700">300+ Delivered</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}

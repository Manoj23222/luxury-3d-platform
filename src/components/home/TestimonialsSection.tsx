"use client";

import { useState } from "react";
import Link from "next/link";

interface Testimonial {
  name: string;
  role: string;
  tag: string;
  badgeColor: string;
  borderColor: string;
  borderHover: string;
  cardBg: string;
  glowColor: string;
  accentText: string;
  quoteColor: string;
  initials: string;
  initialsBg: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Product Brand",
    role: "Direct-to-Consumer Brand",
    tag: "3D CGI & Marketplace",
    badgeColor: "bg-amber-500/15 border-amber-500/40 text-amber-300",
    borderColor: "border-amber-500/25",
    borderHover: "hover:border-amber-400/80 hover:shadow-[0_20px_50px_rgba(245,158,11,0.22)]",
    cardBg: "bg-gradient-to-br from-[#1d160c]/90 via-[#120f09]/95 to-[#1a140b]/90",
    glowColor: "rgba(245, 158, 11, 0.15)",
    accentText: "text-amber-400",
    quoteColor: "text-amber-500/15 group-hover:text-amber-500/30",
    initials: "PB",
    initialsBg: "bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950",
    text: "Premium quality 3D assets with clean topology, realistic materials and marketplace-ready presentation.",
  },
  {
    name: "Amazon Seller",
    role: "Top-Tier E-Commerce Merchant",
    tag: "Conversion & 4K Renders",
    badgeColor: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
    borderColor: "border-emerald-500/25",
    borderHover: "hover:border-emerald-400/80 hover:shadow-[0_20px_50px_rgba(16,185,129,0.22)]",
    cardBg: "bg-gradient-to-br from-[#0c1a16]/90 via-[#07130f]/95 to-[#0a1813]/90",
    glowColor: "rgba(16, 185, 129, 0.15)",
    accentText: "text-emerald-400",
    quoteColor: "text-emerald-500/15 group-hover:text-emerald-500/30",
    initials: "AS",
    initialsBg: "bg-gradient-to-br from-emerald-400 to-teal-500 text-neutral-950",
    text: "The renders made our product listing look clean, professional and high-converting.",
  },
  {
    name: "Creative Studio",
    role: "Art Direction & Advertising Agency",
    tag: "High-Poly CGI & Retouching",
    badgeColor: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300",
    borderColor: "border-cyan-500/25",
    borderHover: "hover:border-cyan-400/80 hover:shadow-[0_20px_50px_rgba(6,182,212,0.22)]",
    cardBg: "bg-gradient-to-br from-[#0c1524]/90 via-[#070e1b]/95 to-[#0b1320]/90",
    glowColor: "rgba(6, 182, 212, 0.15)",
    accentText: "text-cyan-400",
    quoteColor: "text-cyan-500/15 group-hover:text-cyan-500/30",
    initials: "CS",
    initialsBg: "bg-gradient-to-br from-cyan-400 to-blue-600 text-neutral-950",
    text: "Excellent modeling quality, sharp details and reliable delivery for 3D product visuals.",
  },
];

export default function TestimonialsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#070709] border-b border-white/10 px-5 py-20 sm:px-6 lg:px-10">
      {/* Background Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-3xl" />

      {/* Cyber Dot Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <span className="animate-pulse">⭐</span>
              <span>Verified Client Reviews & Industry Trust</span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trusted by Product Creators & Studios
            </h2>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md self-start sm:self-auto">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <div className="h-4 w-px bg-white/15" />
            <span className="text-xs font-semibold text-neutral-300">
              5.0 / 5.0 Rating • 100% On-Time Delivery
            </span>
          </div>
        </div>

        {/* 3 Luxury Testimonial Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative overflow-hidden rounded-3xl border ${item.borderColor} ${item.cardBg} p-7 lg:p-8 backdrop-blur-xl shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] ${item.borderHover}`}
                style={{
                  boxShadow: isHovered
                    ? `0 24px 60px -12px ${item.glowColor}, 0 10px 25px -5px rgba(0,0,0,0.7)`
                    : undefined,
                }}
              >
                {/* Large Background Quotation Mark Watermark */}
                <div
                  className={`pointer-events-none absolute right-4 top-2 text-8xl font-serif font-black leading-none select-none transition-colors duration-500 ${item.quoteColor}`}
                >
                  “
                </div>

                {/* Top Card Bar: Tag Badge & 5-Star Rating */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${item.badgeColor}`}
                  >
                    {item.tag}
                  </span>

                  {/* 5-Star Rating with subtle glow */}
                  <div className="flex items-center gap-0.5 text-xs font-bold text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
                    ★ ★ ★ ★ ★
                  </div>
                </div>

                {/* Testimonial Quote Text */}
                <p className="relative z-10 mt-6 text-sm sm:text-[15px] leading-relaxed text-neutral-200 font-normal">
                  “{item.text}”
                </p>

                {/* Client Profile Info & Initials Avatar */}
                <div className="relative z-10 mt-8 flex items-center gap-3.5 pt-5 border-t border-white/10">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono text-sm font-black shadow-md ${item.initialsBg}`}
                  >
                    {item.initials}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <p className={`text-xs font-semibold ${item.accentText}`}>
                      {item.role}
                    </p>
                  </div>

                  {/* Verified Checkmark Pill */}
                  <div className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <span>✓</span>
                    <span>Verified</span>
                  </div>
                </div>

                {/* Subtle Hover Ambient Light Sweep */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
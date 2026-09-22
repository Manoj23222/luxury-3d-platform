"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceTheme {
  id: string;
  badge: string;
  badgeInactive: string;
  badgeActive: string;
  cardInactiveBg: string;
  cardActiveBg: string;
  borderInactive: string;
  borderActive: string;
  shadowActive: string;
  glowColor: string;
  titleInactiveColor: string;
  titleActiveColor: string;
  subtitleInactiveColor: string;
  subtitleActiveColor: string;
  bodyInactiveColor: string;
  bodyActiveColor: string;
  deliverablesBoxInactive: string;
  deliverablesBoxActive: string;
  checkmarkColor: string;
  toolsInactive: string;
  toolsActive: string;
  btnInactive: string;
  btnActive: string;
  iconBgInactive: string;
  iconBgActive: string;
  lightSweepColor: string;
  defaultScale: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tools: string[];
  inquiryQuery: string;
}

const servicesList: ServiceTheme[] = [
  // CARD 01 — 3D PRODUCT MODELING & CGI (Champagne Gold / Warm Ivory / Soft Bronze)
  {
    id: "3d-modeling",
    badge: "Precision CGI & Products",
    badgeInactive: "bg-[#f8f3ec] border-[#e4d4be] text-[#845b1b]",
    badgeActive: "bg-[#fef9f0] border-[#d8b87e] text-[#6d460d] shadow-xs ring-1 ring-[#e4c48a]/50",
    cardInactiveBg: "bg-gradient-to-br from-[#faf7f2] via-[#f5efe6] to-[#eee5d8]",
    cardActiveBg: "bg-gradient-to-br from-[#fffdfa] via-[#f7ecd7] to-[#ebd7b4]",
    borderInactive: "border-[#d8c8b2]/70",
    borderActive: "border-[#c49847] ring-2 ring-[#e4bc6e]/40",
    shadowActive: "shadow-[0_24px_55px_-12px_rgba(196,152,71,0.32),0_10px_22px_-6px_rgba(0,0,0,0.08)]",
    glowColor: "rgba(217, 158, 54, 0.22)",
    titleInactiveColor: "text-stone-900",
    titleActiveColor: "text-stone-950",
    subtitleInactiveColor: "text-[#946924]",
    subtitleActiveColor: "text-[#7a5113] font-bold",
    bodyInactiveColor: "text-stone-600",
    bodyActiveColor: "text-stone-700",
    deliverablesBoxInactive: "border-[#e2d5c3] bg-[#f5ecdf]/70",
    deliverablesBoxActive: "border-[#d9be95] bg-[#faefe0]/90",
    checkmarkColor: "text-[#b07d1e]",
    toolsInactive: "border-[#dccebc] bg-white/90 text-stone-700",
    toolsActive: "border-[#cfb58f] bg-white text-stone-900 font-bold shadow-2xs",
    btnInactive: "border-[#d8c7b0] bg-[#faf6f0] text-stone-900 hover:bg-[#b07d1e] hover:text-white hover:border-[#b07d1e]",
    btnActive: "bg-gradient-to-r from-[#b58325] via-[#9e6e18] to-[#875c10] text-white shadow-md shadow-amber-950/25 hover:brightness-110",
    iconBgInactive: "bg-white border-[#dfd0be] text-stone-800",
    iconBgActive: "bg-[#fef9f0] border-[#cfab6b] text-[#6d460d] shadow-xs",
    lightSweepColor: "from-transparent via-amber-200/40 to-transparent",
    defaultScale: 0.96,
    icon: "🏺",
    title: "3D Product Modeling & Commercial CGI",
    subtitle: "Sub-D Quad Topology & Photorealistic Renderings",
    description:
      "Creating ultra-detailed 3D product models, luxury cosmetics, perfume flacons, jewelry, consumer tech, and commercial e-commerce turntable visuals.",
    deliverables: [
      "Precision Sub-D & Hard Surface Quad Meshes",
      "8K PBR Material Shaders & Texture Baking",
      "Cinematic Studio 3-Point Lighting Setups",
      "4K Photorealistic Renders & 360° Turntables",
    ],
    tools: ["Blender 4.2", "Substance 3D Painter", "Cycles", "Eevee"],
    inquiryQuery: "3D Product Modeling & Commercial CGI",
  },

  // CARD 02 — CLO 3D APPAREL & DIGITAL FASHION (Emerald / Deep Teal / Soft Mint)
  {
    id: "digital-fashion",
    badge: "Virtual Fashion & Apparel",
    badgeInactive: "bg-[#042c26]/90 border-emerald-700/50 text-emerald-200",
    badgeActive: "bg-[#033b33] border-emerald-400/60 text-emerald-100 shadow-xs ring-1 ring-emerald-400/40",
    cardInactiveBg: "bg-gradient-to-br from-[#042823] via-[#063b33] to-[#021f1b]",
    cardActiveBg: "bg-gradient-to-br from-[#03352f] via-[#055346] to-[#022621]",
    borderInactive: "border-emerald-800/50",
    borderActive: "border-emerald-400/80 ring-2 ring-emerald-300/40",
    shadowActive: "shadow-[0_24px_55px_-12px_rgba(16,185,129,0.30),0_10px_22px_-6px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(16, 185, 129, 0.22)",
    titleInactiveColor: "text-white",
    titleActiveColor: "text-white",
    subtitleInactiveColor: "text-emerald-300",
    subtitleActiveColor: "text-emerald-200 font-bold",
    bodyInactiveColor: "text-emerald-100/75",
    bodyActiveColor: "text-emerald-50",
    deliverablesBoxInactive: "border-emerald-900/60 bg-[#02211c]/60",
    deliverablesBoxActive: "border-emerald-600/40 bg-[#032e27]/85",
    checkmarkColor: "text-emerald-300",
    toolsInactive: "border-emerald-800/60 bg-[#032b24]/80 text-emerald-200",
    toolsActive: "border-emerald-500/50 bg-[#044439] text-emerald-50 font-bold shadow-2xs",
    btnInactive: "border-emerald-700/50 bg-[#032822] text-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
    btnActive: "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-md shadow-emerald-950/40 hover:brightness-110",
    iconBgInactive: "bg-[#03241f] border-emerald-800/60 text-emerald-200",
    iconBgActive: "bg-[#044136] border-emerald-400/60 text-emerald-100 shadow-xs",
    lightSweepColor: "from-transparent via-emerald-300/35 to-transparent",
    defaultScale: 0.98,
    icon: "👗",
    title: "CLO 3D Apparel & Digital Fashion",
    subtitle: "2D Pattern Drafting to Realistic Drape Physics",
    description:
      "Virtual apparel design, garment cloth simulation, multi-colorway SKU development, avatar drape fitting, and digital fashion tech-pack asset generation.",
    deliverables: [
      "2D to 3D Digital Garment Construction",
      "Dynamic Cloth Drape Physics & Tension Maps",
      "Multi-Colorway Fabric Variant Generation",
      "Virtual Try-On & Dynamic Walkcycle Assets",
    ],
    tools: ["CLO 3D", "Marvelous Designer", "Blender", "Adobe PS"],
    inquiryQuery: "CLO 3D Apparel & Digital Fashion Simulation",
  },

  // CARD 03 — HIGH-END PHOTO RETOUCHING & GRADING (Burgundy / Wine / Rose Gold)
  {
    id: "photo-retouching",
    badge: "Commercial Post-Production",
    badgeInactive: "bg-[#290715]/90 border-rose-800/50 text-rose-200",
    badgeActive: "bg-[#38091d] border-rose-400/60 text-rose-100 shadow-xs ring-1 ring-rose-400/40",
    cardInactiveBg: "bg-gradient-to-br from-[#220612] via-[#330a1c] to-[#19030d]",
    cardActiveBg: "bg-gradient-to-br from-[#2c0718] via-[#480c27] to-[#1f0310]",
    borderInactive: "border-rose-900/50",
    borderActive: "border-rose-400/80 ring-2 ring-rose-300/40",
    shadowActive: "shadow-[0_24px_55px_-12px_rgba(244,63,94,0.30),0_10px_22px_-6px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(244, 63, 94, 0.22)",
    titleInactiveColor: "text-white",
    titleActiveColor: "text-white",
    subtitleInactiveColor: "text-rose-300",
    subtitleActiveColor: "text-rose-200 font-bold",
    bodyInactiveColor: "text-rose-100/75",
    bodyActiveColor: "text-rose-50",
    deliverablesBoxInactive: "border-rose-900/60 bg-[#1c030e]/60",
    deliverablesBoxActive: "border-rose-600/40 bg-[#280514]/85",
    checkmarkColor: "text-rose-300",
    toolsInactive: "border-rose-800/60 bg-[#260514]/80 text-rose-200",
    toolsActive: "border-rose-500/50 bg-[#3a0820] text-rose-50 font-bold shadow-2xs",
    btnInactive: "border-rose-700/50 bg-[#200410] text-rose-100 hover:bg-rose-600 hover:text-white hover:border-rose-600",
    btnActive: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-950/40 hover:brightness-110",
    iconBgInactive: "bg-[#1d030f] border-rose-800/60 text-rose-200",
    iconBgActive: "bg-[#38081e] border-rose-400/60 text-rose-100 shadow-xs",
    lightSweepColor: "from-transparent via-rose-300/35 to-transparent",
    defaultScale: 1.0,
    icon: "🎨",
    title: "High-End Photo Retouching & Grading",
    subtitle: "16-Bit RAW Frequency Separation & Color Tuning",
    description:
      "Commercial e-commerce image post-production, non-destructive skin retouching, micro dodge & burn, jewelry/product cleanup, and cinematic tone grading.",
    deliverables: [
      "Advanced Frequency Separation (Natural Skin Texture)",
      "Micro Dodge & Burn for Specular Product Highlights",
      "White/Transparent Background & Clipping Paths",
      "High-Res 16-Bit RAW Color Harmony & Tone Curve",
    ],
    tools: ["Adobe Photoshop", "Adobe Lightroom", "Camera RAW"],
    inquiryQuery: "High-End Photo Retouching & Color Grading",
  },

  // CARD 04 — REAL-TIME WEB 3D & GLB OPTIMIZATION (Midnight Blue / Sapphire / Electric Blue)
  {
    id: "web-3d-optimization",
    badge: "Real-Time 60 FPS",
    badgeInactive: "bg-[#071329]/90 border-blue-800/50 text-blue-200",
    badgeActive: "bg-[#0a1e42] border-blue-400/60 text-blue-100 shadow-xs ring-1 ring-blue-400/40",
    cardInactiveBg: "bg-gradient-to-br from-[#061022] via-[#091b3b] to-[#040a17]",
    cardActiveBg: "bg-gradient-to-br from-[#071736] via-[#0c2a61] to-[#040e21]",
    borderInactive: "border-blue-900/50",
    borderActive: "border-blue-400/80 ring-2 ring-blue-300/40",
    shadowActive: "shadow-[0_24px_55px_-12px_rgba(59,130,246,0.30),0_10px_22px_-6px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(59, 130, 246, 0.22)",
    titleInactiveColor: "text-white",
    titleActiveColor: "text-white",
    subtitleInactiveColor: "text-blue-300",
    subtitleActiveColor: "text-blue-200 font-bold",
    bodyInactiveColor: "text-blue-100/75",
    bodyActiveColor: "text-blue-50",
    deliverablesBoxInactive: "border-blue-900/60 bg-[#040c1d]/60",
    deliverablesBoxActive: "border-blue-600/40 bg-[#071838]/85",
    checkmarkColor: "text-blue-300",
    toolsInactive: "border-blue-800/60 bg-[#071633]/80 text-blue-200",
    toolsActive: "border-blue-500/50 bg-[#0b2759] text-blue-50 font-bold shadow-2xs",
    btnInactive: "border-blue-700/50 bg-[#051126] text-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600",
    btnActive: "bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 text-white shadow-md shadow-blue-950/40 hover:brightness-110",
    iconBgInactive: "bg-[#050e20] border-blue-800/60 text-blue-200",
    iconBgActive: "bg-[#0a2350] border-blue-400/60 text-blue-100 shadow-xs",
    lightSweepColor: "from-transparent via-blue-300/35 to-transparent",
    defaultScale: 0.98,
    icon: "⚡",
    title: "Real-Time Web 3D & GLB Optimization",
    subtitle: "Ultra-Lightweight Three.js & glTF Assets",
    description:
      "Low-poly retopology, normal map baking, and DRACO/KTX2 mesh compression engineered for sub-second web loading and 60 FPS interactive 3D configurators.",
    deliverables: [
      "Low-Poly Game & Web Retopology",
      "High-to-Low Normal & Roughness Map Baking",
      "DRACO Geometry & KTX2 Texture Compression",
      "Three.js & WebGL Asset Integration Support",
    ],
    tools: ["GLB / glTF", "Three.js", "Draco", "Blender"],
    inquiryQuery: "Real-Time Web 3D & GLB Optimization",
  },

  // CARD 05 — AI-POWERED FULL-STACK WEB APPS (Obsidian Black / Graphite / Platinum)
  {
    id: "ai-web-apps",
    badge: "Full-Stack & AI Prompting",
    badgeInactive: "bg-[#131518]/90 border-neutral-700/50 text-neutral-300",
    badgeActive: "bg-[#1c2025] border-neutral-400/60 text-neutral-100 shadow-xs ring-1 ring-neutral-300/40",
    cardInactiveBg: "bg-gradient-to-br from-[#0e1012] via-[#16181b] to-[#0a0b0c]",
    cardActiveBg: "bg-gradient-to-br from-[#141619] via-[#212429] to-[#0d0e10]",
    borderInactive: "border-neutral-800/60",
    borderActive: "border-neutral-300/80 ring-2 ring-neutral-200/40",
    shadowActive: "shadow-[0_24px_55px_-12px_rgba(148,163,184,0.26),0_10px_22px_-6px_rgba(0,0,0,0.6)]",
    glowColor: "rgba(148, 163, 184, 0.20)",
    titleInactiveColor: "text-white",
    titleActiveColor: "text-white",
    subtitleInactiveColor: "text-neutral-300",
    subtitleActiveColor: "text-neutral-100 font-bold",
    bodyInactiveColor: "text-neutral-300/75",
    bodyActiveColor: "text-neutral-100",
    deliverablesBoxInactive: "border-neutral-800/60 bg-[#0c0d0f]/60",
    deliverablesBoxActive: "border-neutral-600/40 bg-[#16181c]/85",
    checkmarkColor: "text-emerald-400",
    toolsInactive: "border-neutral-700/60 bg-[#141619]/80 text-neutral-300",
    toolsActive: "border-neutral-500/50 bg-[#22252a] text-neutral-100 font-bold shadow-2xs",
    btnInactive: "border-neutral-700/50 bg-[#121416] text-neutral-200 hover:bg-neutral-200 hover:text-black hover:border-neutral-200",
    btnActive: "bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 text-neutral-950 font-extrabold shadow-md shadow-neutral-950/40 hover:brightness-105",
    iconBgInactive: "bg-[#101114] border-neutral-800/60 text-neutral-300",
    iconBgActive: "bg-[#202328] border-neutral-400/60 text-neutral-100 shadow-xs",
    lightSweepColor: "from-transparent via-neutral-200/35 to-transparent",
    defaultScale: 0.96,
    icon: "🌐",
    title: "AI-Powered Full-Stack Web Apps",
    subtitle: "Next.js, TypeScript, Supabase & PWA Development",
    description:
      "Rapidly developing production-grade web applications, quick-commerce PWAs, and 3D web platforms using cutting-edge AI prompt engineering workflows.",
    deliverables: [
      "Custom Next.js & React Full-Stack Web Apps",
      "Mobile-First PWA with Offline & App-Like UX",
      "Supabase & MongoDB Database Architecture",
      "Production Deployment & Custom Domain DNS",
    ],
    tools: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    inquiryQuery: "AI-Powered Full-Stack Web Development",
  },
];

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 py-8 sm:py-10 lg:py-12 text-white select-none"
    >
      {/* Subtle Ambient Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/60 via-neutral-950 to-black z-0" />

      {/* Dynamic Follow Spotlight Behind Active Card */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-72 sm:w-[420px] h-[340px] rounded-full blur-3xl transition-all duration-700 ease-out hidden xl:block z-0"
        style={{
          left: `${activeIdx * 20 + 10}%`,
          transform: "translate(-50%, -50%)",
          backgroundColor: servicesList[activeIdx]?.glowColor,
        }}
      />

      {/* Cyber Diamond Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] xl:max-w-[1580px] 2xl:max-w-[1660px] w-full px-3 sm:px-5 lg:px-6">
        {/* LUXURY EDITORIAL CONTAINER - WIDER & COMPACT HEIGHT */}
        <div className="relative overflow-hidden rounded-[26px] sm:rounded-[30px] border border-white/10 bg-gradient-to-br from-neutral-900/85 via-neutral-950/95 to-neutral-900/85 p-4 sm:p-5 lg:p-6 shadow-2xl backdrop-blur-2xl">
          {/* Subtle Ambient Corner Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Banner Top Header - Clean Title with balanced gap */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Production Capabilities &amp; Services
              </h2>
            </div>

            {/* Active Service Status Counter */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-[11px] text-neutral-300 font-mono shadow-xs backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      activeIdx === 0
                        ? "#d99e36"
                        : activeIdx === 1
                        ? "#10b981"
                        : activeIdx === 2
                        ? "#f43f5e"
                        : activeIdx === 3
                        ? "#3b82f6"
                        : "#e2e8f0",
                  }}
                />
                Service 0{activeIdx + 1} / 0{servicesList.length}
              </span>
            </div>
          </div>

          {/* 5-Column Grid of Distinct Luxury Focus Cards (Wider Width & Compact Height) */}
          <div
            className="relative z-10 mt-4 sm:mt-5 grid gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch"
            style={{
              perspective: "1600px",
              transformStyle: "preserve-3d",
            }}
          >
            {servicesList.map((service, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`service-luxury-card group relative flex flex-col justify-between overflow-hidden rounded-[22px] sm:rounded-[24px] lg:rounded-[26px] p-3.5 sm:p-4 transition-all duration-400 ease-out select-none border ${
                    isActive
                      ? `${service.cardActiveBg} ${service.borderActive} ${service.shadowActive} z-20`
                      : `${service.cardInactiveBg} ${service.borderInactive} opacity-90 shadow-md hover:opacity-100 z-10`
                  }`}
                  style={{
                    transform: isActive
                      ? "translateY(-6px) scale(1.04) translateZ(20px) rotateX(1deg)"
                      : `translateY(0px) scale(${service.defaultScale}) translateZ(0px) rotateX(0deg)`,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, box-shadow",
                  }}
                >
                  {/* Studio Lighting Moving Highlight (Runs when card becomes active) */}
                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 -translate-x-full -translate-y-full animate-[studioSweep_1s_ease-out_forwards] bg-gradient-to-br from-white/30 via-white/10 to-transparent" />
                  )}

                  <div className="relative z-10">
                    {/* Top Badge & Icon Row */}
                    <div className="flex items-center justify-between gap-1.5">
                      {/* Icon */}
                      <div
                        className={`flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl border text-base sm:text-lg shadow-xs transition-all duration-300 ${
                          isActive
                            ? `${service.iconBgActive} scale-100 rotate-0 shadow-xs`
                            : `${service.iconBgInactive} scale-95 -rotate-2`
                        }`}
                      >
                        <span>{service.icon}</span>
                      </div>

                      {/* Top Category Badge */}
                      <div className="relative overflow-hidden rounded-full">
                        <span
                          className={`inline-block rounded-full border px-2 py-0.5 text-[9px] sm:text-[9.5px] font-bold tracking-tight transition-all duration-300 ${
                            isActive
                              ? `${service.badgeActive} scale-100 opacity-100`
                              : `${service.badgeInactive} scale-96 opacity-85`
                          }`}
                        >
                          {service.badge}
                        </span>

                        {/* Light sweep across active badge */}
                        {isActive && (
                          <div
                            className={`pointer-events-none absolute inset-0 -translate-x-full animate-[badgeSweep_1.2s_ease-out_forwards] bg-gradient-to-r ${service.lightSweepColor}`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-2.5 text-[13px] sm:text-[13.5px] font-black leading-snug tracking-tight transition-all duration-300 ${
                        isActive
                          ? `${service.titleActiveColor} opacity-100`
                          : `${service.titleInactiveColor} opacity-90`
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Subtitle */}
                    <p
                      className={`mt-0.5 text-[10px] sm:text-[10.5px] font-bold truncate transition-colors duration-300 ${
                        isActive
                          ? service.subtitleActiveColor
                          : service.subtitleInactiveColor
                      }`}
                    >
                      {service.subtitle}
                    </p>

                    {/* Description (Compact line-clamp-2) */}
                    <p
                      className={`mt-1.5 text-[10.5px] sm:text-[11px] leading-relaxed font-medium line-clamp-2 transition-all duration-300 ${
                        isActive
                          ? `${service.bodyActiveColor} opacity-100`
                          : `${service.bodyInactiveColor} opacity-85`
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Key Deliverables Box (Compact) */}
                    <div
                      className={`mt-2 rounded-xl border p-2 sm:p-2.5 transition-colors duration-300 ${
                        isActive
                          ? service.deliverablesBoxActive
                          : service.deliverablesBoxInactive
                      }`}
                    >
                      <p className="text-[8.5px] font-extrabold uppercase tracking-wider mb-1 flex items-center justify-between opacity-80">
                        <span>Key Deliverables:</span>
                        {isActive && (
                          <span className={`font-bold text-[8px] ${service.checkmarkColor}`}>
                            ✦ Active
                          </span>
                        )}
                      </p>
                      <ul className="space-y-1 text-[10px] sm:text-[10.5px]">
                        {service.deliverables.slice(0, 4).map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-1 transition-all duration-300"
                            style={{
                              transform: isActive
                                ? "translateX(0px)"
                                : "translateX(-3px)",
                              opacity: isActive ? 1 : 0.85,
                              transitionDelay: `${dIdx * 60}ms`,
                            }}
                          >
                            <span
                              className={`font-bold shrink-0 transition-transform duration-300 text-[10px] ${
                                service.checkmarkColor
                              } ${isActive ? "scale-105" : "scale-100"}`}
                            >
                              ✓
                            </span>
                            <span
                              className={`truncate leading-tight ${
                                isActive
                                  ? service.bodyActiveColor
                                  : service.bodyInactiveColor
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools Chips */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold transition-all duration-200 ${
                            isActive ? service.toolsActive : service.toolsInactive
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inquire CTA Button */}
                  <div className="mt-2.5 pt-2 border-t border-white/10">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(
                        `Service Inquiry: ${service.inquiryQuery}`
                      )}`}
                      className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-center text-[10.5px] sm:text-[11px] font-bold transition-all duration-300 ${
                        isActive ? service.btnActive : service.btnInactive
                      }`}
                    >
                      <span>Inquire Service</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination & Hover Guidance */}
          <div className="relative z-10 mt-4 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-neutral-300 text-[11px]">
                0{activeIdx + 1} / 0{servicesList.length}
              </span>
              <div className="flex items-center gap-1.5 ml-1.5">
                {servicesList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveIdx(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === dotIdx
                        ? "w-6 bg-white shadow-xs"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    title={`Go to service 0${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
              <span>🖱️ Hover over any service to explore</span>
              <span>•</span>
              <span className="font-semibold text-white">
                {servicesList[activeIdx]?.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactCTA() {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  const capabilityBadges = [
    {
      icon: "🌐",
      text: "AI Prompt-Engineered Websites & Apps",
      theme: "border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]",
      glow: "rgba(16, 185, 129, 0.4)",
    },
    {
      icon: "⚡",
      text: "JavaScript • TypeScript • Next.js",
      theme: "border-blue-500/40 bg-blue-950/40 text-blue-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: "🏺",
      text: "3D CGI • CLO 3D Fashion • Retouching",
      theme: "border-amber-500/40 bg-amber-950/40 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]",
      glow: "rgba(245, 158, 11, 0.4)",
    },
    {
      icon: "🌍",
      text: "Remote Worldwide Availability",
      theme: "border-teal-500/40 bg-teal-950/40 text-teal-300 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(20,184,166,0.35)]",
      glow: "rgba(20, 184, 166, 0.4)",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050507] py-16 sm:py-20 text-white border-b border-white/10">
      {/* Dynamic Ambient Glow Orbs in Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Glowing Main Container */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0e1622]/90 via-[#080d14]/95 to-[#130f1e]/90 p-8 sm:p-14 lg:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center">
          {/* Animated Gradient Accent Border Frame */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors duration-700" />

          {/* Cyber Dot Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #34d399 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Subtle Ambient Light Sweep */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl group-hover:bg-teal-500/20 transition-all duration-700" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6 sm:space-y-7">
            {/* Top Status Beacon Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 text-xs font-bold text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>AVAILABLE FOR NEW COMMISSIONS & FULL-STACK BUILDS</span>
            </div>

            {/* Title with Luxury Metallic / Emerald Gradient */}
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Have a 3D Modeling or Photo Retouching Project?
            </h2>

            {/* Description Text */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Direct all 3D product modeling commissions, CLO 3D virtual fashion simulations, and commercial photo retouching requirements to my desk.{" "}
              <strong className="text-white font-semibold">
                Also available for custom website development & web applications built rapidly using advanced AI Prompt Engineering, JavaScript / TypeScript, Next.js, React, and modern cloud databases.
              </strong>
            </p>

            {/* 4 Capability Badges with Individual Glowing Colors */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs">
              {capabilityBadges.map((badge, idx) => (
                <span
                  key={idx}
                  onMouseEnter={() => setHoveredBadge(idx)}
                  onMouseLeave={() => setHoveredBadge(null)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-semibold shadow-sm transition-all duration-300 cursor-default hover:-translate-y-0.5 ${badge.theme}`}
                >
                  <span className="text-sm">{badge.icon}</span>
                  <span>{badge.text}</span>
                </span>
              ))}
            </div>

            {/* Action CTA Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-7 py-3.5 text-sm font-black text-neutral-950 shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
              >
                <span>Start a Project / Hire Me</span>
                <span className="text-base">→</span>
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95"
              >
                <span>Explore Full Portfolio</span>
                <span className="text-neutral-400">⚡</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
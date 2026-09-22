"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StepPhase {
  step: string;
  stepNum: number;
  title: string;
  subtitle: string;
  text: string;
  icon: string;
  quickBadge: string;
  meaning: string;
  accentColor: string;
  textColor: string;
  cardActiveBg: string;
  cardInactiveBg: string;
  borderActive: string;
  borderInactive: string;
  shadowActive: string;
  glowColor: string;
  dotColor: string;
  pillActiveColor: string;
}

const steps: StepPhase[] = [
  // PHASE 01 — DISCOVERY & SPECS (Warm Champagne / Gold)
  {
    step: "01",
    stepNum: 1,
    title: "Brief & Technical Discovery",
    subtitle: "Project Scoping & References",
    text: "Reviewing brand moodboards, CAD drawings, tech-pack measurements, target poly-budget, and visual objectives.",
    icon: "📋",
    quickBadge: "01. Discovery & Specs",
    meaning: "Concept, briefing, planning",
    accentColor: "text-amber-400",
    textColor: "text-amber-300",
    cardActiveBg: "bg-gradient-to-br from-[#1e170a]/95 via-[#2b210c]/90 to-[#141005]/95",
    cardInactiveBg: "bg-gradient-to-br from-neutral-900/85 via-neutral-950/90 to-neutral-900/85",
    borderActive: "border-amber-500/80 ring-2 ring-amber-400/30",
    borderInactive: "border-white/10",
    shadowActive: "shadow-[0_24px_55px_-10px_rgba(217,119,6,0.30),0_10px_20px_-5px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(217, 119, 6, 0.22)",
    dotColor: "bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.9)]",
    pillActiveColor: "bg-amber-500/20 border-amber-400/50 text-amber-300 ring-1 ring-amber-400/30",
  },

  // PHASE 02 — SUB-D & PATTERN DRAFTING (Deep Indigo / Violet)
  {
    step: "02",
    stepNum: 2,
    title: "3D Modeling & Pattern Drafting",
    subtitle: "Blender Sub-D & CLO 3D Patterning",
    text: "Constructing clean quad subdivision topology in Blender and drafting accurate 2D-to-3D garment patterns in CLO 3D.",
    icon: "📐",
    quickBadge: "02. Sub-D & Pattern Drafting",
    meaning: "Technical construction & modeling",
    accentColor: "text-indigo-400",
    textColor: "text-indigo-300",
    cardActiveBg: "bg-gradient-to-br from-[#13122b]/95 via-[#1d1a40]/90 to-[#0d0c1e]/95",
    cardInactiveBg: "bg-gradient-to-br from-neutral-900/85 via-neutral-950/90 to-neutral-900/85",
    borderActive: "border-indigo-500/80 ring-2 ring-indigo-400/30",
    borderInactive: "border-white/10",
    shadowActive: "shadow-[0_24px_55px_-10px_rgba(99,102,241,0.30),0_10px_20px_-5px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(99, 102, 241, 0.22)",
    dotColor: "bg-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.9)]",
    pillActiveColor: "bg-indigo-500/20 border-indigo-400/50 text-indigo-300 ring-1 ring-indigo-400/30",
  },

  // PHASE 03 — 8K PBR & RAY-TRACING (Emerald / Teal)
  {
    step: "03",
    stepNum: 3,
    title: "PBR Shading & Studio Lighting",
    subtitle: "Ray-Traced Shaders & Real Fabric Physics",
    text: "Applying 8K PBR materials, cloth drape physics, custom subsurface scattering, and cinematic 3-point ray-traced lighting.",
    icon: "💡",
    quickBadge: "03. 8K PBR & Ray-Tracing",
    meaning: "Materials, lighting & realism",
    accentColor: "text-emerald-400",
    textColor: "text-emerald-300",
    cardActiveBg: "bg-gradient-to-br from-[#06241c]/95 via-[#093529]/90 to-[#041712]/95",
    cardInactiveBg: "bg-gradient-to-br from-neutral-900/85 via-neutral-950/90 to-neutral-900/85",
    borderActive: "border-emerald-500/80 ring-2 ring-emerald-400/30",
    borderInactive: "border-white/10",
    shadowActive: "shadow-[0_24px_55px_-10px_rgba(16,185,129,0.30),0_10px_20px_-5px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(16, 185, 129, 0.22)",
    dotColor: "bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]",
    pillActiveColor: "bg-emerald-500/20 border-emerald-400/50 text-emerald-300 ring-1 ring-emerald-400/30",
  },

  // PHASE 04 — 60 FPS GLB & 4K CGI (Sapphire / Electric Blue)
  {
    step: "04",
    stepNum: 4,
    title: "Real-Time Optimization & Delivery",
    subtitle: "60 FPS GLB / 4K Commercial Renders",
    text: "Exporting validated GLB/glTF web assets, high-resolution commercial CGI renders, and organized source packages.",
    icon: "🚀",
    quickBadge: "04. 60 FPS GLB & 4K CGI",
    meaning: "Optimization, real-time & delivery",
    accentColor: "text-sky-400",
    textColor: "text-sky-300",
    cardActiveBg: "bg-gradient-to-br from-[#071b38]/95 via-[#0c2c5c]/90 to-[#041226]/95",
    cardInactiveBg: "bg-gradient-to-br from-neutral-900/85 via-neutral-950/90 to-neutral-900/85",
    borderActive: "border-sky-500/80 ring-2 ring-sky-400/30",
    borderInactive: "border-white/10",
    shadowActive: "shadow-[0_24px_55px_-12px_rgba(56,189,248,0.32),0_10px_20px_-5px_rgba(0,0,0,0.5)]",
    glowColor: "rgba(56, 189, 248, 0.22)",
    dotColor: "bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.9)]",
    pillActiveColor: "bg-sky-500/20 border-sky-400/50 text-sky-300 ring-1 ring-sky-400/30",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const lastActiveRef = useRef(0);

  const effectiveActive = hoveredIdx !== null ? hoveredIdx : activeIdx;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const mm = gsap.matchMedia();

      // Desktop & Large Screens (>= 1024px): Controlled Pinned Production Pipeline
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: `+=${(steps.length - 1) * 650}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIdx = Math.floor(self.progress * steps.length);
            const clampedIdx = Math.min(steps.length - 1, Math.max(0, rawIdx));
            if (lastActiveRef.current !== clampedIdx) {
              lastActiveRef.current = clampedIdx;
              setActiveIdx(clampedIdx);
            }
          },
        });
      });

      // Mobile / Tablet (< 1024px): Trigger each card as it scrolls through viewport
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".pipeline-phase-card", sectionEl);
        cards.forEach((card, idx) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => setActiveIdx(idx),
            onEnterBack: () => setActiveIdx(idx),
          });
        });
      });

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate Pipeline Progress line percentage (25%, 50%, 75%, 100%)
  const progressPercent = ((effectiveActive + 1) / steps.length) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 py-10 sm:py-14 lg:py-16 text-white select-none"
    >
      {/* Subtle Ambient Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/60 via-neutral-950 to-black z-0" />

      {/* Dynamic Follow Spotlight Behind Active Pipeline Card */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-[380px] rounded-full blur-3xl transition-all duration-700 ease-out hidden xl:block z-0"
        style={{
          left: `${(effectiveActive / (steps.length - 1)) * 75 + 12.5}%`,
          transform: "translate(-50%, -50%)",
          backgroundColor: steps[effectiveActive]?.glowColor,
        }}
      />

      {/* Subtle Pipeline / Cyber Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1480px] xl:max-w-[1580px] 2xl:max-w-[1660px] w-full px-3 sm:px-5 lg:px-6">
        {/* LUXURY BANNER CONTAINER */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] border border-white/10 bg-gradient-to-br from-neutral-900/85 via-neutral-950/95 to-neutral-900/85 p-5 sm:p-7 lg:p-8 shadow-2xl backdrop-blur-2xl">
          {/* Subtle Ambient Corner Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

          {/* Banner Top Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 sm:pb-6 border-b border-white/10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-3.5 py-1 text-xs font-bold text-neutral-200 mb-3 shadow-xs backdrop-blur-md">
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      effectiveActive === 0
                        ? "#fbbf24"
                        : effectiveActive === 1
                        ? "#818cf8"
                        : effectiveActive === 2
                        ? "#34d199"
                        : "#38bdf8",
                  }}
                />
                <span className="tracking-wide uppercase text-[11px]">
                  4-Phase Production Pipeline
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                From Concept to Production-Ready 3D
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                A structured, quality-controlled design pipeline engineered for flawless execution on commercial campaigns and real-time 3D viewers.
              </p>

              {/* Quick Spec Badges with Live Pipeline Highlighting */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {steps.map((item, bIdx) => {
                  const isCurrent = effectiveActive === bIdx;
                  const isDone = effectiveActive > bIdx;

                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveIdx(bIdx)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-[11px] font-semibold transition-all duration-300 ${
                        isCurrent
                          ? `${item.pillActiveColor} scale-105 shadow-sm`
                          : isDone
                          ? "bg-white/10 border-white/20 text-neutral-200"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-neutral-200 hover:border-white/20"
                      }`}
                    >
                      <span className="font-bold">
                        {isDone ? "✓" : item.icon}
                      </span>
                      <span>{item.quickBadge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button with Special Glow when Phase 4 completes */}
            <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
              <Link
                href="/contact?subject=New%20Project%20Workflow%20Inquiry"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-black transition-all duration-300 ${
                  effectiveActive === 3
                    ? "bg-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] scale-105 ring-2 ring-sky-300"
                    : "bg-white shadow-md hover:bg-neutral-200 hover:scale-105"
                }`}
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ================= HORIZONTAL PRODUCTION PIPELINE CONNECTOR (DESKTOP) ================= */}
          <div className="relative z-10 mt-6 hidden lg:block">
            {/* Background Base Track */}
            <div className="relative h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
              {/* Dynamic Glowing Filled Progress Line */}
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-indigo-400 via-emerald-400 to-sky-400 transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            {/* Step Pipeline Nodes along the Track */}
            <div className="relative -mt-[11px] flex justify-between px-6 xl:px-10 pointer-events-none">
              {steps.map((item, pIdx) => {
                const isCurrent = effectiveActive === pIdx;
                const isPassed = effectiveActive > pIdx;

                return (
                  <div
                    key={item.step}
                    className="flex flex-col items-center"
                    style={{
                      width: "25%",
                    }}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                        isCurrent
                          ? `${item.dotColor} text-black scale-125 ring-4 ring-white/10`
                          : isPassed
                          ? "bg-emerald-500/80 border-emerald-400 text-white shadow-xs"
                          : "bg-neutral-900 border-white/20 text-neutral-500"
                      }`}
                    >
                      {isPassed ? "✓" : isCurrent ? "●" : "○"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= 4 CONNECTED PRODUCTION STAGE CARDS ================= */}
          <div
            className="relative z-10 mt-6 sm:mt-8 grid gap-4 sm:gap-4.5 md:grid-cols-2 lg:grid-cols-4 items-stretch"
            style={{
              perspective: "1600px",
              transformStyle: "preserve-3d",
            }}
          >
            {steps.map((item, idx) => {
              const isActive = effectiveActive === idx;
              const isCompleted = effectiveActive > idx;

              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`pipeline-phase-card group relative flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] p-5 sm:p-5.5 transition-all duration-500 ease-out select-none border ${
                    isActive
                      ? `${item.cardActiveBg} ${item.borderActive} ${item.shadowActive} z-20`
                      : `${item.cardInactiveBg} ${item.borderInactive} opacity-88 shadow-md hover:opacity-100 z-10`
                  }`}
                  style={{
                    transform: isActive
                      ? "translateY(-8px) scale(1.04) translateZ(24px) rotateX(1deg)"
                      : "translateY(0px) scale(0.98) translateZ(0px) rotateX(0deg)",
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, box-shadow",
                  }}
                >
                  {/* Subtle Studio Lighting Sweep across active card */}
                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 -translate-x-full -translate-y-full animate-[studioSweep_1s_ease-out_forwards] bg-gradient-to-br from-white/25 via-white/10 to-transparent" />
                  )}

                  <div className="relative z-10">
                    {/* Top Row: Phase Number & Icon */}
                    <div className="flex items-center justify-between">
                      {/* Large Phase Number */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-3xl sm:text-4xl font-black tracking-tighter transition-all duration-300 ${
                            isActive
                              ? `${item.accentColor} scale-105 opacity-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`
                              : isCompleted
                              ? "text-emerald-400/80 scale-95 opacity-70"
                              : "text-neutral-600 scale-95 opacity-40"
                          }`}
                        >
                          {item.step}
                        </span>
                        {isCompleted && (
                          <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-bold">
                            ✓ Done
                          </span>
                        )}
                        {isActive && (
                          <span className="rounded-full bg-white/10 border border-white/20 px-2 py-0.5 text-[9px] font-bold text-white animate-pulse">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-xl shadow-xs transition-all duration-300 ${
                          isActive
                            ? "bg-white/10 border-white/20 scale-105 rotate-0 shadow-sm"
                            : "bg-white/5 border-white/10 scale-95 -rotate-2 text-neutral-400"
                        }`}
                      >
                        <span>{item.icon}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-4 text-base sm:text-lg font-black leading-snug tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-200"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Subtitle */}
                    <p
                      className={`mt-0.5 text-xs font-bold transition-colors duration-300 ${
                        isActive ? item.textColor : "text-neutral-400"
                      }`}
                    >
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs leading-relaxed text-neutral-300 font-medium">
                      {item.text}
                    </p>
                  </div>

                  {/* Bottom Phase Badge & Quality Indicator */}
                  <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10.5px] font-semibold">
                    <span className="text-neutral-400">
                      Phase {item.step} • {item.meaning.split(",")[0]}
                    </span>
                    <span
                      className={`flex items-center gap-1 font-bold ${
                        isActive
                          ? item.textColor
                          : isCompleted
                          ? "text-emerald-400"
                          : "text-neutral-500"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      <span>{isCompleted ? "Verified ✓" : "Quality Controlled"}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= BOTTOM PIPELINE STATUS & SCROLL HINT ================= */}
          <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-neutral-300">
                Phase 0{effectiveActive + 1} of 0{steps.length} —{" "}
                <span className={steps[effectiveActive]?.textColor}>
                  {steps[effectiveActive]?.title}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11.5px]">
              <span>🖱️ Scroll to advance production pipeline</span>
              <span>•</span>
              <span className="font-semibold text-white">
                Step 0{effectiveActive + 1} Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
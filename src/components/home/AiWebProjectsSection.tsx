"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WebProject {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  aiBadge: string;
  description: string;
  techStack: string[];
  features: string[];
  liveUrl: string;
  liveUrlLabel: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  icon: string;
  accentBorder: string;
  glowColor: string;
  taglineColor: string;
}

const projects: WebProject[] = [
  {
    id: "bootkit",
    title: "BootKiT — Quick-Commerce & Grocery Delivery Platform",
    tagline: "High-Performance Mobile-First E-Commerce Progressive Web App",
    badge: "🛒 Full-Stack E-Commerce & PWA",
    badgeColor: "bg-emerald-950/80 border-emerald-400/40 text-emerald-300",
    aiBadge: "🤖 AI-Prompt Engineered",
    description:
      "A production-grade, ultra-responsive quick-commerce grocery delivery web platform designed for 10–20 minute delivery workflows. Built with rapid AI prompt engineering combining modern full-stack architectures, instant search indexing, and native-feeling mobile PWA navigation.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
      "PWA",
      "AI Prompting",
    ],
    features: [
      "Instant product catalogue with multi-category filters (Beauty, Electronics, Pharmacy, Groceries)",
      "Real-time live search with voice-assisted search input & dynamic discount coupon banners",
      "Full cart management, responsive checkout flows, and localized delivery address selection",
      "Mobile-first Progressive Web App (PWA) with native app-like bottom navigation & smooth drawer",
      "Production-deployed on Vercel with custom domain integration (bootkit.in)",
    ],
    liveUrl: "https://www.bootkit.in/",
    liveUrlLabel: "Visit Live (bootkit.in) ↗",
    secondaryUrl: "https://bootkit.vercel.app/",
    secondaryUrlLabel: "Vercel Mirror ↗",
    icon: "🛍️",
    accentBorder:
      "border-emerald-500/35 hover:border-emerald-400/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.14)]",
    glowColor: "from-emerald-500/15 via-teal-500/5 to-transparent",
    taglineColor: "text-emerald-400",
  },
  {
    id: "lux3d",
    title: "Lux3D — 3D & AI Creative Web Platform",
    tagline: "Interactive 3D WebGL Visualization & Creative Studio Platform",
    badge: "🧊 3D WebGL & Creative Platform",
    badgeColor: "bg-purple-950/80 border-purple-400/40 text-purple-300",
    aiBadge: "🤖 AI-Assisted Architecture",
    description:
      "A luxury digital portfolio and 3D asset visualization platform engineered with Three.js WebGL orbit controls, interactive Before/After photo retouching split sliders, and a custom real-time visitor traffic analytics engine.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Three.js / WebGL",
      "MongoDB",
      "Tailwind CSS 4",
      "AI Workflows",
    ],
    features: [
      "Real-time 60 FPS 3D WebGL model inspection with OrbitControls for Blender/GLB assets",
      "Interactive Before/After photo retouching comparison slider with high-res lightbox modals",
      "Built-in in-house live visitor traffic tracking analytics and device distribution dashboard",
      "Admin studio management hub with drag-and-drop file uploader pipeline",
      "Ultra-clean luxury typography, responsive layout, and zero-latency performance",
    ],
    liveUrl: "/portfolio",
    liveUrlLabel: "Explore 3D Web Platform ↗",
    secondaryUrl: "/photo-editing",
    secondaryUrlLabel: "Photo Retouching Studio ↗",
    icon: "💎",
    accentBorder:
      "border-purple-500/35 hover:border-purple-400/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(168,85,247,0.14)]",
    glowColor: "from-purple-500/15 via-fuchsia-500/5 to-transparent",
    taglineColor: "text-purple-300",
  },
];

export default function AiWebProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastActiveIdxRef = useRef(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(
        ".ai-web-project-card",
        sectionRef.current
      );
      if (!cards || cards.length === 0 || !sectionRef.current) return;

      // 1. Initial 3D Setup with explicit transformPerspective & transformOrigin
      gsap.set(cards, {
        transformPerspective: 1600,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      // Card 0 flat in center (0deg), Card 1 flipped (-90deg)
      gsap.set(cards[0], {
        rotationX: 0,
        scale: 1,
        opacity: 1,
        zIndex: 20,
        pointerEvents: "auto",
      });

      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], {
          rotationX: -90,
          scale: 0.94,
          opacity: 0,
          zIndex: 10,
          pointerEvents: "none",
        });
      }

      // 2. Master ScrollTrigger Pin & Vertical 3D Flip Timeline
      const numTransitions = cards.length - 1;
      if (numTransitions > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${numTransitions * 2400}`, // Generous scroll runway for distinct 3D flip
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIdx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.05))
              );
              if (lastActiveIdxRef.current !== activeIdx) {
                lastActiveIdxRef.current = activeIdx;
                setActiveCardIndex(activeIdx);
              }
            },
          },
        });

        const stepDuration = 1 / numTransitions;

        for (let i = 0; i < numTransitions; i++) {
          const startTime = i * stepDuration;
          const halfStep = stepDuration * 0.5;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          // Phase 1: Current Card flips forward around horizontal center axis (0deg -> 90deg) & fades out
          tl.to(
            currentCard,
            {
              rotationX: 90,
              scale: 0.92,
              opacity: 0,
              ease: "power1.in",
              duration: halfStep,
              zIndex: 15,
              onStart: () => {
                currentCard.style.pointerEvents = "auto";
              },
              onComplete: () => {
                currentCard.style.pointerEvents = "none";
              },
              onReverseComplete: () => {
                currentCard.style.pointerEvents = "auto";
              },
            },
            startTime
          );

          // Phase 2: Next Card rotates into the exact same center position (-90deg -> 0deg) & reveals
          tl.fromTo(
            nextCard,
            {
              rotationX: -90,
              scale: 0.92,
              opacity: 0,
              zIndex: 25,
              pointerEvents: "none",
            },
            {
              rotationX: 0,
              scale: 1,
              opacity: 1,
              ease: "power1.out",
              duration: halfStep,
              zIndex: 25,
              immediateRender: false,
              onStart: () => {
                nextCard.style.pointerEvents = "none";
              },
              onComplete: () => {
                nextCard.style.pointerEvents = "auto";
              },
              onReverseComplete: () => {
                nextCard.style.pointerEvents = "none";
              },
            },
            startTime + halfStep
          );
        }
      }

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden border-b border-neutral-800 bg-neutral-950 text-white flex flex-col justify-between py-6 sm:py-10 select-none"
    >
      {/* Background Ambient Radial Tech Lights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/60 via-neutral-950 to-black z-0" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-purple-500/10 rounded-full blur-3xl z-0" />

      {/* Cyber Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        {/* TOP BANNER CONTAINER - LUXURY DARK GLASS THEME */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-950/90 to-neutral-900/80 p-5 sm:p-7 lg:p-8 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-between">
          {/* Subtle Corner Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

          {/* Banner Top Header - Clean balanced gap */}
          <div className="relative z-10 pb-2 mb-2 border-b border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Featured Web Applications &amp; Platforms
            </h2>
          </div>

          {/* ================= CENTER FIXED-POSITION 3D FLIP STAGE (LARGER & LUXURY) ================= */}
          <div
            className="relative z-10 mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[530px] xs:h-[550px] sm:h-[500px] lg:h-[480px] xl:h-[480px] my-4"
            style={{
              perspective: "1800px",
              perspectiveOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`ai-web-project-card absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border ${project.accentBorder} bg-gradient-to-br from-neutral-900/95 via-neutral-900/90 to-neutral-950 p-5 sm:p-7 lg:p-8 shadow-2xl select-none backdrop-blur-xl`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                {/* Top Glass Rim Highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Ambient Top Glow reacting to project */}
                <div
                  className={`pointer-events-none absolute -top-20 inset-x-0 h-40 bg-gradient-to-b ${project.glowColor}`}
                />

                <div className="relative z-10">
                  {/* Badges & Icon Row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-xl shadow-xs backdrop-blur-md">
                        {project.icon}
                      </span>
                      <span
                        className={`rounded-full border px-3.5 py-1 text-[11px] font-bold shadow-xs backdrop-blur-md ${project.badgeColor}`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        Project 0{idx + 1} / 0{projects.length}
                      </span>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-[10.5px] font-extrabold tracking-wide">
                        {project.aiBadge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-3.5 text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {project.title}
                  </h3>
                  <p className={`mt-0.5 text-xs sm:text-sm font-bold ${project.taglineColor} drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]`}>
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-neutral-300 font-medium">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Tech Stack &amp; Architecture:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-neutral-200 shadow-2xs backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables & Features */}
                  <div className="mt-3.5 rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4 backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Key Production Features Built:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs text-neutral-200">
                      {project.features.slice(0, 4).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="relative z-10 mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-black shadow-lg transition duration-200 hover:bg-emerald-400 hover:scale-105"
                    >
                      <span>{project.liveUrlLabel}</span>
                    </a>

                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target={project.secondaryUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white shadow-xs transition duration-200 hover:border-white hover:bg-white/15"
                      >
                        <span>{project.secondaryUrlLabel}</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live &amp; Production Ready</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= STEP INDICATOR & SCROLL HINT ================= */}
          <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-neutral-300">
                Project 0{activeCardIndex + 1} of 0{projects.length}
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                {projects.map((_, pIdx) => (
                  <div
                    key={pIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCardIndex === pIdx
                        ? "w-8 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
              <span>🖱️ Scroll to flip project card in place</span>
              <span>•</span>
              <span className="font-semibold text-emerald-400">Vertical 3D Page Flip</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

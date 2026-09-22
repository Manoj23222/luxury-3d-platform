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
}

const projects: WebProject[] = [
  {
    id: "bootkit",
    title: "BootKiT — Quick-Commerce & Grocery Delivery Platform",
    tagline: "High-Performance Mobile-First E-Commerce Progressive Web App",
    badge: "🛒 Full-Stack E-Commerce & PWA",
    badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
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
    accentBorder: "border-emerald-300/80 shadow-emerald-500/10",
  },
  {
    id: "lux3d",
    title: "Lux3D — 3D & AI Creative Web Platform",
    tagline: "Interactive 3D WebGL Visualization & Creative Studio Platform",
    badge: "🧊 3D WebGL & Creative Platform",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-800",
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
    accentBorder: "border-purple-300/80 shadow-purple-500/10",
  },
];

export default function AiWebProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0 || !sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // 1. Initial State: Card 0 flat in place (0deg), subsequent cards rotated -90deg out of view
      cards.forEach((card, idx) => {
        if (idx === 0) {
          gsap.set(card, {
            rotateX: 0,
            opacity: 1,
            scale: 1,
            zIndex: 20,
            transformOrigin: "center center",
            force3D: true,
          });
        } else {
          gsap.set(card, {
            rotateX: prefersReducedMotion ? 0 : -90,
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.96,
            zIndex: 10,
            transformOrigin: "center center",
            force3D: true,
          });
        }
      });

      // 2. Master ScrollTrigger Pin & Vertical 3D Flip Timeline
      const numTransitions = cards.length - 1;
      if (numTransitions > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${numTransitions * 1600}`, // Controlled scroll length for smooth deliberate flip
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIdx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.02))
              );
              setActiveCardIndex(activeIdx);
            },
          },
        });

        const stepDuration = 1 / numTransitions;

        for (let i = 0; i < numTransitions; i++) {
          const startTime = i * stepDuration;
          const halfStep = stepDuration * 0.5;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          if (prefersReducedMotion) {
            // Accessible Crossfade for reduced motion users
            tl.to(
              currentCard,
              {
                opacity: 0,
                duration: halfStep,
                ease: "power1.inOut",
                zIndex: 10,
              },
              startTime
            );
            tl.to(
              nextCard,
              {
                opacity: 1,
                duration: halfStep,
                ease: "power1.inOut",
                zIndex: 20,
              },
              startTime + halfStep
            );
          } else {
            // Phase 1: Current Card flips forward around horizontal center axis (0deg -> 90deg)
            tl.to(
              currentCard,
              {
                rotateX: 90,
                scale: 0.96,
                opacity: 0,
                ease: "power2.in",
                duration: halfStep,
                zIndex: 15,
              },
              startTime
            );

            // Phase 2: Next Card rotates into the exact same center position (-90deg -> 0deg)
            tl.fromTo(
              nextCard,
              {
                rotateX: -90,
                scale: 0.96,
                opacity: 0,
                zIndex: 25,
              },
              {
                rotateX: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                duration: halfStep,
                zIndex: 25,
              },
              startTime + halfStep
            );
          }
        }
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden border-b border-neutral-200 bg-white py-8 sm:py-12 text-neutral-900 flex flex-col justify-between select-none"
    >
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        {/* TOP BANNER CONTAINER */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 p-5 sm:p-7 lg:p-8 shadow-xl flex-1 flex flex-col justify-between">
          {/* Ambient Tech Glows & Matrix Texture */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

          {/* Subtle Circuit / Dot Matrix Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Banner Top Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-emerald-100/80">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 border border-emerald-300/80 px-3.5 py-1 text-xs font-bold text-emerald-900 mb-2 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="tracking-wide uppercase text-[10.5px]">
                  Full-Stack &amp; Web Engineering Hub
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
                Featured Web Applications &amp; Platforms
              </h2>

              <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Production-grade web applications and high-conversion platforms built rapidly using advanced{" "}
                <strong>AI Prompt Engineering</strong>, Next.js, React, TypeScript, and modern cloud databases.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
              <Link
                href="/contact?subject=Web%20Development%20%26%20AI%20App%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-neutral-800 hover:scale-105"
              >
                <span>Hire for Web Development</span>
                <span>✉️</span>
              </Link>
            </div>
          </div>

          {/* ================= CENTER FIXED-POSITION 3D FLIP STAGE ================= */}
          <div
            className="relative z-10 mx-auto w-full max-w-4xl lg:max-w-5xl h-[520px] xs:h-[540px] sm:h-[490px] lg:h-[470px] my-4"
            style={{
              perspective: "1600px",
              perspectiveOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border ${project.accentBorder} bg-white p-5 sm:p-7 lg:p-8 shadow-2xl transition-shadow select-none`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                <div>
                  {/* Badges & Icon Row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 text-xl shadow-2xs">
                        {project.icon}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-[10.5px] font-bold ${project.badgeColor}`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
                        Project 0{idx + 1} / 0{projects.length}
                      </span>
                      <span className="rounded-full bg-neutral-950 text-white px-3 py-0.5 text-[10.5px] font-extrabold tracking-wide">
                        {project.aiBadge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-3.5 text-lg sm:text-xl lg:text-2xl font-black text-black">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-bold text-neutral-500">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-neutral-700 font-medium">
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
                          className="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] sm:text-[10.5px] font-bold text-neutral-800 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables & Features */}
                  <div className="mt-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-3 sm:p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Key Production Features Built:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs text-neutral-700">
                      {project.features.slice(0, 4).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-4 pt-3.5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-600"
                    >
                      <span>{project.liveUrlLabel}</span>
                    </a>

                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target={project.secondaryUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-800 shadow-xs transition hover:border-black"
                      >
                        <span>{project.secondaryUrlLabel}</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live &amp; Production Ready</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= STEP INDICATOR & SCROLL HINT ================= */}
          <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-neutral-700">
                Project 0{activeCardIndex + 1} of 0{projects.length}
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                {projects.map((_, pIdx) => (
                  <div
                    key={pIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCardIndex === pIdx
                        ? "w-7 bg-emerald-600 shadow-xs"
                        : "w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
              <span>🖱️ Scroll to flip project card in place</span>
              <span>•</span>
              <span className="font-semibold text-emerald-800">Vertical 3D Page Flip</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

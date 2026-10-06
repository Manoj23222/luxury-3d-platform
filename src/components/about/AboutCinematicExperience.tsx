"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import WireframeCube from "./WireframeCube";

// ============================================================================
// DATA DEFINITIONS (DIRECT FROM public/About/Ashok Meena – About (White & Gray).md)
// ============================================================================

interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: "blender",
    name: "Blender 3D",
    subtitle: "Hard-surface CGI, PBR shading, real-time GLB",
    description:
      "Subdivision modeling, procedural PBR shaders, studio three-point lighting, low-poly retopology, Cycles and Eevee renders, and web-ready GLB/glTF files.",
    tags: [
      "Product modeling",
      "UV unwrapping & baking",
      "Photorealistic CGI",
      "GLB/glTF optimization",
    ],
  },
  {
    id: "clo3d",
    name: "CLO 3D",
    subtitle: "Digital fashion and virtual garments",
    description:
      "2D pattern construction to 3D garment simulation, with multi-layer fabric drape physics, micro-seam stitching and cloth animation for luxury apparel.",
    tags: [
      "2D to 3D patterning",
      "Fabric physics",
      "3D fit validation",
      "PBR apparel texturing",
    ],
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    subtitle: "Photo retouching and post-production",
    description:
      "16-bit RAW commercial retouching, non-destructive frequency separation, skin texture preservation, catalog enhancement and editorial color grading.",
    tags: [
      "Frequency separation",
      "Background removal",
      "Clipping paths",
      "Color grading",
    ],
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    subtitle: "Vector precision and technical branding",
    description:
      "Vector illustration, apparel tech-packs, brand identity systems, logo construction, typography layout and print-ready packaging assets.",
    tags: [
      "Logo design",
      "Apparel tech-packs",
      "Packaging design",
      "Color separation",
    ],
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    subtitle: "RAW grading and studio lighting",
    description:
      "Batch commercial grading, tonal curve calibration, balanced highlights and shadows, and consistent high-volume photo catalogues.",
    tags: [
      "Tone curves",
      "Batch processing",
      "Noise reduction",
      "Selective masking",
    ],
  },
  {
    id: "canva",
    name: "Canva",
    subtitle: "Graphic design and marketing",
    description:
      "Fast social media banners, presentation decks, e-commerce graphics and promotional kits for quick turnaround.",
    tags: [
      "Social graphics",
      "Banners",
      "Presentation decks",
      "Brand templates",
    ],
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    subtitle: "Production tracking and workflow",
    description:
      "Asset inventory cataloging, SKU metadata indexing, delivery schedules, validation formulas and client specification tracking.",
    tags: [
      "Asset cataloging",
      "SKU indexing",
      "Quality checklists",
      "Scheduling",
    ],
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    subtitle: "AI-assisted web engineering",
    description:
      "Agentic AI workflows and prompt engineering to build full-stack Next.js and Three.js applications and deploy them quickly.",
    tags: [
      "TypeScript & Next.js",
      "Three.js",
      "Prompt engineering",
      "Multi-agent workflows",
    ],
  },
];

const MARQUEE_TOOLS = [
  "Blender",
  "CLO 3D",
  "Photoshop",
  "Illustrator",
  "Lightroom",
  "Canva",
  "Three.js",
  "Next.js",
];

// ============================================================================
// COUNT-UP NUMBER HELPER COMPONENT
// ============================================================================
function CounterNumber({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// ============================================================================
// SCROLL-DRIVEN STATEMENT SENTENCE WORD COMPONENT
// ============================================================================
function ScrollWord({
  word,
  progress,
  start,
  end,
  isDark,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  isDark: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  const color = useTransform(
    progress,
    [start, end],
    isDark ? ["#8E8E91", "#FAFAF9"] : ["#8E8E91", "#2A2A2C"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
}

// ============================================================================
// MAGNETIC BUTTON COMPONENT (FOR CONTACT SECTION)
// ============================================================================
function MagneticButton({
  href,
  children,
  isDark,
}: {
  href: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.32, y: y * 0.32 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.5 }}
      className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-medium transition-colors select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
        isDark
          ? "bg-[#FAFAF9] text-[#2A2A2C] hover:bg-[#EFEFED] focus-visible:ring-[#FAFAF9]"
          : "bg-[#2A2A2C] text-[#FAFAF9] hover:bg-[#1E1E20] focus-visible:ring-[#2A2A2C]"
      }`}
    >
      {children}
    </motion.a>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AboutCinematicExperience() {
  const [isDark, setIsDark] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const statementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const statementParagraph1 =
    "I turn clothing, products and ideas into precise 3D models and flawless images, made to look right on screen and run smoothly in real time.";
  const statementParagraph2 =
    "With six years of experience, I handle everything from 3D modeling, UV unwrapping and PBR texturing to lighting, typography and asset optimization, always with strict quality control.";

  const words1 = statementParagraph1.split(" ");
  const words2 = statementParagraph2.split(" ");
  const totalWords = words1.length + words2.length;

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ease-out ${
        isDark
          ? "bg-[#1C1C1E] text-[#FAFAF9] selection:bg-[#FAFAF9] selection:text-[#1C1C1E]"
          : "bg-[#FAFAF9] text-[#2A2A2C] selection:bg-[#2A2A2C] selection:text-[#FAFAF9]"
      }`}
    >
      {/* ==================================================================== */}
      {/* TOP SUB-NAV & LUXURY CONTROLS */}
      {/* ==================================================================== */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 flex items-center justify-between border-b border-current/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-wider uppercase text-[#8E8E91]">
            Curriculum Vitae
          </span>
          <span className="hidden sm:inline-block text-[#8E8E91]/40">/</span>
          <span className="hidden sm:inline-block font-mono text-xs text-[#8E8E91]">
            White & Gray Architecture
          </span>
        </div>

        {/* Theme Toggle Button & Resume Link */}
        <div className="flex items-center gap-3">
          <a
            href="/Ashok_Resume.pdf"
            download="Ashok_Meena_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
              isDark
                ? "border-[#EFEFED]/30 text-[#EFEFED] hover:border-[#FAFAF9] hover:bg-[#FAFAF9]/10"
                : "border-[#2A2A2C]/30 text-[#2A2A2C] hover:border-[#2A2A2C] hover:bg-[#2A2A2C]/5"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF
          </a>

          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer select-none focus-visible:ring-2 focus-visible:outline-none ${
              isDark
                ? "border-[#FAFAF9]/30 bg-[#2A2A2C] text-[#FAFAF9] hover:border-[#FAFAF9]"
                : "border-[#2A2A2C]/20 bg-[#EFEFED] text-[#2A2A2C] hover:border-[#2A2A2C]"
            }`}
          >
            {isDark ? (
              <>
                <svg className="w-3.5 h-3.5 text-amber-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <span>Light</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-[#2A2A2C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. HERO SECTION */}
      {/* ==================================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[7.5rem] font-semibold tracking-[-0.04em] leading-[0.88] select-none uppercase"
              >
                <span className="block">Ashok</span>
                <span className="block text-[#8E8E91]">Meena</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="space-y-3 max-w-2xl"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight">
                Senior 3D Designer & Photo Editor
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#8E8E91] font-normal">
                Creating, optimizing and delivering high-fidelity 3D assets for digital fashion, e-commerce and real-time 3D web simulators.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-current/10 font-mono text-xs"
            >
              <div>
                <span className="block text-[#8E8E91] uppercase tracking-wider text-[10px]">Studio</span>
                <span className="font-medium mt-0.5 block">Infoeye Software</span>
              </div>
              <div>
                <span className="block text-[#8E8E91] uppercase tracking-wider text-[10px]">Based in</span>
                <span className="font-medium mt-0.5 block">Sardarshahar, Rajasthan</span>
              </div>
              <div>
                <span className="block text-[#8E8E91] uppercase tracking-wider text-[10px]">Languages</span>
                <span className="font-medium mt-0.5 block">Hindi, English</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center">
            <WireframeCube isDark={isDark} />
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. BIG SCROLL-REVEAL STATEMENT SENTENCE */}
      {/* ==================================================================== */}
      <section
        ref={statementRef}
        className={`py-16 sm:py-24 border-y border-current/10 transition-colors ${
          isDark ? "bg-[#18181A]" : "bg-[#EFEFED]/50"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 space-y-6 sm:space-y-8">
          <p className="text-xl sm:text-3xl lg:text-4xl font-light leading-[1.28] tracking-tight">
            {words1.map((word, i) => {
              const start = (i / totalWords) * 0.9;
              const end = ((i + 1) / totalWords) * 0.9;
              return (
                <ScrollWord
                  key={`w1-${i}`}
                  word={word}
                  progress={statementProgress}
                  start={start}
                  end={end}
                  isDark={isDark}
                />
              );
            })}
          </p>

          <p className="text-lg sm:text-2xl lg:text-3xl font-light leading-[1.32] tracking-tight">
            {words2.map((word, i) => {
              const start = ((words1.length + i) / totalWords) * 0.95;
              const end = ((words1.length + i + 1) / totalWords) * 0.95;
              return (
                <ScrollWord
                  key={`w2-${i}`}
                  word={word}
                  progress={statementProgress}
                  start={start}
                  end={end}
                  isDark={isDark}
                />
              );
            })}
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. COUNT-UP NUMBERS */}
      {/* ==================================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-current/10 pb-14">
          <div className="space-y-1">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              <CounterNumber target={6} suffix="+" />
            </div>
            <p className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider">
              Years of experience
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              <CounterNumber target={300} suffix="+" />
            </div>
            <p className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider">
              Production-ready 3D models
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              <CounterNumber target={8} />
            </div>
            <p className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider">
              Production tools
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. SKILLS LIST */}
      {/* ==================================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
              Skills
            </h2>
            <p className="text-sm text-[#8E8E91] mt-1">
              Eight tools that cover the full pipeline, from model to final image to web.
            </p>
          </div>
          <span className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider">
            Hover or tap row to explore
          </span>
        </div>

        <div className="border-b border-current/15">
          {SKILLS_DATA.map((skill, index) => {
            const isActive = activeSkillId === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setActiveSkillId(skill.id)}
                onMouseLeave={() => setActiveSkillId(null)}
                onClick={() =>
                  setActiveSkillId(activeSkillId === skill.id ? null : skill.id)
                }
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveSkillId(activeSkillId === skill.id ? null : skill.id);
                  }
                }}
                className={`group border-t border-current/15 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${
                  isActive
                    ? isDark
                      ? "bg-[#FAFAF9] text-[#2A2A2C] px-5 sm:px-6 py-6 sm:py-7"
                      : "bg-[#2A2A2C] text-[#FAFAF9] px-5 sm:px-6 py-6 sm:py-7"
                    : "hover:px-3 py-4 sm:py-5"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#8E8E91] group-hover:text-inherit">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight">
                      {skill.name}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-xs transition-colors ${
                      isActive ? "text-inherit/80" : "text-[#8E8E91]"
                    }`}
                  >
                    {skill.subtitle}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="pt-4 sm:pt-5 space-y-4 max-w-4xl"
                  >
                    <p className="text-sm leading-relaxed text-inherit/90">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${
                            isDark
                              ? "border-[#2A2A2C]/20 bg-[#2A2A2C]/5 text-[#2A2A2C]"
                              : "border-[#FAFAF9]/20 bg-[#FAFAF9]/10 text-[#FAFAF9]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. JOURNEY TIMELINE */}
      {/* ==================================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
            Journey
          </h2>
          <p className="text-sm text-[#8E8E91] mt-1">
            Work and study, side by side.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 border-l-2 border-current/15 pl-5 sm:pl-8 ml-2">
          <div className="relative space-y-2">
            <span
              className={`absolute -left-[27px] sm:-left-[39px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                isDark
                  ? "bg-[#1C1C1E] border-[#FAFAF9]"
                  : "bg-[#FAFAF9] border-[#2A2A2C]"
              }`}
            />
            <span className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider block">
              2020 – Present
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight">
              Senior 3D Designer & Photo Editor
            </h3>
            <p className="font-mono text-xs text-[#8E8E91]">
              Infoeye Software, Sardarshahar, Rajasthan
            </p>

            <ul className="space-y-1.5 pt-1 text-sm text-inherit/80 max-w-3xl leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#8E8E91] mt-0.5 shrink-0">—</span>
                <span>Model, simulate and optimize 3D apparel and hard-surface assets in Blender and CLO 3D.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8E8E91] mt-0.5 shrink-0">—</span>
                <span>Delivered 300+ production-ready 3D models with strict quality control for international client platforms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8E8E91] mt-0.5 shrink-0">—</span>
                <span>Lead non-destructive 16-bit RAW retouching, frequency separation and color grading.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8E8E91] mt-0.5 shrink-0">—</span>
                <span>Build lightweight OBJ and GLB/glTF files with PBR materials for real-time 60 FPS web configurators.</span>
              </li>
            </ul>
          </div>

          <div className="relative space-y-1.5">
            <span
              className={`absolute -left-[27px] sm:-left-[39px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                isDark
                  ? "bg-[#1C1C1E] border-[#FAFAF9]"
                  : "bg-[#FAFAF9] border-[#2A2A2C]"
              }`}
            />
            <span className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider block">
              2025 – 2026 (ongoing)
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight">
              M.Sc. in Computer Science
            </h3>
            <p className="font-mono text-xs text-[#8E8E91]">
              Maharaja Ganga Singh University, Bikaner
            </p>
          </div>

          <div className="relative space-y-1.5">
            <span
              className={`absolute -left-[27px] sm:-left-[39px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                isDark
                  ? "bg-[#1C1C1E] border-[#FAFAF9]"
                  : "bg-[#FAFAF9] border-[#2A2A2C]"
              }`}
            />
            <span className="font-mono text-xs text-[#8E8E91] uppercase tracking-wider block">
              Graduated 2024
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight">
              Bachelor of Arts (B.A.)
            </h3>
            <p className="font-mono text-xs text-[#8E8E91]">
              Maharaja Ganga Singh University, Bikaner
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. SLOW MARQUEE STRIP */}
      {/* ==================================================================== */}
      <div className="w-full overflow-hidden border-y border-current/10 py-4 select-none bg-current/5">
        <div className="flex w-max animate-marquee space-x-6 items-center font-mono text-xs sm:text-sm tracking-widest uppercase text-[#8E8E91]">
          {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS, ...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map(
            (tool, index) => (
              <span key={`${tool}-${index}`} className="flex items-center gap-6">
                <span>{tool}</span>
                <span className="text-current/30">·</span>
              </span>
            )
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 7. CONTACT SECTION */}
      {/* ==================================================================== */}
      <footer id="contact" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 space-y-10 sm:space-y-12">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight">
            Let&apos;s build something <span className="italic font-normal">flawless.</span>
          </h2>

          <div className="pt-2">
            <MagneticButton href="mailto:ashokm3414@gmail.com" isDark={isDark}>
              <span>Get in touch</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </MagneticButton>
          </div>
        </div>

        <div className="pt-8 border-t border-current/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E8E91]">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="mailto:ashokm3414@gmail.com" className="hover:text-inherit hover:underline transition-colors">
              ashokm3414@gmail.com
            </a>
            <a href="tel:+918000093300" className="hover:text-inherit hover:underline transition-colors">
              +91 80000 93300
            </a>
            <a
              href="/Ashok_Resume.pdf"
              download="Ashok_Meena_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-inherit hover:opacity-75 transition-opacity"
            >
              Download résumé (PDF)
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>© 2026 Ashok Meena</span>
            <span>·</span>
            <a href="https://infoeye.com/company/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Infoeye Software
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
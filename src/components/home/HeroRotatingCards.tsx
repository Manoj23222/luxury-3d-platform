"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface RotatingCard {
  id: number;
  tag: string;
  tagColor: string;
  icon: string;
  title: string;
  companyOrRole: string;
  location: string;
  badge: string;
  description: string;
  keyPoints: string[];
  skills: string[];
  externalLinks: { label: string; url: string; highlight?: boolean }[];
}

const cardsData: RotatingCard[] = [
  {
    id: 1,
    tag: "Current Company & Recognition",
    tagColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: "🏢",
    title: "Infoeye Software",
    companyOrRole: "Senior 3D & Graphic Designer (2020 – Present | 6+ Years)",
    location: "Sardarshahar, Rajasthan, India",
    badge: "Active Studio Position",
    description:
      "Leading 3D garment simulation, precision hard-surface asset creation, and real-time digital asset optimization for international client platforms.",
    keyPoints: [
      "Delivered 300+ production-ready 3D models with strict quality control",
      "Executive Staff Feature: Infoeye President personally visited Ashok's home for dinner",
      "Specialized in CLO 3D, Blender, and Adobe Creative Suite production pipelines",
    ],
    skills: ["Blender", "CLO 3D", "Photoshop", "PBR Materials", "GLB/glTF"],
    externalLinks: [
      {
        label: "🏆 President Home Visit Article ↗",
        url: "https://infoeye.com/news/staff/11540/",
        highlight: true,
      },
      {
        label: "Company Profile ↗",
        url: "https://infoeye.com/company/",
      },
      {
        label: "Infoeye Portal ↗",
        url: "https://infoeye.org/",
      },
    ],
  },
  {
    id: 2,
    tag: "Digital Fashion & Simulation",
    tagColor: "bg-purple-50 border-purple-200 text-purple-800",
    icon: "👕",
    title: "CLO 3D Apparel Specialist",
    companyOrRole: "Virtual Garment Construction & Avatar Drape Simulation",
    location: "Digital Fashion & Virtual Apparel Studio",
    badge: "100+ Fashion Assets",
    description:
      "Creating hyper-realistic digital garments, intricate fabric physics, custom seams, and real-time 3D configurators for fashion brands.",
    keyPoints: [
      "2D pattern drafting to 3D realistic garment draping & cloth physics",
      "Multi-colorway SKU generation and high-res fabric PBR texture rendering",
      "Avatar fitting, dynamic walk animation physics, and virtual try-on assets",
    ],
    skills: ["CLO 3D", "Fabric Physics", "Patterning", "Drape Simulation", "Tech-Packs"],
    externalLinks: [
      {
        label: "👗 Explore 3D Garments ↗",
        url: "/portfolio",
        highlight: true,
      },
      {
        label: "Pattern Drafting Specs ↗",
        url: "/portfolio",
      },
      {
        label: "Drape Physics ↗",
        url: "/portfolio",
      },
    ],
  },
  {
    id: 3,
    tag: "Hard Surface & Luxury CGI",
    tagColor: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "🏺",
    title: "Product 3D & Visualization",
    companyOrRole: "Sub-D & Precision Hard-Surface Modeling in Blender",
    location: "Precision Hard-Surface & Product CGI Studio",
    badge: "Luxury CGI Ready",
    description:
      "Developing photorealistic 3D product visualizations, perfume bottles, cosmetics packaging, jewelry, and high-end marketing CGI.",
    keyPoints: [
      "Precision hard-surface modeling with clean sub-division quad topology",
      "Studio 3-point lighting setups and cinematic ray-traced product renders",
      "Packaging visualization & e-commerce interactive turntable asset pipeline",
    ],
    skills: ["Blender 3D", "Hard Surface", "Studio Lighting", "Cycles", "Eevee Next"],
    externalLinks: [
      {
        label: "💎 View 3D Products ↗",
        url: "/portfolio",
        highlight: true,
      },
      {
        label: "Studio Lighting CGI ↗",
        url: "/portfolio",
      },
      {
        label: "Cycles Turntables ↗",
        url: "/portfolio",
      },
    ],
  },
  {
    id: "4" as unknown as number,
    tag: "Real-Time Web 3D Pipeline",
    tagColor: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "⚡",
    title: "Web 3D & GLB Optimization",
    companyOrRole: "Ultra-Lightweight 60 FPS Real-Time Browser Assets",
    location: "Real-Time Web 3D & Engine Optimization",
    badge: "60 FPS Web Optimized",
    description:
      "Engineered low-poly meshes, clean UV unwrapping, and PBR texture map baking specifically tuned for web browsers and Three.js 3D viewers.",
    keyPoints: [
      "Low-poly retopology with high-poly normal map detail baking",
      "DRACO / KTX2 texture compression for instant sub-second loading",
      "Production-ready GLB / glTF export validation for web simulators",
    ],
    skills: ["GLB / glTF", "UV Unwrapping", "Texture Baking", "Three.js", "Draco"],
    externalLinks: [
      {
        label: "⚡ Real-Time 3D Web ↗",
        url: "/portfolio",
        highlight: true,
      },
      {
        label: "Draco Compression ↗",
        url: "/portfolio",
      },
      {
        label: "GLB Validations ↗",
        url: "/portfolio",
      },
    ],
  },
  {
    id: 5,
    tag: "Commercial Post-Production",
    tagColor: "bg-rose-50 border-rose-200 text-rose-800",
    icon: "🎨",
    title: "High-End Photo Retouching",
    companyOrRole: "Editorial, Fashion & Commercial E-Commerce Retouching",
    location: "16-Bit RAW Post-Production Studio",
    badge: "Adobe PS / LR Expert",
    description:
      "Non-destructive 16-bit RAW image post-processing, micro dodge & burn, frequency separation, and high-end cinematic color grading.",
    keyPoints: [
      "Advanced frequency separation for natural skin pores and textures",
      "Micro dodge & burn for luxury product highlights and studio depth",
      "Catalog batch enhancement with consistent commercial color profiles",
    ],
    skills: ["Photoshop", "Lightroom", "Dodge & Burn", "Color Grading", "Camera RAW"],
    externalLinks: [
      {
        label: "📸 Before & After Library ↗",
        url: "/photo-editing",
        highlight: true,
      },
      {
        label: "Beauty Retouching ↗",
        url: "/photo-editing",
      },
      {
        label: "Color Grading ↗",
        url: "/photo-editing",
      },
    ],
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per card

export default function HeroRotatingCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timer (4.0s interval)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardsData.length);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const currentCard = cardsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-white via-neutral-50/70 to-neutral-100/50 text-neutral-900 pt-24 pb-16 lg:pt-32 lg:pb-20">
      {/* Background Ambient Glows and Subtle Dot Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[600px] rounded-full bg-gradient-to-br from-emerald-100/50 via-blue-100/30 to-purple-100/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* ================= LEFT COLUMN: DETAILS & PROFILE ================= */}
          <div className="lg:col-span-6 space-y-5 text-left">
            {/* Live Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-800 shadow-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Senior 3D & Digital Fashion Designer</span>
              <span className="text-neutral-300">•</span>
              <a
                href="https://infoeye.com/company/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline"
              >
                Infoeye Software ↗
              </a>
            </div>

            {/* Name & Headline */}
            <div>
              <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl lg:text-6xl">
                Ashok Meena
              </h1>
              <p className="mt-2 text-sm sm:text-base font-bold text-neutral-700">
                CLO 3D Apparel • Hard Surface 3D • Real-Time Web GLB • Retouching
              </p>
            </div>

            {/* Bio with Company details & Links */}
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 max-w-xl">
              Senior 3D & Graphic Designer with <strong className="text-black font-bold">6+ years of professional experience</strong> at{" "}
              <a
                href="https://infoeye.com/company/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline"
              >
                Infoeye Software
              </a>{" "}
              (Sardarshahar, Rajasthan). Proven mastery in creating, simulating, and optimizing high-fidelity 3D garments and hard-surface assets with <strong className="text-black font-bold">300+ production-ready 3D models</strong> delivered for international platforms.
            </p>

            {/* Company Links & President Visit Recognition Banner */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <a
                href="https://infoeye.com/news/staff/11540/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 font-bold text-amber-900 shadow-xs transition hover:bg-amber-100"
              >
                <span>🏆</span>
                <span>President Home Visit Story ↗</span>
              </a>

              <a
                href="https://infoeye.com/company/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-semibold text-neutral-700 shadow-xs transition hover:border-black hover:text-black"
              >
                Infoeye Company ↗
              </a>

              <a
                href="https://infoeye.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-semibold text-neutral-700 shadow-xs transition hover:border-black hover:text-black"
              >
                Infoeye.org ↗
              </a>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href="/portfolio"
                className="rounded-full bg-black px-6 py-3 text-xs font-bold text-white shadow-md transition duration-200 hover:bg-neutral-800 hover:scale-105"
              >
                Explore 3D Portfolio →
              </Link>

              <Link
                href="/photo-editing"
                className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-black shadow-xs transition duration-200 hover:border-black"
              >
                Photo Retouching
              </Link>

              <a
                href="/Ashok_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-5 py-3 text-xs font-bold text-neutral-800 transition duration-200 hover:border-black hover:bg-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume PDF
              </a>

              <Link
                href="/contact"
                className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-neutral-800 transition duration-200 hover:border-black hover:text-black"
              >
                Contact
              </Link>
            </div>

            {/* Key Metric Stats Row: Clean White Cards */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-neutral-200 max-w-lg">
              <div className="rounded-2xl border border-neutral-200 bg-white p-2.5 text-center shadow-xs">
                <p className="text-lg font-black text-black sm:text-xl">6+ Yrs</p>
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                  Experience
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-2.5 text-center shadow-xs">
                <p className="text-lg font-black text-emerald-700 sm:text-xl">Infoeye</p>
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                  Company
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-2.5 text-center shadow-xs">
                <p className="text-lg font-black text-black sm:text-xl">300+</p>
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                  Models
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-2.5 text-center shadow-xs">
                <p className="text-lg font-black text-black sm:text-xl">100%</p>
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                  PBR / QC
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: WHITE ROTATING CARDS FRAME ================= */}
          <div
            className="lg:col-span-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Outer White Card Container with Fixed Constant Height */}
            <div className="relative rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7 shadow-xl transition duration-300 hover:border-black h-[540px] sm:h-[530px] flex flex-col justify-between overflow-hidden">
              {/* Top Bar with Card Index & Controls */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5 shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${currentCard.tagColor}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                    {currentCard.tag}
                  </span>
                  <span className="text-[10px] text-neutral-400 hidden sm:inline">
                    (Auto-Rotating 4s)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    0{currentIndex + 1} / 0{cardsData.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous card"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-800 transition hover:bg-black hover:text-white cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next card"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-800 transition hover:bg-black hover:text-white cursor-pointer"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Animated Progress Bar for Auto-rotation (4s Interval) */}
              <div className="relative mt-2.5 h-1 w-full overflow-hidden rounded-full bg-neutral-100 shrink-0">
                <div
                  key={`${currentIndex}-${isPaused}`}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-full"
                  style={{
                    animation: isPaused ? "none" : "progressFill 4000ms linear forwards",
                    width: isPaused ? "100%" : "0%",
                  }}
                />
              </div>

              {/* Main White Card Content: Consistent Fixed Grid Structure */}
              <div
                key={currentCard.id}
                className="mt-3.5 flex-1 flex flex-col justify-between"
              >
                {/* Header with Icon, Title, and Role */}
                <div className="flex items-start gap-3.5 shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 text-2xl shadow-xs">
                    {currentCard.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-base sm:text-lg font-black text-black truncate">
                        {currentCard.title}
                      </h2>
                      <span className="rounded-full bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 text-[10px] font-bold text-neutral-700 shrink-0">
                        {currentCard.badge}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-emerald-700 truncate">
                      {currentCard.companyOrRole}
                    </p>

                    <p className="text-[11px] text-neutral-500 truncate">
                      📍 {currentCard.location}
                    </p>
                  </div>
                </div>

                {/* Description - Fixed 2 lines */}
                <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-2 h-[34px]">
                  {currentCard.description}
                </p>

                {/* Key Points - Consistent 3 rows */}
                <div className="mt-2 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-3 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    Key Highlights & Responsibilities:
                  </p>
                  <ul className="space-y-1 text-[11.5px] text-neutral-700">
                    {currentCard.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="truncate">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* External Links */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 h-[28px] overflow-hidden">
                  {currentCard.externalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`rounded-lg px-2.5 py-0.5 text-[10.5px] font-bold transition truncate ${
                        link.highlight
                          ? "bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 shadow-xs"
                          : "bg-white border border-neutral-200 text-neutral-700 hover:border-black hover:text-black shadow-xs"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Skills Chips */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-100">
                  <span className="text-[10px] font-bold text-neutral-400 mr-1">Tools:</span>
                  {currentCard.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[10.5px] font-semibold text-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Frame Switcher Pills */}
              <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 flex-wrap gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  {cardsData.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        currentIndex === idx
                          ? "w-8 bg-black"
                          : "w-2 bg-neutral-200 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[10.5px] text-neutral-400">
                  <span>Hover to pause</span>
                  <span>•</span>
                  <span>Auto 4s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

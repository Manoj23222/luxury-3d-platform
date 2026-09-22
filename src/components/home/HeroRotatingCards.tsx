"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RotatingCard {
  id: number;
  tag: string;
  tagColor: string;
  themeGlow: string;
  cardBg: string;
  borderColor: string;
  watermarkIcon: string;
  accentBar: string;
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
    tagColor: "bg-emerald-100/90 border-emerald-300 text-emerald-900 font-bold",
    themeGlow: "from-emerald-500/25 via-teal-500/15 to-transparent",
    cardBg: "bg-gradient-to-br from-emerald-50/95 via-white to-teal-50/70",
    borderColor: "border-emerald-300/80 hover:border-emerald-500",
    watermarkIcon: "🏢",
    accentBar: "from-emerald-500 via-teal-400 to-transparent",
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
    tagColor: "bg-purple-100/90 border-purple-300 text-purple-900 font-bold",
    themeGlow: "from-purple-500/25 via-fuchsia-500/15 to-transparent",
    cardBg: "bg-gradient-to-br from-purple-50/95 via-white to-fuchsia-50/70",
    borderColor: "border-purple-300/80 hover:border-purple-500",
    watermarkIcon: "👗",
    accentBar: "from-purple-500 via-fuchsia-400 to-transparent",
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
    tagColor: "bg-amber-100/90 border-amber-300 text-amber-900 font-bold",
    themeGlow: "from-amber-500/25 via-orange-500/15 to-transparent",
    cardBg: "bg-gradient-to-br from-amber-50/95 via-white to-orange-50/70",
    borderColor: "border-amber-300/80 hover:border-amber-500",
    watermarkIcon: "💎",
    accentBar: "from-amber-500 via-orange-400 to-transparent",
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
    id: 4,
    tag: "Real-Time Web 3D Pipeline",
    tagColor: "bg-blue-100/90 border-blue-300 text-blue-900 font-bold",
    themeGlow: "from-blue-500/25 via-cyan-500/15 to-transparent",
    cardBg: "bg-gradient-to-br from-blue-50/95 via-white to-cyan-50/70",
    borderColor: "border-blue-300/80 hover:border-blue-500",
    watermarkIcon: "⚡",
    accentBar: "from-blue-500 via-cyan-400 to-transparent",
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
    tagColor: "bg-rose-100/90 border-rose-300 text-rose-900 font-bold",
    themeGlow: "from-rose-500/25 via-red-500/15 to-transparent",
    cardBg: "bg-gradient-to-br from-rose-50/95 via-white to-red-50/70",
    borderColor: "border-rose-300/80 hover:border-rose-500",
    watermarkIcon: "🎨",
    accentBar: "from-rose-500 via-red-400 to-transparent",
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

export default function HeroRotatingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastActiveIdxRef = useRef(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(
        ".hero-card-item",
        sectionRef.current
      );
      if (!cards || cards.length === 0 || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      // 1. Initial 3D Deck Setup
      gsap.set(cards, {
        x: 0,
        y: (i) => (i === 0 ? 0 : i * 8),
        scale: (i) => (i === 0 ? 1 : 1 - i * 0.035),
        rotation: (i) => (i === 0 ? 0 : i % 2 === 1 ? 2 : -2),
        opacity: (i) => (i === 0 ? 1 : Math.max(0.3, 1 - i * 0.2)),
        zIndex: (i) => 20 - i,
        transformOrigin: "center center",
        force3D: true,
      });

      // Desktop & Large Screens (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3200", // Generous smooth scroll runway for 5 cards on desktop
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.05))
              );
              if (lastActiveIdxRef.current !== idx) {
                lastActiveIdxRef.current = idx;
                setActiveCardIndex(idx);
              }
            },
          },
        });

        const numSteps = cards.length - 1;
        const stepDuration = 1 / numSteps;

        for (let i = 0; i < numSteps; i++) {
          const startTime = i * stepDuration;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          const exitX = i % 2 === 0 ? "-130%" : "130%";
          const exitRotation = i % 2 === 0 ? -14 : 14;

          tl.to(
            currentCard,
            {
              x: exitX,
              y: -20,
              rotation: exitRotation,
              scale: 0.88,
              opacity: 0,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 30,
            },
            startTime
          );

          tl.to(
            nextCard,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 25,
            },
            startTime
          );

          for (let k = i + 2; k < cards.length; k++) {
            const behindCard = cards[k];
            const depthIdx = k - (i + 1);
            tl.to(
              behindCard,
              {
                y: depthIdx * 10,
                scale: 1 - depthIdx * 0.04,
                opacity: Math.max(0.3, 1 - depthIdx * 0.2),
                ease: "power1.inOut",
                duration: stepDuration,
              },
              startTime
            );
          }
        }
      });

      // Mobile & Tablet (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2200", // Snappy responsive scroll runway for mobile
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.05))
              );
              if (lastActiveIdxRef.current !== idx) {
                lastActiveIdxRef.current = idx;
                setActiveCardIndex(idx);
              }
            },
          },
        });

        const numSteps = cards.length - 1;
        const stepDuration = 1 / numSteps;

        for (let i = 0; i < numSteps; i++) {
          const startTime = i * stepDuration;
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          const exitX = i % 2 === 0 ? "-120%" : "120%";
          const exitRotation = i % 2 === 0 ? -10 : 10;

          tl.to(
            currentCard,
            {
              x: exitX,
              y: -15,
              rotation: exitRotation,
              scale: 0.9,
              opacity: 0,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 30,
            },
            startTime
          );

          tl.to(
            nextCard,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 25,
            },
            startTime
          );

          for (let k = i + 2; k < cards.length; k++) {
            const behindCard = cards[k];
            const depthIdx = k - (i + 1);
            tl.to(
              behindCard,
              {
                y: depthIdx * 8,
                scale: 1 - depthIdx * 0.035,
                opacity: Math.max(0.3, 1 - depthIdx * 0.2),
                ease: "power1.inOut",
                duration: stepDuration,
              },
              startTime
            );
          }
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCard = cardsData[activeCardIndex] || cardsData[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-white via-neutral-50/70 to-neutral-100/50 text-neutral-900 flex flex-col pt-16 sm:pt-18 lg:pt-20 pb-4 sm:pb-8 lg:pb-10"
    >
      {/* Background Ambient Glows and Subtle Dot Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Dynamic Ambient Glow reacting to active card theme */}
      <div
        className={`pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[650px] rounded-full bg-gradient-to-br ${currentCard.themeGlow} blur-3xl transition-all duration-700`}
      />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-1 pb-2 sm:py-3">
        {/* ================= MOBILE-ONLY COMPACT INTRO HEADER WITH BACKGROUND VIDEO (< lg) ================= */}
        {/* ================= MOBILE-ONLY COMPACT INTRO HEADER WITH 100% OPACITY BACKGROUND VIDEO (< lg) ================= */}
        <div className="lg:hidden relative overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-950 shadow-lg p-4 sm:p-5 mb-3 sm:mb-4 text-center">
          {/* Mobile Background Video - 100% Crisp Opacity */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center opacity-100"
            >
              <source
                src="/Video/SaveClip.App_AQPoYYHhrpF19NPIeGUXTclDfQumUYkYTHRsFSdx1YY1LS6Urb-iwDTEPEQ_s8hKAJSuEtHNYQlNzWlzqTbNize-F673uEsHqLv2GKM.mp4"
                type="video/mp4"
              />
            </video>
            {/* Subtle bottom vignette to ensure text contrast without fading video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>

          <div
            key={`mobile-hero-text-${activeCardIndex}`}
            className="relative z-10 space-y-1.5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentCard.companyOrRole}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
              Ashok Meena
            </h1>

            <p className="text-[11.5px] sm:text-xs font-bold text-neutral-200 drop-shadow-sm">
              {currentCard.title} • {currentCard.tag}
            </p>
          </div>
        </div>

        <div className="grid items-center gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-12">
          {/* ================= DESKTOP LEFT COLUMN: FULL BIO & SYNCHRONIZED ANIMATED DETAILS (>= lg) ================= */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 relative overflow-hidden rounded-3xl border border-neutral-300/80 bg-neutral-950 shadow-2xl p-5 xl:p-6 space-y-3.5 text-left transition-all duration-300">
            {/* Desktop Background Video - 100% Crisp Opacity */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover object-center opacity-100"
              >
                <source
                  src="/Video/SaveClip.App_AQPoYYHhrpF19NPIeGUXTclDfQumUYkYTHRsFSdx1YY1LS6Urb-iwDTEPEQ_s8hKAJSuEtHNYQlNzWlzqTbNize-F673uEsHqLv2GKM.mp4"
                  type="video/mp4"
                />
              </video>
              {/* Refined gradient scrim allowing 100% video vibrancy with crystal clear text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
            </div>

            {/* Synchronized Animated Content in Sync with Right Card Scrub */}
            <div
              key={`desktop-hero-details-${activeCardIndex}`}
              className="relative z-10 space-y-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
            >
              {/* Dynamic Live Top Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-bold">{currentCard.tag}</span>
                <span className="text-neutral-500">•</span>
                <a
                  href="https://infoeye.com/company/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-300 font-bold hover:underline transition"
                >
                  Infoeye Software ↗
                </a>
              </div>

              {/* Name & Dynamic Domain Headline */}
              <div className="rounded-2xl border border-white/15 bg-black/65 p-3.5 shadow-md backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl xl:text-4xl font-black tracking-tight text-white drop-shadow-sm">
                    Ashok Meena
                  </h1>
                  <span className="rounded-full bg-white/15 border border-white/20 text-white px-2.5 py-0.5 text-[10px] font-mono font-bold">
                    0{activeCardIndex + 1} / 0{cardsData.length}
                  </span>
                </div>
                <p className="mt-1 text-xs xl:text-sm font-bold text-emerald-300">
                  {currentCard.title} • {currentCard.companyOrRole}
                </p>
              </div>

              {/* Dynamic Bio & Domain Breakdown */}
              <div className="rounded-2xl border border-white/15 bg-black/70 p-3.5 shadow-md backdrop-blur-md space-y-2">
                <p className="text-xs leading-relaxed text-neutral-200 font-medium">
                  {currentCard.description}
                </p>

                {/* Key Highlights for Active Domain */}
                <div className="pt-2 border-t border-white/10 space-y-1">
                  {currentCard.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Active Skill Tags */}
                <div className="pt-1.5 flex flex-wrap gap-1">
                  {currentCard.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Recognition & Story Links */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <a
                  href="https://infoeye.com/news/staff/11540/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-950/80 px-3 py-1 font-bold text-amber-200 shadow-xs transition hover:bg-amber-900/90 backdrop-blur-md"
                >
                  <span>🏆</span>
                  <span>President Home Visit Story ↗</span>
                </a>

                <a
                  href="https://infoeye.com/company/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-semibold text-white shadow-xs transition hover:border-white hover:bg-black/80 backdrop-blur-md"
                >
                  Infoeye Company ↗
                </a>

                <a
                  href="https://infoeye.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-semibold text-white shadow-xs transition hover:border-white hover:bg-black/80 backdrop-blur-md"
                >
                  Infoeye.org ↗
                </a>
              </div>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <Link
                  href="#my-work"
                  className="rounded-full bg-white px-4.5 py-2 text-xs font-bold text-black shadow-md transition duration-200 hover:bg-neutral-200 hover:scale-105"
                >
                  Explore My Work ↓
                </Link>

                <Link
                  href="/portfolio"
                  className="rounded-full border border-white/25 bg-black/60 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition duration-200 hover:border-white hover:bg-black/80 backdrop-blur-md"
                >
                  3D Models
                </Link>

                <Link
                  href="/photo-editing"
                  className="rounded-full border border-white/25 bg-black/60 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition duration-200 hover:border-white hover:bg-black/80 backdrop-blur-md"
                >
                  Branding
                </Link>

                <a
                  href="/Ashok_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition duration-200 hover:border-white hover:bg-white/20 backdrop-blur-md"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume PDF
                </a>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/25 bg-black/60 px-3.5 py-2 text-xs font-bold text-white transition duration-200 hover:border-white hover:bg-black/80 backdrop-blur-md"
                >
                  Contact
                </Link>
              </div>

              {/* Key Metric Stats Row */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/15">
                <div className="rounded-2xl border border-white/15 bg-black/65 p-2 text-center shadow-2xs backdrop-blur-md">
                  <p className="text-base xl:text-lg font-black text-white">6+ Yrs</p>
                  <p className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-wider">
                    Experience
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/65 p-2 text-center shadow-2xs backdrop-blur-md">
                  <p className="text-base xl:text-lg font-black text-emerald-400">Infoeye</p>
                  <p className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-wider">
                    Company
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/65 p-2 text-center shadow-2xs backdrop-blur-md">
                  <p className="text-base xl:text-lg font-black text-white">300+</p>
                  <p className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-wider">
                    Models
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/65 p-2 text-center shadow-2xs backdrop-blur-md">
                  <p className="text-base xl:text-lg font-black text-emerald-400">100%</p>
                  <p className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-wider">
                    PBR / QC
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN / MAIN STAGE: 5 ROTATING CARDS DECK ================= */}
          <div className="w-full lg:col-span-7 xl:col-span-7 relative">
            {/* Card Deck Stage - Perfectly sized for mobile viewports & desktop */}
            <div className="relative h-[430px] xs:h-[450px] sm:h-[490px] lg:h-[530px] xl:h-[550px] w-full max-w-[580px] mx-auto">
              {cardsData.map((card, idx) => (
                <div
                  key={card.id}
                  className={`hero-card-item absolute inset-0 flex flex-col justify-between rounded-3xl border ${card.borderColor} ${card.cardBg} p-4 sm:p-7 shadow-2xl overflow-hidden select-none`}
                  style={{
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Thematic Ambient Glow Top */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 -top-24 h-44 bg-gradient-to-b ${card.themeGlow} opacity-80`}
                  />

                  {/* Watermark Floating Thematic Icon */}
                  <div className="pointer-events-none absolute -right-6 -bottom-6 text-8xl sm:text-9xl opacity-[0.06] select-none font-black">
                    {card.watermarkIcon}
                  </div>

                  {/* Top Bar inside Card */}
                  <div className="relative flex items-center justify-between border-b border-neutral-200/60 pb-2.5 sm:pb-3 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] sm:text-[11px] shadow-2xs ${card.tagColor}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      <span className="truncate max-w-[180px] sm:max-w-none">{card.tag}</span>
                    </span>

                    <span className="rounded-full bg-black text-white px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-black tracking-wide shadow-2xs shrink-0">
                      {card.badge}
                    </span>
                  </div>

                  {/* Main Card Content */}
                  <div className="relative mt-2 sm:mt-3 flex-1 flex flex-col justify-between overflow-hidden">
                    {/* Header with Icon, Title, and Role */}
                    <div className="flex items-start gap-3 sm:gap-3.5 shrink-0">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 border border-neutral-200/90 text-xl sm:text-2xl shadow-xs">
                        {card.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm sm:text-lg font-black text-black truncate">
                          {card.title}
                        </h2>
                        <p className="text-[11px] sm:text-xs font-bold text-emerald-700 truncate">
                          {card.companyOrRole}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-neutral-500 truncate">
                          📍 {card.location}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-neutral-700 font-medium line-clamp-2">
                      {card.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-1.5 sm:mt-2 rounded-2xl border border-neutral-200/80 bg-white/80 p-2.5 sm:p-3 space-y-1 shadow-2xs backdrop-blur-xs">
                      <p className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Key Highlights & Responsibilities:
                      </p>
                      <ul className="space-y-1 text-[10.5px] sm:text-[11.5px] text-neutral-800 font-medium">
                        {card.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5 sm:gap-2">
                            <span className="text-emerald-600 font-bold shrink-0">✓</span>
                            <span className="truncate">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* External Links */}
                    <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1.5 overflow-hidden">
                      {card.externalLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target={link.url.startsWith("http") ? "_blank" : undefined}
                          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          className={`rounded-lg px-2 sm:px-2.5 py-0.5 text-[9.5px] sm:text-[10.5px] font-bold transition truncate ${
                            link.highlight
                              ? "bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200 shadow-2xs"
                              : "bg-white border border-neutral-300 text-neutral-800 hover:border-black hover:text-black shadow-2xs"
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>

                    {/* Skills Chips */}
                    <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1 sm:gap-1.5 pt-1 border-t border-neutral-200/60">
                      <span className="text-[9.5px] sm:text-[10px] font-bold text-neutral-400 mr-0.5">Tools:</span>
                      {card.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-neutral-200 bg-white/90 px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-[10.5px] font-semibold text-neutral-800 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Indicator Pill with Direction Badge */}
                  <div className="relative mt-2 flex items-center justify-between border-t border-neutral-200/60 pt-2 text-[9.5px] sm:text-[10.5px] text-neutral-500 shrink-0">
                    <span className="font-mono font-bold text-neutral-700">
                      Card 0{idx + 1} of 0{cardsData.length}
                    </span>
                    <span className="font-semibold text-neutral-800 truncate max-w-[180px] sm:max-w-none">
                      {idx === cardsData.length - 1
                        ? "✓ Final Card • Unpins Page"
                        : idx % 2 === 0
                        ? "← Sweeps Left on Scroll"
                        : "→ Sweeps Right on Scroll"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Progress Step Indicators & Mobile Scroll Hints */}
            <div className="mt-2.5 sm:mt-3 flex items-center justify-between flex-wrap gap-2 px-1">
              <div className="flex items-center gap-1.5">
                {cardsData.map((card, idx) => (
                  <div
                    key={card.id}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? "w-6 sm:w-8 bg-black shadow-xs"
                        : "w-1.5 sm:w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-neutral-500">
                <span>🖱️ Scroll down to sweep cards</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline font-semibold text-black">Alternating 5 Cards</span>
              </div>
            </div>

            {/* Mobile-only Quick Action Buttons (< lg) */}
            <div className="lg:hidden mt-3 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="#my-work"
                className="rounded-full bg-black px-4 py-2 text-[11px] font-bold text-white shadow-xs transition hover:bg-neutral-800"
              >
                Explore Work ↓
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-neutral-300 bg-white px-3.5 py-2 text-[11px] font-bold text-black shadow-2xs hover:border-black"
              >
                3D Models
              </Link>
              <a
                href="/Ashok_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-[11px] font-bold text-neutral-800 shadow-2xs hover:border-black hover:bg-white"
              >
                Resume PDF
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-neutral-300 bg-white px-3.5 py-2 text-[11px] font-bold text-neutral-800 shadow-2xs hover:border-black hover:text-black"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

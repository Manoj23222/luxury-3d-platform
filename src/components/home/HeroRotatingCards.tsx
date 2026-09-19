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

      // 1. Initial 3D Deck Setup: Layered cards stack with subtle depth
      gsap.set(cards, {
        x: 0,
        y: (i) => (i === 0 ? 0 : i * 10),
        scale: (i) => (i === 0 ? 1 : 1 - i * 0.04),
        rotation: (i) => (i === 0 ? 0 : i % 2 === 1 ? 2 : -2),
        opacity: (i) => (i === 0 ? 1 : Math.max(0.3, 1 - i * 0.2)),
        zIndex: (i) => 20 - i,
        transformOrigin: "center center",
        force3D: true,
      });

      // 2. Master ScrollTrigger Timeline: Controlled 100% by mouse/trackpad vertical scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3200", // Generous smooth scroll runway for 5 cards
          pin: true,
          scrub: 1, // Buttery smooth momentum
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

      // 3. Card-by-Card Alternating Left/Right Sweep Animation
      // Card 0 -> Sweeps Out LEFT (-130%) on scroll down
      // Card 1 -> Sweeps Out RIGHT (+130%) on scroll down
      // Card 2 -> Sweeps Out LEFT (-130%) on scroll down
      // Card 3 -> Sweeps Out RIGHT (+130%) on scroll down
      // Card 4 -> Rises to center focus as the final card, then unpins to next page section
      const numSteps = cards.length - 1; // 4 transitions for 5 cards
      const stepDuration = 1 / numSteps; // 0.25 each (total timeline duration = 1.0)

      for (let i = 0; i < numSteps; i++) {
        const startTime = i * stepDuration;
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        // Alternating exit direction:
        // Even indices (0, 2) sweep completely to the LEFT (-130%)
        // Odd indices (1, 3) sweep completely to the RIGHT (+130%)
        const exitX = i % 2 === 0 ? "-130%" : "130%";
        const exitRotation = i % 2 === 0 ? -14 : 14;

        // Current card sweeps completely away to left or right
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

        // Next card smoothly rises and takes center stage
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

        // Behind cards shift forward in the stack
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

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCard = cardsData[activeCardIndex] || cardsData[0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-white via-neutral-50/70 to-neutral-100/50 text-neutral-900 flex flex-col justify-center pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-14"
    >
      {/* Background Ambient Glows and Subtle Dot Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Dynamic Ambient Glow reacting to active card theme */}
      <div
        className={`pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[650px] rounded-full bg-gradient-to-br ${currentCard.themeGlow} blur-3xl transition-all duration-700`}
      />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
          {/* ================= LEFT COLUMN: DETAILS & PROFILE ================= */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-5 text-left">
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
              Senior 3D & Graphic Designer with{" "}
              <strong className="text-black font-bold">6+ years of professional experience</strong> at{" "}
              <a
                href="https://infoeye.com/company/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline"
              >
                Infoeye Software
              </a>{" "}
              (Sardarshahar, Rajasthan). Proven mastery in creating, simulating, and optimizing high-fidelity 3D garments and hard-surface assets with{" "}
              <strong className="text-black font-bold">300+ production-ready 3D models</strong> delivered for international platforms.
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
                href="#my-work"
                className="rounded-full bg-black px-6 py-3 text-xs font-bold text-white shadow-md transition duration-200 hover:bg-neutral-800 hover:scale-105"
              >
                Explore My Work ↓
              </Link>

              <Link
                href="/portfolio"
                className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-black shadow-xs transition duration-200 hover:border-black"
              >
                3D Models
              </Link>

              <Link
                href="/photo-editing"
                className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-black shadow-xs transition duration-200 hover:border-black"
              >
                Branding & Creative
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

            {/* Key Metric Stats Row */}
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

          {/* ================= RIGHT COLUMN: CINEMATIC SCROLL-DRIVEN STAGE ================= */}
          <div className="lg:col-span-7 xl:col-span-7 relative">
            {/* Card Deck Stage (Ensures full sweeping visibility across the section) */}
            <div className="relative h-[550px] sm:h-[530px] w-full max-w-[580px] mx-auto">
              {cardsData.map((card, idx) => (
                <div
                  key={card.id}
                  className={`hero-card-item absolute inset-0 flex flex-col justify-between rounded-3xl border ${card.borderColor} ${card.cardBg} p-5 sm:p-7 shadow-2xl overflow-hidden select-none`}
                  style={{
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Thematic Ambient Glow Top */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 -top-24 h-44 bg-gradient-to-b ${card.themeGlow} opacity-80`}
                  />

                  {/* Watermark Floating Thematic Icon */}
                  <div className="pointer-events-none absolute -right-6 -bottom-6 text-9xl opacity-[0.06] select-none font-black">
                    {card.watermarkIcon}
                  </div>

                  {/* Top Bar inside Card */}
                  <div className="relative flex items-center justify-between border-b border-neutral-200/60 pb-3 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] shadow-2xs ${card.tagColor}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {card.tag}
                    </span>

                    <span className="rounded-full bg-black text-white px-2.5 py-0.5 text-[10px] font-black tracking-wide shadow-2xs">
                      {card.badge}
                    </span>
                  </div>

                  {/* Main Card Content */}
                  <div className="relative mt-3 flex-1 flex flex-col justify-between">
                    {/* Header with Icon, Title, and Role */}
                    <div className="flex items-start gap-3.5 shrink-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 border border-neutral-200/90 text-2xl shadow-xs">
                        {card.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-base sm:text-lg font-black text-black truncate">
                          {card.title}
                        </h2>
                        <p className="text-xs font-bold text-emerald-700 truncate">
                          {card.companyOrRole}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate">
                          📍 {card.location}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-xs leading-relaxed text-neutral-700 font-medium line-clamp-2 h-[34px]">
                      {card.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-2 rounded-2xl border border-neutral-200/80 bg-white/80 p-3 space-y-1 shadow-2xs backdrop-blur-xs">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Key Highlights & Responsibilities:
                      </p>
                      <ul className="space-y-1 text-[11.5px] text-neutral-800 font-medium">
                        {card.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold shrink-0">✓</span>
                            <span className="truncate">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* External Links */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 h-[28px] overflow-hidden">
                      {card.externalLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target={link.url.startsWith("http") ? "_blank" : undefined}
                          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          className={`rounded-lg px-2.5 py-0.5 text-[10.5px] font-bold transition truncate ${
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
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-200/60">
                      <span className="text-[10px] font-bold text-neutral-400 mr-1">Tools:</span>
                      {card.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-neutral-200 bg-white/90 px-2 py-0.5 text-[10.5px] font-semibold text-neutral-800 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Indicator Pill with Direction Badge */}
                  <div className="relative mt-2 flex items-center justify-between border-t border-neutral-200/60 pt-2 text-[10.5px] text-neutral-500 shrink-0">
                    <span className="font-mono font-bold text-neutral-700">
                      Card 0{idx + 1} of 0{cardsData.length}
                    </span>
                    <span className="font-semibold text-neutral-800">
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

            {/* Bottom Progress Step Indicators */}
            <div className="mt-3 flex items-center justify-between flex-wrap gap-2 px-1">
              <div className="flex items-center gap-1.5">
                {cardsData.map((card, idx) => (
                  <div
                    key={card.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? "w-8 bg-black shadow-xs"
                        : "w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <span>🖱️ Mouse / Trackpad Scroll</span>
                <span>•</span>
                <span className="font-semibold text-black">Alternating Left & Right Cards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




"use client";

import { useEffect, useRef, useState } from "react";

// Official Real Brand Vector / Logos
function BlenderLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <img
      src="/blender_logo.png"
      alt="Blender"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-110`}
    />
  );
}

function Clo3dLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-2xl bg-black text-white font-black text-base sm:text-lg tracking-wider shadow-xs transition-transform duration-300 group-hover:scale-110`}
    >
      <span className="text-[#00e5ff] mr-0.5">C</span>LO
    </div>
  );
}

function PhotoshopLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-2xl bg-[#001e36] border border-[#31a8ff]/40 text-[#31a8ff] font-black text-lg sm:text-xl tracking-tight shadow-xs transition-transform duration-300 group-hover:scale-110`}
    >
      Ps
    </div>
  );
}

function IllustratorLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-2xl bg-[#330000] border border-[#ff9a00]/40 text-[#ff9a00] font-black text-lg sm:text-xl tracking-tight shadow-xs transition-transform duration-300 group-hover:scale-110`}
    >
      Ai
    </div>
  );
}

function LightroomLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-2xl bg-[#001e36] border border-[#31a8ff]/40 text-[#31a8ff] font-black text-lg sm:text-xl tracking-tight shadow-xs transition-transform duration-300 group-hover:scale-110`}
    >
      Lr
    </div>
  );
}

function CanvaLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-serif font-black text-xl sm:text-2xl italic shadow-xs transition-transform duration-300 group-hover:scale-110`}
    >
      C
    </div>
  );
}

function ExcelLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <img
      src="/excel_logo.png"
      alt="Excel"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-110`}
    />
  );
}

function AiSparkleLogo({ className = "h-10 w-10 sm:h-12 sm:w-12" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-amber-400 text-white shadow-xs transition-transform duration-300 group-hover:scale-110`}
    >
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
        <path d="M19 15L20.2 17.8L23 19L20.2 20.2L19 23L17.8 20.2L15 19L17.8 17.8L19 15Z" opacity="0.8" />
      </svg>
    </div>
  );
}

const softwareLogos = [
  { id: "blender", name: "Blender 3D", render: () => <BlenderLogo /> },
  { id: "clo3d", name: "CLO 3D", render: () => <Clo3dLogo /> },
  { id: "photoshop", name: "Photoshop", render: () => <PhotoshopLogo /> },
  { id: "illustrator", name: "Illustrator", render: () => <IllustratorLogo /> },
  { id: "lightroom", name: "Lightroom", render: () => <LightroomLogo /> },
  { id: "canva", name: "Canva", render: () => <CanvaLogo /> },
  { id: "excel", name: "Excel", render: () => <ExcelLogo /> },
  { id: "ai", name: "Generative AI", render: () => <AiSparkleLogo /> },
];

interface SoftwareCardData {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  subtitleColor: string;
  checkColor: string;
  description: string;
  renderLogo: () => React.ReactNode;
  skills: string[];
}

const softwareCards: SoftwareCardData[] = [
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    title: "Photo Editing Skills",
    subtitle: "Adobe Photoshop Post-Production",
    subtitleColor: "text-blue-700",
    checkColor: "text-blue-600",
    description:
      "High-end frequency separation, non-destructive retouching, e-commerce catalog, and product enhancement.",
    renderLogo: () => <PhotoshopLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "Image Resizing",
      "Photo Retouching",
      "Background Removal",
      "Background Editing",
      "Image Cropping",
      "Color Correction",
      "Image Enhancement",
      "Photo Manipulation",
      "Object Removal",
      "Clipping Path",
      "Image Restoration",
      "Layer Editing",
      "Masking",
      "Skin Retouching",
      "Product Photo Editing",
    ],
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    title: "Vector & Branding Skills",
    subtitle: "Adobe Illustrator Precision Design",
    subtitleColor: "text-amber-700",
    checkColor: "text-amber-600",
    description:
      "Vector tracing, brand identities, apparel trims, technical tech-packs, and commercial packaging design.",
    renderLogo: () => <IllustratorLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "Vector Tracing",
      "Logo Designing",
      "Vector Illustration",
      "Image Tracing",
      "Typography",
      "Layout Designing",
      "Icon Designing",
      "Shape Creation",
      "Color Separation",
      "Packaging Design",
      "Banner Designing",
      "Business Card Design",
    ],
  },
  {
    id: "blender",
    name: "Blender 3D",
    title: "3D Modeling & Rendering",
    subtitle: "Blender 3D Production Pipeline",
    subtitleColor: "text-orange-700",
    checkColor: "text-orange-600",
    description:
      "Precision hard-surface modeling, procedural PBR texturing, studio lighting, low-poly optimization, and CGI renders.",
    renderLogo: () => <BlenderLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "3D Modeling",
      "Hard Surface Modeling",
      "Texturing & Rendering",
      "UV Unwrapping",
      "PBR Material Maps",
      "Texture Baking",
      "Studio 3-Point Lighting",
      "Cycles & Eevee Rendering",
      "Photorealistic CGI",
      "Low-Poly Retopology",
      "Mesh Optimization",
      "Turntable Animation",
      "Product Visualization",
      "GLB/glTF Optimization",
    ],
  },
  {
    id: "clo3d",
    name: "CLO 3D",
    title: "3D Garment & Digital Fashion",
    subtitle: "CLO 3D Virtual Fashion Specialist",
    subtitleColor: "text-purple-700",
    checkColor: "text-purple-600",
    description:
      "3D apparel patterning, realistic fabric physics, avatar drape simulation, and real-time fashion configurator assets.",
    renderLogo: () => <Clo3dLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "3D Garment Design",
      "Virtual Fashion",
      "2D to 3D Pattern Drafting",
      "Avatar Fitting",
      "Fabric Drape Simulation",
      "Seam & Stitch Detailing",
      "Fabric Texture Mapping",
      "Multi-Colorway SKUs",
      "Garment Animation",
      "Virtual Try-On Assets",
      "High-Res Fabric Render",
      "Trim & Detail Tech-Packs",
    ],
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    title: "Photo Enhancement & RAW",
    subtitle: "Adobe Lightroom Digital Darkroom",
    subtitleColor: "text-sky-700",
    checkColor: "text-sky-600",
    description:
      "Non-destructive 16-bit RAW image post-processing, batch cataloging, tonal curve balancing, and color harmony.",
    renderLogo: () => <LightroomLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "Photo Enhancement",
      "Color Correction",
      "RAW Image Editing",
      "Exposure Adjustment",
      "White Balance Tuning",
      "Tone Curve Grading",
      "Color Harmony",
      "HSL Color Tuning",
      "Noise Reduction",
      "Lens Correction",
      "Batch Cataloging",
      "Highlight & Shadow Recovery",
    ],
  },
  {
    id: "canva",
    name: "Canva",
    title: "Graphic & Presentation Design",
    subtitle: "Canva Visual Communication",
    subtitleColor: "text-teal-700",
    checkColor: "text-teal-600",
    description:
      "Rapid marketing collateral, social media assets, commercial pitch decks, brand kits, and presentation layouts.",
    renderLogo: () => <CanvaLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "Graphic Design",
      "Social Media Design",
      "Presentation Design",
      "Pitch Decks",
      "Brand Kit Creation",
      "Marketing Collateral",
      "Banner Creatives",
      "Poster Designing",
      "Infographic Design",
      "Story Templates",
      "Fast Prototyping",
      "Digital Layouts",
    ],
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    title: "Data & Spreadsheet Ops",
    subtitle: "Microsoft Excel Production Data",
    subtitleColor: "text-emerald-700",
    checkColor: "text-emerald-600",
    description:
      "Structured product catalog data entry, SKU taxonomy, BOM tech-pack sheets, and spreadsheet inventory formatting.",
    renderLogo: () => <ExcelLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "Data Entry",
      "Formatting & Cleanup",
      "Spreadsheet Management",
      "SKU Management",
      "Tech-Pack BOM Sheets",
      "Product Catalog Data",
      "Inventory Tracking",
      "Formula Calculations",
      "Data Filtering & Sorting",
      "Asset Organization",
      "Production Reporting",
    ],
  },
  {
    id: "ai",
    name: "Generative AI",
    title: "AI Generation & Creative Tools",
    subtitle: "Generative AI & Image Synthesis",
    subtitleColor: "text-pink-700",
    checkColor: "text-pink-600",
    description:
      "Cutting-edge AI image synthesis, prompt design, AI texture generation, concept ideation, and image enhancement.",
    renderLogo: () => <AiSparkleLogo className="h-11 w-11 shrink-0" />,
    skills: [
      "AI Image Generation",
      "AI Image Editing",
      "Creative Design",
      "Prompt Engineering",
      "Texture Synthesis",
      "Midjourney Workflow",
      "Stable Diffusion",
      "AI Inpainting & Outpainting",
      "Style Transfer",
      "Moodboard Ideation",
      "Upscaling & Enhancement",
      "Rapid Concept Iteration",
    ],
  },
];

export default function SoftwareSkillsSlider() {
  const [isHovered, setIsHovered] = useState(false);

  // Cards Horizontal Carousel Scroll State
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Repeated list for seamless continuous infinite logo marquee
  const repeatedLogos = [
    ...softwareLogos,
    ...softwareLogos,
    ...softwareLogos,
    ...softwareLogos,
  ];

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-14">
      {/* 1. TOP HEADER & LOGO INFINITE MARQUEE: Specialized Software & Creative Tools */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Technical Stack
        </span>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-black sm:text-3xl">
          Specialized Software & Creative Tools
        </h2>
      </div>

      {/* Auto Horizontal Scrolling Infinite Marquee Track */}
      <div
        className="relative w-full overflow-hidden mb-14"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left & Right Soft Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Continuous Auto-Scrolling Container */}
        <div
          className={`flex w-max items-center gap-5 sm:gap-7 py-3 ${
            isHovered ? "[animation-play-state:paused]" : ""
          }`}
          style={{
            animation: "logoMarqueeScroll 24s linear infinite",
          }}
        >
          {repeatedLogos.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl border border-neutral-200 bg-white p-3.5 shadow-xs transition-all duration-300 hover:border-black hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              {item.render()}
            </div>
          ))}
        </div>
      </div>

      {/* 2. DETAILED SOFTWARE SKILLS CARDS CAROUSEL */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-xs font-bold text-neutral-700 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Software Working & Skills Breakdown</span>
            </div>
            <h3 className="mt-2 text-xl font-black tracking-tight text-black sm:text-2xl">
              Specialized 3D & Digital Design Domains
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-2xl">
              Individual software workstations with full breakdown of production capabilities and specialized design skills.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-400 mr-2 font-medium hidden sm:inline">
              Scroll horizontally →
            </span>
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                canScrollLeft
                  ? "border-neutral-300 bg-white text-black shadow-xs hover:border-black hover:bg-neutral-50 cursor-pointer"
                  : "border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed"
              }`}
            >
              ←
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                canScrollRight
                  ? "border-neutral-300 bg-white text-black shadow-xs hover:border-black hover:bg-neutral-50 cursor-pointer"
                  : "border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Card Track */}
      <div className="relative w-full">
        {/* Left & Right Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {softwareCards.map((card) => (
            <div
              key={card.id}
              style={{ scrollSnapAlign: "start" }}
              className="group relative flex w-[300px] sm:w-[360px] shrink-0 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Header: Logo, Title, Subtitle */}
                <div className="flex items-start gap-3.5 border-b border-neutral-100 pb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 shadow-xs group-hover:scale-105 transition duration-200">
                    {card.renderLogo()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-black truncate group-hover:text-black">
                      {card.title}
                    </h4>
                    <p className={`mt-0.5 text-xs font-bold ${card.subtitleColor} truncate`}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3.5 text-xs leading-relaxed text-neutral-600">
                  {card.description}
                </p>

                {/* Skills Pills with checkmarks */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-semibold text-neutral-800 transition hover:border-black hover:bg-white cursor-default"
                    >
                      <span className={`mr-1.5 font-bold ${card.checkColor}`}>✓</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-600">{card.name}</span>
                <span className="font-bold text-black">{card.skills.length} Skills</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes logoMarqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }
      `}</style>
    </section>
  );
}


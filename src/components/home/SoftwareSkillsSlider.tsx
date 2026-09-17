"use client";

import { useEffect, useRef, useState } from "react";

// Official Real Brand Vector / Logos (Compact & Crisp)
function BlenderLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <img
      src="/blender_logo.png"
      alt="Blender"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-110`}
    />
  );
}

function Clo3dLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-black text-white font-black text-xs sm:text-sm tracking-wider shadow-2xs transition-transform duration-300 group-hover:scale-110`}
    >
      <span className="text-[#00e5ff] mr-0.5">C</span>LO
    </div>
  );
}

function PhotoshopLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-[#001e36] border border-[#31a8ff]/40 text-[#31a8ff] font-black text-xs sm:text-sm tracking-tight shadow-2xs transition-transform duration-300 group-hover:scale-110`}
    >
      Ps
    </div>
  );
}

function IllustratorLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-[#330000] border border-[#ff9a00]/40 text-[#ff9a00] font-black text-xs sm:text-sm tracking-tight shadow-2xs transition-transform duration-300 group-hover:scale-110`}
    >
      Ai
    </div>
  );
}

function LightroomLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-[#001e36] border border-[#31a8ff]/40 text-[#31a8ff] font-black text-xs sm:text-sm tracking-tight shadow-2xs transition-transform duration-300 group-hover:scale-110`}
    >
      Lr
    </div>
  );
}

function CanvaLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-serif font-black text-xs sm:text-sm italic shadow-2xs transition-transform duration-300 group-hover:scale-110`}
    >
      C
    </div>
  );
}

function ExcelLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <img
      src="/excel_logo.png"
      alt="Excel"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-110`}
    />
  );
}

function AiSparkleLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-amber-400 text-white shadow-2xs transition-transform duration-300 group-hover:scale-110`}
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
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
    renderLogo: () => <PhotoshopLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <IllustratorLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <BlenderLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <Clo3dLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <LightroomLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <CanvaLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <ExcelLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    renderLogo: () => <AiSparkleLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    const scrollAmount = 320;
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
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-8 sm:py-5">
      {/* 1. TOP HEADER: Specialized Software & Creative Tools */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-3 text-center">
      
        <h2 className="mt-0.5 text-xl font-black tracking-tight text-black sm:text-2xl">
          Specialized Software & Creative Tools
        </h2>
      </div>

      {/* Auto Horizontal Scrolling Infinite Marquee Track with Left & Right container padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-7">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-black-100 bg-black py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Continuous Auto-Scrolling Container */}
          <div
            className={`flex w-max items-center gap-3 sm:gap-4 px-3 ${
              isHovered ? "[animation-play-state:paused]" : ""
            }`}
            style={{
              animation: "logoMarqueeScroll 22s linear infinite",
            }}
          >
            {repeatedLogos.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-neutral-200/90 bg-white p-2.5 shadow-2xs transition-all duration-300 hover:border-black hover:shadow-xs hover:-translate-y-0.5 cursor-pointer"
              >
                {item.render()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. DETAILED SOFTWARE SKILLS CARDS CAROUSEL */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[10px] font-bold text-neutral-700 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Software Working & Skills Breakdown</span>
            </div>
            <h3 className="mt-1 text-lg font-black tracking-tight text-black sm:text-xl">
              Specialized 3D & Digital Design Domains
            </h3>
            <p className="mt-0.5 text-[11px] sm:text-xs text-neutral-500 max-w-2xl">
              Individual software workstations with full breakdown of production capabilities and specialized design skills.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[10.5px] text-neutral-400 mr-1.5 font-medium hidden sm:inline">
              Scroll →
            </span>
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition ${
                canScrollLeft
                  ? "border-neutral-300 bg-white text-black shadow-2xs hover:border-black hover:bg-neutral-50 cursor-pointer"
                  : "border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed"
              }`}
            >
              ←
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition ${
                canScrollRight
                  ? "border-neutral-300 bg-white text-black shadow-2xs hover:border-black hover:bg-neutral-50 cursor-pointer"
                  : "border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Card Track with Left/Right margins */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {softwareCards.map((card) => (
              <div
                key={card.id}
                style={{ scrollSnapAlign: "start" }}
                className="group relative flex w-[255px] sm:w-[285px] shrink-0 flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-4.5 shadow-2xs transition duration-300 hover:border-black hover:shadow-md hover:-translate-y-0.5"
              >
                <div>
                  {/* Header: Logo, Title, Subtitle */}
                  <div className="flex items-start gap-2.5 border-b border-neutral-100 pb-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 shadow-2xs group-hover:scale-105 transition duration-200">
                      {card.renderLogo()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-black text-black truncate group-hover:text-black">
                        {card.title}
                      </h4>
                      <p className={`mt-0.5 text-[10px] font-bold ${card.subtitleColor} truncate`}>
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-[11px] leading-relaxed text-neutral-600">
                    {card.description}
                  </p>

                  {/* Skills Pills with checkmarks */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold text-neutral-800 transition hover:border-black hover:bg-white cursor-default"
                      >
                        <span className={`mr-1 font-bold ${card.checkColor}`}>✓</span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-3.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="font-semibold text-neutral-600">{card.name}</span>
                  <span className="font-bold text-black">{card.skills.length} Skills</span>
                </div>
              </div>
            ))}
          </div>
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


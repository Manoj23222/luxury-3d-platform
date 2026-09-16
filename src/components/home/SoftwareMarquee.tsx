"use client";

import { useState } from "react";

// Real Authentic Vector / SVG Brand Logos for Software
function BlenderLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12.59 13.78a3.18 3.18 0 1 1-3.18-3.18 3.18 3.18 0 0 1 3.18 3.18z"
        fill="#265787"
      />
      <path
        d="M19.9 8.28a7.1 7.1 0 0 0-4.63-2.6l4.63-4.63a1.47 1.47 0 0 0-2.08-2.08l-5.6 5.6a7.14 7.14 0 0 0-3.32-.4 7.18 7.18 0 1 0 11 4.11z"
        fill="#E87D0D"
      />
      <circle cx="9.41" cy="13.78" r="1.8" fill="#FFFFFF" />
      <circle cx="9.41" cy="13.78" r="1" fill="#265787" />
    </svg>
  );
}

function Clo3dLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-black text-white font-black text-[12px] tracking-tight shadow-xs`}>
      <span className="text-cyan-400 mr-0.5">C</span>LO
    </div>
  );
}

function PhotoshopLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-[#001E36] border border-[#31A8FF]/50 text-[#31A8FF] font-black text-sm tracking-tight shadow-xs`}>
      Ps
    </div>
  );
}

function IllustratorLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-[#330000] border border-[#FF9A00]/50 text-[#FF9A00] font-black text-sm tracking-tight shadow-xs`}>
      Ai
    </div>
  );
}

function LightroomLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-[#001E36] border border-[#31A8FF]/50 text-[#31A8FF] font-black text-sm tracking-tight shadow-xs`}>
      Lr
    </div>
  );
}

function CanvaLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-serif font-black text-base italic shadow-xs`}>
      C
    </div>
  );
}

function ExcelLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-[#107c41] text-white font-black text-sm shadow-xs border border-emerald-600`}>
      X
    </div>
  );
}

function AiLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 text-white font-black text-xs shadow-xs`}>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
        <path d="M19 15L20.2 17.8L23 19L20.2 20.2L19 23L17.8 20.2L15 19L17.8 17.8L19 15Z" opacity="0.8" />
      </svg>
    </div>
  );
}

interface SoftwareItem {
  id: string;
  name: string;
  category: string;
  experience: string;
  badge: string;
  renderLogo: () => React.ReactNode;
}

const softwareList: SoftwareItem[] = [
  {
    id: "blender",
    name: "Blender 3D",
    category: "3D Modeling & CGI Renders",
    experience: "6+ Years • Master",
    badge: "Primary 3D Tool",
    renderLogo: () => <BlenderLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "clo3d",
    name: "CLO 3D",
    category: "Digital Fashion & Garments",
    experience: "Fabric Physics • Expert",
    badge: "Fashion Specialist",
    renderLogo: () => <Clo3dLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    category: "High-End Retouching & Textures",
    experience: "16-Bit RAW • Master",
    badge: "Industry Standard",
    renderLogo: () => <PhotoshopLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    category: "Vector Graphics & Trims",
    experience: "Pattern Drafting",
    badge: "Vector Precision",
    renderLogo: () => <IllustratorLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    category: "RAW Color Grading & Post",
    experience: "Color Harmony",
    badge: "Batch Editorial",
    renderLogo: () => <LightroomLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "canva",
    name: "Canva",
    category: "Visual Decks & Fast Layouts",
    experience: "Creative Presentations",
    badge: "Design Speed",
    renderLogo: () => <CanvaLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "SKU & BOM Tech-Packs",
    experience: "Production Data",
    badge: "Asset Data Sheet",
    renderLogo: () => <ExcelLogo className="h-10 w-10 shrink-0" />,
  },
  {
    id: "ai",
    name: "Generative AI",
    category: "AI Textures & Concepting",
    experience: "Midjourney / SD",
    badge: "AI Workflow",
    renderLogo: () => <AiLogo className="h-10 w-10 shrink-0" />,
  },
];

export default function SoftwareMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the list for seamless continuous infinite scroll
  const marqueeItems = [...softwareList, ...softwareList, ...softwareList];

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-xs font-bold text-neutral-700 shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Professional Toolset & Software Stack</span>
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
          Core Production & Design Software
        </h2>
        <p className="mt-1 text-xs text-neutral-500 max-w-xl mx-auto">
          Daily production tools mastered across 6+ years for 3D simulation, product visualization, retouching, and asset management.
        </p>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left & Right Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Scrolling Inner Container */}
        <div
          className={`flex w-max gap-4 py-2 ${
            isHovered ? "[animation-play-state:paused]" : ""
          }`}
          style={{
            animation: "softwareMarquee 30s linear infinite",
          }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative flex w-64 sm:w-72 shrink-0 items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-sm transition duration-300 hover:scale-105 hover:border-black hover:shadow-lg cursor-pointer"
            >
              {/* Official Real Brand Logo Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 shadow-xs">
                {item.renderLogo()}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="truncate text-sm font-black text-black group-hover:text-emerald-700 transition">
                    {item.name}
                  </h3>
                  <span className="shrink-0 rounded-md bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-bold text-neutral-600">
                    {item.badge}
                  </span>
                </div>

                <p className="mt-0.5 truncate text-[11px] text-neutral-500 font-medium">
                  {item.category}
                </p>

                <p className="mt-1 text-[10px] font-bold text-emerald-700">
                  {item.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes softwareMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </section>
  );
}

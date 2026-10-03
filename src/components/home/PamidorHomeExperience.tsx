"use client";

import React from "react";
import Image from "next/image";
import HeroFlowerCanvas from "./HeroFlowerCanvas";

// ==========================================
// SOFTWARE PRODUCTION STACK DATA
// ==========================================
const softwareStack = [
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    category: "Photo Retouching",
    icon: "/Softwear Icon/photoshop.svg",
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    category: "Vector & Branding",
    icon: "/Softwear Icon/adobe-illustrator-svgrepo-com.svg",
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    category: "16-Bit RAW Grading",
    icon: "/Softwear Icon/adobe-lightroom-svgrepo-com.svg",
  },
  {
    id: "canva",
    name: "Canva",
    category: "Graphic Design",
    icon: "/Softwear Icon/canva-icon.webp",
  },
  {
    id: "blender",
    name: "Blender 3D",
    category: "3D CGI & Modeling",
    icon: "/Softwear Icon/blender-svgrepo-com.svg",
  },
  {
    id: "clo3d",
    name: "CLO 3D",
    category: "Digital Fashion & Drape",
    icon: "/Softwear Icon/clo3d.svg",
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "Data & Workflows",
    icon: "/Softwear Icon/excel2-svgrepo-com.svg",
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    category: "Agentic AI & Coding",
    icon: "/Softwear Icon/google-antigravity.png",
  },
];

export default function PamidorHomeExperience() {
  return (
    <div className="relative w-full bg-[#EFEEEB] text-[#0A0A0A] font-sans selection:bg-[#D12424] selection:text-white overflow-x-hidden">
      {/* ========================================================= */}
      {/* HERO SECTION (#top) — Full-width interactive blooming flowers on mouse move */}
      {/* ========================================================= */}
      <section id="top" className="relative w-full bg-[#EFEEEB]">
        <HeroFlowerCanvas>
          <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16 min-h-[calc(100dvh-70px)] flex flex-col justify-between pb-12 pt-24 sm:pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1">
              {/* Left Column: Typographic Hero */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8 z-10">
                <div className="space-y-2">
                  <h1 className="text-[3.75rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-medium tracking-[-0.035em] leading-[0.88] text-[#0A0A0A] uppercase select-none">
                    <span className="block hover:translate-x-1 transition-transform duration-300">
                      Ashok
                    </span>
                    <span className="block hover:translate-x-1 transition-transform duration-300">
                      Meena
                    </span>
                  </h1>
                </div>

                {/* Tagline */}
                <p className="text-base sm:text-xl font-normal leading-relaxed text-[#2A2A28] max-w-xl">
                  3D Product Modeling, Digital Fashion & Photo Retouching.{" "}
                  <span className="block font-medium text-[#0A0A0A] mt-0.5">
                    I take the craft seriously.
                  </span>
                </p>

                {/* Chips / Skill Pills (Exact Pamidor Style) */}
                <div className="pt-2">
                  <ul className="flex flex-wrap gap-2.5 sm:gap-3 max-w-xl">
                    {[
                      "3D Product CGI",
                      "CLO 3D Fashion",
                      "Photo Retouching",
                      "UX | Real-Time 3D",
                      "Subdivision Modeling",
                      "Color Grading",
                    ].map((chip) => (
                      <li
                        key={chip}
                        className="border-[1.2px] border-[#B8B6AF] px-4 py-2 text-xs sm:text-[13px] font-medium text-[#0A0A0A] bg-transparent hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#EFEEEB] transition-all duration-200 select-none cursor-default"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Large Vertical Hero Portrait with Transparent Cutout (Aligned Down to Divider Div) */}
              <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end self-end">
                <div className="relative w-full max-w-[620px] aspect-[4/5] sm:aspect-[787/904] flex items-end justify-center select-none overflow-visible translate-y-8 sm:translate-y-12 lg:translate-y-16">
                  <Image
                    src="/ashok.png"
                    alt="Ashok Meena - Senior 3D Designer & Photo Editor"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain object-bottom filter drop-shadow-[0_22px_38px_rgba(10,10,10,0.22)] scale-[1.18] sm:scale-[1.24] origin-bottom transition-transform duration-500 ease-out pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* 1.5px Architectural Rule at Bottom of Hero */}
            <div aria-hidden="true" className="relative z-10 h-[1.5px] w-full bg-[#D8D7D1] mt-12 lg:mt-16" />
          </div>
        </HeroFlowerCanvas>
      </section>

      {/* ========================================================= */}
      {/* 3. STUDIO SECTION (#studio)                               */}
      {/* ========================================================= */}
      <section id="studio" className="relative w-full bg-[#EFEEEB] py-20 lg:py-32">
        <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16 space-y-16 lg:space-y-24">
          {/* Editorial Bio Statement with Floating Tilted Badge */}
          <div className="relative max-w-6xl">
            {/* Tilted Floating Photo Badge (Aspect Square with drop shadow) */}
            <div className="sm:float-right sm:ml-10 sm:mb-6 sm:w-56 lg:w-64 mb-6 w-44">
              <div className="relative aspect-square -rotate-[5deg] hover:rotate-0 transition-transform duration-500 overflow-hidden border-2 border-white shadow-[0_20px_50px_rgba(10,10,10,0.22)] bg-[#E2E0D8]">
                <Image
                  src="/office/IMG_0548.jpeg"
                  alt="Ashok Meena Studio Life"
                  fill
                  className="object-cover"
                  sizes="256px"
                />
                <div className="absolute bottom-2 left-2 bg-black/80 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
                  Workstation 01
                </div>
              </div>
            </div>

            <p className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium leading-[1.25] tracking-tight text-[#0A0A0A]">
              Hi, I’m Ashok -6+ Years of Professional Experience at Infoeye Software
              I’m a creative professional specializing in 3D & Blender, Adobe tools, photo editing, and digital
              production. Over the past 6+ years, I’ve worked on 3D modeling, rendering, image editing,
              product visuals, and various digital projects.
              I combine creativity, technical skills, and attention to detail to deliver clean and professional visual work.
            </p>
          </div>

          {/* Continuous Infinite Clients / Collaborations Marquee with Software Logos */}
          <div className="border-t border-[#D8D7D1] pt-10">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] font-mono font-bold tracking-widest text-[#76756F] uppercase">
                (CLIENTS & COLLABORATIONS / PRODUCTION STACK)
              </p>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#76756F]">
                8 Core Creative Tools
              </span>
            </div>

            {/* Seamless Infinite Marquee with Real Software Logo Images */}
            <div className="relative w-full overflow-hidden py-3">
              {/* Fade Masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#EFEEEB] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#EFEEEB] to-transparent z-10" />

              <div className="flex w-max animate-marquee gap-5 sm:gap-7 items-center">
                {[...softwareStack, ...softwareStack].map((tool, idx) => (
                  <div
                    key={`${tool.id}-${idx}`}
                    className="flex items-center gap-3.5 shrink-0 px-4 sm:px-5 py-2.5 rounded-2xl bg-white/70 border border-[#D8D7D1] shadow-2xs hover:border-[#0A0A0A] hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden shadow-xs shrink-0 flex items-center justify-center bg-white p-1 border border-black/5">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={44}
                        height={44}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#D12424] transition-colors whitespace-nowrap">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#76756F] uppercase tracking-wider whitespace-nowrap">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Architectural Rule */}
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#D8D7D1]" />
        </div>
      </section>
    </div>
  );
}


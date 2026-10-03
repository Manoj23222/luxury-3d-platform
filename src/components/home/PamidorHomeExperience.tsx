"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroFlowerInteractive from "./HeroFlowerInteractive";

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
    icon: "/software-logos/clo3d.svg",
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

// ==========================================
// SELECTED PROJECTS DATA (MATCHING PAMIDOR INTERACTION)
// ==========================================
interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  year: string;
  specs: string;
  href: string;
  image: string;
  accent: string;
}

const selectedProjects: ProjectItem[] = [
  {
    id: "elixir-perfume",
    title: "L'Élixir Perfume",
    subtitle: "Brand · Product · 3D CGI & Glass Shading",
    role: "Subdivision Modeling & CGI",
    timeline: "3 Weeks",
    year: "2025",
    specs: "8K CGI Renders · Octane Glass Physics · Sub-D Topology",
    href: "/portfolio",
    image: "/images/123.png",
    accent: "#D12424",
  },
  {
    id: "clo3d-fashion",
    title: "Haute Couture Clo3D",
    subtitle: "Digital Fashion · 2D to 3D Garment Patterning",
    role: "CLO 3D Garment Construction",
    timeline: "4 Weeks",
    year: "2025",
    specs: "Cloth Drape Physics · Micro-Seam Detailing · 4K PBR",
    href: "/portfolio",
    image: "/images/AURA.png",
    accent: "#D12424",
  },
  {
    id: "burger-cgi",
    title: "Culinary CGI Production",
    subtitle: "Organic Hard-Surface & Hyper-Realistic Texturing",
    role: "Organic CGI & Lighting",
    timeline: "2 Weeks",
    year: "2025",
    specs: "PBR Material Calibration · Subsurface Scattering",
    href: "/portfolio",
    image: "/images/Burger.png",
    accent: "#D12424",
  },
  {
    id: "monograph-retouch",
    title: "Retouching Monograph",
    subtitle: "Commercial Studio Album · 16-Bit RAW Workflow",
    role: "Lead Commercial Photo Retoucher",
    timeline: "Ongoing",
    year: "2026",
    specs: "16-Bit RAW · Frequency Separation · Editorial Grading",
    href: "/work",
    image: "/images/creative-portfolio-banner.png",
    accent: "#D12424",
  },
  {
    id: "chronograph-3d",
    title: "Chronograph Precision 3D",
    subtitle: "Luxury Watch CGI & 60 FPS WebGL GLB Asset",
    role: "3D Modeling & Real-Time GLB",
    timeline: "3 Weeks",
    year: "2025",
    specs: "Three.js · Draco Compression · Metallic Micro-Brushing",
    href: "/portfolio",
    image: "/images/34.png",
    accent: "#D12424",
  },
];

// ==========================================
// SKILLSET ITEMS (INVERTED NIGHT SECTION)
// ==========================================
const skillsets = [
  {
    num: "01",
    title: "Product & Hard-Surface CGI",
    desc: "From initial concept sketch to subdivision topology, 8K PBR shaders, and commercial studio lighting ready for billboard or packaging print.",
  },
  {
    num: "02",
    title: "CLO 3D Digital Fashion",
    desc: "2D pattern construction, fabric physics simulation, multi-layer garment drape, and high-fidelity cloth animation calibrated for luxury apparel.",
  },
  {
    num: "03",
    title: "Commercial Photo Retouching",
    desc: "16-Bit RAW frequency separation, skin micro-texture preservation, commercial beauty grading, and flawless before & after studio transformation.",
  },
  {
    num: "04",
    title: "Real-Time Web 3D & GLB",
    desc: "60 FPS browser-based Three.js interactivity, Draco mesh compression, mobile-optimized glTF geometry, and real-time custom shader design.",
  },
];

export default function PamidorHomeExperience() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  return (
    <div className="relative w-full bg-[#EFEEEB] text-[#0A0A0A] font-sans selection:bg-[#D12424] selection:text-white overflow-x-hidden">
      {/* ========================================================= */}
      {/* HERO SECTION (#top)                                       */}
      {/* ========================================================= */}
      <section id="top" className="relative w-full bg-[#EFEEEB]">
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

            {/* Right Column: Large Vertical Hero Portrait with Transparent Cutout & Interactive Flowers */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <HeroFlowerInteractive
                src="/ashok.png"
                alt="Ashok Meena - Senior 3D Designer & Photo Editor"
              />
            </div>
          </div>

          {/* 1.5px Architectural Rule at Bottom of Hero */}
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#D8D7D1] mt-12 lg:mt-16" />
        </div>
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

            {/* 8 Software Icons Quick-Access Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
              {softwareStack.map((tool) => (
                <div
                  key={tool.id}
                  className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/50 border border-[#D8D7D1] hover:border-[#0A0A0A] hover:bg-white hover:shadow-md transition-all duration-300 group text-center cursor-default"
                >
                  <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden shadow-xs shrink-0 flex items-center justify-center bg-white p-1.5 border border-black/5 mb-2.5">
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0A0A0A] group-hover:text-[#D12424] transition-colors tracking-tight line-clamp-1">
                    {tool.name}
                  </span>
                  <span className="text-[9.5px] font-mono text-[#76756F] uppercase tracking-wider mt-0.5 line-clamp-1">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Rule */}
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#D8D7D1]" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SELECTED PROJECTS SECTION (#projects)                  */}
      {/* ========================================================= */}
      <section
        id="projects"
        className="relative w-full bg-[#EFEEEB] pt-6 pb-24 lg:pt-10 lg:pb-36"
      >
        <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0A0A0A]">
              Selected Projects
            </h2>
            <Link
              href="/portfolio"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#76756F] hover:text-[#0A0A0A] underline underline-offset-4"
            >
              View Full Archive ({selectedProjects.length}+) ↗
            </Link>
          </div>

          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#D8D7D1] mt-8 mb-4" />

          {/* Interactive Project List (Pamidor Style Accordion/Hover Preview) */}
          <div className="divide-y divide-[#D8D7D1]">
            {selectedProjects.map((proj, idx) => {
              const isActive = activeProjectIndex === idx;

              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => setActiveProjectIndex(idx)}
                  className="group relative py-8 sm:py-10 transition-colors duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left & Middle Info */}
                    <div className="lg:col-span-8 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <Link
                          href={proj.href}
                          className="group/title flex items-baseline gap-4"
                        >
                          <span className="text-xs sm:text-sm font-mono text-[#76756F]">
                            0{idx + 1}
                          </span>
                          <h3
                            className={`text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight transition-colors duration-200 ${
                              isActive
                                ? "text-[#D12424]"
                                : "text-[#0A0A0A] group-hover/title:text-[#D12424]"
                            }`}
                          >
                            {proj.title}
                          </h3>
                        </Link>

                        {/* Jump To Project Button */}
                        <Link
                          href={proj.href}
                          className="inline-flex items-center gap-3 border border-[#0A0A0A] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 w-fit shrink-0"
                        >
                          <span>Jump To Project</span>
                          <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>

                      <p className="text-sm sm:text-base text-[#56554F] font-normal max-w-2xl">
                        {proj.subtitle}
                      </p>

                      {/* Project Specs Table */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D8D7D1]/70 text-xs">
                        <div>
                          <p className="text-[10px] font-mono text-[#8C8A82] uppercase tracking-wider">
                            Role
                          </p>
                          <p className="font-semibold text-[#0A0A0A] mt-0.5 truncate">
                            {proj.role}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-[#8C8A82] uppercase tracking-wider">
                            Timeline
                          </p>
                          <p className="font-semibold text-[#0A0A0A] mt-0.5">{proj.timeline}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-[#8C8A82] uppercase tracking-wider">
                            Year
                          </p>
                          <p className="font-semibold text-[#0A0A0A] mt-0.5">{proj.year}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-[#8C8A82] uppercase tracking-wider">
                            Specifications
                          </p>
                          <p className="font-semibold text-[#0A0A0A] mt-0.5 truncate">
                            {proj.specs}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Media Preview (Interactive reveal like Pamidor) */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                      <Link
                        href={proj.href}
                        className="relative w-full max-w-[420px] aspect-[16/10] sm:aspect-[3/2] overflow-hidden bg-[#E2E0D8] border border-[#D8D7D1] shadow-md group/img block"
                      >
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className={`object-cover transition-transform duration-700 ease-out group-hover/img:scale-105 ${
                            isActive ? "opacity-100" : "opacity-80"
                          }`}
                          sizes="(min-width: 1024px) 30vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#D8D7D1] mt-8" />
        </div>
      </section>
    </div>
  );
}

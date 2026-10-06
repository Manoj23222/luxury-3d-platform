"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductionStep {
  step: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  description: string;
  deliverable: string;
  badge: string;
}

const PRODUCTION_STEPS: ProductionStep[] = [
  {
    step: "Step 01",
    title: "Adobe Photoshop",
    subtitle: "16-Bit RAW Retouching & Compositing",
    icon: "/Softwear Icon/photoshop.svg",
    image: "/Skill/step-01.png",
    description:
      "Precision product isolation, clipping paths, realistic drop shadow casting, layer effects, and commercial packaging typography layout.",
    deliverable: "16-Bit Master PSD / E-Commerce Hero Visual",
    badge: "Post-Production",
  },
  {
    step: "Step 02",
    title: "Adobe Illustrator",
    subtitle: "Vector Monograms & Precision Tech-Packs",
    icon: "/Softwear Icon/adobe-illustrator-svgrepo-com.svg",
    image: "/Skill/step-02.png",
    description:
      "Bézier anchor curve alignment, Pathfinder booleans, vector kerning, and production tech-pack paths for luxury brand lockups ('Luxe Imaginary').",
    deliverable: "Lossless Vector AI / SVG Tech-Pack",
    badge: "Vector Design",
  },
  {
    step: "Step 03",
    title: "Adobe Lightroom Classic",
    subtitle: "High-Dynamic-Range Tone & Color Calibration",
    icon: "/Softwear Icon/adobe-lightroom-svgrepo-com.svg",
    image: "/Skill/step-03.png",
    description:
      "Tone curve luminance grading, warm gold saturation mapping, and batch catalogue synchronization across high-res studio photography.",
    deliverable: "Color-Balanced Catalog / Production Preset",
    badge: "Color Grading",
  },
  {
    step: "Step 04",
    title: "Canva Pro",
    subtitle: "Multi-Channel Campaign & Collateral Design",
    icon: "/Softwear Icon/canva-icon.webp",
    image: "/Skill/step-04.png",
    description:
      "Fast editorial banner composition, Spring Collection social layouts, responsive banners, and promotional retail packaging collaterals.",
    deliverable: "Omnichannel Social & Digital Banner Kits",
    badge: "Brand Collateral",
  },
  {
    step: "Step 05",
    title: "Blender 3D",
    subtitle: "Sub-D Modeling & Procedural PBR Shaders",
    icon: "/Softwear Icon/blender-svgrepo-com.svg",
    image: "/Skill/step-05.png",
    description:
      "Hard-surface Sub-D 3D modeling, clean quad mesh topology, procedural metallic gold node shader tree, and real-time viewport studio lighting.",
    deliverable: "Production Sub-D 3D Model (.blend / .glb)",
    badge: "3D Modeling",
  },
  {
    step: "Step 06",
    title: "CLO 3D",
    subtitle: "Digital Apparel & Fabric Drape Simulation",
    icon: "/Softwear Icon/clo3d.svg",
    image: "/Skill/step-06.png",
    description:
      "2D pattern garment drafting, precision cloth physics computation for Silk Crepe de Chine, dynamic fabric drape over product, and 3D fashion staging.",
    deliverable: "Simulated 3D Garment Mesh & Animation",
    badge: "3D Fashion",
  },
];

export default function AboutCinematicExperience() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; step: string } | null>(null);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEEEB] text-[#0A0A0A] font-sans selection:bg-[#D12424] selection:text-white pt-24 sm:pt-28 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8">
      {/* ======================================================== */}
      {/* EXECUTIVE RESUME CONTAINER (COMPACT LUXURY SHEET)        */}
      {/* ======================================================== */}
      <div className="max-w-[1020px] mx-auto bg-white border border-[#D8D7D1] rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-9 lg:p-11 space-y-7 sm:space-y-9">
        
        {/* ====================================================== */}
        {/* TOP BAR / RESUME ACTION CONTROLS                       */}
        {/* ====================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-5 border-b border-[#D8D7D1]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#76756F] bg-[#EFEEEB] px-3 py-1 rounded-full border border-[#D8D7D1]">
              Curriculum Vitae • Live Resume
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[10.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Projects
            </span>
          </div>

          {/* Quick Actions: Download Resume PDF & Contact */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/Ashok_Resume.pdf"
              download="Ashok_Meena_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D12424] hover:bg-[#b51c1c] text-white px-4 py-2 text-xs font-bold shadow-xs transition-all active:scale-95"
              title="Download official PDF copy of Ashok's resume"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#D8D7D1] bg-white hover:bg-[#EFEEEB] text-[#0A0A0A] px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <svg className="w-3.5 h-3.5 text-[#56554F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24-1.076-.672-2.126-1.27-3.076a9.006 9.006 0 0113.1 0c-.598.95-1.03 2-1.27 3.076M6 18h12M9 21h6m-9-9V4a1 1 0 011-1h8a1 1 0 011 1v8" />
              </svg>
              <span>Print</span>
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D8D7D1] bg-white hover:border-[#0A0A0A] text-[#0A0A0A] px-3.5 py-2 text-xs font-bold transition-all"
            >
              <span>Hire ✉️</span>
            </Link>
          </div>
        </div>

        {/* ====================================================== */}
        {/* RESUME HEADER & CONTACT STRIP                          */}
        {/* ====================================================== */}
        <header className="space-y-3 text-left">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0A0A0A] leading-tight">
              Ashok Meena
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#D12424] tracking-wide">
              Senior 3D Designer | 3D Apparel & Digital Fashion | Graphic & Product Visualization
            </p>
          </div>

          {/* Compact Contact Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#D8D7D1] text-[11px] sm:text-xs font-mono text-[#56554F]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#0A0A0A]">📞</span>
              <a href="tel:+918000093300" className="hover:text-[#D12424] hover:underline truncate">
                +91 80000 93300
              </a>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#0A0A0A]">✉️</span>
              <a href="mailto:ashokm3414@gmail.com" className="hover:text-[#D12424] hover:underline truncate">
                ashokm3414@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#0A0A0A]">📍</span>
              <span className="truncate">Sardarshahar, Rajasthan</span>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#0A0A0A]">🌐</span>
              <Link href="/" className="hover:text-[#D12424] hover:underline font-bold truncate">
                Official Portfolio
              </Link>
            </div>
          </div>
        </header>

        {/* ====================================================== */}
        {/* 1. PROFESSIONAL SUMMARY                                */}
        {/* ====================================================== */}
        <section className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D12424]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A0A0A]">
              Professional Summary
            </h2>
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[#4A4944] font-normal pl-3 sm:pl-4 border-l-2 border-[#D8D7D1]">
            Senior 3D & Graphic Designer with <strong className="text-[#0A0A0A] font-bold">6+ years of professional experience</strong> creating, optimizing, and delivering high-fidelity 3D assets for digital fashion, e-commerce, and real-time 3D web simulators. Proven expertise in <strong className="text-[#0A0A0A] font-bold">Blender, CLO 3D, and Adobe Creative Suite</strong> with end-to-end knowledge of 3D modeling, UV unwrapping, PBR texturing, lighting, typography, and asset optimization. Successfully delivered <strong className="text-[#D12424] font-bold">300+ production-ready 3D models</strong> and digital assets with strict quality control for global client platforms.
          </p>
        </section>

        {/* ====================================================== */}
        {/* 2. PROFESSIONAL EXPERIENCE                             */}
        {/* ====================================================== */}
        <section className="space-y-3.5 text-left">
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#D8D7D1]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D12424]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A0A0A]">
                Professional Experience
              </h2>
            </div>
            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-[#76756F]">
              6+ Years Total Tenure
            </span>
          </div>

          <div className="space-y-3 pl-3 sm:pl-4 border-l-2 border-[#D8D7D1]">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                  Senior 3D & Graphic Designer
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-[#56554F]">
                  Infoeye Software Pvt. Ltd. • Sardarshahar, Rajasthan, India
                </p>
              </div>
              <span className="font-mono text-[11px] sm:text-xs font-extrabold text-[#D12424] sm:text-right">
                2020 – Present (6+ Yrs)
              </span>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-[#4A4944] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#D12424] font-bold shrink-0 mt-0.5">•</span>
                <span>Model, simulate, and optimize photorealistic 3D apparel and product assets using <strong>Blender and CLO 3D</strong> for e-commerce platforms and web-based 3D configurators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D12424] font-bold shrink-0 mt-0.5">•</span>
                <span>Executed full <strong>PBR texturing workflows</strong>, material setups, custom studio lighting, and high-resolution rendering, reducing asset load latency and render times.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D12424] font-bold shrink-0 mt-0.5">•</span>
                <span>Successfully delivered <strong>300+ 3D model corrections and asset libraries</strong> with consistent accuracy, tight turnaround times, and strict QC protocols.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D12424] font-bold shrink-0 mt-0.5">•</span>
                <span>Prepared production-ready, lightweight <strong>OBJ and GLB/glTF files</strong>, verified geometric scale, fixed visual glitches, and managed color/material SKU variants for client 3D simulators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D12424] font-bold shrink-0 mt-0.5">•</span>
                <span>Applied advanced <strong>typography, layout design, and brand identity principles</strong> to produce promotional graphics, textures, and digital visuals using Photoshop and Illustrator.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D12424] font-bold shrink-0 mt-0.5">•</span>
                <span>Collaborated closely with 3D developers, creative directors, and cross-functional teams across multiple time zones.</span>
              </li>
            </ul>

            {/* Executive Honor Callout Box */}
            <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50/70 p-2.5 sm:p-3 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base shrink-0">🏆</span>
                <span className="font-semibold text-[11px] sm:text-xs">
                  Official Executive Recognition: Infoeye President personally visited Ashok&apos;s home for dinner in honor of dedication and senior production excellence.
                </span>
              </div>
              <a
                href="https://infoeye.com/news/staff/11540/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline shrink-0 hover:text-amber-800 text-[11px]"
              >
                Verification ↗
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* 3. SOFTWARE TOOLS & CORE TECHNICAL SKILLS              */}
        {/* ====================================================== */}
        <section className="space-y-4 text-left">
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#D8D7D1]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D12424]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A0A0A]">
                Software & Technical Skills
              </h2>
            </div>
            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-[#76756F]">
              8 Production Tools
            </span>
          </div>

          {/* Compact 4-Column Software Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {[
              {
                name: "Blender 3D",
                role: "3D CGI & Modeling",
                icon: "/Softwear Icon/blender-svgrepo-com.svg",
              },
              {
                name: "CLO 3D",
                role: "Digital Apparel Fashion",
                icon: "/Softwear Icon/clo3d.svg",
              },
              {
                name: "Photoshop",
                role: "16-Bit RAW Retouching",
                icon: "/Softwear Icon/photoshop.svg",
              },
              {
                name: "Illustrator",
                role: "Vector & Tech-Packs",
                icon: "/Softwear Icon/adobe-illustrator-svgrepo-com.svg",
              },
              {
                name: "Lightroom",
                role: "Color RAW Grading",
                icon: "/Softwear Icon/adobe-lightroom-svgrepo-com.svg",
              },
              {
                name: "Canva",
                role: "Marketing Collateral",
                icon: "/Softwear Icon/canva-icon.webp",
              },
              {
                name: "Excel",
                role: "Asset Indexing & Data",
                icon: "/Softwear Icon/excel2-svgrepo-com.svg",
              },
              {
                name: "Antigravity",
                role: "Agentic AI & Coding",
                icon: "/Softwear Icon/google-antigravity.png",
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 p-2 rounded-xl border border-[#D8D7D1] bg-[#EFEEEB]/40 hover:bg-white hover:border-[#0A0A0A] transition-all"
              >
                <div className="relative h-7 w-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white p-1 border border-[#D8D7D1]">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-bold text-[#0A0A0A] truncate">
                    {tool.name}
                  </div>
                  <p className="text-[9.5px] font-mono text-[#76756F] truncate">
                    {tool.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Categorized Skills Pills */}
          <div className="pt-1 space-y-1.5 text-xs">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-[10.5px] font-bold text-[#0A0A0A] uppercase min-w-[110px]">
                3D & Simulation:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10.5px] text-[#4A4944]">
                {[
                  "3D Apparel Construction",
                  "CLO 3D Garment Drape",
                  "Hard-Surface Sub-D",
                  "Mesh Topology",
                  "UV Mapping",
                  "PBR Texturing",
                  "Studio Lighting",
                  "Cycles & Eevee",
                ].map((s) => (
                  <span key={s} className="bg-[#EFEEEB] border border-[#D8D7D1] rounded-md px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-[10.5px] font-bold text-[#0A0A0A] uppercase min-w-[110px]">
                Post-Production:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10.5px] text-[#4A4944]">
                {[
                  "16-Bit RAW Retouching",
                  "Frequency Separation",
                  "Skin Micro-Texture",
                  "Background Removal",
                  "Clipping Paths",
                  "Color Correction",
                  "E-Commerce Catalogues",
                ].map((s) => (
                  <span key={s} className="bg-[#EFEEEB] border border-[#D8D7D1] rounded-md px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-[10.5px] font-bold text-[#0A0A0A] uppercase min-w-[110px]">
                Pipeline & 3D Web:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10.5px] text-[#4A4944]">
                {[
                  "GLB / glTF Exports",
                  "Draco Compression",
                  "Low-Poly Retopology",
                  "OBJ / FBX",
                  "SKU Variant Management",
                  "Quality Control (QC)",
                ].map((s) => (
                  <span key={s} className="bg-[#EFEEEB] border border-[#D8D7D1] rounded-md px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* STEP-BY-STEP SOFTWARE PRODUCTION WORKFLOW (ALTERNATING) */}
          {/* ==================================================== */}
          <div className="pt-4 border-t border-[#D8D7D1] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                  Step-by-Step Software Production Pipeline
                </h3>
                <p className="text-[10.5px] font-mono text-[#76756F]">
                  Real production workflow screenshots across Adobe Creative Cloud, Blender & CLO 3D
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#D12424] font-bold bg-[#EFEEEB] px-2 py-0.5 rounded-full border border-[#D8D7D1]">
                6 Steps • Click image to zoom
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {PRODUCTION_STEPS.map((item, index) => {
                const isEven = index % 2 === 1;
                return (
                  <div
                    key={item.step}
                    className="p-3 sm:p-4 rounded-xl border border-[#D8D7D1] bg-[#EFEEEB]/25 hover:bg-white hover:border-[#0A0A0A] transition-all"
                  >
                    <div className={`grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center`}>
                      {/* Text Column */}
                      <div className={`md:col-span-7 space-y-2 ${isEven ? "md:order-2" : "md:order-1"}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#0A0A0A] text-white">
                            {item.step}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-[#D12424] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                            {item.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="relative h-5 w-5 shrink-0">
                            <Image
                              src={item.icon}
                              alt={item.title}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                              {item.title}
                            </h4>
                            <p className="text-[10px] sm:text-[10.5px] font-mono text-[#76756F]">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-[11px] sm:text-[12px] text-[#4A4944] leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-[#56554F]">
                          <span className="text-[#0A0A0A] font-bold">Deliverable:</span>
                          <span className="bg-white border border-[#D8D7D1] px-2 py-0.5 rounded text-[#0A0A0A]">
                            {item.deliverable}
                          </span>
                        </div>
                      </div>

                      {/* Image Preview Column */}
                      <div className={`md:col-span-5 ${isEven ? "md:order-1" : "md:order-2"}`}>
                        <div
                          onClick={() => setSelectedImage({ src: item.image, title: item.title, step: item.step })}
                          className="group relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#D8D7D1] bg-[#111] cursor-pointer shadow-xs hover:border-[#D12424] transition-all"
                          title={`Click to expand ${item.title} workspace screenshot`}
                        >
                          <Image
                            src={item.image}
                            alt={`${item.title} Production Interface`}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                              🔍 Click to Zoom
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* 4. EDUCATION                                           */}
        {/* ====================================================== */}
        <section className="space-y-3 text-left">
          <div className="flex items-center gap-2 pb-1.5 border-b border-[#D8D7D1]">
            <span className="h-2 w-2 rounded-full bg-[#D12424]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A0A0A]">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Degree 1 */}
            <div className="p-3 rounded-xl border border-[#D8D7D1] bg-[#EFEEEB]/30 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs sm:text-[12.5px] font-bold text-[#0A0A0A]">
                  Master of Science (M.Sc.) in Computer Science
                </h3>
                <span className="font-mono text-[10.5px] font-bold text-[#D12424] shrink-0">
                  2025 – 2026
                </span>
              </div>
              <p className="text-[10.5px] text-[#56554F]">
                Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
              </p>
              <span className="inline-block text-[9.5px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-sm">
                Pursuing (Ongoing)
              </span>
            </div>

            {/* Degree 2 */}
            <div className="p-3 rounded-xl border border-[#D8D7D1] bg-[#EFEEEB]/30 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs sm:text-[12.5px] font-bold text-[#0A0A0A]">
                  Bachelor of Arts (B.A.)
                </h3>
                <span className="font-mono text-[10.5px] font-bold text-[#56554F] shrink-0">
                  Graduated 2024
                </span>
              </div>
              <p className="text-[10.5px] text-[#56554F]">
                Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
              </p>
              <span className="inline-block text-[9.5px] font-mono text-[#56554F] bg-white border border-[#D8D7D1] px-2 py-0.5 rounded-sm">
                Completed
              </span>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* 5. LANGUAGES & PROFESSIONAL STRENGTHS                  */}
        {/* ====================================================== */}
        <section className="space-y-3 text-left">
          <div className="flex items-center gap-2 pb-1.5 border-b border-[#D8D7D1]">
            <span className="h-2 w-2 rounded-full bg-[#D12424]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A0A0A]">
              Languages & Professional Strengths
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Languages */}
            <div className="space-y-1.5 p-3 rounded-xl border border-[#D8D7D1] bg-[#EFEEEB]/30">
              <p className="font-mono text-[10.5px] font-bold uppercase text-[#0A0A0A]">
                Languages:
              </p>
              <ul className="space-y-1 text-[#4A4944] text-[11px] sm:text-xs">
                <li>
                  <strong className="text-[#0A0A0A]">Hindi:</strong> Native speaker. Devanagari script, translation, and proofreading.
                </li>
                <li>
                  <strong className="text-[#0A0A0A]">English:</strong> Professional working proficiency for briefs and client communication.
                </li>
              </ul>
            </div>

            {/* Strengths */}
            <div className="space-y-1.5 p-3 rounded-xl border border-[#D8D7D1] bg-[#EFEEEB]/30">
              <p className="font-mono text-[10.5px] font-bold uppercase text-[#0A0A0A]">
                Key Professional Strengths:
              </p>
              <div className="flex flex-wrap gap-1 pt-0.5 text-[10.5px] text-[#4A4944]">
                {[
                  "Attention to Detail",
                  "Visual Quality Assurance",
                  "Tight Deadline Turnaround",
                  "Remote Work Discipline",
                  "Cross-Functional Teamwork",
                  "AI & Data Accuracy",
                ].map((strength) => (
                  <span key={strength} className="bg-white border border-[#D8D7D1] rounded-md px-1.5 py-0.5">
                    ✓ {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ====================================================== */}
        {/* BOTTOM ACTION BAR (RESUME DOWNLOAD & CONTACT)          */}
        {/* ====================================================== */}
        <footer className="pt-5 border-t border-[#D8D7D1] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="text-left">
            <p className="text-xs font-bold text-[#0A0A0A]">
              Need a verified offline copy of Ashok&apos;s Curriculum Vitae?
            </p>
            <p className="text-[10.5px] font-mono text-[#76756F]">
              Official PDF formatted for HR review, client audits, and contract documentation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/Ashok_Resume.pdf"
              download="Ashok_Meena_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D12424] hover:bg-[#b51c1c] text-white px-4 py-2 text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D8D7D1] bg-white hover:border-[#0A0A0A] hover:bg-[#EFEEEB] text-[#0A0A0A] px-4 py-2 text-xs font-bold transition-all"
            >
              <span>Contact ✉️</span>
            </Link>
          </div>
        </footer>

      </div>

      {/* ======================================================== */}
      {/* FULL-SCREEN LIGHTBOX MODAL FOR PRODUCTION WORKFLOW IMAGE */}
      {/* ======================================================== */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1A1A1A] border border-white/20 rounded-2xl overflow-hidden shadow-2xl space-y-2 p-3 sm:p-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#D12424] bg-white/10 px-2.5 py-0.5 rounded">
                  {selectedImage.step}
                </span>
                <span className="text-white text-xs sm:text-sm font-bold">
                  {selectedImage.title} • High-Resolution Production Workspace
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close image modal"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-black rounded-lg overflow-hidden border border-white/10">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-neutral-400">
              <span>Press ESC or click background to close</span>
              <a
                href={selectedImage.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D12424] hover:underline"
              >
                Open Original Image ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

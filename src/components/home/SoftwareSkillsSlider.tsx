"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ================= BRAND LOGO COMPONENTS =================
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

function ChatGptLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-[#10a37f] text-white font-bold text-xs sm:text-sm shadow-2xs transition-transform duration-300 group-hover:scale-110`}
      title="ChatGPT"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.0964-4.8878a4.466 4.466 0 0 1-.5355-3.003l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-5.5765-2.4088zm-1.1278-9.4206a4.4707 4.4707 0 0 1 2.3408-1.9622l-.0047.1611v5.5164a.79.79 0 0 0 .3928.6813l5.8428 3.3733-2.02 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7914a4.4992 4.4992 0 0 1-1.6506-6.1468zM17.06 12.6175l-5.8428-3.3733 2.02-1.1683a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6723a.79.79 0 0 0-.402-.6816zm2.0107-3.022l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L7.527 10.097V7.7646a.071.071 0 0 1 .0332-.0615l4.8993-2.8293a4.4992 4.4992 0 0 1 6.6112 4.7216zm-7.6163 2.3087l-2.606-1.5037 2.606-1.5038 2.606 1.5038z" />
      </svg>
    </div>
  );
}

function GeminiLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#1a73e8] via-[#8ab4f8] to-[#9c27b0] text-white shadow-2xs transition-transform duration-300 group-hover:scale-110`}
      title="Google Gemini"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
      </svg>
    </div>
  );
}

function ClaudeLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-[#d97757] text-white font-serif font-black text-sm sm:text-base shadow-2xs transition-transform duration-300 group-hover:scale-110`}
      title="Claude (Anthropic)"
    >
      <span>✱</span>
    </div>
  );
}

function CodexLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-[#0f172a] border border-emerald-500/50 text-emerald-400 font-mono font-black text-[10px] sm:text-xs shadow-2xs transition-transform duration-300 group-hover:scale-110`}
      title="Codex"
    >
      &lt;/&gt;
    </div>
  );
}

function AntigravityLogo({ className = "h-7 w-7 sm:h-8 sm:w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-[#a5b4fc] font-mono font-black text-[10px] sm:text-xs shadow-2xs border border-[#6366f1]/50 transition-transform duration-300 group-hover:scale-110`}
      title="Google Antigravity"
    >
      AGY
    </div>
  );
}

const softwareLogos = [
  { id: "blender", name: "Blender 3D", render: () => <BlenderLogo /> },
  { id: "clo3d", name: "CLO 3D", render: () => <Clo3dLogo /> },
  { id: "photoshop", name: "Photoshop", render: () => <PhotoshopLogo /> },
  { id: "illustrator", name: "Illustrator", render: () => <IllustratorLogo /> },
  { id: "chatgpt", name: "ChatGPT", render: () => <ChatGptLogo /> },
  { id: "gemini", name: "Google Gemini", render: () => <GeminiLogo /> },
  { id: "claude", name: "Claude AI", render: () => <ClaudeLogo /> },
  { id: "codex", name: "OpenAI Codex", render: () => <CodexLogo /> },
  { id: "antigravity", name: "Google Antigravity", render: () => <AntigravityLogo /> },
  { id: "lightroom", name: "Lightroom", render: () => <LightroomLogo /> },
  { id: "canva", name: "Canva", render: () => <CanvaLogo /> },
  { id: "excel", name: "Excel", render: () => <ExcelLogo /> },
  { id: "ai", name: "Generative AI", render: () => <AiSparkleLogo /> },
];

// ================= WORKSTATION CARD DATA MODEL =================
export interface WorkstationCardData {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  tagColor: string;
  cardBg: string;
  borderColor: string;
  glowColor: string;
  accentBar: string;
  watermark: string;
  pillColor: string;
  checkColor: string;
  description: string;
  renderLogo: () => React.ReactNode;
  skills: string[];
  metrics: { label: string; value: string };
  actionLink: { label: string; url: string };
}

export const workstationCards: WorkstationCardData[] = [
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    title: "Photo Editing Skills",
    subtitle: "Adobe Photoshop Post-Production",
    categoryTag: "High-End Retouching",
    tagColor: "bg-sky-950/80 border-sky-400/40 text-sky-300",
    cardBg: "bg-gradient-to-br from-[#001729] via-[#002744] to-[#00101d]",
    borderColor: "border-sky-400/40 hover:border-sky-300 shadow-sky-500/20",
    glowColor: "from-sky-500/30 via-blue-600/15 to-transparent",
    accentBar: "from-sky-400 via-blue-500 to-indigo-600",
    watermark: "🎨",
    pillColor: "bg-sky-900/40 border-sky-400/30 text-sky-100 hover:border-sky-300 hover:bg-sky-800/50",
    checkColor: "text-sky-400",
    description:
      "High-end frequency separation, non-destructive retouching, e-commerce catalog, and product enhancement.",
    renderLogo: () => <PhotoshopLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Experience", value: "6+ Yrs" },
    actionLink: { label: "View Photo Work ↗", url: "/photo-editing" },
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    title: "Vector & Branding Skills",
    subtitle: "Adobe Illustrator Precision Design",
    categoryTag: "Vector & Tech-Packs",
    tagColor: "bg-amber-950/80 border-amber-400/40 text-amber-300",
    cardBg: "bg-gradient-to-br from-[#291300] via-[#3d1c00] to-[#1a0c00]",
    borderColor: "border-amber-400/40 hover:border-amber-300 shadow-amber-500/20",
    glowColor: "from-amber-500/30 via-orange-600/15 to-transparent",
    accentBar: "from-amber-400 via-orange-500 to-red-600",
    watermark: "📐",
    pillColor: "bg-amber-900/40 border-amber-400/30 text-amber-100 hover:border-amber-300 hover:bg-amber-800/50",
    checkColor: "text-amber-400",
    description:
      "Vector tracing, brand identities, apparel trims, technical tech-packs, and commercial packaging design.",
    renderLogo: () => <IllustratorLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Assets Built", value: "500+" },
    actionLink: { label: "Explore Branding ↗", url: "/photo-editing" },
  },
  {
    id: "blender",
    name: "Blender 3D",
    title: "3D Modeling & Rendering",
    subtitle: "Blender 3D Production Pipeline",
    categoryTag: "CGI & Hard Surface",
    tagColor: "bg-orange-950/80 border-orange-400/40 text-orange-300",
    cardBg: "bg-gradient-to-br from-[#24140a] via-[#331c0e] to-[#170c06]",
    borderColor: "border-orange-500/40 hover:border-orange-400 shadow-orange-500/20",
    glowColor: "from-orange-500/35 via-amber-600/15 to-transparent",
    accentBar: "from-orange-400 via-amber-500 to-yellow-500",
    watermark: "💎",
    pillColor: "bg-orange-900/40 border-orange-400/30 text-orange-100 hover:border-orange-300 hover:bg-orange-800/50",
    checkColor: "text-orange-400",
    description:
      "Precision hard-surface modeling, procedural PBR texturing, studio lighting, low-poly optimization, and CGI renders.",
    renderLogo: () => <BlenderLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Production 3D", value: "300+ Models" },
    actionLink: { label: "Inspect 3D Models ↗", url: "/portfolio" },
  },
  {
    id: "clo3d",
    name: "CLO 3D",
    title: "3D Garment & Digital Fashion",
    subtitle: "CLO 3D Virtual Fashion Specialist",
    categoryTag: "Digital Fashion & Drape",
    tagColor: "bg-purple-950/80 border-purple-400/40 text-purple-300",
    cardBg: "bg-gradient-to-br from-[#230b36] via-[#33104e] to-[#160622]",
    borderColor: "border-fuchsia-400/40 hover:border-fuchsia-300 shadow-fuchsia-500/20",
    glowColor: "from-fuchsia-500/35 via-purple-600/15 to-transparent",
    accentBar: "from-fuchsia-400 via-purple-500 to-indigo-600",
    watermark: "👗",
    pillColor: "bg-purple-900/40 border-purple-400/30 text-purple-100 hover:border-purple-300 hover:bg-purple-800/50",
    checkColor: "text-fuchsia-400",
    description:
      "3D apparel patterning, realistic fabric physics, avatar drape simulation, and real-time fashion configurator assets.",
    renderLogo: () => <Clo3dLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Fashion SKUs", value: "100+ Styles" },
    actionLink: { label: "View Garments ↗", url: "/portfolio" },
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    title: "Photo Enhancement & RAW",
    subtitle: "Adobe Lightroom Digital Darkroom",
    categoryTag: "16-Bit RAW Darkroom",
    tagColor: "bg-cyan-950/80 border-cyan-400/40 text-cyan-300",
    cardBg: "bg-gradient-to-br from-[#021c2e] via-[#052b47] to-[#011320]",
    borderColor: "border-cyan-400/40 hover:border-cyan-300 shadow-cyan-500/20",
    glowColor: "from-cyan-500/30 via-sky-600/15 to-transparent",
    accentBar: "from-cyan-400 via-sky-500 to-blue-600",
    watermark: "📸",
    pillColor: "bg-cyan-900/40 border-cyan-400/30 text-cyan-100 hover:border-cyan-300 hover:bg-cyan-800/50",
    checkColor: "text-cyan-400",
    description:
      "Non-destructive 16-bit RAW image post-processing, batch cataloging, tonal curve balancing, and color harmony.",
    renderLogo: () => <LightroomLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Precision", value: "16-Bit RAW" },
    actionLink: { label: "Color Grading ↗", url: "/photo-editing" },
  },
  {
    id: "canva",
    name: "Canva",
    title: "Graphic & Presentation Design",
    subtitle: "Canva Visual Communication",
    categoryTag: "Marketing & Pitch Decks",
    tagColor: "bg-teal-950/80 border-teal-400/40 text-teal-300",
    cardBg: "bg-gradient-to-br from-[#120b24] via-[#1e113a] to-[#0b0616]",
    borderColor: "border-teal-400/40 hover:border-teal-300 shadow-teal-500/20",
    glowColor: "from-teal-500/30 via-cyan-600/15 to-transparent",
    accentBar: "from-teal-400 via-cyan-500 to-purple-600",
    watermark: "✨",
    pillColor: "bg-teal-900/40 border-teal-400/30 text-teal-100 hover:border-teal-300 hover:bg-teal-800/50",
    checkColor: "text-teal-400",
    description:
      "Rapid marketing collateral, social media assets, commercial pitch decks, brand kits, and presentation layouts.",
    renderLogo: () => <CanvaLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Turnaround", value: "Rapid" },
    actionLink: { label: "Design Decks ↗", url: "/photo-editing" },
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    title: "Data & Spreadsheet Ops",
    subtitle: "Microsoft Excel Production Data",
    categoryTag: "SKU Taxonomy & BOM",
    tagColor: "bg-emerald-950/80 border-emerald-400/40 text-emerald-300",
    cardBg: "bg-gradient-to-br from-[#041f15] via-[#093021] to-[#02140d]",
    borderColor: "border-emerald-400/40 hover:border-emerald-300 shadow-emerald-500/20",
    glowColor: "from-emerald-500/30 via-teal-600/15 to-transparent",
    accentBar: "from-emerald-400 via-teal-500 to-green-600",
    watermark: "📊",
    pillColor: "bg-emerald-900/40 border-emerald-400/30 text-emerald-100 hover:border-emerald-300 hover:bg-emerald-800/50",
    checkColor: "text-emerald-400",
    description:
      "Structured product catalog data entry, SKU taxonomy, BOM tech-pack sheets, and spreadsheet inventory formatting.",
    renderLogo: () => <ExcelLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "Data Accuracy", value: "100% Strict" },
    actionLink: { label: "Workflow Specs ↗", url: "#my-work" },
  },
  {
    id: "ai",
    name: "Generative AI",
    title: "AI Generation & Creative Tools",
    subtitle: "Generative AI & Image Synthesis",
    categoryTag: "Synthetic Vision & Diffusion",
    tagColor: "bg-pink-950/80 border-pink-400/40 text-pink-300",
    cardBg: "bg-gradient-to-br from-[#260515] via-[#380b21] to-[#16020c]",
    borderColor: "border-pink-400/40 hover:border-pink-300 shadow-pink-500/20",
    glowColor: "from-pink-500/35 via-rose-600/15 to-transparent",
    accentBar: "from-pink-400 via-rose-500 to-amber-500",
    watermark: "🌌",
    pillColor: "bg-pink-900/40 border-pink-400/30 text-pink-100 hover:border-pink-300 hover:bg-pink-800/50",
    checkColor: "text-pink-400",
    description:
      "Cutting-edge AI image synthesis, prompt design, AI texture generation, concept ideation, and image enhancement.",
    renderLogo: () => <AiSparkleLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
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
    metrics: { label: "AI Acceleration", value: "10x Ideation" },
    actionLink: { label: "AI Workflows ↗", url: "#my-work" },
  },
  {
    id: "chatgpt-gemini",
    name: "ChatGPT & Google Gemini",
    title: "AI Prompt Engineering",
    subtitle: "ChatGPT & Gemini LLM Systems",
    categoryTag: "Context & Reasoning",
    tagColor: "bg-teal-950/80 border-teal-400/40 text-teal-300",
    cardBg: "bg-gradient-to-br from-[#031d1e] via-[#062d2e] to-[#011213]",
    borderColor: "border-teal-400/40 hover:border-teal-300 shadow-teal-500/20",
    glowColor: "from-teal-500/30 via-emerald-600/15 to-transparent",
    accentBar: "from-teal-400 via-emerald-500 to-cyan-500",
    watermark: "⚡",
    pillColor: "bg-teal-900/40 border-teal-400/30 text-teal-100 hover:border-teal-300 hover:bg-teal-800/50",
    checkColor: "text-teal-400",
    description:
      "Advanced prompt design, reasoning chain optimization, contextual logic synthesis, structured outputs, and automated workflows.",
    renderLogo: () => <ChatGptLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
    skills: [
      "Advanced Prompt Engineering",
      "Zero-Shot & Few-Shot Prompting",
      "Chain-of-Thought Reasoning",
      "Structured JSON Extraction",
      "Context Window Optimization",
      "Creative Copywriting & Ideation",
      "Automated Logic Synthesis",
      "API Workflow Integration",
      "Multimodal Vision Prompting",
      "System Prompt Design",
    ],
    metrics: { label: "Reasoning Depth", value: "Complex" },
    actionLink: { label: "AI Logic ↗", url: "#my-work" },
  },
  {
    id: "claude-codex",
    name: "Claude & Codex",
    title: "AI Code Generation",
    subtitle: "Claude AI & Codex Software Dev",
    categoryTag: "Full-Stack Code Synthesis",
    tagColor: "bg-orange-950/80 border-orange-400/40 text-orange-300",
    cardBg: "bg-gradient-to-br from-[#241108] via-[#361a0d] to-[#140803]",
    borderColor: "border-orange-400/40 hover:border-orange-300 shadow-orange-500/20",
    glowColor: "from-orange-500/30 via-amber-600/15 to-transparent",
    accentBar: "from-orange-400 via-amber-500 to-red-500",
    watermark: "💻",
    pillColor: "bg-orange-900/40 border-orange-400/30 text-orange-100 hover:border-orange-300 hover:bg-orange-800/50",
    checkColor: "text-orange-400",
    description:
      "Generating production-ready React/Next.js code, TypeScript architecture, database schemas, full-stack debugging, and API routing.",
    renderLogo: () => <ClaudeLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
    skills: [
      "Full-Stack Code Generation",
      "React & Next.js Architecture",
      "TypeScript Refactoring",
      "Supabase & MongoDB Schemas",
      "Complex Bug Diagnostics",
      "API Endpoint Synthesis",
      "PWA Architecture & Offline UX",
      "State Management Patterns",
      "Performance Code Optimization",
      "Automated Test Writing",
    ],
    metrics: { label: "Full-Stack Web", value: "Production" },
    actionLink: { label: "Web Engineering ↗", url: "#my-work" },
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    title: "Agentic AI & Rapid Dev",
    subtitle: "Google Antigravity Agent Platform",
    categoryTag: "Autonomous AI Multi-Agents",
    tagColor: "bg-indigo-950/80 border-indigo-400/40 text-indigo-300",
    cardBg: "bg-gradient-to-br from-[#120d2c] via-[#1c1444] to-[#0a071a]",
    borderColor: "border-indigo-400/40 hover:border-indigo-300 shadow-indigo-500/20",
    glowColor: "from-indigo-500/35 via-violet-600/15 to-transparent",
    accentBar: "from-indigo-400 via-violet-500 to-purple-600",
    watermark: "🤖",
    pillColor: "bg-indigo-900/40 border-indigo-400/30 text-indigo-100 hover:border-indigo-300 hover:bg-indigo-800/50",
    checkColor: "text-indigo-400",
    description:
      "Autonomous coding workflows, multi-agent tool orchestration, full-stack builds, terminal automation, and rapid live deployment.",
    renderLogo: () => <AntigravityLogo className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />,
    skills: [
      "Agentic AI Development",
      "Multi-Agent Orchestration",
      "Terminal Command Automation",
      "Full-Stack Repository Builds",
      "Automated Typechecking & QA",
      "Subagent Task Delegation",
      "Live Production Verification",
      "Rapid Prototype to Deploy",
      "Tool Group Configuration",
      "Continuous CI/CD Delivery",
    ],
    metrics: { label: "Automation", value: "Autonomous" },
    actionLink: { label: "Live System ↗", url: "#my-work" },
  },
];

export default function SoftwareSkillsSlider() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const lastActiveIdxRef = useRef(0);

  // ================= CINEMATIC SCROLL-LINKED GSAP TIMELINE =================
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(
        ".workstation-card-item",
        triggerRef.current
      );
      if (!cards || cards.length === 0 || !triggerRef.current) return;

      const mm = gsap.matchMedia();

      // Initial Deck Setup
      gsap.set(cards, {
        xPercent: (i) => (i === 0 ? 0 : 130),
        y: 0,
        scale: (i) => (i === 0 ? 1 : 0.88),
        rotation: (i) => (i === 0 ? 0 : 6),
        opacity: (i) => (i === 0 ? 1 : 0),
        zIndex: (i) => 30 - i,
        transformOrigin: "center center",
        force3D: true,
      });

      // Desktop & Large Screens (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${cards.length * 360}`, // Smooth cinematic scroll runway for 11 cards
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

          // Current card exits to the LEFT smoothly
          tl.to(
            currentCard,
            {
              xPercent: -130,
              y: -10,
              rotation: -6,
              scale: 0.88,
              opacity: 0,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 10,
            },
            startTime
          );

          // Next card enters smoothly from the RIGHT to CENTER
          tl.fromTo(
            nextCard,
            {
              xPercent: 130,
              y: 10,
              rotation: 6,
              scale: 0.88,
              opacity: 0,
            },
            {
              xPercent: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 35,
            },
            startTime
          );
        }
      });

      // Mobile & Tablet (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${cards.length * 260}`, // Responsive scroll runway for mobile
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

          // Exit to left
          tl.to(
            currentCard,
            {
              xPercent: -120,
              y: -6,
              rotation: -4,
              scale: 0.9,
              opacity: 0,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 10,
            },
            startTime
          );

          // Enter from right to center
          tl.fromTo(
            nextCard,
            {
              xPercent: 120,
              y: 6,
              rotation: 4,
              scale: 0.9,
              opacity: 0,
            },
            {
              xPercent: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: "power1.inOut",
              duration: stepDuration,
              zIndex: 35,
            },
            startTime
          );
        }
      });

      ScrollTrigger.refresh();
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const currentActiveCard = workstationCards[activeCardIndex] || workstationCards[0];

  // Repeated list for continuous logo marquee
  const repeatedLogos = [
    ...softwareLogos,
    ...softwareLogos,
    ...softwareLogos,
    ...softwareLogos,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white"
    >
      {/* 1. TOP HEADER & MARQUEE: Specialized Software & Creative Tools */}
      <div className="relative pt-10 pb-6 border-b border-neutral-800/80 bg-neutral-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span>✨ Specialized Software & Creative Tools</span>
          </div>
        </div>

        {/* Auto Horizontal Scrolling Infinite Marquee Track */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 py-2.5 shadow-2xs"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
                  className="group flex h-13 w-13 sm:h-15 sm:w-15 shrink-0 items-center justify-center rounded-2xl border border-neutral-700/80 bg-neutral-800/90 p-2 shadow-xs transition-all duration-300 hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  {item.render()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC PINNED SCROLL SHOWCASE STAGE */}
      <div
        ref={triggerRef}
        className="relative min-h-screen w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Ambient Thematic Dynamic Radial Glow reacting to active card */}
        <div
          className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[650px] rounded-full bg-gradient-to-br ${currentActiveCard.glowColor} blur-3xl opacity-70 transition-all duration-700`}
        />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

        {/* Subtle Cyber Grid Matrix Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Header Block inside pinned section */}
        <div className="relative z-10 mx-auto max-w-5xl w-full text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/15 border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-300 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="tracking-wider uppercase text-[10.5px] sm:text-[11px]">
              Creative Workstation Ecosystem
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
            Specialized 3D & Digital Design Domains
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-medium">
            Individual software workstations with full breakdown of production capabilities and specialized design skills.
          </p>

          {/* Quick Stats Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 px-3 py-1 text-[11px] font-semibold text-neutral-300 shadow-2xs backdrop-blur-md">
              <span className="text-indigo-400 font-bold">⚡</span> 11 Dedicated Workstations
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 px-3 py-1 text-[11px] font-semibold text-neutral-300 shadow-2xs backdrop-blur-md">
              <span className="text-amber-400 font-bold">💎</span> 130+ Specialized Skills
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 px-3 py-1 text-[11px] font-semibold text-neutral-300 shadow-2xs backdrop-blur-md">
              <span className="text-emerald-400 font-bold">✓</span> Production Pipeline Ready
            </span>
          </div>
        </div>

        {/* ================= MAIN CINEMATIC CARD STAGE ================= */}
        <div className="relative z-20 mx-auto w-full max-w-[560px] my-3 sm:my-4 flex items-center justify-center">
          {/* Card Deck Stage */}
          <div className="relative w-full h-[470px] xs:h-[490px] sm:h-[510px] md:h-[530px] flex items-center justify-center">
            {workstationCards.map((card, idx) => {
              const isActive = activeCardIndex === idx;
              return (
                <div
                  key={card.id}
                  className={`workstation-card-item absolute inset-0 rounded-3xl border ${card.borderColor} ${card.cardBg} p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-shadow duration-500`}
                  style={{
                    willChange: "transform, opacity",
                    boxShadow: isActive
                      ? "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px -10px rgba(255,255,255,0.15)"
                      : "0 10px 30px -10px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* Top Ambient Glow Bar */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accentBar}`}
                  />

                  {/* Watermark Floating Thematic Icon */}
                  <div className="pointer-events-none absolute -right-4 -bottom-4 text-7xl sm:text-8xl opacity-[0.07] select-none font-black">
                    {card.watermark}
                  </div>

                  {/* Top Header inside Card */}
                  <div className="relative flex items-center justify-between border-b border-white/10 pb-2.5 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-bold shadow-2xs ${card.tagColor} backdrop-blur-md`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      <span className="truncate max-w-[170px] sm:max-w-none">{card.categoryTag}</span>
                    </span>

                    <span className="rounded-full bg-white/10 border border-white/20 text-white px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-black tracking-wider shadow-2xs shrink-0">
                      {card.metrics.label}: {card.metrics.value}
                    </span>
                  </div>

                  {/* Main Card Content */}
                  <div className="relative mt-2.5 flex-1 flex flex-col justify-between overflow-hidden">
                    {/* Header with Logo, Title, and Subtitle */}
                    <div className="flex items-start gap-3 shrink-0">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-xs backdrop-blur-md">
                        {card.renderLogo()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-black text-white truncate tracking-tight">
                          {card.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-bold text-neutral-300 truncate">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-neutral-300 font-medium line-clamp-2">
                      {card.description}
                    </p>

                    {/* Skills Chips Matrix */}
                    <div className="mt-2 rounded-2xl border border-white/10 bg-black/40 p-2.5 sm:p-3 space-y-1.5 shadow-2xs backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Specialized Skills & Capabilities ({card.skills.length}):
                        </span>
                        <span className="text-[9.5px] font-mono text-neutral-400">
                          Ready ✓
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 max-h-[140px] xs:max-h-[155px] sm:max-h-[165px] overflow-y-auto no-scrollbar pr-0.5">
                        {card.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[9.5px] sm:text-[10px] font-semibold shadow-2xs transition-colors duration-150 ${card.pillColor}`}
                          >
                            <span className={`mr-1 font-bold ${card.checkColor}`}>✓</span>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link & Software Name */}
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs shrink-0">
                      <span className="font-black text-white text-[11.5px] sm:text-xs">
                        {card.name}
                      </span>

                      <Link
                        href={card.actionLink.url}
                        className="inline-flex items-center gap-1 rounded-full bg-white text-black px-3 py-1 text-[10.5px] font-bold shadow-xs hover:bg-neutral-200 transition"
                      >
                        {card.actionLink.label}
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Indicator Step Pill */}
                  <div className="relative mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[9.5px] sm:text-[10.5px] text-neutral-400 shrink-0">
                    <span className="font-mono font-bold text-white">
                      Workstation {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} / {workstationCards.length}
                    </span>
                    <span className="font-semibold text-neutral-300 truncate max-w-[200px]">
                      {idx === workstationCards.length - 1
                        ? "✓ Complete Workstation Suite"
                        : "↓ Scroll to scrub next domain"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Progress Indicator Bar */}
        <div className="relative z-10 mx-auto max-w-4xl w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-neutral-800/80">
          {/* Step Progress Dots */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {workstationCards.map((c, i) => (
              <div
                key={c.id}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  activeCardIndex === i
                    ? "w-6 sm:w-8 bg-indigo-400 shadow-xs shadow-indigo-400/50"
                    : "w-1.5 sm:w-2 bg-neutral-700"
                }`}
                title={c.name}
              />
            ))}
          </div>

          {/* Active Domain Label & Hint */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-400">
            <span className="font-bold text-white truncate max-w-[200px] sm:max-w-none">
              {currentActiveCard.name}
            </span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">
              {activeCardIndex + 1} of {workstationCards.length} Domains
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-neutral-500">
              Scroll up/down to slide
            </span>
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

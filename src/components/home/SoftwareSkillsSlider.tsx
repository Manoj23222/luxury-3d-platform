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

interface SoftwareCardData {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  subtitleColor: string;
  checkColor: string;
  gradientBg: string;
  borderColor: string;
  glowColor: string;
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
    gradientBg: "bg-gradient-to-br from-blue-50/95 via-sky-50/40 to-white",
    borderColor: "border-blue-200/90 hover:border-blue-500",
    glowColor: "from-blue-500/20 via-sky-400/10 to-transparent",
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
    subtitleColor: "text-amber-800",
    checkColor: "text-amber-600",
    gradientBg: "bg-gradient-to-br from-amber-50/95 via-orange-50/40 to-white",
    borderColor: "border-amber-200/90 hover:border-amber-500",
    glowColor: "from-amber-500/20 via-orange-400/10 to-transparent",
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
    subtitleColor: "text-orange-800",
    checkColor: "text-orange-600",
    gradientBg: "bg-gradient-to-br from-orange-50/95 via-amber-50/40 to-white",
    borderColor: "border-orange-200/90 hover:border-orange-500",
    glowColor: "from-orange-500/20 via-amber-400/10 to-transparent",
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
    subtitleColor: "text-purple-800",
    checkColor: "text-purple-600",
    gradientBg: "bg-gradient-to-br from-purple-50/95 via-fuchsia-50/40 to-white",
    borderColor: "border-purple-200/90 hover:border-purple-500",
    glowColor: "from-purple-500/20 via-fuchsia-400/10 to-transparent",
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
    subtitleColor: "text-sky-800",
    checkColor: "text-sky-600",
    gradientBg: "bg-gradient-to-br from-sky-50/95 via-blue-50/40 to-white",
    borderColor: "border-sky-200/90 hover:border-sky-500",
    glowColor: "from-sky-500/20 via-cyan-400/10 to-transparent",
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
    subtitleColor: "text-teal-800",
    checkColor: "text-teal-600",
    gradientBg: "bg-gradient-to-br from-teal-50/95 via-cyan-50/40 to-white",
    borderColor: "border-teal-200/90 hover:border-teal-500",
    glowColor: "from-teal-500/20 via-cyan-400/10 to-transparent",
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
    subtitleColor: "text-emerald-800",
    checkColor: "text-emerald-600",
    gradientBg: "bg-gradient-to-br from-emerald-50/95 via-teal-50/40 to-white",
    borderColor: "border-emerald-200/90 hover:border-emerald-500",
    glowColor: "from-emerald-500/20 via-teal-400/10 to-transparent",
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
    subtitleColor: "text-pink-800",
    checkColor: "text-pink-600",
    gradientBg: "bg-gradient-to-br from-pink-50/95 via-rose-50/40 to-white",
    borderColor: "border-pink-200/90 hover:border-pink-500",
    glowColor: "from-pink-500/20 via-rose-400/10 to-transparent",
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
  {
    id: "chatgpt-gemini",
    name: "ChatGPT & Google Gemini",
    title: "AI Prompt Engineering",
    subtitle: "ChatGPT & Gemini LLM Systems",
    subtitleColor: "text-emerald-800",
    checkColor: "text-emerald-600",
    gradientBg: "bg-gradient-to-br from-emerald-50/95 via-teal-50/40 to-white",
    borderColor: "border-emerald-200/90 hover:border-emerald-500",
    glowColor: "from-emerald-500/20 via-teal-400/10 to-transparent",
    description:
      "Advanced prompt design, reasoning chain optimization, contextual logic synthesis, structured outputs, and automated workflows.",
    renderLogo: () => <ChatGptLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
  },
  {
    id: "claude-codex",
    name: "Claude & Codex",
    title: "AI Code Generation",
    subtitle: "Claude AI & Codex Software Dev",
    subtitleColor: "text-amber-800",
    checkColor: "text-amber-600",
    gradientBg: "bg-gradient-to-br from-amber-50/95 via-orange-50/40 to-white",
    borderColor: "border-amber-200/90 hover:border-amber-500",
    glowColor: "from-amber-500/20 via-orange-400/10 to-transparent",
    description:
      "Generating production-ready React/Next.js code, TypeScript architecture, database schemas, full-stack debugging, and API routing.",
    renderLogo: () => <ClaudeLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    title: "Agentic AI & Rapid Dev",
    subtitle: "Google Antigravity Agent Platform",
    subtitleColor: "text-indigo-800",
    checkColor: "text-indigo-600",
    gradientBg: "bg-gradient-to-br from-indigo-50/95 via-violet-50/40 to-white",
    borderColor: "border-indigo-200/90 hover:border-indigo-500",
    glowColor: "from-indigo-500/20 via-violet-400/10 to-transparent",
    description:
      "Autonomous coding workflows, multi-agent tool orchestration, full-stack builds, terminal automation, and rapid live deployment.",
    renderLogo: () => <AntigravityLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />,
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
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-10 sm:py-12">
      {/* 1. TOP HEADER: Specialized Software & Creative Tools */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span>✨ Specialized Software & Creative Tools</span>
        </div>
      </div>

      {/* Auto Horizontal Scrolling Infinite Marquee Track with Left & Right container padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-9">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50/80 py-2.5 shadow-2xs"
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

      {/* 2. LUXURY PROMOTIONAL SHOWCASE BANNER CONTAINER (LIGHT LUXURY THEME) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-violet-50/70 via-white to-indigo-50/60 p-6 sm:p-8 lg:p-10 shadow-xl">
          {/* Ambient Lighting Orbs & Grid */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

          {/* Subtle Cyber / Studio Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Banner Header Section */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-indigo-100">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/90 border border-indigo-300/80 px-3.5 py-1 text-xs font-bold text-indigo-900 mb-3 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px]">Creative Workstation Ecosystem</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
                Specialized 3D & Digital Design Domains
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Individual software workstations with full breakdown of production capabilities and specialized design skills.
              </p>

              {/* Quick Highlight Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-indigo-600 font-bold">⚡</span> 11 Dedicated Workstations
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-amber-600 font-bold">💎</span> 130+ Specialized Skills
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span> Production Pipeline Ready
                </span>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
                Scroll Workstations →
              </span>
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition shadow-xs ${
                  canScrollLeft
                    ? "border-neutral-300 bg-white text-neutral-900 hover:border-black hover:bg-neutral-50 cursor-pointer"
                    : "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                ←
              </button>
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition shadow-xs ${
                  canScrollRight
                    ? "border-neutral-300 bg-white text-neutral-900 hover:border-black hover:bg-neutral-50 cursor-pointer"
                    : "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                →
              </button>
            </div>
          </div>

          {/* Cards Carousel Tray */}
          <div className="relative z-10 pt-6 sm:pt-7">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {softwareCards.map((card) => (
                <div
                  key={card.id}
                  style={{ scrollSnapAlign: "start" }}
                  className={`group relative flex w-[270px] sm:w-[300px] shrink-0 flex-col justify-between rounded-3xl border ${card.borderColor} ${card.gradientBg} p-5 sm:p-5.5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden select-none`}
                >
                  {/* Ambient Card Glow */}
                  <div
                    className={`pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br ${card.glowColor} blur-2xl group-hover:scale-125 transition-transform duration-500`}
                  />

                  <div className="relative">
                    {/* Header: Logo, Title, Subtitle */}
                    <div className="flex items-start gap-3 border-b border-black/5 pb-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-black/10 shadow-xs group-hover:scale-105 transition duration-200">
                        {card.renderLogo()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-black text-black truncate group-hover:text-black">
                          {card.title}
                        </h4>
                        <p className={`mt-0.5 text-[11px] font-bold ${card.subtitleColor} truncate`}>
                          {card.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-2.5 text-xs leading-relaxed text-neutral-600 font-medium">
                      {card.description}
                    </p>

                    {/* Skills Pills with checkmarks */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {card.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-lg border border-black/5 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10.5px] font-semibold text-neutral-800 shadow-2xs transition hover:border-black/30 hover:bg-white cursor-default"
                        >
                          <span className={`mr-1 font-bold ${card.checkColor}`}>✓</span>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="relative mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-neutral-700">{card.name}</span>
                    <span className="rounded-full bg-black/80 text-white px-2.5 py-0.5 text-[10px] font-black tracking-wide shadow-2xs">
                      {card.skills.length} Skills
                    </span>
                  </div>
                </div>
              ))}
            </div>
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

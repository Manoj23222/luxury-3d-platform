"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Real Animated Number Counter Component
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Magnetic Button Wrapper
function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isReducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ========================================================
// 8 CORE SOFTWARE SKILLS STEP-BY-STEP DATA
// ========================================================
interface SoftwareSkillStep {
  step: string;
  name: string;
  category: string;
  icon: string;
  workImage: string;
  badge: string;
  desc: string;
  skills: string[];
}

const softwareSkillsSteps: SoftwareSkillStep[] = [
  {
    step: "01",
    name: "Adobe Photoshop",
    category: "High-End Photo Retouching & Post-Production",
    icon: "/Softwear Icon/photoshop.svg",
    workImage: "/software-work/photoshop-work.png",
    badge: "6+ Yrs Mastery",
    desc: "16-Bit RAW commercial photo retouching, non-destructive frequency separation, skin micro-texture preservation, e-commerce catalog enhancement, and high-end editorial color grading.",
    skills: [
      "16-Bit RAW Retouching",
      "Frequency Separation",
      "Background Removal & Editing",
      "Skin Micro-Texture",
      "Color Correction & Grading",
      "Clipping Path & Masking",
      "Product Photo Retouching",
    ],
  },
  {
    step: "02",
    name: "Adobe Illustrator",
    category: "Vector Precision & Technical Branding",
    icon: "/Softwear Icon/adobe-illustrator-svgrepo-com.svg",
    workImage: "/software-work/illustrator-work.png",
    badge: "500+ Assets",
    desc: "Precision vector illustration, technical apparel tech-packs, brand identity systems, logo construction, typography layout, color separation, and commercial packaging print assets.",
    skills: [
      "Vector Tracing",
      "Logo Designing",
      "Apparel Tech-Packs",
      "Typography & Layout",
      "Packaging Design",
      "Vector Illustration",
      "Color Separation",
    ],
  },
  {
    step: "03",
    name: "Adobe Lightroom",
    category: "16-Bit RAW Grading & Studio Lighting",
    icon: "/Softwear Icon/adobe-lightroom-svgrepo-com.svg",
    workImage: "/software-work/lightroom-work.png",
    badge: "Studio Grading",
    desc: "Batch RAW commercial grading, tonal curve calibration, highlight/shadow dynamic balancing, exposure calibration, and high-volume commercial photo catalogues.",
    skills: [
      "16-Bit RAW Grading",
      "Color Balancing",
      "Tone Curves",
      "Batch Processing",
      "Noise Reduction",
      "Selective Masking",
      "Catalogue Calibration",
    ],
  },
  {
    step: "04",
    name: "Canva",
    category: "Graphic Design & Marketing Collateral",
    icon: "/Softwear Icon/canva-icon.webp",
    workImage: "/software-work/canva-work.png",
    badge: "Fast Turnaround",
    desc: "High-speed marketing asset creation, social media campaign banners, presentation decks, e-commerce graphics, and promotional design kits.",
    skills: [
      "Social Media Graphics",
      "Marketing Collateral",
      "Banner Designing",
      "Presentation Decks",
      "Brand Templates",
      "Layout Composition",
    ],
  },
  {
    step: "05",
    name: "Blender 3D",
    category: "Hard-Surface CGI, PBR Shading & Real-Time GLB",
    icon: "/Softwear Icon/blender-svgrepo-com.svg",
    workImage: "/software-work/blender-work.png",
    badge: "300+ 3D Models",
    desc: "Subdivision hard-surface modeling, procedural PBR shader graphs, studio 3-point lighting setups, low-poly retopology, Cycles/Eevee renders, and web-ready GLB/glTF optimization.",
    skills: [
      "3D Product Modeling",
      "Subdivision Surfaces",
      "PBR Material Shaders",
      "UV Unwrapping & Baking",
      "Studio 3-Point Lighting",
      "Photorealistic CGI",
      "GLB/glTF Optimization",
    ],
  },
  {
    step: "06",
    name: "CLO 3D",
    category: "Digital Fashion, Virtual Garments & Drape Physics",
    icon: "/Softwear Icon/clo3d.svg",
    workImage: "/software-work/clo3d-work.png",
    badge: "Digital Fashion",
    desc: "2D pattern construction to 3D garment simulation, multi-layer luxury fabric drape physics, micro-seam stitching, and realistic cloth animation calibrated for luxury apparel.",
    skills: [
      "2D to 3D Patterning",
      "Cloth Drape Simulation",
      "Fabric Physics Tuning",
      "Micro-Seam Stitching",
      "PBR Apparel Texturing",
      "3D Fit Validation",
      "High-Fidelity Garment Drape",
    ],
  },
  {
    step: "07",
    name: "Microsoft Excel",
    category: "Production Tracking, Data & Workflow Matrices",
    icon: "/Softwear Icon/excel2-svgrepo-com.svg",
    workImage: "/software-work/excel-work.jpg",
    badge: "Workflow Control",
    desc: "3D asset inventory cataloging, SKU metadata indexing, delivery schedules, data validation formulas, and client specification tracking matrices.",
    skills: [
      "Asset Cataloging",
      "SKU Metadata Indexing",
      "Formulas & Automation",
      "Workflow Scheduling",
      "Quality Control Checklists",
      "Production Matrices",
    ],
  },
  {
    step: "08",
    name: "Google Antigravity",
    category: "Agentic AI Engineering & Next-Gen Coding",
    icon: "/Softwear Icon/google-antigravity.png",
    workImage: "/software-work/antigravity-work.png",
    badge: "AI Orchestration",
    desc: "Agentic AI workflows, autonomous developer orchestration, multi-agent collaboration, full-stack Next.js/Three.js architecture, and rapid deployment.",
    skills: [
      "Agentic AI Workflows",
      "Autonomous Multi-Agent",
      "TypeScript & Next.js",
      "Three.js Integration",
      "Prompt Engineering",
      "Modern Web Architecture",
    ],
  },
];

export default function AboutCinematicExperience() {
  const isReducedMotion = useReducedMotion();

  // Project Cards Mouse Highlight Tracking
  const [bootkitPos, setBootkitPos] = useState({ x: 0, y: 0, isHovered: false });
  const [lux3dPos, setLux3dPos] = useState({ x: 0, y: 0, isHovered: false });

  // Active Scroll Section Tracking for Side Indicator
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.6) {
        setActiveSection("hero");
      } else if (scrollY < windowHeight * 1.6) {
        setActiveSection("skills");
      } else if (scrollY < windowHeight * 2.5) {
        setActiveSection("experience");
      } else if (scrollY < windowHeight * 3.6) {
        setActiveSection("projects");
      } else {
        setActiveSection("studio");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-[#EFEEEB] text-[#0A0A0A] min-h-screen selection:bg-[#D12424] selection:text-white">
      {/* ================= GLOBAL FLOATING AMBIENT GLOW & GRID ================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-black/[0.02] blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-[#D12424]/[0.02] blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ================= DESKTOP STICKY SECTION SCROLL INDICATOR ================= */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5 select-none pointer-events-none">
        {[
          { id: "hero", label: "PROFILE" },
          { id: "skills", label: "SKILLS" },
          { id: "experience", label: "EXPERIENCE" },
          { id: "projects", label: "PROJECTS" },
          { id: "studio", label: "STUDIO" },
        ].map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div key={sec.id} className="flex items-center gap-2.5 transition-all duration-300">
              <span
                className={`text-[9px] font-mono tracking-widest font-bold transition-all duration-300 ${
                  isActive ? "text-[#D12424] opacity-100 translate-x-0" : "text-[#76756F] opacity-40 translate-x-2"
                }`}
              >
                {sec.label}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "h-6 w-1.5 bg-[#D12424] shadow-[0_0_12px_rgba(209,36,36,0.6)]" : "h-1.5 w-1.5 bg-[#76756F]"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. HERO — PROFESSIONAL PROFILE & DETAILS (LEFT ALIGNED) */}
      {/* ======================================================== */}
      <section id="hero" className="relative overflow-hidden border-b border-[#D8D7D1] pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#EFEEEB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Details (Directly on #EFEEEB, matching Home Page luxury style) */}
          <div className="max-w-4xl space-y-5 text-left">
            {/* Badges: Professional Profile + Available + Location */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D8D7D1] bg-white/70 px-3.5 py-1 text-xs font-bold text-[#0A0A0A] shadow-2xs">
                <span>✦ Professional Profile</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Work
              </span>
              <span className="text-xs text-[#76756F] font-mono font-medium">
                📍 Sardarshahar, Rajasthan, India
              </span>
            </div>

            {/* Name */}
            <div className="overflow-hidden py-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] leading-none">
                Ashok Meena
              </h1>
            </div>

            {/* Job Title with Accent Bar */}
            <div className="flex items-center gap-3 pt-0.5">
              <div className="h-1 w-12 rounded-full bg-[#D12424]" />
              <p className="text-base sm:text-lg lg:text-xl font-bold text-[#D12424]">
                Senior 3D Designer & Photo Editor
              </p>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-2.5 pt-1 text-xs sm:text-sm leading-relaxed text-[#56554F] font-normal">
              <p>
                Senior 3D & Graphic Designer with <strong className="text-[#0A0A0A] font-bold">6+ years of professional experience</strong> creating, optimizing, and delivering high-fidelity 3D assets for digital fashion, e-commerce, and real-time 3D web simulators.
              </p>
              <p>
                Proven expertise in <strong className="text-[#0A0A0A] font-bold">Blender, CLO 3D, and Adobe Creative Suite</strong> with end-to-end knowledge of 3D modeling, UV unwrapping, PBR texturing, lighting, typography, and asset optimization.
              </p>
              <p>
                Successfully delivered <strong className="text-[#0A0A0A] font-bold">300+ production-ready 3D models</strong> and digital assets with strict quality control for global platforms.
              </p>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[#D8D7D1] py-4 mt-4">
              {[
                { val: 6, suffix: "+ Yrs", label: "Experience", color: "text-[#0A0A0A]" },
                { text: "Infoeye", label: "Studio Position", color: "text-[#D12424]" },
                { val: 300, suffix: "+", label: "3D Assets Delivered", color: "text-[#0A0A0A]" },
                { val: 100, suffix: "%", label: "PBR & QC Quality", color: "text-[#0A0A0A]" },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#D8D7D1] bg-white/70 p-3.5 text-center shadow-2xs hover:border-[#0A0A0A] hover:bg-white transition-all"
                >
                  <p className={`text-2xl font-black ${metric.color}`}>
                    {metric.val !== undefined ? (
                      <AnimatedNumber value={metric.val} suffix={metric.suffix} />
                    ) : (
                      metric.text
                    )}
                  </p>
                  <p className="text-[10px] font-mono font-bold text-[#76756F] uppercase tracking-wider mt-0.5">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton
                href="mailto:ashokm3414@gmail.com"
                className="rounded-full bg-[#0A0A0A] px-6 py-2.5 text-xs font-black text-white shadow-md hover:bg-[#D12424] transition-colors"
              >
                ✉️ ashokm3414@gmail.com
              </MagneticButton>

              <MagneticButton
                href="tel:+918000093300"
                className="rounded-full border border-[#D8D7D1] bg-white/80 px-5 py-2.5 text-xs font-bold text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-white shadow-2xs transition-colors"
              >
                📞 +91 80000 93300
              </MagneticButton>

              <MagneticButton
                href="/Ashok_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#D8D7D1] bg-white/80 px-5 py-2.5 text-xs font-bold text-[#0A0A0A] hover:border-[#D12424] hover:text-[#D12424] transition-colors shadow-2xs"
              >
                Download Resume (PDF) ↓
              </MagneticButton>
            </div>
          </div>

          {/* DIVIDER LINE BEFORE SKILLS */}
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#D8D7D1] my-14 sm:my-20" />

          {/* ======================================================== */}
          {/* SKILLS SECTION — OPPOSITE WORKING SOFTWARE IMAGES       */}
          {/* ======================================================== */}
          <div id="skills" className="space-y-10 sm:space-y-12">
            {/* Heading */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#D8D7D1]">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#76756F] uppercase">
                  (PRODUCTION STACK / STEP-BY-STEP WORKSTATIONS)
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight mt-1">
                  Skills
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-[#76756F] uppercase tracking-wider">
                8 Production Tools • End-to-End Pipeline
              </span>
            </div>

            {/* Alternating Step Cards & Opposite Software Workspace Images */}
            <div className="space-y-12 sm:space-y-16">
              {softwareSkillsSteps.map((step, idx) => {
                const isCardLeft = idx % 2 === 0;

                // Card Element (Left for Step 1, 3, 5, 7; Right for Step 2, 4, 6, 8)
                const cardNode = (
                  <div className="flex flex-col justify-between rounded-2xl border border-[#D8D7D1] bg-white/80 hover:bg-white p-6 sm:p-7 shadow-xs hover:border-[#0A0A0A] hover:shadow-md transition-all duration-300 text-left h-full group">
                    <div>
                      {/* Step Tag + Experience Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-black uppercase tracking-wider text-[#D12424] bg-[#D12424]/10 px-3 py-1 rounded-full">
                          Step {step.step}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#76756F] uppercase tracking-wider bg-white border border-[#D8D7D1] px-2.5 py-0.5 rounded-full">
                          {step.badge}
                        </span>
                      </div>

                      {/* Software Icon + Title */}
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-2xs shrink-0 flex items-center justify-center bg-white p-2 border border-[#D8D7D1]">
                          <Image
                            src={step.icon}
                            alt={step.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] group-hover:text-[#D12424] transition-colors tracking-tight">
                            {step.name}
                          </h3>
                          <p className="text-[11px] font-mono text-[#76756F] uppercase tracking-wider">
                            {step.category}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#56554F] leading-relaxed mb-5">
                        {step.desc}
                      </p>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#D8D7D1]/70">
                      {step.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-semibold text-[#0A0A0A] bg-white border border-[#D8D7D1] rounded-md px-2.5 py-0.5 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );

                // Image Element (Opposite side: Right for Step 1, 3, 5, 7; Left for Step 2, 4, 6, 8)
                const imageNode = (
                  <div className="relative w-full min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] h-full rounded-2xl overflow-hidden border border-[#D8D7D1] bg-[#E2E0D8]/50 shadow-xs hover:border-[#0A0A0A] hover:shadow-md transition-all duration-300 group/img flex items-center justify-center">
                    <Image
                      src={step.workImage}
                      alt={`${step.name} Production Workspace`}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 transition-opacity" />
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                      <div className="inline-flex items-center gap-2 bg-black/80 border border-white/20 px-3 py-1 rounded-lg backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                          {step.name} Workspace
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest hidden sm:inline-block bg-black/60 px-2 py-0.5 rounded">
                        Step {step.step}
                      </span>
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={step.name}
                    initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
                  >
                    {/* Card Column: Mobile always order-1, Desktop order-1 if Left, order-2 if Right */}
                    <div className={`w-full ${isCardLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
                      {cardNode}
                    </div>

                    {/* Image Column: Mobile always order-2, Desktop order-2 if Right, order-1 if Left */}
                    <div className={`w-full ${isCardLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
                      {imageNode}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. EXPERIENCE & EDUCATION — TWO-PANEL 3D OPPOSITE OPENING */}
      {/* ======================================================== */}
      <section id="experience" className="py-20 border-b border-[#D8D7D1] bg-[#EFEEEB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2" style={{ perspective: "1400px" }}>
            {/* Left Card: Work Experience (Rotates in from Left) */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { rotateY: -8, x: -80, scale: 0.94, opacity: 0 }
              }
              whileInView={{ rotateY: 0, x: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-[#D8D7D1] bg-white/80 hover:bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D8D7D1]">
                  <span className="rounded-full bg-emerald-50 border border-emerald-500/30 px-3.5 py-1 text-xs font-mono font-bold text-emerald-800">
                    2020 – Present (6+ Years)
                  </span>
                  <a
                    href="https://infoeye.com/company/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Infoeye Software ↗
                  </a>
                </div>

                <h2 className="mt-4 text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                  Senior 3D Designer & Photo Editor
                </h2>
                <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                  Infoeye Software • Sardarshahar, Rajasthan, India
                </p>

                <ul className="mt-5 space-y-3 text-xs sm:text-sm text-neutral-600">
                  {[
                    "Model, simulate, and optimize 3D apparel and hard-surface assets using Blender and CLO 3D.",
                    "Successfully delivered 300+ production-ready 3D models with strict quality control for international client platforms.",
                    "Lead non-destructive 16-bit RAW commercial photo retouching, frequency separation, and color grading.",
                    "Engineered lightweight OBJ, GLB/glTF files with PBR materials for real-time 60 FPS web configurators.",
                  ].map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.08 + 0.1 }}
                        className="text-emerald-600 font-bold shrink-0 mt-0.5"
                      >
                        ✓
                      </motion.span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* President Dinner Recognition Badge */}
              <div className="mt-6 pt-4 border-t border-[#D8D7D1]">
                <a
                  href="https://infoeye.com/news/staff/11540/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-amber-300 bg-amber-50/80 p-3.5 text-xs font-bold text-amber-900 shadow-xs transition hover:bg-amber-100/80"
                >
                  🏆 Official Executive Recognition: Infoeye President personally visited Ashok&apos;s home for dinner ↗
                </a>
              </div>
            </motion.div>

            {/* Right Card: Education & Vertical Timeline Drawing (Rotates in from Right) */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { rotateY: 8, x: 80, scale: 0.94, opacity: 0 }
              }
              whileInView={{ rotateY: 0, x: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-[#D8D7D1] bg-white/80 hover:bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D8D7D1]">
                  <span className="rounded-full bg-neutral-100 border border-neutral-200 px-3.5 py-1 text-xs font-mono font-bold text-neutral-700">
                    Academic Background
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700">TIMELINE DRAWING</span>
                </div>

                {/* Animated Vertical Timeline Line and Degree Nodes */}
                <div className="relative mt-6 pl-7 space-y-6">
                  {/* Drawing Line */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 origin-top shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                  />

                  {/* Degree 1: M.Sc. */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="absolute -left-7 top-1 h-5 w-5 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center shadow-xs"
                    >
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </motion.div>

                    <div className="rounded-2xl border border-[#D8D7D1] bg-[#E2E0D8]/40 p-4 hover:border-emerald-500/40 transition">
                      <h3 className="text-sm font-black text-neutral-950">
                        Master of Science (M.Sc.) in Computer Science
                      </h3>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">2025 – 2026 (Ongoing)</p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
                      </p>
                    </div>
                  </div>

                  {/* Degree 2: B.A. */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="absolute -left-7 top-1 h-5 w-5 rounded-full border-2 border-cyan-500 bg-white flex items-center justify-center shadow-xs"
                    >
                      <div className="h-2 w-2 rounded-full bg-cyan-500" />
                    </motion.div>

                    <div className="rounded-2xl border border-[#D8D7D1] bg-[#E2E0D8]/40 p-4 hover:border-cyan-500/40 transition">
                      <h3 className="text-sm font-black text-neutral-950">
                        Bachelor of Arts (B.A.)
                      </h3>
                      <p className="text-xs font-bold text-cyan-700 mt-0.5">Graduated 2024</p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D8D7D1] flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-600">Languages:</span>
                <span className="font-medium text-emerald-700">Hindi (Native) • English (Proficient)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SPECIALIZED SOFTWARE & CREATIVE WORKSTATIONS SLIDER   */}
      {/* ======================================================== */}
      

      {/* ======================================================== */}
      {/* 4. FEATURED AI WEB ENGINEERING & FULL-STACK MODULES      */}
      {/* ======================================================== */}
      <section id="projects" className="py-20 border-b border-[#D8D7D1] bg-[#EFEEEB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#D8D7D1]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Full-Stack & AI Software Engineering</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 tracking-tight">
                Featured Web Platforms & AI Applications
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 max-w-2xl">
                Combining <strong className="text-neutral-950">M.Sc. Computer Science</strong> technical engineering with advanced <strong className="text-emerald-700">AI Prompt Engineering</strong> to build and deploy production web applications at scale.
              </p>
            </div>

            <Link
              href="/contact?subject=Full-Stack%20Web%20Development%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 text-xs font-black text-white shadow-md transition hover:scale-105 shrink-0 hover:bg-neutral-800"
            >
              <span>Hire for Web Development</span>
              <span>✉️</span>
            </Link>
          </div>

          {/* 2 Floating Technology Modules */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2" style={{ perspective: "1400px" }}>
            {/* Project 1: BootKit */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { x: -70, rotateY: -6, scale: 0.94, opacity: 0 }
              }
              whileInView={{ x: 0, rotateY: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setBootkitPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, isHovered: true });
              }}
              onMouseLeave={() => setBootkitPos((prev) => ({ ...prev, isHovered: false }))}
              className="relative overflow-hidden rounded-3xl border border-[#D8D7D1] bg-white/80 hover:bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between group transition-colors"
            >
              {/* Internal Cursor Highlight */}
              {bootkitPos.isHovered && !isReducedMotion && (
                <div
                  className="pointer-events-none absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-2xl transition-transform duration-150"
                  style={{ transform: `translate3d(${bootkitPos.x - 128}px, ${bootkitPos.y - 128}px, 0)` }}
                />
              )}

              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="rounded-full bg-emerald-50 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                    🛒 Full-Stack E-Commerce & PWA
                  </span>
                  <span className="rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 px-3 py-0.5 text-[10.5px] font-mono font-bold">
                    🤖 AI Prompt Engineered
                  </span>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                  BootKiT — Quick-Commerce & Grocery Delivery Platform
                </h3>
                <p className="mt-1 text-xs font-mono font-semibold text-emerald-700">
                  Next.js • React • TypeScript • Supabase • Tailwind CSS • Vercel • PWA
                </p>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-neutral-600">
                  Built a full-fledged quick-commerce progressive web app using AI-assisted rapid engineering. Features instant category indexing, live voice/text search, localized delivery addresses, dynamic cart & checkout management, and mobile PWA native navigation.
                </p>

                <div className="mt-4 rounded-2xl border border-[#D8D7D1] bg-[#E2E0D8]/40 p-4 space-y-2 text-xs text-neutral-600">
                  <p className="font-mono font-bold text-[10.5px] uppercase tracking-wider text-emerald-700">Highlights:</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span> 10–20 minute delivery workflow & multi-category product catalog</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span> Progressive Web App (PWA) installable on mobile devices</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span> Production deployed on custom domain (bootkit.in)</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D8D7D1] flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.bootkit.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-xs font-black text-white hover:bg-neutral-800 transition shadow-xs"
                  >
                    <span>Visit bootkit.in</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">↗</span>
                  </a>
                  <a
                    href="https://bootkit.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#D8D7D1] bg-white px-3.5 py-2 text-xs font-bold text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition shadow-xs"
                  >
                    Vercel Mirror ↗
                  </a>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-700">● Live Production</span>
              </div>
            </motion.div>

            {/* Project 2: Lux3D */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { x: 70, rotateY: 6, scale: 0.94, opacity: 0 }
              }
              whileInView={{ x: 0, rotateY: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setLux3dPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, isHovered: true });
              }}
              onMouseLeave={() => setLux3dPos((prev) => ({ ...prev, isHovered: false }))}
              className="relative overflow-hidden rounded-3xl border border-[#D8D7D1] bg-white/80 hover:bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between group transition-colors"
            >
              {/* Internal Cursor Highlight */}
              {lux3dPos.isHovered && !isReducedMotion && (
                <div
                  className="pointer-events-none absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl transition-transform duration-150"
                  style={{ transform: `translate3d(${lux3dPos.x - 128}px, ${lux3dPos.y - 128}px, 0)` }}
                />
              )}

              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="rounded-full bg-cyan-50 border border-cyan-500/30 px-3 py-0.5 text-[11px] font-bold text-cyan-800">
                    🧊 3D WebGL & Creative Platform
                  </span>
                  <span className="rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 px-3 py-0.5 text-[10.5px] font-mono font-bold">
                    🤖 AI-Assisted Architecture
                  </span>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                  Lux3D — 3D & AI Creative Web Platform
                </h3>
                <p className="mt-1 text-xs font-mono font-semibold text-cyan-700">
                  Next.js 16 • TypeScript • Three.js / WebGL • MongoDB • Tailwind CSS 4
                </p>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-neutral-600">
                  Architected an interactive 3D WebGL asset viewer and creative photo retouching showcase platform. Integrated 60 FPS Three.js orbit controls, Before/After image split sliders, and custom real-time traffic tracking analytics.
                </p>

                <div className="mt-4 rounded-2xl border border-[#D8D7D1] bg-[#E2E0D8]/40 p-4 space-y-2 text-xs text-neutral-600">
                  <p className="font-mono font-bold text-[10.5px] uppercase tracking-wider text-cyan-700">Highlights:</p>
                  <p className="flex items-start gap-2"><span className="text-cyan-600 font-bold">✓</span> 60 FPS real-time Three.js WebGL orbit viewer for Blender GLB assets</p>
                  <p className="flex items-start gap-2"><span className="text-cyan-600 font-bold">✓</span> Interactive Before/After split sliders & high-res image modals</p>
                  <p className="flex items-start gap-2"><span className="text-cyan-600 font-bold">✓</span> Real-time live visitor tracking engine & admin traffic dashboard</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D8D7D1] flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Link
                    href="/portfolio"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-2 text-xs font-black text-white hover:bg-neutral-800 transition shadow-xs"
                  >
                    <span>Explore 3D Platform</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">↗</span>
                  </Link>
                  <Link
                    href="/work"
                    className="rounded-full border border-[#D8D7D1] bg-white px-3.5 py-2 text-xs font-bold text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition shadow-xs"
                  >
                    Creative Work ↗
                  </Link>
                </div>
                <span className="text-[11px] font-mono font-bold text-cyan-700">● Live Production</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. COMPANY TEAM & STUDIO LIFE GALLERY                   */}
      {/* ======================================================== */}
      <section id="studio" className="py-20 border-b border-[#D8D7D1] bg-[#EFEEEB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#D8D7D1]">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 tracking-tight">
                Company Team & Studio Life
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-2xl">
                Collaborating with passionate engineers, artists, and leaders at Infoeye Software. Building innovative digital fashion and 3D simulation solutions together.
              </p>
            </div>
            <a
              href="https://infoeye.com/company/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#D8D7D1] bg-white px-5 py-2.5 text-xs font-bold text-neutral-800 shadow-xs transition hover:bg-neutral-50 hover:border-neutral-400 shrink-0"
            >
              <span>Visit Infoeye Company</span>
              <span>↗</span>
            </a>
          </div>

          {/* 3 Office Photos with Staggered Entrance & 3D Tilt */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Photo 1 */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { x: -40, rotate: -2, opacity: 0 }
              }
              whileInView={{ x: 0, rotate: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-[#D8D7D1] bg-white/80 p-3 shadow-sm transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="/office/IMG_0548.jpeg?v=2"
                  alt="Infoeye Company Team"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </div>
            </motion.div>

            {/* Photo 2 */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { y: 40, scale: 0.95, opacity: 0 }
              }
              whileInView={{ y: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-[#D8D7D1] bg-white/80 p-3 shadow-sm transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="/office/IMG_0549.jpeg"
                  alt="Infoeye Team & Leadership"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </div>
            </motion.div>

            {/* Photo 3 */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { x: 40, rotate: 2, opacity: 0 }
              }
              whileInView={{ x: 0, rotate: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.24 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-[#D8D7D1] bg-white/80 p-3 shadow-sm transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="/office/1.jpg"
                  alt="Ashok Meena 3D Studio Workstation"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. BESPOKE CONTACT INQUIRY SECTION                       */}
      {/* ======================================================== */}
     
    </div>
  );
}

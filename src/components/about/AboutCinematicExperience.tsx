"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SoftwareSkillsSlider from "@/components/home/SoftwareSkillsSlider";
import AboutContactCard from "./AboutContactCard";

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
      // Ease out cubic
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

export default function AboutCinematicExperience() {
  const isReducedMotion = useReducedMotion();

  // Profile Image 3D Mouse Parallax State
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });

  // Project Cards Mouse Highlight Tracking
  const [bootkitPos, setBootkitPos] = useState({ x: 0, y: 0, isHovered: false });
  const [lux3dPos, setLux3dPos] = useState({ x: 0, y: 0, isHovered: false });

  // Active Scroll Section Tracking for Side Indicator
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.7) {
        setActiveSection("hero");
      } else if (scrollY < windowHeight * 1.8) {
        setActiveSection("experience");
      } else if (scrollY < windowHeight * 2.9) {
        setActiveSection("projects");
      } else {
        setActiveSection("studio");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePhotoMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || !photoContainerRef.current) return;
      const rect = photoContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xNorm = (x / rect.width - 0.5) * 2;
      const yNorm = (y / rect.height - 0.5) * 2;

      setPhotoTilt({
        x: -yNorm * 3.5, // max 3.5 deg rotateX
        y: xNorm * 4.5, // max 4.5 deg rotateY
      });
    },
    [isReducedMotion]
  );

  const handlePhotoMouseLeave = useCallback(() => {
    setPhotoTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div className="relative bg-[#040711] text-white min-h-screen selection:bg-emerald-500 selection:text-black">
      {/* ================= GLOBAL FLOATING AMBIENT GLOW & GRID ================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.04] blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.04] blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ================= DESKTOP STICKY SECTION SCROLL INDICATOR ================= */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5 select-none pointer-events-none">
        {[
          { id: "hero", label: "PROFILE" },
          { id: "experience", label: "EXPERIENCE" },
          { id: "projects", label: "PROJECTS" },
          { id: "studio", label: "STUDIO" },
        ].map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div key={sec.id} className="flex items-center gap-2.5 transition-all duration-300">
              <span
                className={`text-[9px] font-mono tracking-widest font-bold transition-all duration-300 ${
                  isActive ? "text-emerald-400 opacity-100 translate-x-0" : "text-neutral-500 opacity-40 translate-x-2"
                }`}
              >
                {sec.label}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "h-6 w-1.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" : "h-1.5 w-1.5 bg-neutral-600"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. HERO — CINEMATIC PROFILE REVEAL                       */}
      {/* ======================================================== */}
      <section id="hero" className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1422]/90 via-[#070c16]/95 to-[#040810]/90 p-6 sm:p-12 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            <div className="grid gap-10 lg:grid-cols-[280px_1fr] items-center">
              {/* Profile Photo 3D Showcase Frame */}
              <motion.div
                ref={photoContainerRef}
                onMouseMove={handlePhotoMouseMove}
                onMouseLeave={handlePhotoMouseLeave}
                initial={
                  isReducedMotion
                    ? { opacity: 0 }
                    : {
                        scale: 0.75,
                        rotateY: -12,
                        rotateX: 5,
                        x: -40,
                        opacity: 0.4,
                      }
                }
                animate={{
                  scale: 1,
                  rotateY: 0,
                  rotateX: 0,
                  x: 0,
                  opacity: 1,
                }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: "1000px" }}
                className="flex flex-col items-center text-center mx-auto select-none"
              >
                {/* 3D Holographic Scanner Portrait Container */}
                <div
                  className="relative h-72 w-56 sm:h-80 sm:w-60 overflow-hidden rounded-[28px] border-2 border-white/20 bg-neutral-900 shadow-2xl transition-transform duration-200 ease-out"
                  style={{
                    transform:
                      !isReducedMotion
                        ? `rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg) translateZ(18px)`
                        : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Dual Rotating Holographic Light Rings */}
                  <div className="pointer-events-none absolute -inset-6 rounded-[34px] overflow-hidden opacity-75 z-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-10"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0%, #10b981 35%, transparent 60%, #06b6d4 85%, transparent 100%)",
                        mask: "radial-gradient(circle, transparent 65%, black 66%)",
                        WebkitMask: "radial-gradient(circle, transparent 65%, black 66%)",
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-8 opacity-60"
                      style={{
                        background:
                          "conic-gradient(from 180deg, transparent 0%, #3b82f6 30%, transparent 65%, #34d399 90%, transparent 100%)",
                        mask: "radial-gradient(circle, transparent 67%, black 68%)",
                        WebkitMask: "radial-gradient(circle, transparent 67%, black 68%)",
                      }}
                    />
                  </div>

                  {/* Profile Portrait Image */}
                  <img
                    src="/ashok_photo.jpg"
                    alt="Ashok Meena"
                    className="h-full w-full object-cover object-top filter contrast-[1.05] brightness-95 will-change-transform"
                    style={{ transform: !isReducedMotion ? "translateZ(10px) scale(1.04)" : "none" }}
                  />

                  {/* Studio Light Reflection Sweep Every 5.5s */}
                  <motion.div
                    animate={{
                      x: ["-150%", "250%"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 5.5,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 z-30"
                  />

                  {/* Bottom Portrait Name Badge */}
                  <div className="absolute bottom-3 inset-x-3 rounded-xl bg-black/80 border border-white/15 px-3 py-1.5 text-xs font-black text-white backdrop-blur-md shadow-md z-30">
                    Ashok Meena
                  </div>
                </div>

                {/* Status Beacon & Location */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 space-y-1.5 text-center"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Work
                  </span>
                  <p className="text-xs text-neutral-400 font-medium">📍 Sardarshahar, Rajasthan, India</p>
                </motion.div>
              </motion.div>

              {/* Right Side Bio & Headlines with Timed Cinematic Orchestration */}
              <div className="space-y-4">
                {/* 0.6s: Professional Profile Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-bold text-neutral-300 backdrop-blur-md shadow-xs"
                >
                  <span>✦ Professional Profile</span>
                </motion.div>

                {/* 0.8s: Name Masked Text Reveal */}
                <div className="overflow-hidden py-1">
                  <motion.h1
                    initial={
                      isReducedMotion
                        ? { opacity: 0 }
                        : { y: "110%", clipPath: "inset(0 0 100% 0)" }
                    }
                    animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }}
                    transition={{ duration: 0.85, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none"
                  >
                    Ashok Meena
                  </motion.h1>
                </div>

                {/* 1.0s: Job Title with Horizontal Expanding Editorial Line */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 pt-0.5"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                    className="h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                  />
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-emerald-400">
                    Senior 3D Designer & Photo Editor
                  </p>
                </motion.div>

                {/* 1.2s: Bio Text Staggered Multi-Line Reveal */}
                <div className="space-y-2 pt-1 text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal">
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Senior 3D & Graphic Designer with <strong className="text-white font-bold">6+ years of professional experience</strong> creating, optimizing, and delivering high-fidelity 3D assets for digital fashion, e-commerce, and real-time 3D web simulators.
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Proven expertise in <strong className="text-white font-bold">Blender, CLO 3D, and Adobe Creative Suite</strong> with end-to-end knowledge of 3D modeling, UV unwrapping, PBR texturing, lighting, typography, and asset optimization.
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Successfully delivered <strong className="text-emerald-400 font-bold">300+ production-ready 3D models</strong> and digital assets with strict quality control for global platforms.
                    </motion.p>
                  </div>
                </div>

                {/* 1.4s: Key Metrics Strip with Real Animated Number Counters & 3D Hover Depth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.5 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-white/10 py-4 mt-4"
                >
                  {[
                    { val: 6, suffix: "+ Yrs", label: "Experience", color: "text-white" },
                    { text: "Infoeye", label: "Studio Position", color: "text-emerald-400" },
                    { val: 300, suffix: "+", label: "3D Assets Delivered", color: "text-white" },
                    { val: 100, suffix: "%", label: "PBR & QC Quality", color: "text-white" },
                  ].map((metric, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -6,
                        scale: 1.03,
                        rotateX: 2,
                        transition: { duration: 0.2 },
                      }}
                      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-center shadow-xs hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-colors"
                    >
                      <p className={`text-2xl font-black ${metric.color}`}>
                        {metric.val !== undefined ? (
                          <AnimatedNumber value={metric.val} suffix={metric.suffix} />
                        ) : (
                          metric.text
                        )}
                      </p>
                      <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                        {metric.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* 1.6s: Magnetic Action Contact Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.65 }}
                  className="flex flex-wrap items-center gap-3 pt-2"
                >
                  <MagneticButton
                    href="mailto:ashokm3414@gmail.com"
                    className="rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-6 py-2.5 text-xs font-black text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:brightness-110"
                  >
                    ✉️ ashokm3414@gmail.com
                  </MagneticButton>

                  <MagneticButton
                    href="tel:+918000093300"
                    className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-white hover:border-white/40 hover:bg-white/10 backdrop-blur-md"
                  >
                    📞 +91 80000 93300
                  </MagneticButton>

                  <MagneticButton
                    href="/Ashok_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-neutral-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors backdrop-blur-md"
                  >
                    Download Resume (PDF) ↓
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. EXPERIENCE & EDUCATION — TWO-PANEL 3D OPPOSITE OPENING */}
      {/* ======================================================== */}
      <section id="experience" className="py-20 border-b border-white/10 bg-[#040711]">
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
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1422]/90 via-[#070c16]/95 to-[#040810]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-mono font-bold text-emerald-300">
                    2020 – Present (6+ Years)
                  </span>
                  <a
                    href="https://infoeye.com/company/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:underline"
                  >
                    Infoeye Software ↗
                  </a>
                </div>

                <h2 className="mt-4 text-xl sm:text-2xl font-black text-white tracking-tight">
                  Senior 3D Designer & Photo Editor
                </h2>
                <p className="text-xs text-neutral-400 font-semibold mt-0.5">
                  Infoeye Software • Sardarshahar, Rajasthan, India
                </p>

                <ul className="mt-5 space-y-3 text-xs sm:text-sm text-neutral-300">
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
                        className="text-emerald-400 font-bold shrink-0 mt-0.5"
                      >
                        ✓
                      </motion.span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* President Dinner Recognition Badge */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="https://infoeye.com/news/staff/11540/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-amber-500/40 bg-amber-950/30 p-3.5 text-xs font-bold text-amber-300 shadow-xs transition hover:bg-amber-900/40 hover:border-amber-400"
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
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1422]/90 via-[#070c16]/95 to-[#040810]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-mono font-bold text-neutral-200">
                    Academic Background
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">TIMELINE DRAWING</span>
                </div>

                {/* Animated Vertical Timeline Line and Degree Nodes */}
                <div className="relative mt-6 pl-7 space-y-6">
                  {/* Drawing Line */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-500 origin-top shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                  />

                  {/* Degree 1: M.Sc. */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="absolute -left-7 top-1 h-5 w-5 rounded-full border-2 border-emerald-400 bg-neutral-950 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                    >
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </motion.div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-emerald-500/40 transition">
                      <h3 className="text-sm font-black text-white">
                        Master of Science (M.Sc.) in Computer Science
                      </h3>
                      <p className="text-xs font-bold text-emerald-400 mt-0.5">2025 – 2026 (Ongoing)</p>
                      <p className="mt-1 text-xs text-neutral-400">
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
                      className="absolute -left-7 top-1 h-5 w-5 rounded-full border-2 border-cyan-400 bg-neutral-950 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                    >
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    </motion.div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-cyan-500/40 transition">
                      <h3 className="text-sm font-black text-white">
                        Bachelor of Arts (B.A.)
                      </h3>
                      <p className="text-xs font-bold text-cyan-400 mt-0.5">Graduated 2024</p>
                      <p className="mt-1 text-xs text-neutral-400">
                        Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-300">Languages:</span>
                <span className="font-medium text-emerald-300">Hindi (Native) • English (Proficient)</span>
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
      <section id="projects" className="py-20 border-b border-white/10 bg-[#040711]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-bold text-emerald-300 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Full-Stack & AI Software Engineering</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Featured Web Platforms & AI Applications
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 max-w-2xl">
                Combining <strong className="text-white">M.Sc. Computer Science</strong> technical engineering with advanced <strong className="text-emerald-400">AI Prompt Engineering</strong> to build and deploy production web applications at scale.
              </p>
            </div>

            <Link
              href="/contact?subject=Full-Stack%20Web%20Development%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-6 py-2.5 text-xs font-black text-neutral-950 shadow-md transition hover:scale-105 shrink-0"
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
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1422]/90 via-[#070c16]/95 to-[#040810]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between group"
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
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-0.5 text-[11px] font-bold text-emerald-300">
                    🛒 Full-Stack E-Commerce & PWA
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/15 text-white px-3 py-0.5 text-[10.5px] font-mono font-bold">
                    🤖 AI Prompt Engineered
                  </span>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-black text-white tracking-tight">
                  BootKiT — Quick-Commerce & Grocery Delivery Platform
                </h3>
                <p className="mt-1 text-xs font-mono font-semibold text-emerald-400">
                  Next.js • React • TypeScript • Supabase • Tailwind CSS • Vercel • PWA
                </p>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-neutral-300">
                  Built a full-fledged quick-commerce progressive web app using AI-assisted rapid engineering. Features instant category indexing, live voice/text search, localized delivery addresses, dynamic cart & checkout management, and mobile PWA native navigation.
                </p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2 text-xs text-neutral-300">
                  <p className="font-mono font-bold text-[10.5px] uppercase tracking-wider text-emerald-400">Highlights:</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-400 font-bold">✓</span> 10–20 minute delivery workflow & multi-category product catalog</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-400 font-bold">✓</span> Progressive Web App (PWA) installable on mobile devices</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-400 font-bold">✓</span> Production deployed on custom domain (bootkit.in)</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.bootkit.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-black text-neutral-950 hover:bg-neutral-200 transition shadow-sm"
                  >
                    <span>Visit bootkit.in</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">↗</span>
                  </a>
                  <a
                    href="https://bootkit.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-bold text-neutral-200 hover:border-white/40 hover:bg-white/10 transition"
                  >
                    Vercel Mirror ↗
                  </a>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-400">● Live Production</span>
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
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1422]/90 via-[#070c16]/95 to-[#040810]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between group"
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
                  <span className="rounded-full bg-cyan-500/15 border border-cyan-500/40 px-3 py-0.5 text-[11px] font-bold text-cyan-300">
                    🧊 3D WebGL & Creative Platform
                  </span>
                  <span className="rounded-full bg-white/10 border border-white/15 text-white px-3 py-0.5 text-[10.5px] font-mono font-bold">
                    🤖 AI-Assisted Architecture
                  </span>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-black text-white tracking-tight">
                  Lux3D — 3D & AI Creative Web Platform
                </h3>
                <p className="mt-1 text-xs font-mono font-semibold text-cyan-400">
                  Next.js 16 • TypeScript • Three.js / WebGL • MongoDB • Tailwind CSS 4
                </p>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-neutral-300">
                  Architected an interactive 3D WebGL asset viewer and creative photo retouching showcase platform. Integrated 60 FPS Three.js orbit controls, Before/After image split sliders, and custom real-time traffic tracking analytics.
                </p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2 text-xs text-neutral-300">
                  <p className="font-mono font-bold text-[10.5px] uppercase tracking-wider text-cyan-400">Highlights:</p>
                  <p className="flex items-start gap-2"><span className="text-cyan-400 font-bold">✓</span> 60 FPS real-time Three.js WebGL orbit viewer for Blender GLB assets</p>
                  <p className="flex items-start gap-2"><span className="text-cyan-400 font-bold">✓</span> Interactive Before/After split sliders & high-res image modals</p>
                  <p className="flex items-start gap-2"><span className="text-cyan-400 font-bold">✓</span> Real-time live visitor tracking engine & admin traffic dashboard</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Link
                    href="/portfolio"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-black text-neutral-950 hover:bg-neutral-200 transition shadow-sm"
                  >
                    <span>Explore 3D Platform</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">↗</span>
                  </Link>
                  <Link
                    href="/photo-editing"
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-bold text-neutral-200 hover:border-white/40 hover:bg-white/10 transition"
                  >
                    Photo Retouching ↗
                  </Link>
                </div>
                <span className="text-[11px] font-mono font-bold text-cyan-400">● Live Production</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. COMPANY TEAM & STUDIO LIFE GALLERY                   */}
      {/* ======================================================== */}
      <section id="studio" className="py-20 border-b border-white/10 bg-[#040711]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Company Team & Studio Life
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-2xl">
                Collaborating with passionate engineers, artists, and leaders at Infoeye Software. Building innovative digital fashion and 3D simulation solutions together.
              </p>
            </div>
            <a
              href="https://infoeye.com/company/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-white hover:text-black hover:border-white shrink-0"
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
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/80 p-3 shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-950">
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
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/80 p-3 shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-950">
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
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/80 p-3 shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-950">
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

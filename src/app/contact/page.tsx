"use client";

import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ProjectType {
  id: string;
  label: string;
  icon: string;
  tagline: string;
  code: string;
}

const projectTypes: ProjectType[] = [
  {
    id: "3d-product",
    label: "3D Product Modeling & CGI",
    icon: "🏺",
    tagline: "Sub-D topology, cosmetics, jewelry & product CGI",
    code: "MOD-01",
  },
  {
    id: "clo3d-fashion",
    label: "CLO 3D Digital Fashion",
    icon: "👗",
    tagline: "2D to 3D garment patterning & cloth drape physics",
    code: "MOD-02",
  },
  {
    id: "photo-retouching",
    label: "Photo Retouching & Grading",
    icon: "🎨",
    tagline: "16-Bit RAW frequency separation & commercial grading",
    code: "MOD-03",
  },
  {
    id: "web-3d",
    label: "Real-Time Web 3D & GLB",
    icon: "⚡",
    tagline: "60 FPS Three.js, Draco compression & glTF assets",
    code: "MOD-04",
  },
  {
    id: "fullstack-ai",
    label: "AI Full-Stack Web Apps",
    icon: "🌐",
    tagline: "Next.js 16, TypeScript, Supabase & PWAs",
    code: "MOD-05",
  },
  {
    id: "collaboration",
    label: "General Creative Inquiry",
    icon: "🤝",
    tagline: "Custom freelance, studio contracts & partnerships",
    code: "MOD-06",
  },
];

// Interactive Production Module Card Component
function ProjectModuleCard({
  pt,
  isSelected,
  onSelect,
  isReducedMotion,
}: {
  pt: ProjectType;
  isSelected: boolean;
  onSelect: () => void;
  isReducedMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      setTilt({
        x: -yPct * 2.8,
        y: xPct * 3.2,
      });
    },
    [isReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex items-start gap-3.5 rounded-2xl p-4 text-left transition-all duration-300 cursor-pointer border backdrop-blur-xl overflow-hidden select-none ${
        isSelected
          ? "border-emerald-600 bg-emerald-50/90 shadow-[0_4px_20px_rgba(16,185,129,0.15)] ring-2 ring-emerald-500/30"
          : "border-neutral-200/80 bg-white/80 hover:border-neutral-300 hover:bg-white shadow-xs"
      }`}
      style={{
        perspective: "800px",
        transform:
          !isReducedMotion && isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px) scale(1.02)`
            : isSelected
            ? "scale(1.015)"
            : "scale(1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Active Light Line Perimeter */}
      {isSelected && (
        <motion.div
          layoutId="selectedModuleGlow"
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="pointer-events-none absolute inset-0 rounded-2xl border border-emerald-500/80 shadow-[inset_0_0_15px_rgba(52,211,153,0.12)]"
        />
      )}

      {/* Light Sweep Reflection on Hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-100/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* Module Code Badge & Icon */}
      <div className="relative flex flex-col items-center gap-1 shrink-0">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg shadow-inner transition-all duration-300 ${
            isSelected
              ? "bg-emerald-100 border-emerald-300 text-emerald-800 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              : "bg-neutral-100 border-neutral-200 group-hover:scale-105 group-hover:border-neutral-300"
          }`}
          style={{ transform: !isReducedMotion && isHovered ? "translateZ(12px)" : undefined }}
        >
          {pt.icon}
        </span>
        <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500">
          {pt.code}
        </span>
      </div>

      {/* Title, Tagline & Active Indicator */}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-center justify-between gap-1">
          <p
            className={`text-xs sm:text-[13px] font-bold leading-tight truncate transition-colors duration-200 ${
              isSelected ? "text-emerald-900" : "text-neutral-900 group-hover:text-emerald-800"
            }`}
          >
            {pt.label}
          </p>

          {/* Active Status Beacon */}
          {isSelected && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[8.5px] font-mono font-bold text-emerald-800 shadow-xs animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>ACTIVE</span>
            </span>
          )}
        </div>

        <p className="text-[11px] text-neutral-500 leading-relaxed truncate mt-1 group-hover:text-neutral-700 transition-colors">
          {pt.tagline}
        </p>
      </div>
    </button>
  );
}

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";
  const isReducedMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "3D Product Modeling & CGI",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSignal, setActiveSignal] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Parallax / Cursor Light State
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSubject) {
      setForm((prev) => ({
        ...prev,
        subject: initialSubject,
      }));
    }
  }, [initialSubject]);

  // Subtle Mouse Parallax & Follow Light
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
    },
    [isReducedMotion]
  );

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrorMessage("");
  };

  const handleSelectModule = (label: string) => {
    update("projectType", label);
    setActiveSignal(true);
    setTimeout(() => setActiveSignal(false), 650);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Please fill in your name, email, and a project description.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || `${form.projectType} opportunity`,
        message: form.message.trim(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.message || "Failed to transmit dispatch. Please try again or reach out directly."
        );
      }
    } catch {
      setLoading(false);
      setErrorMessage("Network connection error. Please try again or reach out via email/WhatsApp.");
    }
  };

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [form.email]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative space-y-12 select-none"
    >
      {/* ================= BACKGROUND AMBIENT CINEMATIC LIGHTING ================= */}
      <div className="pointer-events-none absolute -inset-20 z-0 overflow-hidden">
        {/* Cursor Following Ambient Glow */}
        {!isReducedMotion && (
          <div
            className="absolute h-[600px] w-[600px] rounded-full bg-emerald-500/[0.04] blur-[150px] transition-transform duration-700 ease-out"
            style={{
              transform: `translate3d(${cursorPos.x - 300}px, ${cursorPos.y - 300}px, 0)`,
            }}
          />
        )}
        <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-emerald-600/10 blur-[130px]" />
      </div>

      {/* ======================================================== */}
      {/* 1. CINEMATIC HERO BANNER — STUDIO POWER-ON SEQUENCE      */}
      {/* ======================================================== */}
      <motion.div
        initial={
          isReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.985 }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-white via-[#fbfbfe] to-[#f6f8fb] p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] text-neutral-950 backdrop-blur-2xl"
      >
        {/* Ambient Subtle Cyber Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Corner Flare */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[90px]" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Status Indicator Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-white/90 border border-emerald-500/30 px-4 py-1.5 text-xs font-bold text-emerald-700 backdrop-blur-xl shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="tracking-widest uppercase text-[10px] font-mono">
              Direct Studio & Production Concierge
            </span>
          </motion.div>

          {/* Hero Heading with Metallic Title Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-[1.1]"
          >
            Let’s Engineer Something{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Exceptional
              {/* Single moving highlight across the word Exceptional */}
              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-2xl"
          >
            Initiate a high-end collaboration for 3D CGI, CLO digital fashion, hyper-realistic photo
            grading, or full-stack web platforms. All inquiries are reviewed personally within 2–4
            hours.
          </motion.p>

          {/* Quick Highlight Spec Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 border border-neutral-200/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 backdrop-blur-md shadow-xs">
              <span className="text-emerald-600">⚡</span> Response: 2–4 Hours
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 border border-neutral-200/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 backdrop-blur-md shadow-xs">
              <span className="text-cyan-600">🌍</span> Global Remote Contracts
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/80 border border-neutral-200/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 backdrop-blur-md shadow-xs">
              <span className="text-amber-600">💎</span> Uncompromising Quality
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 2. MAIN 2-COLUMN CINEMATIC COMMAND CENTER INTERFACE      */}
      {/* ======================================================== */}
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-8 lg:grid-cols-12 items-start"
      >
        {/* ======================================================== */}
        {/* LEFT COLUMN: PROJECT MODULES & PRODUCTION ROADMAP        */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 space-y-6">
          {/* A. Project Domain Selector Cards */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white/80 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200/70 pb-4">
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600">
                  Step 01 / Production Modules
                </p>
                <h3 className="text-sm font-black text-neutral-900 mt-0.5 tracking-tight">
                  Choose Your Project Domain
                </h3>
              </div>
              <span className="rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 px-3 py-1 text-[10px] font-mono font-bold">
                6 Specialized Modules
              </span>
            </div>

            {/* 6 Interactive Project Module Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {projectTypes.map((pt) => (
                <ProjectModuleCard
                  key={pt.id}
                  pt={pt}
                  isSelected={form.projectType === pt.label}
                  onSelect={() => handleSelectModule(pt.label)}
                  isReducedMotion={isReducedMotion}
                />
              ))}
            </div>
          </div>

          {/* B. Transparent Cinematic Execution Roadmap (3-Step Connected Pipeline) */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white/80 backdrop-blur-2xl p-6 sm:p-7 space-y-5 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between border-b border-neutral-200/70 pb-3.5">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600">
                Execution Roadmap • 3-Stage Pipeline
              </p>
              <span className="text-[10px] font-mono text-neutral-500">01 ➔ 02 ➔ 03</span>
            </div>

            {/* 3 Connected Pipeline Steps */}
            <div className="relative grid gap-3 text-xs text-neutral-600">
              {/* Step 1 */}
              <div className="group relative flex items-start gap-3.5 rounded-2xl bg-neutral-50/80 p-4 border border-neutral-200/70 hover:border-emerald-500/40 hover:bg-emerald-50/30 transition-all duration-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-xs font-mono font-black text-neutral-950 shadow-xs">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-neutral-900 leading-snug">
                    Initial Assessment (2–4 Hrs)
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed mt-0.5">
                    Comprehensive evaluation of technical specs, poly-count targets, moodboards, and delivery milestones.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative flex items-start gap-3.5 rounded-2xl bg-neutral-50/80 p-4 border border-neutral-200/70 hover:border-emerald-500/40 hover:bg-emerald-50/30 transition-all duration-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 text-xs font-mono font-black text-neutral-950 shadow-xs">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-neutral-900 leading-snug">
                    Milestones & Production Sample
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed mt-0.5">
                    Subdivision modeling previews, cloth physics calibration, and clear iteration milestones.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative flex items-start gap-3.5 rounded-2xl bg-neutral-50/80 p-4 border border-neutral-200/70 hover:border-emerald-500/40 hover:bg-emerald-50/30 transition-all duration-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-xs font-mono font-black text-neutral-950 shadow-xs">
                  03
                </span>
                <div>
                  <h4 className="font-bold text-neutral-900 leading-snug">
                    Final Delivery & Handover
                  </h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed mt-0.5">
                    Pristine 8K CGI renders, 60 FPS optimized GLB meshes, or full-stack web builds delivered friction-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: CINEMATIC TRANSMISSION TERMINAL FORM       */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.07)]">
            {/* Subtle Holographic Scanning Line Animation during Transmission */}
            {loading && (
              <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.8)] z-30"
              />
            )}

            {/* Connecting Visual Signal Pulse */}
            <AnimatePresence>
              {activeSignal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-emerald-500/50 shadow-[inset_0_0_30px_rgba(16,185,129,0.15)] z-20"
                />
              )}
            </AnimatePresence>

            {/* Subtle Inner Ambient Glow */}
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-emerald-500/5 rounded-full blur-3xl" />

            {submitted ? (
              /* ================= SUCCESS STATE: CINEMATIC CONFIRMATION ================= */
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="py-14 text-center space-y-6"
              >
                {/* Expanding Glowing Ring Signal */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1.25, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-emerald-400"
                  />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-500 text-2xl text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                    ✓
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300 px-3 py-0.5 text-[10px] font-mono font-bold text-emerald-800">
                    TRANSMISSION PROTOCOL ACKNOWLEDGED
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                    Transmission Successful
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Your project requirements have been securely delivered to the studio inbox. Expect a personal response at{" "}
                    <strong className="text-emerald-700 font-semibold">{form.email}</strong> within 2–4 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        projectType: "3D Product Modeling & CGI",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="rounded-full bg-neutral-950 text-white px-7 py-3 text-xs font-black hover:bg-neutral-800 transition-all duration-200 shadow-md cursor-pointer hover:scale-105"
                  >
                    Send Another Dispatch
                  </button>

                  <Link
                    href="/portfolio"
                    className="rounded-full border border-neutral-300 bg-neutral-100 px-6 py-3 text-xs font-bold text-neutral-800 hover:border-neutral-400 hover:bg-neutral-200 transition-all duration-200 backdrop-blur-md"
                  >
                    Explore 3D Models ↗
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ================= INTERACTIVE DISPATCH TERMINAL FORM ================= */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Form Header */}
                <div className="border-b border-neutral-200/70 pb-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-xl font-black text-neutral-950 tracking-tight">
                        Secure Dispatch Form
                      </h3>
                    </div>

                    {/* Animated Project-Type Badge */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={form.projectType}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300/60 px-3 py-1 text-[11px] font-bold text-emerald-800 backdrop-blur-md shadow-xs"
                      >
                        <span>🎯</span>
                        <span className="truncate max-w-[180px]">{form.projectType}</span>
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <p className="text-xs text-neutral-500 mt-1">
                    Provide your creative specifications below for priority studio review.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-red-500/40 bg-red-50 p-3.5 text-xs font-semibold text-red-700 backdrop-blur-md shadow-xs"
                  >
                    ⚠️ {errorMessage}
                  </motion.div>
                )}

                {/* Name Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-800">
                      Your Name <span className="text-emerald-600">*</span>
                    </label>
                    {form.name.trim().length > 0 && (
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">
                        ✓ ACTIVE
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={form.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => update("name", e.target.value)}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-all duration-200 focus:outline-hidden shadow-inner ${
                      focusedField === "name"
                        ? "border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs"
                        : "border-neutral-200 bg-neutral-50/80 hover:border-neutral-300"
                    }`}
                  />
                </div>

                {/* Email Input with Live Format Verification */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-800">
                      Email Address <span className="text-emerald-600">*</span>
                    </label>
                    {form.email && (
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          isEmailValid ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {isEmailValid ? "✓ VALID FORMAT" : "INPUTTING..."}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@luxurystudio.com"
                    value={form.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => update("email", e.target.value)}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-all duration-200 focus:outline-hidden shadow-inner ${
                      focusedField === "email"
                        ? "border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs"
                        : "border-neutral-200 bg-neutral-50/80 hover:border-neutral-300"
                    }`}
                  />
                </div>

                {/* Message / Specifications Textarea with Character Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-800">
                      Project Specifications & Scope <span className="text-emerald-600">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {form.message.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    placeholder={`Describe your ${form.projectType} specs, polycounts, aesthetic goals, and delivery schedules...`}
                    value={form.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => update("message", e.target.value)}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-all duration-200 focus:outline-hidden resize-y shadow-inner leading-relaxed ${
                      focusedField === "message"
                        ? "border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs"
                        : "border-neutral-200 bg-neutral-50/80 hover:border-neutral-300"
                    }`}
                  />
                </div>

                {/* Submit / Transmission Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-4 text-xs font-black text-neutral-950 shadow-[0_4px_25px_rgba(52,211,153,0.35)] transition-all duration-300 hover:shadow-[0_6px_35px_rgba(52,211,153,0.5)] disabled:opacity-50 cursor-pointer hover:scale-[1.01] active:scale-95"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent" />
                        <span className="font-mono tracking-wider">TRANSMITTING DISPATCH...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Dispatch</span>
                        <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security / Confidentiality Footer */}
                <div className="flex items-center justify-center gap-2 text-[10.5px] text-neutral-500 pt-1">
                  <span>🔒</span>
                  <span>End-to-end NDA protected & 100% confidential transmission.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafbfc] text-neutral-950 selection:bg-emerald-500 selection:text-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-24">
        <Suspense
          fallback={
            <div className="py-24 text-center">
              <div className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <p className="text-xs font-semibold text-neutral-500 mt-3 font-mono">
                INITIALIZING COMMAND CENTER...
              </p>
            </div>
          }
        >
          <ContactFormContent />
        </Suspense>
      </section>
    </main>
  );
}
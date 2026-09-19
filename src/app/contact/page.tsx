"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const projectTypes = [
  {
    id: "3d-product",
    label: "3D Product Modeling & CGI",
    icon: "🏺",
    tagline: "Sub-D topology, cosmetics, jewelry & product CGI",
  },
  {
    id: "clo3d-fashion",
    label: "CLO 3D Digital Fashion",
    icon: "👗",
    tagline: "2D to 3D garment patterning & cloth drape physics",
  },
  {
    id: "photo-retouching",
    label: "Photo Retouching & Grading",
    icon: "🎨",
    tagline: "16-Bit RAW frequency separation & commercial grading",
  },
  {
    id: "web-3d",
    label: "Real-Time Web 3D & GLB",
    icon: "⚡",
    tagline: "60 FPS Three.js, Draco compression & glTF assets",
  },
  {
    id: "fullstack-ai",
    label: "AI Full-Stack Web Apps",
    icon: "🌐",
    tagline: "Next.js 16, TypeScript, Supabase & PWAs",
  },
  {
    id: "collaboration",
    label: "General Creative Inquiry",
    icon: "🤝",
    tagline: "Custom freelance, studio contracts & partnerships",
  },
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";

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

  useEffect(() => {
    if (initialSubject) {
      setForm((prev) => ({
        ...prev,
        subject: initialSubject,
      }));
    }
  }, [initialSubject]);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Please fill in your name, email, and a message.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || form.projectType,
        message: `[Project Type: ${form.projectType}]\n\n${form.message.trim()}`,
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
        setErrorMessage(data.message || "Failed to send message. Please try again or email directly.");
      }
    } catch {
      setLoading(false);
      setErrorMessage("Network error. Please try again or reach out via email/WhatsApp.");
    }
  };

  return (
    <div className="space-y-8">
      {/* ======================================================== */}
      {/* 1. MASTER LUXURY HERO BANNER HEADER                     */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-[#0c0f17] via-[#080b12] to-[#040509] p-6 sm:p-8 lg:p-10 shadow-2xl text-white">
        {/* Ambient Lighting Orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Subtle Cyber Grid Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white/90 border border-white/15 mb-3 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide uppercase text-[11px] font-bold">Direct Creative & Production Inquiries</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Let’s Build Something Exceptional Together
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-2xl">
            Have a 3D modeling project, CLO 3D fashion simulation, photo retouching order, or custom web platform? Get in touch below. I respond to all client and studio inquiries within 2–4 hours.
          </p>

          {/* Quick Highlight Spec Badges */}
          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-semibold text-neutral-200">
              <span className="text-emerald-400">⚡</span> Response Time: 2–4 Hours
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-semibold text-neutral-200">
              <span className="text-cyan-400">🌍</span> Open for Global Remote & Contract
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-semibold text-neutral-200">
              <span className="text-amber-400">💎</span> 100% Quality Assurance
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. 2-COLUMN MAIN STUDIO LAYOUT                           */}
      {/* ======================================================== */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: ALL DETAILS, PROJECT TYPES & DIRECT CHANNELS*/}
        {/* ======================================================== */}
        <div className="lg:col-span-6 space-y-6">
          {/* A. Project Domain Selector Cards */}
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-md space-y-3.5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Step 1: Select Project Domain
                </p>
                <h3 className="text-sm font-black text-black">
                  What kind of project are you planning?
                </h3>
              </div>
              <span className="rounded-full bg-neutral-100 text-neutral-600 px-2.5 py-0.5 text-[10px] font-bold">
                6 Domains
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {projectTypes.map((pt) => {
                const isSelected = form.projectType === pt.label;
                return (
                  <button
                    type="button"
                    key={pt.id}
                    onClick={() => update("projectType", pt.label)}
                    className={`group flex items-start gap-2.5 rounded-2xl p-3 text-left transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-500/20"
                        : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-400 hover:bg-white"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-base shadow-2xs group-hover:scale-110 transition">
                      {pt.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-bold leading-snug truncate ${isSelected ? "text-emerald-950" : "text-black"}`}>
                        {pt.label}
                      </p>
                      <p className="text-[10px] text-neutral-500 truncate mt-0.5">
                        {pt.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Creator & Studio Direct Contact Card */}
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-md space-y-4">
            <div className="flex items-center gap-3.5 border-b border-neutral-100 pb-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-black text-white shadow-xs">
                3D
              </div>
              <div>
                <h2 className="text-base font-black text-black">Ashok Meena</h2>
                <p className="text-xs font-bold text-emerald-700">
                  Senior 3D & Digital Fashion Designer • Infoeye Software (6+ Yrs)
                </p>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
              {/* Direct Email */}
              <a
                href="mailto:ashokm3414@gmail.com"
                className="flex items-center gap-2.5 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 text-neutral-800 hover:border-black hover:bg-white transition"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-sm shadow-2xs">
                  ✉️
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Direct Email</p>
                  <p className="font-bold text-xs truncate">ashokm3414@gmail.com</p>
                </div>
              </a>

              {/* Direct Phone / Call */}
              <a
                href="tel:+918000093300"
                className="flex items-center gap-2.5 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 text-neutral-800 hover:border-black hover:bg-white transition"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-sm shadow-2xs">
                  📞
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Direct Phone</p>
                  <p className="font-bold text-xs truncate">+91 80000 93300</p>
                </div>
              </a>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Sardarshahar, Rajasthan, India <strong className="text-neutral-900 font-semibold">(IST / UTC+5:30)</strong></span>
              </div>
            </div>
          </div>

          {/* C. WhatsApp Instant Direct Chat Banner */}
          <div className="rounded-3xl border border-emerald-300/80 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-black text-emerald-950">Need an instant response or urgent quote?</p>
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">Chat directly with Ashok on WhatsApp for immediate discussion.</p>
            </div>
            <a
              href="https://wa.me/918000093300"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#20bd5a] hover:scale-105 shrink-0"
            >
              <span>💬 Chat on WhatsApp</span>
              <span>↗</span>
            </a>
          </div>

          {/* D. 3-Step Transparent Production Workflow */}
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-5 space-y-3 shadow-md">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
              What Happens After You Send a Message?
            </p>
            <div className="grid gap-2 text-xs text-neutral-700">
              <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50/70 p-2.5 border border-neutral-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                  1
                </span>
                <p><strong>Initial Review (2–4 Hrs):</strong> Reviewing your tech specs, CAD/moodboards, and visual objectives.</p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50/70 p-2.5 border border-neutral-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                  2
                </span>
                <p><strong>Milestones & 3D Sample:</strong> Establishing poly budget, fabric physics parameters, and delivery schedule.</p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50/70 p-2.5 border border-neutral-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                  3
                </span>
                <p><strong>Production & Delivery:</strong> 8K renders, GLB web assets, or retouching delivered with full quality assurance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: CLEAN, STREAMLINED LUXURY MESSAGE BOX     */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700 shadow-sm">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-black">
                  Thank You! Message Delivered
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Your project inquiry has been sent directly to Ashok’s inbox. You will receive a response at <strong className="text-black font-bold">{form.email}</strong> shortly (usually within 2–4 hours).
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
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
                    className="rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
                  >
                    Send Another Message
                  </button>

                  <Link
                    href="/portfolio"
                    className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs font-bold text-black hover:border-black transition"
                  >
                    Explore 3D Portfolio ↗
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="text-xl font-black text-black">
                      Send a Direct Message
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-[11px] font-bold text-emerald-900">
                      <span>🎯</span>
                      <span className="truncate max-w-[200px]">{form.projectType}</span>
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill in your details below and I’ll get right back to you.
                  </p>
                </div>

                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden shadow-2xs"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden shadow-2xs"
                  />
                </div>

                {/* Project Details or Message */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Project Details & Questions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder={`Tell me a little about your ${form.projectType} requirements, reference files, polycount needs, or delivery timeline...`}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden resize-y shadow-2xs leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-xs font-bold text-white shadow-lg transition duration-200 hover:bg-neutral-800 disabled:opacity-50 cursor-pointer hover:scale-[1.01]"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Message</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                  <span>🔒</span>
                  <span>Your email and project details are kept 100% confidential.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        <Suspense
          fallback={
            <div className="py-24 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
              <p className="text-xs font-semibold text-neutral-500 mt-2">Loading contact studio...</p>
            </div>
          }
        >
          <ContactFormContent />
        </Suspense>
      </section>
    </main>
  );
}
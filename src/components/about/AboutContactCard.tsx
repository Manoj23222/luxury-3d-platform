"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutContactCard() {
  const isReducedMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          targetEmail: "ashokm3414@gmail.com",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch {
      alert("Failed to send message. Please email directly at ashokm3414@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-inquiry" className="relative overflow-hidden border-b border-white/10 bg-[#040711] py-20 text-white">
      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1422]/90 via-[#070c16]/95 to-[#040810]/90 p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
        >
          {/* Subtle Ambient Cyber Dot Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #34d399 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Info & Capabilities Column */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-[11px] font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Bespoke Projects</span>
                </div>

                <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  Have a 3D or Visual Project in Mind?
                </h2>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal">
                  Inquire about high-end CGI, product modeling, digital fashion, or editorial retouching. Every project is handled with precision QC and rapid turnaround.
                </p>
              </div>

              {/* Luxury Micro-Cards Section */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    Core Capabilities
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-neutral-400">
                    Turnaround: 24–48h
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {[
                    { label: "Start a Project", sub: "Bespoke 3D & Visuals" },
                    { label: "Work With Me", sub: "One-on-One Retainer" },
                    { label: "Let’s Create Together", sub: "Art Direction & Concepts" },
                    { label: "Project Inquiries", sub: "High-End Renderings" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 shadow-xs transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-950/20 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {item.label}
                        </p>
                        <span className="text-xs text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-300">
                          →
                        </span>
                      </div>
                      <span className="mt-1 text-[11px] font-medium text-neutral-400">
                        {item.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Badges */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-[10px] font-bold text-neutral-300">
                  <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1">
                    🌍 Worldwide Remote
                  </span>
                  <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1">
                    🔒 NDA Protected
                  </span>
                  <span className="rounded-md border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-1 text-emerald-300">
                    ⚡ Slots Available
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-7 lg:col-span-5 backdrop-blur-xl shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-black text-white">
                  Send an Inquiry
                </h3>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                  Direct Contact
                </span>
              </div>

              {sent ? (
                <div className="mt-5 rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-6 text-center space-y-2">
                  <span className="text-2xl text-emerald-400">✓</span>
                  <h4 className="text-sm font-bold text-white">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-neutral-300">
                    I will review your requirements and respond within a few business hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-xs font-bold text-neutral-950 transition hover:bg-neutral-200 cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
                  <div>
                    <label className="mb-1 block font-bold text-neutral-300">
                      Name / Studio <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name or company"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-medium text-white placeholder:text-neutral-500 transition focus:border-emerald-400 focus:bg-white/10 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-bold text-neutral-300">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@brand.com"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-medium text-white placeholder:text-neutral-500 transition focus:border-emerald-400 focus:bg-white/10 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-bold text-neutral-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. 3D Perfume Render / Garment Simulation"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-medium text-white placeholder:text-neutral-500 transition focus:border-emerald-400 focus:bg-white/10 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-bold text-neutral-300">
                      Project Scope <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share details, reference links or deliverable deadlines..."
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-medium text-white placeholder:text-neutral-500 transition focus:border-emerald-400 focus:bg-white/10 focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 py-3 text-xs font-black text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Transmitting..." : "Submit Inquiry →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

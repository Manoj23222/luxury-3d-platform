"use client";

import { useState, useRef, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface HelpTopic {
  question: string;
  answer: string;
  category: string;
}

const HELP_TOPICS: HelpTopic[] = [
  {
    category: "Delivery & Turnaround",
    question: "What are your standard turnaround times for 3D and photo editing?",
    answer:
      "Most 3D product models (GLB / OBJ) and commercial photo retouching batches are completed within 24 to 72 hours. For urgent project deadlines or immediate campaign launches, fast-track delivery is available within 12–24 hours.",
  },
  {
    category: "File Formats & Assets",
    question: "Which file formats and deliverables do you provide?",
    answer:
      "For 3D projects: Real-time GLB/glTF (web optimized), Blender (.blend), OBJ, FBX, and 4K PBR textures (Metallic/Roughness). For Creative & Retouching: 16-Bit master PSD files with non-destructive layers, print-ready TIFF (300 DPI), and web-ready WebP/JPEG.",
  },
  {
    category: "Revisions & Approvals",
    question: "How does the revision and review process work?",
    answer:
      "Every project includes clear milestone previews (wireframe, clay render, lighting setup, and color grade). You receive iterative review rounds to ensure the final output matches your vision perfectly before final asset handover.",
  },
  {
    category: "Commercial Rights & NDA",
    question: "Do you sign NDAs and provide full commercial usage rights?",
    answer:
      "Yes, 100%. All client assets, unreleased products, and brand references are strictly confidential under mutual NDA. Upon final delivery, you own full commercial and worldwide reproduction rights for advertising, e-commerce, and packaging.",
  },
  {
    category: "Urgent Support",
    question: "Need urgent assistance or have an active project query?",
    answer:
      "For real-time urgent assistance, you can message directly on WhatsApp at +91 80000 93300 or send an email to ashokm3414@gmail.com for priority studio response within 2–4 hours.",
  },
];

function ContactAndHelpContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";
  const isReducedMotion = useReducedMotion();

  // Contact Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "3D Product Modeling",
    subject: initialSubject || "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Help Accordion State
  const [openHelpIdx, setOpenHelpIdx] = useState<number | null>(0);

  const toggleHelp = (idx: number) => {
    setOpenHelpIdx((prev) => (prev === idx ? null : idx));
  };

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [form.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || `${form.topic} Inquiry`,
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
          data.message || "Unable to send message. Please reach out directly via email or WhatsApp."
        );
      }
    } catch {
      setLoading(false);
      setErrorMessage("Network error. Please try again or message via WhatsApp directly.");
    }
  };

  return (
    <div className="relative w-full max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-24">
      {/* ======================================================== */}
      {/* 1. CINEMATIC HERO SECTION                                */}
      {/* ======================================================== */}
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 pb-12 sm:pb-16 border-b border-[#DCDAD4]"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D12424] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D12424]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2A2A28]">
            Direct Studio Desk • Available for Projects &amp; Assistance
          </span>
        </div>

        {/* Large Typographic Title */}
        <div className="space-y-2">
          <h1 className="text-[3.25rem] sm:text-[5.5rem] lg:text-[7rem] font-medium tracking-[-0.035em] leading-[0.92] text-[#0A0A0A] uppercase select-none">
            <span className="block hover:translate-x-1.5 transition-transform duration-300">
              Contact &amp;
            </span>
            <span className="block hover:translate-x-1.5 transition-transform duration-300 text-[#D12424]">
              Help Desk
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-xl font-normal leading-relaxed text-[#2A2A28] max-w-2xl">
          Get in touch for bespoke 3D assets, photo retouching, or project support.{" "}
          <span className="font-medium text-[#0A0A0A] block mt-1">
            Every inquiry receives a personal review within 2–4 hours.
          </span>
        </p>

        {/* Quick Contact Ribbon */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="mailto:ashokm3414@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-[#DCDAD4] bg-white/80 px-4 py-2 text-xs font-semibold text-[#0A0A0A] hover:border-[#D12424] hover:text-[#D12424] transition-colors shadow-xs"
          >
            <span>ashokm3414@gmail.com</span>
          </a>
          <a
            href="https://wa.me/918000093300"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#DCDAD4] bg-white/80 px-4 py-2 text-xs font-semibold text-[#0A0A0A] hover:border-[#D12424] hover:text-[#D12424] transition-colors shadow-xs"
          >
            <span>WhatsApp: +91 80000 93300</span>
          </a>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DCDAD4] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#5A5852]">
            <span>Jaipur, Rajasthan, India</span>
          </span>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 2. TWO-COLUMN INTERFACE: CONTACT + HELP                  */}
      {/* ======================================================== */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ====================================================== */}
        {/* LEFT COLUMN: CONTACT DISPATCH FORM                     */}
        {/* ====================================================== */}
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="rounded-3xl border border-[#DCDAD4] bg-white p-6 sm:p-10 shadow-sm">
            <div className="pb-6 border-b border-[#EFEFED]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D12424]">
                  Step 01 • Send Message
                </span>
                <span className="text-[11px] text-[#5A5852] font-mono">
                  Response within 2–4 hrs
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A] mt-1.5">
                Send a Project Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5852] mt-1">
                Fill in your details below and we will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF0F0] border border-[#D12424]/30 text-2xl font-bold text-[#D12424]">
                  ✓
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-2xl font-semibold text-[#0A0A0A]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5852] leading-relaxed">
                    Thank you, <strong className="text-[#0A0A0A]">{form.name}</strong>. Your inquiry has been sent to our studio desk. A confirmation response will be sent to{" "}
                    <strong className="text-[#D12424]">{form.email}</strong> shortly.
                  </p>
                </div>
                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        topic: "3D Product Modeling",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="rounded-full bg-[#0A0A0A] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#D12424] transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <Link
                    href="/"
                    className="rounded-full border border-[#DCDAD4] bg-[#F7F6F3] px-5 py-2.5 text-xs font-bold text-[#0A0A0A] hover:bg-white transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
                    {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Your Name <span className="text-[#D12424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Elena Rostova"
                    className={`w-full rounded-2xl border px-4 py-3 text-xs font-medium text-[#0A0A0A] placeholder:text-neutral-400 outline-none transition ${
                      focusedField === "name"
                        ? "border-[#0A0A0A] bg-white ring-2 ring-[#D12424]/20"
                        : "border-[#DCDAD4] bg-[#F7F6F3] hover:border-neutral-400"
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#0A0A0A]">
                      Email Address <span className="text-[#D12424]">*</span>
                    </label>
                    {form.email && (
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          isEmailValid ? "text-emerald-700" : "text-neutral-400"
                        }`}
                      >
                        {isEmailValid ? "✓ Valid email format" : "checking..."}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="e.g. elena@brand.com"
                    className={`w-full rounded-2xl border px-4 py-3 text-xs font-medium text-[#0A0A0A] placeholder:text-neutral-400 outline-none transition ${
                      focusedField === "email"
                        ? "border-[#0A0A0A] bg-white ring-2 ring-[#D12424]/20"
                        : "border-[#DCDAD4] bg-[#F7F6F3] hover:border-neutral-400"
                    }`}
                  />
                </div>

                {/* Project / Help Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                      Service / Help Category
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, topic: e.target.value }))
                      }
                      className="w-full rounded-2xl border border-[#DCDAD4] bg-[#F7F6F3] px-3.5 py-3 text-xs font-medium text-[#0A0A0A] outline-none hover:border-neutral-400 focus:border-[#0A0A0A] cursor-pointer"
                    >
                      <option value="3D Product Modeling">3D Product Modeling &amp; CGI</option>
                      <option value="CLO 3D Digital Fashion">CLO 3D Digital Fashion</option>
                      <option value="Photo Retouching & Grading">Photo Retouching &amp; Grading</option>
                      <option value="Urgent Project Assistance">Urgent Project Assistance</option>
                      <option value="General Inquiry">General Creative Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder="e.g. E-commerce 3D assets"
                      className="w-full rounded-2xl border border-[#DCDAD4] bg-[#F7F6F3] px-4 py-3 text-xs font-medium text-[#0A0A0A] placeholder:text-neutral-400 outline-none hover:border-neutral-400 focus:border-[#0A0A0A]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#0A0A0A]">
                      Project Scope &amp; Details <span className="text-[#D12424]">*</span>
                    </label>
                    <span className="text-[10px] text-[#5A5852] font-mono">
                      {form.message.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Describe your 3D modeling goals, polycount targets, reference links, or turnaround timeline..."
                    className={`w-full rounded-2xl border px-4 py-3 text-xs font-medium text-[#0A0A0A] placeholder:text-neutral-400 outline-none resize-y transition ${
                      focusedField === "message"
                        ? "border-[#0A0A0A] bg-white ring-2 ring-[#D12424]/20"
                        : "border-[#DCDAD4] bg-[#F7F6F3] hover:border-neutral-400"
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#0A0A0A] py-3.5 text-xs font-bold text-white transition-all hover:bg-[#D12424] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {loading ? "Sending Message..." : "Submit Project Inquiry →"}
                  </button>
                </div>

                <p className="text-[11px] text-center text-[#5A5852] pt-1">
                  Confidential communication. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </motion.div>

        {/* ====================================================== */}
        {/* RIGHT COLUMN: HELP & ASSISTANCE ACCORDION              */}
        {/* ====================================================== */}
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Quick Help Direct Cards */}
          <div className="rounded-3xl border border-[#DCDAD4] bg-white p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#EFEFED]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D12424]">
                Direct Help Channels
              </span>
              <h3 className="text-xl font-medium tracking-tight text-[#0A0A0A] mt-1">
                Need Immediate Help?
              </h3>
              <p className="text-xs text-[#5A5852] mt-0.5">
                Fastest ways to connect for live support and answers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/918000093300"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[#DCDAD4] bg-[#F7F6F3] p-4 hover:border-[#D12424] hover:bg-white transition cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D12424] uppercase">
                    Instant Messaging
                  </span>
                  <p className="text-xs font-bold text-[#0A0A0A] mt-1">
                    WhatsApp Chat
                  </p>
                  <p className="text-[11px] text-[#5A5852] mt-0.5">
                    Real-time chat &amp; file exchange
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#0A0A0A] group-hover:text-[#D12424] mt-3 block">
                  Open Chat ↗
                </span>
              </a>

              <a
                href="tel:+918000093300"
                className="group flex flex-col justify-between rounded-2xl border border-[#DCDAD4] bg-[#F7F6F3] p-4 hover:border-[#D12424] hover:bg-white transition cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D12424] uppercase">
                    Phone Support
                  </span>
                  <p className="text-xs font-bold text-[#0A0A0A] mt-1">
                    Direct Studio Call
                  </p>
                  <p className="text-[11px] text-[#5A5852] mt-0.5">
                    +91 80000 93300
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#0A0A0A] group-hover:text-[#D12424] mt-3 block">
                  Call Now ↗
                </span>
              </a>
            </div>
          </div>

          {/* Help & FAQ Accordion */}
          <div className="rounded-3xl border border-[#DCDAD4] bg-white p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#EFEFED]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D12424]">
                Help Desk &amp; FAQs
              </span>
              <h3 className="text-xl font-medium tracking-tight text-[#0A0A0A] mt-1">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-[#5A5852] mt-0.5">
                Clear answers regarding workflow, turnaround, and deliverables.
              </p>
            </div>

            <div className="divide-y divide-[#EFEFED]">
              {HELP_TOPICS.map((item, idx) => {
                const isOpen = openHelpIdx === idx;
                return (
                  <div key={item.question} className="py-3.5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggleHelp(idx)}
                      className="w-full flex items-center justify-between text-left gap-3 group cursor-pointer"
                    >
                      <div>
                        <span className="text-[9.5px] font-mono font-bold text-[#D12424] uppercase tracking-wider block">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#D12424] transition-colors leading-snug">
                          {item.question}
                        </span>
                      </div>
                      <span className="text-base font-mono text-[#5A5852] group-hover:text-[#0A0A0A] shrink-0 transition-transform duration-200">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[#5A5852] leading-relaxed pt-2.5">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#EFEEEB] text-[#0A0A0A] selection:bg-[#D12424] selection:text-white font-sans">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#5A5852]">
            Loading Contact &amp; Help Desk...
          </div>
        }
      >
        <ContactAndHelpContent />
      </Suspense>
    </main>
  );
}
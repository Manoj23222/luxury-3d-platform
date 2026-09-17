"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

const projectTypes = [
  "3D Product Modeling & CGI",
  "CLO 3D Digital Fashion",
  "Photo Retouching & Color Grading",
  "Real-Time Web 3D & GLB",
  "General Collaboration",
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
      setErrorMessage("Please fill in your name, email, and a brief message.");
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
    <div className="grid gap-10 lg:grid-cols-12 items-start">
      {/* ======================================================== */}
      {/* LEFT COLUMN: FRIENDLY INTRO, RESPONSE TIME & CHANNELS    */}
      {/* ======================================================== */}
      <div className="lg:col-span-5 space-y-6">
        {/* Response Time Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-900 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>⚡ Fast Response: Usually within 2–4 Hours</span>
        </div>

        {/* Headline & Friendly Welcome */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
            Let’s create something great together.
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Have a 3D modeling concept, digital fashion simulation, or photo retouching requirement? Drop a message below or reach out directly on WhatsApp. I’m always happy to discuss new projects, timelines, and creative ideas.
          </p>
        </div>

        {/* Creator Info Card */}
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50/70 p-5 space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-black text-white shadow-2xs">
              3D
            </div>
            <div>
              <h2 className="text-sm font-black text-black">Ashok Meena</h2>
              <p className="text-[11px] font-bold text-emerald-700">
                Senior 3D & Digital Fashion Designer (6+ Years)
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200/80 pt-3 space-y-2 text-xs">
            {/* Direct Email */}
            <a
              href="mailto:3ddesigner5546@gmail.com"
              className="flex items-center gap-2.5 text-neutral-700 hover:text-black transition font-medium"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-neutral-200 text-xs shadow-2xs">
                ✉️
              </span>
              <span className="font-bold">3ddesigner5546@gmail.com</span>
            </a>

            {/* Direct Phone */}
            <a
              href="tel:+918000093300"
              className="flex items-center gap-2.5 text-neutral-700 hover:text-black transition font-medium"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-neutral-200 text-xs shadow-2xs">
                📞
              </span>
              <span className="font-bold">+91 80000 93300</span>
            </a>

            {/* Location & Timezone */}
            <div className="flex items-center gap-2.5 text-neutral-600">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-neutral-200 text-xs shadow-2xs">
                📍
              </span>
              <span>Sardarshahar, Rajasthan, India <strong className="text-neutral-900 font-semibold">(IST / UTC+5:30)</strong></span>
            </div>
          </div>

          {/* Remote & Freelance Availability Pill */}
          <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[11px]">
            <span className="text-neutral-500 font-medium">Availability:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-emerald-300 px-2.5 py-0.5 font-bold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open for Remote & Contract
            </span>
          </div>
        </div>

        {/* WhatsApp Direct Chat Box */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3.5">
          <div>
            <p className="text-xs font-black text-black">Need an instant answer or urgent turnaround?</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Chat directly with me on WhatsApp.</p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <WhatsAppButton />
          </div>
        </div>

        {/* Transparent 3-Step Process */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 space-y-2.5 shadow-xs">
          <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
            What Happens Next?
          </p>
          <div className="space-y-2 text-xs text-neutral-600">
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-black text-black">
                1
              </span>
              <p><strong>Initial Review:</strong> I will review your requirements and reply within hours.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-black text-black">
                2
              </span>
              <p><strong>Scope & Sample:</strong> We finalize timelines, polycount, and 3D preview milestones.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-black text-black">
                3
              </span>
              <p><strong>Production & Delivery:</strong> High-fidelity models, renders, or retouching delivered with full quality assurance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: SIMPLE, APPROACHABLE CONTACT FORM          */}
      {/* ======================================================== */}
      <div className="lg:col-span-7">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                ✓
              </div>
              <h3 className="text-2xl font-black text-black">
                Thank you! Message Received
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Your message has been delivered to Ashok’s direct inbox. You will receive a response at <strong className="text-black font-bold">{form.email}</strong> shortly (usually within 2–4 hours).
              </p>

              <div className="pt-4">
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
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-black">
                  Send a Message
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Fill out this brief form and I’ll get right back to you.
                </p>
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* 1. Project Type Selector Chips */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {projectTypes.map((type) => {
                    const isSelected = form.projectType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => update("projectType", type)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? "bg-black text-white shadow-2xs"
                            : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:bg-white"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Name & Email Row */}
              <div className="grid gap-4 sm:grid-cols-2 pt-1">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 3. Subject / Topic (Optional / Prepopulated) */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Subject / Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3D Perfume Bottle Visualization / Photo Retouching Order"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* 4. Message Area */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Project Details or Questions <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me a little about what you'd like to build, timeline, references, or specific deliverables..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full rounded-2xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-xs font-medium text-black placeholder:text-neutral-400 transition focus:border-black focus:bg-white focus:outline-hidden resize-y"
                />
              </div>

              {/* 5. Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-xs font-bold text-white shadow-md transition duration-200 hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
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

              <p className="text-[11px] text-center text-neutral-400 pt-1">
                🔒 Your email and project details are kept 100% private and confidential.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
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

      <Footer />
    </main>
  );
}
"use client";

import { useState } from "react";

export default function AboutContactCard() {
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
          targetEmail: "3ddesigner5546@gmail.com",
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
      alert("Failed to send message. Please email directly at 3ddesigner5546@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
   <section className="border-b border-neutral-200/80 bg-[#fbfbfb] py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl sm:p-10 lg:p-12">
      {/* Ambient Luxury Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Info & Services Column */}
        <div className="space-y-6 lg:col-span-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-bold text-neutral-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Bespoke Projects</span>
            </div>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-black sm:text-3xl">
              Have a 3D or Visual Project in Mind?
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Inquire about high-end CGI, product modeling, digital fashion, or editorial retouching. Every project is handled with precision QC.
            </p>
          </div>

          {/* Luxury Micro-Cards Section */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
            <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-800 uppercase">
                Core Capabilities
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">
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
                  className="group flex flex-col justify-between rounded-xl border border-neutral-200/90 bg-white p-3 shadow-2xs transition-all duration-300 hover:border-black hover:shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-black group-hover:text-amber-900">
                      {item.label}
                    </p>
                    <span className="text-xs text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-black">
                      →
                    </span>
                  </div>
                  <span className="mt-1 text-[11px] font-medium text-neutral-500">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-200/60 pt-3 text-[10px] font-bold text-neutral-700">
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5">
                Worldwide Remote
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5">
                NDA Protected
              </span>
              <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-emerald-800">
                Slots Available
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Column (Aligned & Sleek) */}
        <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-6 sm:p-7 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-black">
              Send an Inquiry
            </h3>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
              Direct Contact
            </span>
          </div>

          {sent ? (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <span className="text-2xl">✓</span>
              <h4 className="mt-2 text-sm font-bold text-emerald-900">
                Inquiry Received
              </h4>
              <p className="mt-1 text-xs text-emerald-700">
                I will review your requirements and respond within a few business hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-neutral-800">
                  Name / Studio *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name or company"
                  className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-medium text-black focus:border-black focus:ring-0 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-neutral-800">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@brand.com"
                  className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-medium text-black focus:border-black focus:ring-0 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-neutral-800">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. 3D Perfume Render / Garment Simulation"
                  className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-medium text-black focus:border-black focus:ring-0 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-neutral-800">
                  Project Scope *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share details, reference links or deliverable deadlines..."
                  className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-medium text-black focus:border-black focus:ring-0 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-3 text-xs font-bold text-white shadow-xs transition hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Transmitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

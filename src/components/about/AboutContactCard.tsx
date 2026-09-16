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
    <section className="py-20 bg-neutral-50/50 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Left Info Column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-700 shadow-xs">
                <span>✉️ Get in Touch Directly</span>
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl">
                Have a 3D or Photo Editing Project?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Direct all business inquiries, 3D modeling orders, digital fashion simulations, or photo retouching requirements to my official email. I typically respond within a few hours.
              </p>

              {/* Contact Chips */}
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:3ddesigner5546@gmail.com"
                  className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 transition hover:border-black hover:bg-white shadow-xs"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white text-lg">
                    ✉️
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Primary Contact Email
                    </p>
                    <p className="text-sm font-black text-black">
                      3ddesigner5546@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918000093300"
                  className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 transition hover:border-black hover:bg-white shadow-xs"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-200 text-black text-lg">
                    📞
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Direct Phone / WhatsApp
                    </p>
                    <p className="text-sm font-black text-black">
                      +91 80000 93300
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 shadow-xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-200 text-black text-lg">
                    📍
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Studio Location
                    </p>
                    <p className="text-sm font-black text-black">
                      Sardarshahar, Rajasthan, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50/70 p-6 sm:p-8">
              <h3 className="text-lg font-black text-black">
                Send a Message to Ashok Meena
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Delivered straight to <strong className="text-black">3ddesigner5546@gmail.com</strong>
              </p>

              {sent ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                  <span className="text-3xl">✅</span>
                  <h4 className="mt-2 text-base font-black text-emerald-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700">
                    Thank you for reaching out. I will get back to you shortly at your email.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 inline-block rounded-full bg-black px-5 py-2 text-xs font-bold text-white hover:bg-neutral-800 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Doe / Brand Representative"
                      className="w-full rounded-xl border border-neutral-300 bg-white p-3 font-medium text-black focus:border-black focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. john@brand.com"
                      className="w-full rounded-xl border border-neutral-300 bg-white p-3 font-medium text-black focus:border-black focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Project Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. 3D Perfume Bottle Modeling / E-Commerce Retouching"
                      className="w-full rounded-xl border border-neutral-300 bg-white p-3 font-medium text-black focus:border-black focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Message / Requirements *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share project details, timelines, reference links or deliverable requirements..."
                      className="w-full rounded-xl border border-neutral-300 bg-white p-3 font-medium text-black focus:border-black focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-black py-3.5 text-xs font-bold text-white shadow-xs transition hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Sending..." : "Send Message to 3ddesigner5546@gmail.com ✉️"}
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

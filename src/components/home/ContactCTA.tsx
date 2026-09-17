import Link from "next/link";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function ContactCTA() {
  return (
    <section className="bg-white py-16 sm:py-20 text-neutral-900 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/60 p-8 sm:p-12 shadow-xl">
          {/* Subtle Ambient Mesh Background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center space-y-4">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1 text-xs font-bold text-neutral-800 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>✉️ Let’s Work Together</span>
              <span className="text-neutral-300">•</span>
              <span className="text-emerald-700 font-bold">Open for Remote & Contract Hire</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
              Have a 3D Modeling or Photo Retouching Project?
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Direct all project inquiries, 3D model commissions, CLO 3D digital apparel simulations, or commercial photo retouching requirements to my official desk. I typically respond within a few hours.
            </p>

            {/* Hiring / Capability Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 font-bold text-neutral-800 shadow-2xs">
                🌍 Remote Work Worldwide
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 font-bold text-neutral-800 shadow-2xs">
                💼 Full-Time & Freelance Contract
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 font-bold text-neutral-800 shadow-2xs">
                ⚡ Rapid Production Turnaround
              </span>
            </div>

            {/* Contact Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/contact"
                className="rounded-full bg-black px-7 py-3.5 text-xs font-bold text-white shadow-md transition duration-200 hover:bg-neutral-800 hover:scale-105"
              >
                Start a Project / Hire Me →
              </Link>

              <WhatsAppButton />

              <a
                href="mailto:3ddesigner5546@gmail.com"
                className="rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-xs font-bold text-neutral-900 shadow-xs transition duration-200 hover:border-black hover:bg-neutral-50"
              >
                ✉️ 3ddesigner5546@gmail.com
              </a>
            </div>

            {/* Fast Phone / Location Indicator */}
            <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-500">
              <a href="tel:+918000093300" className="hover:text-black transition">
                📞 +91 80000 93300
              </a>
              <span>•</span>
              <span>📍 Sardarshahar, Rajasthan, India</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">🟢 Available for New Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
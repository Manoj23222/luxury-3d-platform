import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Brief & Technical Discovery",
    subtitle: "Project Scoping & References",
    text: "Reviewing brand moodboards, CAD drawings, tech-pack measurements, target poly-budget, and visual objectives.",
    icon: "📋",
  },
  {
    step: "02",
    title: "3D Modeling & Pattern Drafting",
    subtitle: "Blender Sub-D & CLO 3D Patterning",
    text: "Constructing clean quad subdivision topology in Blender and drafting accurate 2D-to-3D garment patterns in CLO 3D.",
    icon: "📐",
  },
  {
    step: "03",
    title: "PBR Shading & Studio Lighting",
    subtitle: "Ray-Traced Shaders & Real Fabric Physics",
    text: "Applying 8K PBR materials, cloth drape physics, custom subsurface scattering, and cinematic 3-point ray-traced lighting.",
    icon: "💡",
  },
  {
    step: "04",
    title: "Real-Time Optimization & Delivery",
    subtitle: "60 FPS GLB / 4K Commercial Renders",
    text: "Exporting validated GLB/glTF web assets, high-resolution commercial CGI renders, and organized source packages.",
    icon: "🚀",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-12 sm:py-16 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* UNIQUE ROSE-GOLD & CRIMSON OBSIDIAN PROMOTIONAL SHOWCASE BANNER CONTAINER */}
        <div className="relative overflow-hidden rounded-3xl border border-rose-900/40 bg-gradient-to-br from-[#180a0f] via-[#220d15] to-[#0c0408] p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Ambient Rose-Gold & Amber Lighting Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

          {/* Subtle Pipeline / Dot Matrix Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #fb7185 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Banner Top Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-rose-500/20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/30 mb-3 shadow-inner">
                <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px] font-bold">4-Phase Production Pipeline</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                From Concept to Production-Ready 3D
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-rose-100/80 font-normal leading-relaxed">
                A structured, quality-controlled design pipeline engineered for flawless execution on commercial campaigns and real-time 3D viewers.
              </p>

              {/* Quick Spec Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 px-3 py-1 text-[11px] font-semibold text-rose-200">
                  <span className="text-rose-400">📋</span> 01. Discovery & Specs
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 px-3 py-1 text-[11px] font-semibold text-rose-200">
                  <span className="text-amber-400">📐</span> 02. Sub-D & Pattern Drafting
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 px-3 py-1 text-[11px] font-semibold text-rose-200">
                  <span className="text-pink-400">💡</span> 03. 8K PBR & Ray-Tracing
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 px-3 py-1 text-[11px] font-semibold text-rose-200">
                  <span className="text-emerald-400">🚀</span> 04. 60 FPS GLB & 4K CGI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
              <Link
                href="/contact?subject=New%20Project%20Workflow%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-md transition hover:from-rose-300 hover:to-amber-300 hover:scale-105"
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* 4 Steps Grid */}
          <div className="relative z-10 mt-8 sm:mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-lg transition-all duration-300 hover:border-rose-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-neutral-300 group-hover:text-rose-600 transition duration-300">
                      {item.step}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 text-xl shadow-2xs group-hover:scale-105 transition duration-300">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="mt-4 text-base font-black text-black group-hover:text-rose-700 transition">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-bold text-rose-700 mt-0.5">
                    {item.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 font-medium">
                    {item.text}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-semibold">
                  <span>Phase {item.step}</span>
                  <span className="text-emerald-700 font-bold">Quality Controlled ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
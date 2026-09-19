import Link from "next/link";

interface WebProject {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  aiBadge: string;
  description: string;
  techStack: string[];
  features: string[];
  liveUrl: string;
  liveUrlLabel: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  githubUrl?: string;
  icon: string;
}

const projects: WebProject[] = [
  {
    id: "bootkit",
    title: "BootKiT — Quick-Commerce & Grocery Delivery Platform",
    tagline: "High-Performance Mobile-First E-Commerce Progressive Web App",
    badge: "🛒 Full-Stack E-Commerce & PWA",
    badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
    aiBadge: "🤖 AI-Prompt Engineered",
    description:
      "A production-grade, ultra-responsive quick-commerce grocery delivery web platform designed for 10–20 minute delivery workflows. Built with rapid AI prompt engineering combining modern full-stack architectures, instant search indexing, and native-feeling mobile PWA navigation.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
      "PWA",
      "AI Prompting",
    ],
    features: [
      "Instant product catalogue with multi-category filters (Beauty, Electronics, Pharmacy, Groceries)",
      "Real-time live search with voice-assisted search input & dynamic discount coupon banners",
      "Full cart management, responsive checkout flows, and localized delivery address selection",
      "Mobile-first Progressive Web App (PWA) with native app-like bottom navigation & smooth drawer",
      "Production-deployed on Vercel with custom domain integration (bootkit.in)",
    ],
    liveUrl: "https://www.bootkit.in/",
    liveUrlLabel: "Visit Live App (bootkit.in) ↗",
    secondaryUrl: "https://bootkit.vercel.app/",
    secondaryUrlLabel: "Vercel Mirror ↗",
    icon: "🛍️",
  },
  {
    id: "lux3d",
    title: "Lux3D — 3D & AI Creative Web Platform",
    tagline: "Interactive 3D WebGL Visualization & Creative Studio Platform",
    badge: "🧊 3D WebGL & Creative Platform",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-800",
    aiBadge: "🤖 AI-Assisted Architecture",
    description:
      "A luxury digital portfolio and 3D asset visualization platform engineered with Three.js WebGL orbit controls, interactive Before/After photo retouching split sliders, and a custom real-time visitor traffic analytics engine.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Three.js / WebGL",
      "MongoDB",
      "Tailwind CSS 4",
      "AI Workflows",
    ],
    features: [
      "Real-time 60 FPS 3D WebGL model inspection with OrbitControls for Blender/GLB assets",
      "Interactive Before/After photo retouching comparison slider with high-res lightbox modals",
      "Built-in in-house live visitor traffic tracking analytics and device distribution dashboard",
      "Admin studio management hub with drag-and-drop file uploader pipeline",
      "Ultra-clean luxury typography, responsive layout, and zero-latency performance",
    ],
    liveUrl: "/portfolio",
    liveUrlLabel: "Explore 3D Web Platform ↗",
    secondaryUrl: "/photo-editing",
    secondaryUrlLabel: "Photo Retouching Studio ↗",
    icon: "💎",
  },
];

export default function AiWebProjectsSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-12 sm:py-16 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* UNIQUE TECH EMERALD PROMOTIONAL SHOWCASE BANNER CONTAINER (LIGHT LUXURY THEME) */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 p-6 sm:p-8 lg:p-10 shadow-xl">
          {/* Ambient Tech Glows & Matrix Texture */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

          {/* Subtle Circuit / Dot Matrix Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Banner Top Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-emerald-100">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 border border-emerald-300/80 px-3.5 py-1 text-xs font-bold text-emerald-900 mb-3 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px]">Full-Stack & Web Engineering Hub</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
                Featured Web Applications & Platforms
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Production-grade web applications and high-conversion platforms built rapidly using advanced <strong>AI Prompt Engineering</strong>, Next.js, React, TypeScript, and modern cloud databases.
              </p>

              {/* Quick Tech Highlights */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-emerald-600 font-bold">⚡</span> Next.js 16 & React Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-blue-600 font-bold">🛒</span> E-Commerce & Progressive Web Apps
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-teal-600 font-bold">🧊</span> Interactive 3D WebGL Visualizers
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
              <Link
                href="/contact?subject=Web%20Development%20%26%20AI%20App%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-neutral-800 hover:scale-105"
              >
                <span>Hire for Web Development</span>
                <span>✉️</span>
              </Link>
            </div>
          </div>

          {/* 2 Major Projects Grid */}
          <div className="relative z-10 mt-8 sm:mt-10 grid gap-7 lg:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-lg transition-all duration-300 hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  {/* Badges & Icon */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 text-xl shadow-2xs group-hover:scale-105 transition">
                        {project.icon}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-[10.5px] font-bold ${project.badgeColor}`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <span className="rounded-full bg-neutral-950 text-white px-3 py-0.5 text-[10.5px] font-extrabold tracking-wide">
                      {project.aiBadge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-5 text-xl sm:text-2xl font-black text-black group-hover:text-emerald-700 transition">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-neutral-500">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-3.5 text-xs sm:text-[13px] leading-relaxed text-neutral-700 font-medium">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Tech Stack & Architecture:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10.5px] font-bold text-neutral-800 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables & Features */}
                  <div className="mt-5 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Key Features Built:
                    </p>
                    <ul className="space-y-2 text-xs text-neutral-700">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-600"
                    >
                      <span>{project.liveUrlLabel}</span>
                    </a>

                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target={project.secondaryUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-800 shadow-xs transition hover:border-black"
                      >
                        <span>{project.secondaryUrlLabel}</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700">
                    ● Live & Production Ready
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="relative z-10 mt-10 rounded-2xl border border-emerald-200/90 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 px-3 py-0.5 text-[10.5px] font-bold text-emerald-900">
                ⚡ Rapid Full-Stack Development
              </span>
              <h4 className="mt-2 text-lg font-black text-neutral-900">
                Need a Custom Web App, E-Commerce Store, or 3D Web Configurator?
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Available for freelance development, frontend/full-stack projects, and innovative AI-assisted web builds.
              </p>
            </div>

            <Link
              href="/contact?subject=AI%20Web%20%26%20Full-Stack%20Development%20Inquiry"
              className="shrink-0 rounded-full bg-black px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-neutral-800 hover:scale-105"
            >
              Inquire for Web Development ✉️
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

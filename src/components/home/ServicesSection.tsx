import Link from "next/link";

interface ServiceItem {
  id: string;
  badge: string;
  badgeColor: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tools: string[];
  inquiryQuery: string;
}

const servicesList: ServiceItem[] = [
  {
    id: "3d-modeling",
    badge: "Precision CGI & Products",
    badgeColor: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "🏺",
    title: "3D Product Modeling & Commercial CGI",
    subtitle: "Sub-D Quad Topology & Photorealistic Renderings",
    description:
      "Creating ultra-detailed 3D product models, luxury cosmetics, perfume flacons, jewelry, consumer tech, and commercial e-commerce turntable visuals.",
    deliverables: [
      "Precision Sub-D & Hard Surface Quad Meshes",
      "8K PBR Material Shaders & Texture Baking",
      "Cinematic Studio 3-Point Lighting Setups",
      "4K Photorealistic Renders & 360° Turntables",
    ],
    tools: ["Blender 4.2", "Substance 3D Painter", "Cycles", "Eevee"],
    inquiryQuery: "3D Product Modeling & Commercial CGI",
  },
  {
    id: "digital-fashion",
    badge: "Virtual Fashion & Apparel",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-800",
    icon: "👗",
    title: "CLO 3D Apparel & Digital Fashion",
    subtitle: "2D Pattern Drafting to Realistic Drape Physics",
    description:
      "Virtual apparel design, garment cloth simulation, multi-colorway SKU development, avatar drape fitting, and digital fashion tech-pack asset generation.",
    deliverables: [
      "2D to 3D Digital Garment Construction",
      "Dynamic Cloth Drape Physics & Tension Maps",
      "Multi-Colorway Fabric Variant Generation",
      "Virtual Try-On & Dynamic Walkcycle Assets",
    ],
    tools: ["CLO 3D", "Marvelous Designer", "Blender", "Adobe PS"],
    inquiryQuery: "CLO 3D Apparel & Digital Fashion Simulation",
  },
  {
    id: "photo-retouching",
    badge: "Commercial Post-Production",
    badgeColor: "bg-rose-50 border-rose-200 text-rose-800",
    icon: "🎨",
    title: "High-End Photo Retouching & Grading",
    subtitle: "16-Bit RAW Frequency Separation & Color Tuning",
    description:
      "Commercial e-commerce image post-production, non-destructive skin retouching, micro dodge & burn, jewelry/product cleanup, and cinematic tone grading.",
    deliverables: [
      "Advanced Frequency Separation (Natural Skin Texture)",
      "Micro Dodge & Burn for Specular Product Highlights",
      "White/Transparent Background & Clipping Paths",
      "High-Res 16-Bit RAW Color Harmony & Tone Curve",
    ],
    tools: ["Adobe Photoshop", "Adobe Lightroom", "Camera RAW"],
    inquiryQuery: "High-End Photo Retouching & Color Grading",
  },
  {
    id: "web-3d-optimization",
    badge: "Real-Time 60 FPS",
    badgeColor: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "⚡",
    title: "Real-Time Web 3D & GLB Optimization",
    subtitle: "Ultra-Lightweight Three.js & glTF Assets",
    description:
      "Low-poly retopology, normal map baking, and DRACO/KTX2 mesh compression engineered for sub-second web loading and 60 FPS interactive 3D configurators.",
    deliverables: [
      "Low-Poly Game & Web Retopology",
      "High-to-Low Normal & Roughness Map Baking",
      "DRACO Geometry & KTX2 Texture Compression",
      "Three.js & WebGL Asset Integration Support",
    ],
    tools: ["GLB / glTF", "Three.js", "Draco", "Blender"],
    inquiryQuery: "Real-Time Web 3D & GLB Optimization",
  },
  {
    id: "ai-web-apps",
    badge: "Full-Stack & AI Prompting",
    badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: "🌐",
    title: "AI-Powered Full-Stack Web Apps",
    subtitle: "Next.js, TypeScript, Supabase & PWA Development",
    description:
      "Rapidly developing production-grade web applications, quick-commerce PWAs, and 3D web platforms using cutting-edge AI prompt engineering workflows.",
    deliverables: [
      "Custom Next.js & React Full-Stack Web Apps",
      "Mobile-First PWA with Offline & App-Like UX",
      "Supabase & MongoDB Database Architecture",
      "Production Deployment & Custom Domain DNS",
    ],
    tools: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    inquiryQuery: "AI-Powered Full-Stack Web Development",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-12 sm:py-16 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* UNIQUE ROYAL SAPPHIRE & COBALT PROMOTIONAL SHOWCASE BANNER CONTAINER (LIGHT LUXURY THEME) */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-sky-50/60 p-6 sm:p-8 lg:p-10 shadow-xl">
          {/* Ambient Sapphire & Gold Lighting Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 right-1/4 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

          {/* Subtle Geometric / Diamond Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Banner Top Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-blue-100">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/90 border border-blue-300/80 px-3.5 py-1 text-xs font-bold text-blue-900 mb-3 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="tracking-wide uppercase text-[11px]">End-to-End Production Solutions</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
                Production Capabilities & Services
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                End-to-end 3D modeling, digital apparel simulation, commercial photo retouching, and full-stack AI web engineering for global brands and platforms.
              </p>

              {/* Quick Highlight Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-amber-600 font-bold">🏺</span> 3D Products & CGI
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-purple-600 font-bold">👗</span> CLO 3D Digital Fashion
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-rose-600 font-bold">🎨</span> High-End Retouching
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-blue-600 font-bold">⚡</span> 60 FPS Web 3D
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-neutral-200/90 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-2xs">
                  <span className="text-emerald-600 font-bold">🌐</span> AI Full-Stack Web
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-neutral-800 hover:scale-105"
              >
                <span>Get in Touch for Projects</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* 5-Column Grid of Core Services (Compact & Proportional) */}
          <div className="relative z-10 mt-6 sm:mt-8 grid gap-4 sm:gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-4 sm:p-4.5 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 text-lg shadow-2xs group-hover:scale-105 transition duration-300">
                      {service.icon}
                    </div>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9.5px] font-bold ${service.badgeColor}`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-3 text-sm font-black text-black group-hover:text-blue-700 transition leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-0.5 text-[10.5px] font-bold text-neutral-500 truncate">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-[11px] leading-relaxed text-neutral-600 font-medium line-clamp-2">
                    {service.description}
                  </p>

                  {/* Key Deliverables (Compact) */}
                  <div className="mt-3 rounded-xl border border-neutral-100 bg-neutral-50/80 p-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Deliverables:
                    </p>
                    <ul className="space-y-1 text-[10.5px] text-neutral-700">
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold shrink-0">✓</span>
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools Chips */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-neutral-200 bg-white px-1.5 py-0.5 text-[9.5px] font-semibold text-neutral-700 shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inquire CTA Button */}
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(
                      `Service Inquiry: ${service.inquiryQuery}`
                    )}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 py-2 text-center text-[11px] font-bold text-neutral-900 transition duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                  >
                    <span>Inquire Service</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

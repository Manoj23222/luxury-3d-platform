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
];

export default function ServicesSection() {
  return (
    <section className="border-b border-neutral-200 bg-white py-16 sm:py-5 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-800 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Specialized Creative Services</span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl lg:text-4xl">
              Production Capabilities & Services
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              End-to-end 3D modeling, digital apparel simulation, and commercial photo retouching services designed for global brands, agencies, and e-commerce platforms.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-neutral-800 hover:scale-105"
            >
              <span>Get in Touch for Projects</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 4-Column Grid of Core Services */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 text-2xl shadow-2xs group-hover:scale-105 transition duration-300">
                    {service.icon}
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="mt-4 text-base font-black text-black group-hover:text-emerald-700 transition">
                  {service.title}
                </h3>
                <p className="mt-0.5 text-[11px] font-bold text-neutral-500">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs leading-relaxed text-neutral-600">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="mt-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    What You Get:
                  </p>
                  <ul className="space-y-1 text-[11px] text-neutral-700">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Chips */}
                <div className="mt-3.5 flex flex-wrap gap-1">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-neutral-700 shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inquire CTA Button */}
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link
                  href={`/contact?subject=${encodeURIComponent(
                    `Service Inquiry: ${service.inquiryQuery}`
                  )}`}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-neutral-200 bg-neutral-50 py-2.5 text-center text-xs font-bold text-neutral-900 transition duration-200 group-hover:bg-black group-hover:text-white group-hover:border-black"
                >
                  <span>Inquire for This Service</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

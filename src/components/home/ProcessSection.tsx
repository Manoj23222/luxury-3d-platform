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
    <section className="border-b border-neutral-200 bg-neutral-50/50 py-16 sm:py-6 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          
          <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl lg:text-4xl">
            From Concept to Production-Ready 3D
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600">
            A structured, quality-controlled design pipeline engineered for flawless execution on commercial campaigns and real-time 3D viewers.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs transition duration-300 hover:border-black hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-neutral-300 group-hover:text-black transition">
                    {item.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 text-lg shadow-2xs">
                    {item.icon}
                  </div>
                </div>

                <h3 className="mt-4 text-base font-black text-black">
                  {item.title}
                </h3>
                <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                  {item.subtitle}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-neutral-600">
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
    </section>
  );
}
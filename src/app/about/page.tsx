import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SoftwareSkillsSlider from "@/components/home/SoftwareSkillsSlider";
import AboutContactCard from "@/components/about/AboutContactCard";

export const metadata: Metadata = {
  title: "About Ashok Meena — Senior 3D Designer & Photo Editor",
  description:
    "Learn about Ashok Meena, Senior 3D Designer & Photo Editor with 6+ years experience at Infoeye Software specializing in Blender 3D, CLO 3D, and Adobe Photoshop post-production.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-neutral-50/80 via-white to-neutral-50/40 pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-[260px_1fr] items-start">
              {/* Profile Photo Card */}
              <div className="flex flex-col items-center text-center mx-auto">
                <div className="relative h-64 w-52 overflow-hidden rounded-2xl border-2 border-neutral-200 bg-neutral-100 shadow-lg">
                  <img
                    src="/ashok_photo.jpg"
                    alt="Ashok Meena"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute bottom-2.5 inset-x-2.5 rounded-xl bg-black/80 px-2 py-1 text-xs font-bold text-white backdrop-blur-xs">
                    Ashok Meena
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Work
                  </span>
                  <p className="text-xs text-neutral-500 font-medium">📍 Sardarshahar, Rajasthan, India</p>
                </div>
              </div>

              {/* Bio & Headlines */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-xs font-bold text-neutral-700 shadow-xs">
                  <span>✦ Professional Profile</span>
                </div>

                <h1 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
                  Ashok Meena
                </h1>
                <p className="mt-1 text-base sm:text-lg font-bold text-emerald-700">
                  Senior 3D Designer & Photo Editor
                </p>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700 font-normal">
                  Senior 3D & Graphic Designer with <strong>6+ years of professional experience</strong> creating, optimizing, and delivering high-fidelity 3D assets for digital fashion, e-commerce, and real-time 3D web simulators. Proven expertise in <strong>Blender, CLO 3D, and Adobe Creative Suite</strong> with end-to-end knowledge of 3D modeling, UV unwrapping, PBR texturing, lighting, typography, and asset optimization. Successfully delivered <strong>300+ production-ready 3D models</strong> and digital assets with strict quality control for global platforms.
                </p>

                {/* Key Metrics Strip */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-neutral-100 py-4">
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-3 text-center">
                    <p className="text-2xl font-black text-black">6+ Yrs</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Experience</p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-3 text-center">
                    <p className="text-2xl font-black text-emerald-700">Infoeye</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Studio Position</p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-3 text-center">
                    <p className="text-2xl font-black text-black">300+</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">3D Assets Delivered</p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-3 text-center">
                    <p className="text-2xl font-black text-black">100%</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">PBR & QC Quality</p>
                  </div>
                </div>

                {/* Action Contact Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:ashokm3414@gmail.com"
                    className="rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-neutral-800"
                  >
                    ✉️ ashokm3414@gmail.com
                  </a>
                  <a
                    href="tel:+918000093300"
                    className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-xs font-bold text-neutral-800 shadow-xs transition hover:border-black"
                  >
                    📞 +91 80000 93300
                  </a>
                  <a
                    href="/Ashok_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-neutral-200 bg-neutral-100 px-5 py-2.5 text-xs font-bold text-neutral-800 transition hover:bg-black hover:text-white"
                  >
                    Download Resume (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Work Experience */}
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50/60 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                  2020 – Present (6+ Years)
                </span>
                <a
                  href="https://infoeye.com/company/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Infoeye Software ↗
                </a>
              </div>

              <h2 className="mt-4 text-xl font-black text-black">
                Senior 3D Designer & Photo Editor
              </h2>
              <p className="text-xs text-neutral-500 font-semibold">
                Infoeye Software • Sardarshahar, Rajasthan, India
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Model, simulate, and optimize 3D apparel and hard-surface assets using Blender and CLO 3D.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Successfully delivered 300+ production-ready 3D models with strict quality control for international client platforms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Lead non-destructive 16-bit RAW commercial photo retouching, frequency separation, and color grading.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Engineered lightweight OBJ, GLB/glTF files with PBR materials for real-time 60 FPS web configurators.</span>
                </li>
              </ul>

              {/* President Home Visit Recognition */}
              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <a
                  href="https://infoeye.com/news/staff/11540/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-amber-300 bg-amber-50 p-3.5 text-xs font-bold text-amber-900 shadow-xs transition hover:bg-amber-100"
                >
                  🏆 Official Executive Recognition: Infoeye President personally visited Ashok&apos;s home for dinner ↗
                </a>
              </div>
            </div>

            {/* Education & Academic Degrees */}
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50/60 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-bold text-neutral-800">
                  Academic Background
                </span>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                    <h3 className="text-sm font-black text-black">
                      Master of Science (M.Sc.) in Computer Science
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700">2025 – 2026 (Ongoing)</p>
                    <p className="mt-1 text-xs text-neutral-600">
                      Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
                    </p>
                  </div>

                  <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                    <h3 className="text-sm font-black text-black">
                      Bachelor of Arts (B.A.)
                    </h3>
                    <p className="text-xs font-semibold text-neutral-600">Graduated 2024</p>
                    <p className="mt-1 text-xs text-neutral-600">
                      Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-700">Languages:</span>
                <span className="font-medium text-neutral-600">Hindi (Native) • English (Proficient)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Web Engineering & Full-Stack Projects */}
      <section className="py-16 bg-neutral-50/50 border-b border-neutral-200 text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-bold text-neutral-800 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Full-Stack & AI Software Engineering</span>
              </div>
              <h2 className="mt-2.5 text-2xl font-black text-black sm:text-3xl lg:text-4xl tracking-tight">
                Featured Web Platforms & AI Applications
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 max-w-2xl">
                Combining <strong>M.Sc. Computer Science</strong> technical engineering with advanced <strong>AI Prompt Engineering</strong> to build and deploy production web applications at scale.
              </p>
            </div>

            <Link
              href="/contact?subject=Full-Stack%20Web%20Development%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-neutral-800 shrink-0"
            >
              <span>Hire for Web Development</span>
              <span>✉️</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Project 1: BootKit */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                    🛒 Full-Stack E-Commerce & PWA
                  </span>
                  <span className="rounded-full bg-black text-white px-3 py-0.5 text-[10.5px] font-bold">
                    🤖 AI Prompt Engineered
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-black text-black">
                  BootKiT — Quick-Commerce & Grocery Delivery Platform
                </h3>
                <p className="mt-1 text-xs font-semibold text-neutral-500">
                  Next.js • React • TypeScript • Supabase • Tailwind CSS • Vercel • PWA
                </p>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-neutral-700">
                  Built a full-fledged quick-commerce progressive web app using AI-assisted rapid engineering. Features instant category indexing, live voice/text search, localized delivery addresses, dynamic cart & checkout management, and mobile PWA native navigation.
                </p>

                <div className="mt-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-3.5 space-y-1.5 text-xs text-neutral-700">
                  <p className="font-bold text-[10.5px] uppercase tracking-wider text-neutral-400">Highlights:</p>
                  <p className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span> 10–20 minute delivery workflow & multi-category product catalog</p>
                  <p className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Progressive Web App (PWA) installable on mobile devices</p>
                  <p className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Production deployed on custom domain (bootkit.in)</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.bootkit.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition"
                  >
                    Visit bootkit.in ↗
                  </a>
                  <a
                    href="https://bootkit.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-bold text-neutral-800 hover:border-black transition"
                  >
                    Vercel Mirror ↗
                  </a>
                </div>
                <span className="text-[11px] font-bold text-emerald-700">● Live Production</span>
              </div>
            </div>

            {/* Project 2: Lux3D */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-purple-50 border border-purple-200 px-3 py-0.5 text-[11px] font-bold text-purple-800">
                    🧊 3D WebGL & Creative Platform
                  </span>
                  <span className="rounded-full bg-black text-white px-3 py-0.5 text-[10.5px] font-bold">
                    🤖 AI-Assisted Architecture
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-black text-black">
                  Lux3D — 3D & AI Creative Web Platform
                </h3>
                <p className="mt-1 text-xs font-semibold text-neutral-500">
                  Next.js 16 • TypeScript • Three.js / WebGL • MongoDB • Tailwind CSS 4
                </p>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-neutral-700">
                  Architected an interactive 3D WebGL asset viewer and creative photo retouching showcase platform. Integrated 60 FPS Three.js orbit controls, Before/After image split sliders, and custom real-time traffic tracking analytics.
                </p>

                <div className="mt-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-3.5 space-y-1.5 text-xs text-neutral-700">
                  <p className="font-bold text-[10.5px] uppercase tracking-wider text-neutral-400">Highlights:</p>
                  <p className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span> 60 FPS real-time Three.js WebGL orbit viewer for Blender GLB assets</p>
                  <p className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Interactive Before/After split sliders & high-res image modals</p>
                  <p className="flex items-start gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Real-time live visitor tracking engine & admin traffic dashboard</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Link
                    href="/portfolio"
                    className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition"
                  >
                    Explore 3D Platform ↗
                  </Link>
                  <Link
                    href="/photo-editing"
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-bold text-neutral-800 hover:border-black transition"
                  >
                    Photo Retouching ↗
                  </Link>
                </div>
                <span className="text-[11px] font-bold text-emerald-700">● Live Production</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Team & Office Workplace Gallery */}
      <section className="py-10 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
            <div>
              <h2 className="mt-3 text-2xl font-black text-black sm:text-3xl lg:text-4xl tracking-tight">
                Company Team & Studio Life
              </h2>
              <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
                Collaborating with passionate engineers, artists, and leaders at Infoeye Software. Building innovative digital fashion and 3D simulation solutions together.
              </p>
            </div>
            <a
              href="https://infoeye.com/company/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-xs font-bold text-neutral-800 shadow-xs transition hover:bg-black hover:text-white hover:border-black"
            >
              <span>Visit Infoeye Company</span>
              <span>↗</span>
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Office Photo 1 */}
            <div className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="/office/IMG_0548.jpeg?v=2"
                  alt="Infoeye Company Team"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Office Photo 2 */}
            <div className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="/office/IMG_0549.jpeg"
                  alt="Infoeye Team & Leadership"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Office Photo 3 */}
            <div className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="/office/1.jpg"
                  alt="Ashok Meena 3D Studio Workstation"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    


    </main>
  );
}
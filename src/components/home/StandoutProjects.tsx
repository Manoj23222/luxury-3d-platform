import Link from "next/link";
import { FALLBACK_3D_PRODUCTS } from "@/lib/fallback-products";

async function getFeaturedProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/public/products`, {
      cache: "no-store",
    });

    if (!res.ok) return FALLBACK_3D_PRODUCTS;
    const data = await res.json();
    if (Array.isArray(data.products) && data.products.length > 0) {
      return data.products;
    }
    return FALLBACK_3D_PRODUCTS;
  } catch {
    return FALLBACK_3D_PRODUCTS;
  }
}

export default async function StandoutProjects() {
  const allProjects = await getFeaturedProjects();
  // Display top standout works (up to 6)
  const standoutList = allProjects.slice(0, 6);

  return (
    <section className="border-b border-neutral-200 bg-neutral-50/60 py-16 sm:py-20 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-bold text-neutral-800 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Selected Best Work</span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl lg:text-4xl">
              Standout 3D & Digital Works
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              Curated showcase of high-precision hard-surface models, CLO 3D cloth physics, and commercial product CGI engineered for photorealistic campaigns and real-time WebGL.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-neutral-800 hover:scale-105"
            >
              <span>View Full 3D Portfolio</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Standout Projects Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {standoutList.map((item: any) => {
            const software = Array.isArray(item.softwareUsed)
              ? item.softwareUsed
              : ["Blender", "Substance 3D"];

            return (
              <article
                key={item._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xs transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Thumbnail / Image Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                    <Link href={`/portfolio/${item._id}`} className="block h-full w-full">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                          📦 3D Asset Preview
                        </div>
                      )}
                    </Link>

                    {/* Top Badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
                      <span className="rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                        {item.category || "3D Visualization"}
                      </span>
                    </div>

                    {/* 3D Viewer Available Badge */}
                    {item.modelUrl && (
                      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Interactive 3D
                      </span>
                    )}
                  </div>

                  {/* Body Content with Brief Context */}
                  <div className="p-5">
                    <Link href={`/portfolio/${item._id}`}>
                      <h3 className="text-base sm:text-lg font-black text-black group-hover:text-emerald-700 transition">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Brief Context / Technical Summary */}
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-3">
                      {item.shortDescription ||
                        item.description ||
                        "Precision-modeled 3D asset featuring clean quad topology, high-resolution PBR shaders, and production-ready real-time optimization."}
                    </p>

                    {/* Software Used Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {software.map((sw: string) => (
                        <span
                          key={sw}
                          className="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold text-neutral-700"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs">
                    <span className="text-[11px] font-semibold text-neutral-400">
                      {item.views || 0} views • {item.projectYear || "2026"}
                    </span>

                    <Link
                      href={`/portfolio/${item._id}`}
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-bold text-black transition group-hover:bg-black group-hover:text-white group-hover:border-black"
                    >
                      <span>Inspect 3D</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 text-center shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-lg font-black text-black">
              Looking for a specific 3D model or custom simulation?
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              Explore 300+ 3D models, digital garments, and commercial CGI projects.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/portfolio"
              className="rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
            >
              Browse All 3D Works →
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-neutral-300 bg-neutral-50 px-5 py-2.5 text-xs font-bold text-neutral-800 transition hover:border-black hover:bg-white"
            >
              Inquire Custom 3D
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

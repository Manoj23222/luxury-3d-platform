import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FeaturedAssets from "@/components/home/FeaturedAssets";

async function getProjects() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/public/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Hero */}
      <Navbar />
      <section className="border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-600 shadow-sm">
                Premium 3D Asset Marketplace
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-black sm:text-6xl">
                High-quality 3D models for brands, products & creators.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                Download premium Blender, GLB, FBX, OBJ and product-ready 3D
                assets with a clean luxury marketplace experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/portfolio"
                  className="rounded-full border border-neutral-300 bg-white px-7 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:border-black"
                >
                  Explore Assets
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-neutral-300 bg-white px-7 py-3 text-center text-sm font-semibold text-black shadow-sm transition hover:border-black"
                >
                  Hire Me
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
                {[
                  ["100+", "Assets"],
                  ["4K", "Textures"],
                  ["3D", "Ready"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-neutral-200 bg-white p-4 text-center shadow-sm"
                  >
                    <p className="text-xl font-bold text-black">{num}</p>
                    <p className="mt-1 text-xs text-neutral-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-white p-3 shadow-xl">
              <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-neutral-100 text-center">
                <div>
                  <p className="text-5xl">⬢</p>
                  <p className="mt-4 text-sm font-semibold text-neutral-600">
                    Luxury 3D Assets
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Blender • GLB • FBX • OBJ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedAssets projects={projects} />
     
    </main>
  );
}
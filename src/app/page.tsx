import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
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

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            "All",
            "Furniture",
            "Packaging",
            "Electronics",
            "Bottle",
            "Cosmetics",
            "Free",
            "Paid",
          ].map((x) => (
            <button
              key={x}
              className="whitespace-nowrap rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-black hover:bg-black hover:text-white"
            >
              {x}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Assets */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Featured 3D Assets
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Premium marketplace-ready assets for creative projects.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="hidden rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-black transition hover:border-black sm:block"
          >
            View All
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-12 text-center">
            <p className="text-lg font-semibold text-black">No Assets Found</p>
            <p className="mt-2 text-sm text-neutral-500">
              Upload assets from dashboard to show them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((item: any) => {
              const free = item.isFree ?? true;

              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/portfolio/${item._id}`} className="block">
                    <div className="relative bg-neutral-100">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center text-sm text-neutral-400">
                          No Image
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-black shadow-sm">
                        {free ? "FREE" : "PAID"}
                      </span>
                    </div>
                  </Link>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="line-clamp-1 text-base font-bold text-black">
                          {item.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-500">
                          {item.description || "Premium 3D Asset"}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-black">
                        {free ? "₹0" : `₹${item.price || 0}`}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                        {item.category || "3D Model"}
                      </span>

                      <span className="text-xs font-medium text-neutral-400">
                        GLB / FBX / OBJ
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Link
                        href={`/portfolio/${item._id}`}
                        className="rounded-xl border border-neutral-300 bg-white py-3 text-center text-sm font-semibold text-black transition hover:border-black"
                      >
                        Preview
                      </Link>

                      {free ? (
                        <a
                          href={item.downloadZipUrl || "#"}
                          className="rounded-xl border border-neutral-300 bg-white py-3 text-center text-sm font-semibold text-black transition hover:border-black"
                        >
                          Download
                        </a>
                      ) : (
                        <button className="rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            href="/portfolio"
            className="block rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-black"
          >
            View All Assets
          </Link>
        </div>
      </section>
    </main>
  );
}
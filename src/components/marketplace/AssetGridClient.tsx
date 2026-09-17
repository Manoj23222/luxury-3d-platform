"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function AssetGridClient({ assets }: { assets: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const categories = useMemo(() => {
    const list = assets
      .map((x) => x.category)
      .filter((x): x is string => Boolean(x) && x !== "Free" && x !== "Paid");
    return ["All", ...Array.from(new Set(list))];
  }, [assets]);

  const filteredAssets = useMemo(() => {
    let data = [...assets];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (x) =>
          x.name?.toLowerCase().includes(q) ||
          x.description?.toLowerCase().includes(q) ||
          x.category?.toLowerCase().includes(q) ||
          x.tags?.join(" ").toLowerCase().includes(q)
      );
    }

    if (filter !== "All") {
      data = data.filter(
        (x) => String(x.category || "").toLowerCase() === filter.toLowerCase()
      );
    }

    if (sort === "Most Viewed") {
      data.sort((a, b) => Number(b.views || 0) - Number(a.views || 0));
    } else if (sort === "Name A-Z") {
      data.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    } else {
      // Newest default (by createdAt or array order)
      data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    return data;
  }, [assets, search, filter, sort]);

  return (
    <>
      {/* Luxury 3D Portfolio Hero Section with Background Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-[#fbf9f5] pt-28 pb-10 text-neutral-900">
        {/* Background Banner Image clearly visible */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/portfolio-3d-hero-banner.png"
            alt="Luxury 3D Archive Banner"
            className="h-full w-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/90 px-3.5 py-1 text-xs font-bold text-neutral-900 backdrop-blur-md shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ashok Meena • 3D Creative Studio</span>
              </span>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-neutral-700">
                Luxury 3D Archive
              </p>
              
              <h1 className="mt-1 text-3xl font-black tracking-tight text-black sm:text-5xl">
                3D Portfolio & Models
              </h1>
              
              <p className="mt-2 text-xs sm:text-sm font-semibold text-neutral-800">
                Explore interactive 3D visualizations, CGI renders, and custom assets.
              </p>

              {/* Skills/Tags Mini Strip */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold text-neutral-800">
                <span className="text-black font-extrabold">Architecture</span>
                <span>•</span>
                <span>Product</span>
                <span>•</span>
                <span>Game Assets</span>
                <span>•</span>
                <span>Interior</span>
                <span>•</span>
                <span>Characters</span>
                <span>•</span>
                <span>3D Fashion</span>
              </div>
            </div>

            {/* Search Input & Sort */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search 3D works..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-56 rounded-full border border-neutral-300 bg-white/95 backdrop-blur-md py-2 pl-9 pr-4 text-xs font-semibold text-black placeholder-neutral-500 shadow-sm transition focus:border-black focus:bg-white focus:outline-none"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-neutral-300 bg-white/95 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-neutral-800 shadow-sm transition hover:border-black focus:border-black focus:outline-none cursor-pointer"
              >
                <option value="Newest">Newest First</option>
                <option value="Most Viewed">Most Viewed</option>
                <option value="Name A-Z">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 scrollbar-none">
          {categories.map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              style={{
                backgroundColor: filter === x ? "#000000" : "#ffffff",
                color: filter === x ? "#ffffff" : "#404040",
              }}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition ${
                filter === x
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:text-black"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </section>

      {/* Asset Grid: 6 Columns on XL */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-semibold text-neutral-500">
            Showing <span className="text-black font-bold">{filteredAssets.length}</span> works
          </p>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-xs">
            <p className="text-base font-bold text-black">No 3D projects found</p>
            <p className="mt-1 text-xs text-neutral-500">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
            {filteredAssets.map((item: any) => {
              return (
                <article
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                      <Link href={`/portfolio/${item._id}`} className="block h-full w-full">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                            No Preview
                          </div>
                        )}
                      </Link>

                      {/* 3D Indicator */}
                      {item.modelUrl && (
                        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/75 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white backdrop-blur-md uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          3D Room
                        </span>
                      )}
                    </div>

                    <div className="p-3">
                      <Link href={`/portfolio/${item._id}`}>
                        <h2 className="line-clamp-1 text-xs font-bold text-neutral-900 group-hover:text-black">
                          {item.name || "Untitled Work"}
                        </h2>
                      </Link>

                      <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-500">
                        {item.category || "3D Visualization"}
                      </p>
                    </div>
                  </div>

                  <div className="px-3 pb-3 pt-1 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-neutral-400">
                      {item.views || 0} views
                    </span>

                    <Link
                      href={`/portfolio/${item._id}`}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold text-black transition hover:bg-black hover:text-white"
                    >
                      Inspect
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
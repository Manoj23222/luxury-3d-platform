"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const filters = [
  "All",
  "Furniture",
  "Packaging",
  "Electronics",
  "Bottle",
  "Cosmetics",
  "Automotive",
  "Interior",
];

export default function FeaturedAssets({ projects }: { projects: any[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;

    return projects.filter(
      (item) =>
        String(item.category || "").toLowerCase() === active.toLowerCase()
    );
  }, [projects, active]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => setActive(x)}
              style={{
                backgroundColor: active === x ? "#000000" : "#ffffff",
                color: active === x ? "#ffffff" : "#404040",
              }}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs transition ${
                active === x
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:text-black"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
              Featured 3D Showcase
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Showing {filtered.length} {active !== "All" ? active : ""} 3D works.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="hidden rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-black transition hover:border-black sm:block"
          >
            Explore All
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-10 text-center">
            <p className="text-base font-semibold text-black">No 3D Works Found</p>
            <p className="mt-1 text-xs text-neutral-500">
              No assets available in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
            {filtered.map((item: any) => {
              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg"
                >
                  <Link href={`/portfolio/${item._id}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
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

                      {/* Subtle 3D Tag */}
                      <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                        3D Showcase
                      </span>
                    </div>
                  </Link>

                  <div className="p-3">
                    <h3 className="line-clamp-1 text-xs font-bold text-neutral-900 group-hover:text-black">
                      {item.name || "Untitled Work"}
                    </h3>

                    <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-500">
                      {item.category || "3D Visualization"}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-neutral-100 pt-2">
                      <span className="text-[10px] font-medium text-neutral-400">
                        {item.views || 0} views
                      </span>

                      <Link
                        href={`/portfolio/${item._id}`}
                        className="text-[11px] font-semibold text-black hover:underline"
                      >
                        Inspect →
                      </Link>
                    </div>
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
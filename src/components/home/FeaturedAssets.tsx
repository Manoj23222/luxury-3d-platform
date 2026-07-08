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
  "Free",
  "Paid",
];

export default function FeaturedAssets({ projects }: { projects: any[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;

    if (active === "Free") {
      return projects.filter((item) => item.isFree ?? true);
    }

    if (active === "Paid") {
      return projects.filter((item) => !(item.isFree ?? true));
    }

    return projects.filter(
      (item) =>
        String(item.category || "").toLowerCase() === active.toLowerCase()
    );
  }, [projects, active]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => setActive(x)}
              className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition ${
                active === x
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-black"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Featured 3D Assets
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Showing {active} assets.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="hidden rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-black transition hover:border-black sm:block"
          >
            View All
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-12 text-center">
            <p className="text-lg font-semibold text-black">No Assets Found</p>
            <p className="mt-2 text-sm text-neutral-500">
              No assets available in this filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item: any) => {
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
                    <h3 className="line-clamp-1 text-base font-bold text-black">
                      {item.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-neutral-500">
                      {item.description || "Premium 3D Asset"}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                        {item.category || "3D Model"}
                      </span>

                      <span className="text-sm font-bold text-black">
                        {free ? "₹0" : `₹${item.price || 0}`}
                      </span>
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
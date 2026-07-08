"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import WishlistButton from "./WishlistButton";

export default function AssetGridClient({ assets }: { assets: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const trackDownload = async (item: any) => {
    if (!item.downloadZipUrl) {
      alert("Download ZIP not available");
      return;
    }
<WishlistButton id={item._id} />
    await fetch("/api/products/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item._id }),
    });

    window.open(item.downloadZipUrl, "_blank");
  };

  const categories = useMemo(() => {
    const list = assets.map((x) => x.category).filter(Boolean);
    return ["All", "Free", "Paid", ...Array.from(new Set(list))];
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

    if (filter === "Free") data = data.filter((x) => x.isFree !== false);
    else if (filter === "Paid") data = data.filter((x) => x.isFree === false);
    else if (filter !== "All") data = data.filter((x) => x.category === filter);

    if (sort === "Price Low") {
      data.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }

    if (sort === "Price High") {
      data.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }

    if (sort === "Most Downloaded") {
      data.sort((a, b) => Number(b.downloads || 0) - Number(a.downloads || 0));
    }

    return data;
  }, [assets, search, filter, sort]);

  return (
    <>
      <section className="border-b border-neutral-200 bg-white pt-24">
       
          
      </section>

      <section className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-5 py-6 sm:px-6 lg:px-10">
        {categories.map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition ${
              filter === x
                ? "border-black bg-black text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-black"
            }`}
          >
            {x}
          </button>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-10">
        <p className="mb-5 text-sm font-semibold text-neutral-500">
          Showing {filteredAssets.length} assets
        </p>

        {filteredAssets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-bold text-black">No assets found</p>
            <p className="mt-2 text-sm text-neutral-500">
              Try another search or filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAssets.map((item: any) => {
              const free = item.isFree ?? true;

              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/portfolio/${item._id}`}>
                    <div className="relative bg-neutral-100">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center text-neutral-400">
                          No Image
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-black shadow-sm">
                        {free ? "FREE" : "PAID"}
                      </span>
                    </div>
                  </Link>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="line-clamp-1 text-base font-bold text-black">
                        {item.name || "Untitled Asset"}
                      </h2>

                      <span className="shrink-0 text-sm font-bold text-black">
                        {free ? "₹0" : `₹${item.price || 0}`}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                      {item.description || "Premium 3D Asset"}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                        {item.category || "3D Model"}
                      </span>

                      <span className="text-xs font-medium text-neutral-400">
                        ↓ {item.downloads || 0}
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
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BeforeAfterSlider from "@/components/photo-editing/BeforeAfterSlider";

type PhotoWork = {
  _id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  thumbnail?: string;
  resolution?: string;
  status: "Draft" | "Published";
  featured: boolean;
  views?: number;
  createdAt?: string;
};

export default function AdminPhotosPage() {
  const [works, setWorks] = useState<PhotoWork[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewWork, setPreviewWork] = useState<PhotoWork | null>(null);

  const loadWorks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/photo-works", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setWorks(data.works || []);
      }
    } catch {
      alert("Failed to load photo works");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorks();
  }, []);

  const updateWork = async (id: string, payload: Partial<PhotoWork>) => {
    try {
      const res = await fetch(`/api/photo-works/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWorks((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...payload } : item))
        );
      } else {
        alert(data.message || "Update failed");
      }
    } catch {
      alert("Update request failed");
    }
  };

  const deleteWork = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo retouching work?"))
      return;

    try {
      const res = await fetch(`/api/photo-works/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWorks((prev) => prev.filter((item) => item._id !== id));
        if (previewWork?._id === id) setPreviewWork(null);
      } else {
        alert(data.message || "Delete failed");
      }
    } catch {
      alert("Delete request failed");
    }
  };

  const filtered = useMemo(() => {
    return works.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.status?.toLowerCase().includes(q)
      );
    });
  }, [works, search]);

  return (
    <div className="pb-16 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
            Retouching Archive
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
            Manage Photo Retouching Works
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            View, feature, and edit Before/After retouching works across your portfolio.
          </p>
        </div>

        <Link
          href="/admin/upload-photo"
          className="flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
        >
          <span>+</span> Upload New Retouching Work
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-4 shadow-xs">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category, or status..."
          className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-3.5">Before / After Preview</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5">Views</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 font-medium">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-neutral-500">
                    Loading retouching projects...
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-neutral-50/80 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-20 overflow-hidden rounded-xl bg-neutral-100 shrink-0 border border-neutral-200">
                          <img
                            src={item.afterImage || item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-bold text-black line-clamp-1">{item.title}</p>
                          <button
                            onClick={() => setPreviewWork(item)}
                            className="mt-1 text-[11px] font-semibold text-neutral-500 hover:text-black underline"
                          >
                            Inspect Slider ↗
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold text-neutral-700">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.status || "Published"}
                        onChange={(e) =>
                          updateWork(item._id, {
                            status: e.target.value as "Draft" | "Published",
                          })
                        }
                        className="rounded-xl border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-semibold outline-none"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.featured ? "yes" : "no"}
                        onChange={(e) =>
                          updateWork(item._id, {
                            featured: e.target.value === "yes",
                          })
                        }
                        className="rounded-xl border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-semibold outline-none"
                      >
                        <option value="yes">Featured</option>
                        <option value="no">Standard</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {item.views || 0}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => deleteWork(item._id)}
                        className="rounded-xl border border-red-200 bg-red-50/50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-neutral-400">
                    No photo retouching works found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison Modal Preview */}
      {previewWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setPreviewWork(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-black transition hover:bg-black hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-black">{previewWork.title}</h3>
            <p className="mt-0.5 text-xs text-neutral-500">{previewWork.category}</p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 aspect-video">
              <BeforeAfterSlider
                beforeImage={previewWork.beforeImage}
                afterImage={previewWork.afterImage}
                className="h-full w-full"
                aspectRatio="aspect-video"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

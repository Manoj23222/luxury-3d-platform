"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  category?: string;
  status?: "Draft" | "Published";
  visibility?: "Public" | "Private";
  thumbnail?: string;
  modelUrl?: string;
  modelFileName?: string;
  views?: number;
  createdAt?: string;
  featured?: boolean;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Products fetch failed");
        return;
      }

      setProducts(data.products || []);
    } catch {
      alert("Products fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const updateProduct = async (id: string, payload: Partial<Product>) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      loadProducts();
    } else {
      alert(data.error || "Update failed");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this 3D asset from the portfolio?"))
      return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok && data.success) {
      loadProducts();
    } else {
      alert(data.error || "Delete failed");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `${item.name || ""} ${item.category || ""} ${
        item.status || ""
      }`.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [products, search]);

  return (
    <div className="pb-16 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
            3D Archive Management
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
            Manage 3D Portfolio Works
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            Manage 3D models, interactive preview assets, and portfolio visibility.
          </p>
        </div>

        <Link
          href="/admin/upload-3d"
          className="flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
        >
          <span>+</span> Upload New 3D Work
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-6 rounded-3xl border border-neutral-200 bg-white p-4 shadow-xs">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by 3D asset title, category or status..."
          className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
        />
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-3.5">3D Work</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">3D Model</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5">Views</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 font-medium">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-500">
                    Loading 3D assets...
                  </td>
                </tr>
              )}

              {!loading &&
                filteredProducts.map((item) => (
                  <tr key={item._id} className="hover:bg-neutral-50/80 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 overflow-hidden rounded-xl bg-neutral-100 shrink-0 border border-neutral-200">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-400">
                              3D
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-black line-clamp-1">{item.name}</p>
                          <Link
                            href={`/portfolio/${item._id}`}
                            target="_blank"
                            className="text-[11px] font-semibold text-neutral-500 hover:text-black underline"
                          >
                            Live View ↗
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold text-neutral-700">
                        {item.category || "3D Visualization"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {item.modelUrl ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          GLB Active
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-400">Images only</span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.status || "Draft"}
                        onChange={(e) =>
                          updateProduct(item._id, {
                            status: e.target.value as Product["status"],
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
                          updateProduct(item._id, {
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
                        onClick={() => deleteProduct(item._id)}
                        className="rounded-xl border border-red-200 bg-red-50/50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-400">
                    No 3D portfolio assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
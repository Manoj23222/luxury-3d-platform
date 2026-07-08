"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  category?: string;
  price?: number;
  isFree?: boolean;
  status?: "Draft" | "Published";
  visibility?: "Public" | "Private";
  thumbnail?: string;
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
  if (!confirm("Delete this product?")) return;

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
    <div className="pb-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Admin Control
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Products Management
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Manage all marketplace assets and product visibility.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product, category or status..."
          className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
  <th className="px-5 py-4">Product</th>
  <th className="px-5 py-4">Category</th>
  <th className="px-5 py-4">Price</th>
  <th className="px-5 py-4">Status</th>
  <th className="px-5 py-4">Visibility</th>
  <th className="px-5 py-4">Featured</th>
  <th className="px-5 py-4">Created</th>
  <th className="px-5 py-4 text-right">Action</th>
</tr>
            </thead>

            <tbody className="divide-y divide-neutral-200">
              {loading && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    Loading products...
                  </td>
                </tr>
              )}

              {!loading &&
                filteredProducts.map((item) => (
                  <tr key={item._id} className="hover:bg-neutral-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-xl bg-neutral-100">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div>
                          <p className="font-semibold text-black">
                            {item.name}
                          </p>
                          <Link
                            href={`/product/${item._id}`}
                            className="text-xs font-semibold text-neutral-500 hover:text-black"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {item.category || "-"}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {item.isFree ? "Free" : `₹${item.price || 0}`}
                    </td>

                    <td className="px-5 py-4">
  <select
    value={item.status || "Draft"}
    onChange={(e) =>
      updateProduct(item._id, {
        status: e.target.value as Product["status"],
      })
    }
    className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
  >
    <option value="Draft">Draft</option>
    <option value="Published">Published</option>
  </select>
</td>

                   <td className="px-5 py-4">
  <select
    value={item.visibility || "Public"}
    onChange={(e) =>
      updateProduct(item._id, {
        visibility: e.target.value as Product["visibility"],
      })
    }
    className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
  >
    <option value="Public">Public</option>
    <option value="Private">Private</option>
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
    className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold outline-none"
  >
    <option value="no">No</option>
    <option value="yes">Yes</option>
  </select>
</td>
<td className="px-5 py-4 text-right">
  <button
    onClick={() => deleteProduct(item._id)}
    className="rounded-xl border border-red-300 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
  >
    Delete
  </button>
</td>

                    <td className="px-5 py-4 text-neutral-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-neutral-500"
                  >
                    No products found.
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
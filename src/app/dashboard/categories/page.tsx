"use client";

import { useEffect, useMemo, useState } from "react";

export default function DashboardCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const [form, setForm] = useState({
    name: "",
    parentId: "",
    sortOrder: "0",
    active: true,
  });

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (parentId = form.parentId, name = form.name) => {
    if (!name.trim()) return alert("Category name required");

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        parentId,
        sortOrder: form.sortOrder,
        active: form.active,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setForm({ name: "", parentId: "", sortOrder: "0", active: true });
      loadCategories();
    } else {
      alert(data.message || "Category add failed");
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      if (selected?._id === id) setSelected(null);
      loadCategories();
    } else {
      alert(data.message || "Delete failed");
    }
  };

  const childrenOf = (parentId: string) =>
    categories.filter((cat) => cat.parentId === parentId);

  const rootCategories = useMemo(
    () => categories.filter((cat) => !cat.parentId),
    [categories]
  );

  function getAllChildren(parentId: string): any[] {
    const children = childrenOf(parentId);
    return children.flatMap((child) => [child, ...getAllChildren(child._id)]);
  }

  const selectedTree = selected
    ? [selected, ...getAllChildren(selected._id)]
    : [];

  return (
    <div className="px-5 py-28 text-black sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Portfolio Categories
        </h1>

        <div className="mt-8 grid gap-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm md:grid-cols-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black md:col-span-2"
            placeholder="Category name"
          />

          <select
            value={form.parentId}
            onChange={(e) => setForm({ ...form, parentId: e.target.value })}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          >
            <option value="">Main Category</option>
            {categories
              .filter((cat) => cat.level < 3)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {"— ".repeat(cat.level)}
                  {cat.name}
                </option>
              ))}
          </select>

          <button
            onClick={() => addCategory()}
            className="rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-neutral-800"
          >
            Add Category
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          {rootCategories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelected(cat)}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition hover:border-black"
            >
              <h2 className="text-xl font-bold text-black">{cat.name}</h2>
              <p className="mt-1 text-sm text-neutral-500">{cat.slug}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-3xl bg-white p-6 text-black">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">{selected.name}</h2>

              <button
                onClick={() => setSelected(null)}
                className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="mt-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
              {selectedTree.map((cat) => (
                <div
                  key={cat._id}
                  className="mb-4 flex items-center gap-3"
                  style={{ marginLeft: `${cat.level * 50}px` }}
                >
                  <div className="rounded-xl border border-neutral-300 bg-white px-5 py-2 text-lg font-semibold">
                    {cat.name}
                  </div>

                  {cat.level < 3 && (
                    <button
                      onClick={() => {
                        const name = prompt(`Add sub category under ${cat.name}`);
                        if (name) addCategory(cat._id, name);
                      }}
                      className="text-3xl font-bold"
                    >
                      +
                    </button>
                  )}

                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="text-xl"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
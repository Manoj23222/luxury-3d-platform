"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  parentId?: string;
  level: number;
  path?: string[];
  active?: boolean;
};

type ModalMode = "add-main" | "add-sub" | "manage";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<Category | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("add-main");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categories;

    return categories.filter((c) =>
      `${c.name} ${c.slug} ${c.path?.join(" ") || ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [categories, search]);

  const mainCategories = useMemo(
    () => filteredCategories.filter((c) => !c.parentId),
    [filteredCategories]
  );

  async function loadCategories() {
    setLoading(true);
    const res = await fetch("/api/admin/categories", { cache: "no-store" });
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function childrenOf(parentId: string) {
    return filteredCategories.filter((c) => c.parentId === parentId);
  }

  function openAddMain() {
    setSelected(null);
    setName("");
    setModalMode("add-main");
    setModalOpen(true);
  }

  function openAddSub(category: Category) {
    setSelected(category);
    setName("");
    setModalMode("add-sub");
    setModalOpen(true);
  }

  function openManage(category: Category) {
    setSelected(category);
    setName(category.name);
    setModalMode("manage");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelected(null);
    setName("");
    setModalMode("add-main");
  }

  async function addCategory() {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        parentId: modalMode === "add-sub" ? selected?._id : "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Create failed");
      return;
    }

    closeModal();
    loadCategories();
  }

  async function updateCategory(payload: Partial<Category>) {
    if (!selected) return;

    const res = await fetch(`/api/admin/categories/${selected._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Update failed");
      return;
    }

    loadCategories();
  }

  async function saveEdit() {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    await updateCategory({ name });
    closeModal();
  }

  async function toggleActive(category: Category) {
    const res = await fetch(`/api/admin/categories/${category._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !category.active }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Update failed");
      return;
    }

    loadCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category and its sub categories?")) return;

    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Delete failed");
      return;
    }

    closeModal();
    loadCategories();
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function renderCategory(category: Category) {
    const children = childrenOf(category._id);
    const isOpen = !!expanded[category._id];
    const hasChildren = children.length > 0;

    return (
      <div key={category._id}>
        <div
          className="grid min-h-10 grid-cols-[28px_1fr_auto] items-center gap-2 border-b border-neutral-100 px-3 py-2 text-[13px] hover:bg-neutral-50"
          style={{ paddingLeft: `${12 + category.level * 22}px` }}
        >
          <button
            onClick={() => hasChildren && toggleExpand(category._id)}
            className="h-6 w-6 rounded-md text-neutral-500 hover:bg-neutral-200"
          >
            {hasChildren ? (isOpen ? "▼" : "▶") : "•"}
          </button>

          <button onClick={() => openManage(category)} className="text-left">
            <span className="font-semibold text-black">{category.name}</span>
            <span className="ml-2 text-xs text-neutral-400">
              L{category.level} • {category.slug}
            </span>
          </button>

          <div className="flex items-center gap-2">
            {category.level === 0 && (
              <button
                onClick={() => toggleActive(category)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                  category.active
                  
                }`}
              >
               
              </button>
            )}

            <button
              onClick={() => openAddSub(category)}
              className="rounded-lg bg-black px-3 py-1.5 text-[11px] font-bold text-white"
            >
              +
            </button>

            <button
              onClick={() => openManage(category)}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-[11px] font-bold"
            >
              Edit
            </button>

            <button
              onClick={() => deleteCategory(category._id)}
              className="rounded-lg border border-red-300 px-3 py-1.5 text-[11px] font-bold text-red-600 hover:bg-red-50"
            >
              Del
            </button>
          </div>
        </div>

        {isOpen && children.map((child) => renderCategory(child))}
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Admin Control
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Categories
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Compact category tree with expand/collapse and main category ON/OFF.
            </p>
          </div>

          <button
            onClick={openAddMain}
            className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
          >
            Add Main Category
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search category..."
          className="mt-5 w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 bg-neutral-100 px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
          Category Tree
        </div>

        {loading && (
          <div className="p-10 text-center text-sm text-neutral-500">
            Loading...
          </div>
        )}

        {!loading && mainCategories.map((cat) => renderCategory(cat))}

        {!loading && mainCategories.length === 0 && (
          <div className="p-10 text-center text-sm text-neutral-500">
            No categories found.
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">
              {modalMode === "add-main" && "Add Main Category"}
              {modalMode === "add-sub" && "Add Sub Category"}
              {modalMode === "manage" && "Manage Category"}
            </h2>

            {selected && (
              <p className="mt-2 text-xs text-neutral-500">
                Selected: <b>{selected.name}</b>
              </p>
            )}

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="mt-5 w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black"
            />

            
            {modalMode === "manage" && selected && (
  <button
    onClick={() => {
      setName("");
      setModalMode("add-sub");
    }}
    className="mt-4 w-full rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
  >
    Add Sub Category
  </button>
)}

            <div className="mt-6 flex gap-3">
              {modalMode === "manage" ? (
                <button
                  onClick={saveEdit}
                  className="flex-1 rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={addCategory}
                  className="flex-1 rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
                >
                  Create
                </button>
              )}

              <button
                onClick={closeModal}
                className="flex-1 rounded-full border border-neutral-300 px-5 py-3 text-sm font-bold"
              >
                Cancel
              </button>
            </div>

            {modalMode === "manage" && selected && (
              <button
                onClick={() => deleteCategory(selected._id)}
                className="mt-3 w-full rounded-full border border-red-300 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
              >
                Delete Category
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
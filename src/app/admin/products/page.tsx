"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";

type ItemType = "3d" | "photo";

type SoftwareGroup = "3d" | "photoshop" | "illustrator" | "canva";

type UnifiedAsset = {
  _id: string;
  itemType: ItemType;
  title: string;
  category: string;
  softwareGroup: SoftwareGroup;
  thumbnail?: string;
  modelUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  workType?: string;
  status: "Draft" | "Published";
  featured?: boolean;
  views: number;
  createdAt?: string;
  serialNumber: number;
};

const SOFTWARE_OPTIONS: { id: SoftwareGroup; label: string; defaultSoftware: string }[] = [
  { id: "3d", label: "3D (Blender)", defaultSoftware: "Blender" },
  { id: "photoshop", label: "Adobe Photoshop", defaultSoftware: "Adobe Photoshop" },
  { id: "illustrator", label: "Adobe Illustrator", defaultSoftware: "Adobe Illustrator" },
  { id: "canva", label: "Canva", defaultSoftware: "Canva" },
];

const PRESET_CATEGORIES: Record<SoftwareGroup, string[]> = {
  "3d": [
    "Packaging & Bottles",
    "Cosmetics & Containers",
    "Furniture & Interior",
    "Automotive & Vehicles",
    "Electronics & Gadgets",
    "Watches & Luxury Goods",
    "Characters & CGI Props",
    "Architectural Visualization",
  ],
  photoshop: [
    "Product Retouching",
    "Fashion & Portrait Retouching",
    "Jewelry & Luxury Retouching",
    "Color Grading & Tone Curve",
    "Photo Manipulation & Creative Art",
    "Real Estate & HDR Blending",
    "Background Replacement",
    "White Background & E-commerce Resize",
  ],
  illustrator: [
    "Vector Illustration & Artwork",
    "Brand Identity & Logo Design",
    "Typography & Custom Lettering",
    "Vector Tracing & Redraw",
    "Packaging & Label Vector Art",
    "Icon & UI Vector Sets",
    "Social Media Vector Banners",
  ],
  canva: [
    "Social Media Posts & Stories",
    "Marketing Banners & Ad Creatives",
    "YouTube Thumbnails & Channel Art",
    "Business Presentations & Pitch Decks",
    "Posters & Flyers Design",
    "Brand Kit & Promotional Templates",
  ],
};

function sortAssets(list: UnifiedAsset[]): UnifiedAsset[] {
  return [...list].sort((a, b) => {
    if (a.softwareGroup !== b.softwareGroup) {
      return a.softwareGroup.localeCompare(b.softwareGroup);
    }
    if (a.serialNumber > 0 && b.serialNumber > 0) return a.serialNumber - b.serialNumber;
    if (a.serialNumber > 0) return -1;
    if (b.serialNumber > 0) return 1;
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<UnifiedAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Persist category selection on page refresh via URL query and localStorage
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<SoftwareGroup>("3d");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

  // Read saved tab on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const urlCat = p.get("category") || p.get("tab");
    const savedCat = localStorage.getItem("admin_inventory_tab");
    const targetCat =
      urlCat === "3d" || urlCat === "photoshop" || urlCat === "illustrator" || urlCat === "canva"
        ? (urlCat as SoftwareGroup)
        : savedCat === "3d" || savedCat === "photoshop" || savedCat === "illustrator" || savedCat === "canva"
        ? (savedCat as SoftwareGroup)
        : null;

    if (targetCat) {
      setActiveCategoryFilter(targetCat);
    }

    const urlSub = p.get("sub");
    const savedSub = localStorage.getItem("admin_inventory_sub");
    const targetSub = urlSub || savedSub;
    if (targetSub) {
      setSelectedSubCategory(targetSub);
    }
  }, []);

  const handleCategoryTabChange = (group: SoftwareGroup) => {
    setActiveCategoryFilter(group);
    setSelectedSubCategory("all");
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_inventory_tab", group);
      localStorage.setItem("admin_inventory_sub", "all");
      const url = new URL(window.location.href);
      url.searchParams.set("category", group);
      url.searchParams.set("sub", "all");
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  };

  const handleSubCategoryChange = (sub: string) => {
    setSelectedSubCategory(sub);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_inventory_sub", sub);
      const url = new URL(window.location.href);
      url.searchParams.set("sub", sub);
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  };

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<UnifiedAsset | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSoftwareGroup, setEditSoftwareGroup] = useState<SoftwareGroup>("3d");
  const [editStatus, setEditStatus] = useState<"Draft" | "Published">("Published");
  const [editSn, setEditSn] = useState<number>(1);
  const [savingEdit, setSavingEdit] = useState(false);

  const loadAllData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      // Client-side deleted filter safeguard
      let clientDeleted = new Set<string>();
      if (typeof window !== "undefined") {
        try {
          const stored = JSON.parse(localStorage.getItem("admin_deleted_assets") || "[]");
          if (Array.isArray(stored)) {
            clientDeleted = new Set(
              stored.map((s: string) => String(s).toLowerCase().trim())
            );
          }
        } catch {}
      }

      const timestamp = Date.now();
      const [res3d, resPhoto] = await Promise.all([
        fetch(`/api/admin/products?t=${timestamp}`, { cache: "no-store" }),
        fetch(`/api/photo-works?t=${timestamp}`, { cache: "no-store" }),
      ]);

      const data3d = await res3d.json().catch(() => ({}));
      const dataPhoto = await resPhoto.json().catch(() => ({}));

      const unified: UnifiedAsset[] = [];
      const seenIds = new Set<string>();

      // Track sequential counters starting at 1 for each software category
      const groupCounters: Record<SoftwareGroup, number> = {
        "3d": 0,
        photoshop: 0,
        illustrator: 0,
        canva: 0,
      };

      // 1. Map 3D Products
      if (Array.isArray(data3d.products)) {
        data3d.products.forEach((p: any) => {
          const swList = (p.softwareUsed || []).map((s: string) => s.toLowerCase());
          const cat = (p.category || "").toLowerCase();

          let group: SoftwareGroup = "3d";
          if (swList.some((s: string) => s.includes("illustrator")) || cat.includes("illustrator") || cat.includes("vector")) {
            group = "illustrator";
          } else if (swList.some((s: string) => s.includes("canva")) || cat.includes("canva")) {
            group = "canva";
          } else if (swList.some((s: string) => s.includes("photoshop")) || cat.includes("photoshop") || cat.includes("retouch")) {
            group = "photoshop";
          }

          const rawId = String(p._id);
          const cleanId = rawId.replace(/^prod-/, "");
          const normTitle = String(p.name || "").trim().toLowerCase();
          const normSlug = String(p.slug || "").trim().toLowerCase();

          if (
            clientDeleted.has(rawId.toLowerCase()) ||
            clientDeleted.has(cleanId.toLowerCase()) ||
            clientDeleted.has(`prod-${cleanId}`.toLowerCase()) ||
            (normTitle && clientDeleted.has(normTitle)) ||
            (normSlug && clientDeleted.has(normSlug))
          ) {
            return;
          }

          seenIds.add(rawId);
          seenIds.add(`prod-${rawId}`);

          groupCounters[group] += 1;
          const sn = Number(p.serialNumber || p.displayOrder || 0);

          unified.push({
            _id: rawId,
            itemType: "3d",
            title: p.name || "Untitled 3D Model",
            category: p.category || "3D Models",
            softwareGroup: group,
            thumbnail: p.thumbnail,
            modelUrl: p.modelUrl,
            status: p.status === "Published" ? "Published" : "Draft",
            featured: Boolean(p.featured),
            views: p.views || 0,
            createdAt: p.createdAt,
            serialNumber: sn > 0 ? sn : groupCounters[group],
          });
        });
      }

      // 2. Map Photo / 2D Creative Works
      if (Array.isArray(dataPhoto.works)) {
        dataPhoto.works.forEach((w: any) => {
          // Skip 3D products that were merged into /api/photo-works to prevent duplicate entries
          if (w.isPortfolio3D || String(w._id).startsWith("prod-") || seenIds.has(String(w._id))) {
            return;
          }

          const swList = (w.softwareUsed || []).map((s: string) => s.toLowerCase());
          const cat = (w.category || "").toLowerCase();

          let group: SoftwareGroup = "photoshop";
          if (swList.some((s: string) => s.includes("illustrator")) || cat.includes("illustrator") || cat.includes("vector")) {
            group = "illustrator";
          } else if (swList.some((s: string) => s.includes("canva")) || cat.includes("canva")) {
            group = "canva";
          } else if (swList.some((s: string) => s.includes("blender")) || cat.includes("3d")) {
            group = "3d";
          }

          const rawId = String(w._id);
          const cleanId = rawId.replace(/^prod-/, "");
          const normTitle = String(w.title || "").trim().toLowerCase();
          const normSlug = String(w.slug || "").trim().toLowerCase();

          if (
            clientDeleted.has(rawId.toLowerCase()) ||
            clientDeleted.has(cleanId.toLowerCase()) ||
            clientDeleted.has(`prod-${cleanId}`.toLowerCase()) ||
            (normTitle && clientDeleted.has(normTitle)) ||
            (normSlug && clientDeleted.has(normSlug))
          ) {
            return;
          }

          seenIds.add(String(w._id));

          groupCounters[group] += 1;
          const sn = Number(w.serialNumber || w.displayOrder || 0);

          unified.push({
            _id: String(w._id),
            itemType: "photo",
            title: w.title || "Untitled Creative Work",
            category: w.category || "Photo Retouching",
            softwareGroup: group,
            thumbnail: w.thumbnail || w.afterImage,
            beforeImage: w.beforeImage,
            afterImage: w.afterImage,
            workType: w.workType,
            status: w.status === "Published" ? "Published" : "Draft",
            featured: Boolean(w.featured),
            views: w.views || 0,
            createdAt: w.createdAt,
            serialNumber: sn > 0 ? sn : groupCounters[group],
          });
        });
      }

      setItems(sortAssets(unified));
    } catch (err) {
      console.error("Failed to load inventory:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Extract all unique categories for current filter view
  const availableCategories = useMemo(() => {
    const list = items
      .filter((i) => i.softwareGroup === activeCategoryFilter)
      .map((i) => i.category?.trim())
      .filter(Boolean);
    return Array.from(new Set(list)).sort();
  }, [items, activeCategoryFilter]);

  // Reset subcategory ONLY after loading completes and if not available in current software
  useEffect(() => {
    if (!loading && availableCategories.length > 0 && selectedSubCategory !== "all" && !availableCategories.includes(selectedSubCategory)) {
      setSelectedSubCategory("all");
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_inventory_sub", "all");
        const url = new URL(window.location.href);
        url.searchParams.set("sub", "all");
        window.history.replaceState(null, "", url.pathname + url.search);
      }
    }
  }, [loading, activeCategoryFilter, availableCategories, selectedSubCategory]);

  // Update Status directly from row
  const toggleLiveStatus = async (item: UnifiedAsset) => {
    const newStatus = item.status === "Published" ? "Draft" : "Published";

    // Optimistic UI update
    setItems((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, status: newStatus } : i))
    );

    try {
      if (item.itemType === "3d") {
        await fetch(`/api/admin/products/${item._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      } else {
        await fetch(`/api/photo-works/${item._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      }
    } catch {
      alert("Failed to update status");
      loadAllData(false);
    }
  };

  // Permanently Delete Item
  const handleDelete = async (item: UnifiedAsset) => {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;

    // Immediately remove from UI
    setItems((prev) => prev.filter((i) => i._id !== item._id));

    // Save to client-side storage so it never flashes or returns on refresh
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("admin_deleted_assets") || "[]");
        const list = Array.isArray(stored) ? stored : [];
        list.push(item._id);
        const cleanId = item._id.replace(/^prod-/, "");
        list.push(cleanId);
        list.push(`prod-${cleanId}`);
        if (item.title) list.push(item.title.trim().toLowerCase());
        localStorage.setItem("admin_deleted_assets", JSON.stringify(Array.from(new Set(list))));
      } catch {}
    }

    try {
      const endpoint =
        item.itemType === "3d"
          ? `/api/admin/products/${item._id}`
          : `/api/photo-works/${item._id}`;

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          slug: (item as any).slug || "",
        }),
      });

      if (!res.ok) {
        throw new Error("Server failed to delete item");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete item from server");
      loadAllData(false);
    }
  };

  // Helper to reorder and auto-shift serial numbers in a category
  const reorderCategory = (
    currentItems: UnifiedAsset[],
    targetItem: UnifiedAsset,
    targetSn: number,
    targetGroup: SoftwareGroup = targetItem.softwareGroup
  ) => {
    // 1. Items in other software groups are unaffected
    const otherItems = currentItems.filter(
      (i) => i._id !== targetItem._id && i.softwareGroup !== targetGroup
    );

    // 2. Get current items in the target category (excluding the targetItem being repositioned)
    const groupItems = currentItems
      .filter((i) => i._id !== targetItem._id && i.softwareGroup === targetGroup)
      .sort((a, b) => {
        if (a.serialNumber > 0 && b.serialNumber > 0) return a.serialNumber - b.serialNumber;
        if (a.serialNumber > 0) return -1;
        if (b.serialNumber > 0) return 1;
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      });

    // 3. Clamp targetIndex (0-based)
    // E.g. targetSn = 2 -> targetIndex = 1 (inserted right at position 2, shifting previous position 2 to 3)
    const targetIndex = Math.max(0, Math.min(targetSn - 1, groupItems.length));

    // 4. Create the updated target item
    const updatedTargetItem: UnifiedAsset = {
      ...targetItem,
      softwareGroup: targetGroup,
    };

    // 5. Insert into groupItems at targetIndex
    groupItems.splice(targetIndex, 0, updatedTargetItem);

    // 6. Assign clean 1..N serial numbers
    const batchUpdates: Array<{ id: string; itemType: ItemType; serialNumber: number }> = [];

    const renumberedGroupItems = groupItems.map((item, idx) => {
      const assignedSn = idx + 1;
      batchUpdates.push({
        id: item._id,
        itemType: item.itemType,
        serialNumber: assignedSn,
      });
      return {
        ...item,
        serialNumber: assignedSn,
      };
    });

    // 7. Combine back with otherItems and sort
    const finalItems = sortAssets([...otherItems, ...renumberedGroupItems]);

    return { finalItems, batchUpdates };
  };

  // Quick inline update S.N. from table input with auto-shift
  const handleInlineSnChange = async (item: UnifiedAsset, newSnValue: string) => {
    const val = parseInt(newSnValue, 10);
    if (isNaN(val) || val <= 0) return;
    if (val === item.serialNumber) return;

    // Auto-shift: move item to position `val` and shift others +1 / -1 accordingly
    const { finalItems, batchUpdates } = reorderCategory(items, item, val);

    // 1. Optimistic UI update - all rows update their S.N. immediately
    setItems(finalItems);

    try {
      // 2. Persist all updated serial numbers to server batch reorder endpoint
      await fetch("/api/admin/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: batchUpdates }),
      });
    } catch (err) {
      console.error("Failed to reorder:", err);
      alert("Failed to update serial numbers on server");
      loadAllData(false);
    }
  };

  // Open Edit Modal
  const openEdit = (item: UnifiedAsset, index?: number) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditSoftwareGroup(item.softwareGroup);
    setEditStatus(item.status);
    setEditSn(item.serialNumber || (index !== undefined ? index + 1 : 1));
  };

  // Save Edit Modal Changes with auto-shift
  const saveEdit = async () => {
    if (!editingItem) return;
    setSavingEdit(true);

    const targetSoftware = SOFTWARE_OPTIONS.find((s) => s.id === editSoftwareGroup);
    const softwareName = targetSoftware ? targetSoftware.defaultSoftware : "Blender";
    const cleanTitle = editTitle.trim();
    const cleanCategory = editCategory.trim();
    const cleanSn = Number(editSn) || 1;

    // Apply auto-shift reorder across the category
    const itemWithUpdates: UnifiedAsset = {
      ...editingItem,
      title: cleanTitle,
      category: cleanCategory,
      softwareGroup: editSoftwareGroup,
      status: editStatus,
    };

    const { finalItems, batchUpdates } = reorderCategory(
      items,
      itemWithUpdates,
      cleanSn,
      editSoftwareGroup
    );

    // 1. Instant optimistic UI update
    setItems(finalItems);

    // Switch tab if group changed
    handleCategoryTabChange(editSoftwareGroup);

    try {
      if (editingItem.itemType === "3d") {
        await fetch(`/api/admin/products/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cleanTitle,
            category: cleanCategory,
            softwareUsed: [softwareName],
            tags: [editSoftwareGroup, softwareName.toLowerCase(), cleanCategory.toLowerCase(), `fallbackId:${editingItem._id}`],
            status: editStatus,
            serialNumber: cleanSn,
            thumbnail: editingItem.thumbnail,
            modelUrl: editingItem.modelUrl,
          }),
        });
      } else {
        await fetch(`/api/photo-works/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: cleanTitle,
            category: cleanCategory,
            softwareUsed: [softwareName],
            tags: [editSoftwareGroup, softwareName.toLowerCase(), cleanCategory.toLowerCase(), `fallbackId:${editingItem._id}`],
            status: editStatus,
            serialNumber: cleanSn,
            thumbnail: editingItem.thumbnail,
            afterImage: editingItem.afterImage,
            beforeImage: editingItem.beforeImage,
            workType: editingItem.workType,
          }),
        });
      }

      // Persist all auto-shifted serial numbers
      if (batchUpdates.length > 0) {
        await fetch("/api/admin/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: batchUpdates }),
        });
      }

      setEditingItem(null);
    } catch {
      alert("Failed to save changes");
      loadAllData(false);
    } finally {
      setSavingEdit(false);
    }
  };

  // Filtered Items (always scoped to activeCategoryFilter)
  const filtered = useMemo(() => {
    return items.filter((item) => {
      // Must match active software category
      if (item.softwareGroup !== activeCategoryFilter) return false;

      // Specific Category filter (from category dropdown)
      if (selectedSubCategory !== "all") {
        if (item.category?.toLowerCase() !== selectedSubCategory.toLowerCase()) return false;
      }

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.title?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          String(item.serialNumber || "").includes(q)
        );
      }

      return true;
    });
  }, [items, activeCategoryFilter, selectedSubCategory, search]);

  return (
    <div className="pb-16 max-w-7xl mx-auto space-y-4">
      {/* Header Bar */}
      <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-black text-[#0A0A0A]">
              Works &amp; Assets Inventory
            </h1>
            <p className="text-xs text-neutral-500">
              Manage live status, edit S.N. display order, category &amp; software type.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/upload-3d"
              className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition"
            >
              + Upload New Work
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-4 pt-3 border-t border-[#E2E0DB] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Software Category Filter Chips — 'All Works' removed as requested */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "3d", label: "3D (Blender)" },
              { id: "photoshop", label: "Photoshop" },
              { id: "illustrator", label: "Illustrator" },
              { id: "canva", label: "Canva" },
            ].map((f) => {
              const count = items.filter((i) => i.softwareGroup === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    handleCategoryTabChange(f.id as SoftwareGroup);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryFilter === f.id
                      ? "bg-[#0A0A0A] text-white"
                      : "border border-[#E2E0DB] bg-[#F7F6F3] text-neutral-700 hover:bg-white"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      activeCategoryFilter === f.id
                        ? "bg-white/20 text-white"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-500 whitespace-nowrap">
                Category:
              </span>
              <select
                value={selectedSubCategory}
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                className="rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3 py-1.5 text-xs font-semibold text-[#0A0A0A] outline-none focus:border-black focus:bg-white cursor-pointer max-w-[210px] truncate"
              >
                <option value="all">
                  All {activeCategoryFilter === "3d" ? "3D" : activeCategoryFilter === "photoshop" ? "Photoshop" : activeCategoryFilter === "illustrator" ? "Illustrator" : "Canva"} Categories ({availableCategories.length})
                </option>
                {availableCategories.map((catName) => {
                  const count = items.filter(
                    (i) =>
                      i.softwareGroup === activeCategoryFilter &&
                      i.category === catName
                  ).length;
                  return (
                    <option key={catName} value={catName}>
                      {catName} ({count})
                    </option>
                  );
                })}
              </select>
              {selectedSubCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => handleSubCategoryChange("all")}
                  className="rounded-lg bg-neutral-200 px-2 py-1 text-[11px] font-bold text-neutral-700 hover:bg-neutral-300 cursor-pointer"
                  title="Clear Category Filter"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Search Field */}
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                placeholder="Search name, category, S.N..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-1.5 text-xs font-semibold text-[#0A0A0A] placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1.5 text-xs text-neutral-400 hover:text-black cursor-pointer font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Inventory Table — S.N. | Image | Name | Category | Software / Type | Status | Created At | Actions */}
      <div className="rounded-2xl border border-[#E2E0DB] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E0DB] bg-[#F7F6F3] text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80 w-16 text-center">
                  S.N.
                </th>
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80 w-16 text-center">
                  Image
                </th>
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80 min-w-[200px]">
                  Name
                </th>
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80">
                  Category
                </th>
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80">
                  Software / Type
                </th>
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80 text-center">
                  Status
                </th>
                <th className="py-2.5 px-3 border-r border-[#E2E0DB]/80 text-center">
                  Created At
                </th>
                <th className="py-2.5 px-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E0DB]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400 font-semibold">
                    Loading inventory works...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400 font-semibold">
                    No works found in this filter view.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item._id} className="hover:bg-neutral-50/70 transition">
                    {/* S.N. Column — Starts from 1 in each category, editable inline */}
                    <td className="py-2 px-2.5 border-r border-[#E2E0DB]/60 text-center">
                      <div className="flex items-center justify-center">
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.serialNumber || index + 1}
                          key={`${item._id}-${item.serialNumber || index + 1}`}
                          onBlur={(e) => handleInlineSnChange(item, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          className="w-13 h-7 text-center rounded-lg border border-[#D5D3CC] bg-white text-xs font-mono font-bold text-[#0A0A0A] focus:border-black focus:outline-none shadow-2xs cursor-text"
                          title="Click to edit S.N. order number in this category and press Enter or click away to save"
                        />
                      </div>
                    </td>

                    {/* Image Column */}
                    <td className="py-2 px-2.5 border-r border-[#E2E0DB]/60 text-center">
                      <div className="flex items-center justify-center">
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#E2E0DB] bg-[#F7F6F3] flex items-center justify-center">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-neutral-400 font-bold uppercase">
                              {item.softwareGroup}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Name Column */}
                    <td className="py-2 px-3 border-r border-[#E2E0DB]/60">
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-[#0A0A0A] text-xs leading-snug">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {item.itemType === "3d" ? "3D GLB Model" : "2D Creative"}
                        </span>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="py-2 px-3 border-r border-[#E2E0DB]/60">
                      <div className="flex items-center justify-between gap-1 max-w-[200px]">
                        <span className="font-semibold text-neutral-800 text-xs truncate">
                          {item.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => openEdit(item, index)}
                          className="text-[10px] font-bold text-neutral-400 hover:text-black transition cursor-pointer shrink-0"
                          title="Edit category"
                        >
                          [Edit]
                        </button>
                      </div>
                    </td>

                    {/* Software / Type Column */}
                    <td className="py-2 px-3 border-r border-[#E2E0DB]/60">
                      <span className="rounded-md bg-neutral-100 border border-neutral-200/60 px-2 py-0.5 text-[10px] font-bold text-neutral-700 whitespace-nowrap">
                        {item.softwareGroup === "3d"
                          ? "3D (Blender)"
                          : item.softwareGroup === "photoshop"
                          ? "Adobe Photoshop"
                          : item.softwareGroup === "illustrator"
                          ? "Adobe Illustrator"
                          : "Canva"}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="py-2 px-3 border-r border-[#E2E0DB]/60 text-center">
                      <button
                        type="button"
                        onClick={() => toggleLiveStatus(item)}
                        title="Click to toggle Live/Draft"
                        className={`rounded-lg px-2.5 py-1 text-[10.5px] font-bold transition cursor-pointer whitespace-nowrap ${
                          item.status === "Published"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                        }`}
                      >
                        {item.status === "Published" ? "Published (Live)" : "Draft (Hidden)"}
                      </button>
                    </td>

                    {/* Created At Column */}
                    <td className="py-2 px-3 border-r border-[#E2E0DB]/60 text-center font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    {/* Actions Column */}
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openEdit(item, index)}
                          className="rounded-lg border border-[#D5D3CC] bg-white px-2.5 py-1 text-[11px] font-bold text-[#0A0A0A] hover:bg-black hover:text-white transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#E2E0DB] bg-white p-5 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E0DB]">
              <h3 className="text-sm font-black text-[#0A0A0A]">
                Edit Asset Details &amp; Position
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-xs font-bold text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* S.N. / Display Order */}
              <div>
                <label className="block font-bold text-[#0A0A0A] mb-1">
                  S.N. / Position in this Category
                </label>
                <input
                  type="number"
                  min={1}
                  value={editSn}
                  onChange={(e) => setEditSn(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  placeholder="e.g. 1"
                  className="w-full rounded-xl border border-[#D5D3CC] bg-white p-2.5 font-mono font-bold text-[#0A0A0A] outline-none focus:border-black"
                />
                <span className="text-[10.5px] text-neutral-500 mt-1 block">
                  Controls position in this category on website (1 = First item, 2 = Second item, etc.)
                </span>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold text-[#0A0A0A] mb-1">
                  Title / Name
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#D5D3CC] bg-white p-2.5 font-semibold text-[#0A0A0A] outline-none focus:border-black"
                />
              </div>

              {/* Software / Type Selector */}
              <div>
                <label className="block font-bold text-[#0A0A0A] mb-1">
                  Software / Type
                </label>
                <select
                  value={editSoftwareGroup}
                  onChange={(e) => {
                    const newGroup = e.target.value as SoftwareGroup;
                    setEditSoftwareGroup(newGroup);
                    // Update default category recommendation if empty or switching
                    const oldPresets = PRESET_CATEGORIES[editSoftwareGroup] || [];
                    if (!editCategory || oldPresets.includes(editCategory)) {
                      setEditCategory(PRESET_CATEGORIES[newGroup][0]);
                    }
                  }}
                  className="w-full rounded-xl border border-[#D5D3CC] bg-white p-2.5 font-semibold text-[#0A0A0A] outline-none focus:border-black cursor-pointer"
                >
                  {SOFTWARE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category with quick suggestion chips */}
              <div>
                <label className="block font-bold text-[#0A0A0A] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="e.g. Product Retouching, Packaging & Bottles..."
                  className="w-full rounded-xl border border-[#D5D3CC] bg-white p-2.5 font-semibold text-[#0A0A0A] outline-none focus:border-black"
                />
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {PRESET_CATEGORIES[editSoftwareGroup].map((catName) => (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => setEditCategory(catName)}
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                        editCategory === catName
                          ? "bg-black text-white"
                          : "border border-[#E2E0DB] bg-[#F7F6F3] text-neutral-600 hover:border-black hover:text-black"
                      }`}
                    >
                      {catName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Visibility */}
              <div>
                <label className="block font-bold text-[#0A0A0A] mb-1">
                  Live Visibility
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-[#D5D3CC] bg-white p-2.5 font-semibold text-[#0A0A0A] outline-none focus:border-black cursor-pointer"
                >
                  <option value="Published">Published (Live on Website)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E0DB]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-xl border border-[#D5D3CC] px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={savingEdit}
                className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
              >
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
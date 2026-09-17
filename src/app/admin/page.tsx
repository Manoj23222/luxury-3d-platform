"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import AdminStats from "@/components/admin/AdminStats";
import BeforeAfterSlider from "@/components/photo-editing/BeforeAfterSlider";

type Product = {
  _id: string;
  name: string;
  slug?: string;
  category?: string;
  status?: "Draft" | "Published";
  visibility?: "Public" | "Private";
  thumbnail?: string;
  modelUrl?: string;
  modelFileName?: string;
  softwareUsed?: string[];
  views?: number;
  createdAt?: string;
  featured?: boolean;
};

type PhotoWork = {
  _id: string;
  title: string;
  slug?: string;
  workType?: "before_after" | "banner";
  category: string;
  beforeImage?: string;
  afterImage: string;
  thumbnail?: string;
  resolution?: string;
  softwareUsed?: string[];
  status: "Draft" | "Published";
  featured: boolean;
  views?: number;
  createdAt?: string;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"3d" | "photos">("3d");
  const [search, setSearch] = useState("");

  // 3D Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Photo Works state
  const [photoWorks, setPhotoWorks] = useState<PhotoWork[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  // Photo categories state
  const DEFAULT_PHOTO_CATEGORIES = [
    "Background change & Resize",
    "White background & Resize",
    "Product Retouching",
    "Fashion & Portrait",
    "Color Grading",
    "Photo Manipulation",
    "Jewelry & Luxury",
    "Real Estate & HDR",
    "Background Replacement",
  ];
  const [photoCategories, setPhotoCategories] = useState<string[]>(DEFAULT_PHOTO_CATEGORIES);
  const [isCustomPhotoCategory, setIsCustomPhotoCategory] = useState(false);
  const [customPhotoCategoryInput, setCustomPhotoCategoryInput] = useState("");

  // Edit Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);

  const [editingPhoto, setEditingPhoto] = useState<PhotoWork | null>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  // Uploading state inside edit modals
  const [uploadingEditFile, setUploadingEditFile] = useState<Record<string, boolean>>({});
  const [dragActiveField, setDragActiveField] = useState<string | null>(null);

  // Hidden file input refs
  const thumbInputRef = useRef<HTMLInputElement | null>(null);
  const modelInputRef = useRef<HTMLInputElement | null>(null);
  const photoBeforeInputRef = useRef<HTMLInputElement | null>(null);
  const photoAfterInputRef = useRef<HTMLInputElement | null>(null);

  // Preview Modal for Photo Retouching
  const [previewPhoto, setPreviewPhoto] = useState<PhotoWork | null>(null);

  // Fetch all assets from APIs
  const fetchAllData = useCallback(async () => {
    // 1. Fetch 3D Products
    setLoadingProducts(true);
    try {
      const res3d = await fetch("/api/admin/products", { cache: "no-store" });
      if (res3d.ok) {
        const data3d = await res3d.json();
        if (Array.isArray(data3d.products)) {
          setProducts(data3d.products);
        }
      }
    } catch (err) {
      console.error("Failed to load 3D products:", err);
    } finally {
      setLoadingProducts(false);
    }

    // 2. Fetch Photo Works
    setLoadingPhotos(true);
    try {
      const resPhoto = await fetch("/api/photo-works", { cache: "no-store" });
      if (resPhoto.ok) {
        const dataPhoto = await resPhoto.json();
        if (Array.isArray(dataPhoto.works)) {
          setPhotoWorks(dataPhoto.works);
          const loaded = dataPhoto.works.map((w: any) => w.category).filter(Boolean);
          setPhotoCategories(Array.from(new Set([...DEFAULT_PHOTO_CATEGORIES, ...loaded])));
        }
      }
    } catch (err) {
      console.error("Failed to load photo works:", err);
    } finally {
      setLoadingPhotos(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Upload Handler for Drag & Drop / File inputs in Edit Modals
  const uploadEditFile = async (
    file: File,
    field: "thumbnail" | "model" | "photoBefore" | "photoAfter"
  ) => {
    if (!file) return;

    setUploadingEditFile((prev) => ({ ...prev, [field]: true }));

    const data = new FormData();
    data.append("file", file);
    data.append("title", file.name);
    data.append("uploadType", field === "model" ? "model" : "thumbnail");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        alert(result.message || "File upload failed");
        return;
      }

      const fileUrl = result.url || result.media?.url;

      if (field === "thumbnail") {
        setEditingProduct((prev) => (prev ? { ...prev, thumbnail: fileUrl } : null));
      } else if (field === "model") {
        setEditingProduct((prev) =>
          prev
            ? {
                ...prev,
                modelUrl: fileUrl,
                modelFileName: file.name,
              }
            : null
        );
      } else if (field === "photoBefore") {
        setEditingPhoto((prev) => (prev ? { ...prev, beforeImage: fileUrl } : null));
      } else if (field === "photoAfter") {
        setEditingPhoto((prev) =>
          prev ? { ...prev, afterImage: fileUrl, thumbnail: fileUrl } : null
        );
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploadingEditFile((prev) => ({ ...prev, [field]: false }));
      setDragActiveField(null);
    }
  };

  // Drag event helpers
  const handleDragOver = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveField(field);
  };

  const handleDragLeave = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragActiveField === field) {
      setDragActiveField(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    field: "thumbnail" | "model" | "photoBefore" | "photoAfter"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveField(null);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadEditFile(file, field);
    }
  };

  // Save 3D Product Edits
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setSavingProduct(true);
    try {
      const res = await fetch(`/api/admin/products/${editingProduct._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? { ...p, ...editingProduct } : p))
        );
        setEditingProduct(null);
      } else {
        alert(data.error || "Failed to save 3D product changes");
      }
    } catch {
      alert("Failed to save 3D product changes");
    } finally {
      setSavingProduct(false);
    }
  };

  // Save Photo Work Edits
  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    setSavingPhoto(true);
    try {
      const res = await fetch(`/api/photo-works/${editingPhoto._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPhoto),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPhotoWorks((prev) =>
          prev.map((w) => (w._id === editingPhoto._id ? { ...w, ...editingPhoto } : w))
        );
        setEditingPhoto(null);
      } else {
        alert(data.message || "Failed to save photo changes");
      }
    } catch {
      alert("Failed to save photo changes");
    } finally {
      setSavingPhoto(false);
    }
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete 3D file "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Failed to delete 3D product");
      }
    } catch {
      alert("Failed to delete 3D product");
    }
  };

  const deletePhotoWork = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete photo retouching "${title}"?`)) return;

    try {
      const res = await fetch(`/api/photo-works/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setPhotoWorks((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.message || "Failed to delete photo work");
      }
    } catch {
      alert("Failed to delete photo work");
    }
  };

  // Filtered 3D Products
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.modelFileName?.toLowerCase().includes(q)
    );
  }, [products, search]);

  // Filtered Photo Works
  const filteredPhotoWorks = useMemo(() => {
    if (!search.trim()) return photoWorks;
    const q = search.toLowerCase().trim();
    return photoWorks.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [photoWorks, search]);

  return (
    <div className="pb-20 max-w-7xl">
      {/* Top Stats */}
      <AdminStats />

      {/* Main Upload Portals (2 Hero Cards) */}
      <div className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-bold text-neutral-700 shadow-xs">
          <span>⚡ Studio Uploading Hub</span>
        </div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
          Upload 3D Files & Photo Retouching
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Add new 3D models or before/after photo retouching assets to your live platform.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Card 1: 3D File Uploading */}
          <Link
            href="/admin/upload-3d"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl text-white shadow-sm group-hover:scale-105 transition duration-300">
                📦
              </div>

              <div className="mt-5">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
                  3D Assets & Models
                </span>
                <h3 className="mt-2 text-xl font-black text-black">
                  3D File Uploading
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                  Upload <strong>GLB, GLTF, Blend, OBJ, FBX</strong> 3D models with interactive 3D WebGL preview and CGI render covers.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {["GLB / glTF", "Blender (.blend)", "OBJ / FBX", "3D WebGL Viewer"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-neutral-700"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
              <span className="text-xs font-black text-black group-hover:underline">
                Open 3D Uploader Studio
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs font-bold transition group-hover:bg-neutral-800">
                →
              </span>
            </div>
          </Link>

          {/* Card 2: Photo Editor Images Uploading */}
          <Link
            href="/admin/upload-photo"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-xl text-white shadow-sm group-hover:scale-105 transition duration-300">
                🎨
              </div>

              <div className="mt-5">
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-[11px] font-bold text-blue-800">
                  Photo Retouching & Grading
                </span>
                <h3 className="mt-2 text-xl font-black text-black">
                  Photo Editor Images Uploading
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                  Upload <strong>Before & After</strong> high-resolution retouching photos for interactive split sliders and color grading showcase.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Before / After Slider", "16-Bit RAW / JPEG", "Color Grading", "High-Res 4K"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-neutral-700"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
              <span className="text-xs font-black text-black group-hover:underline">
                Open Photo Uploader Studio
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white text-xs font-bold transition group-hover:bg-emerald-800">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Uploaded Content Management Section */}
      <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <h3 className="text-xl font-black text-black">
              Uploaded Works & Assets List
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Manage, preview, edit, and inspect all uploaded 3D files and photo retouching works.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                placeholder="Search uploaded works..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-black placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-hidden"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2 text-xs text-neutral-400 hover:text-black cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchAllData()}
              title="Refresh uploaded list"
              className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 shadow-xs hover:border-black hover:text-black transition cursor-pointer shrink-0"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Tab Selector Switcher */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setActiveTab("3d")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
              activeTab === "3d"
                ? "bg-black text-white shadow-xs"
                : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:bg-white"
            }`}
          >
            <span>📦 3D Files Uploaded</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                activeTab === "3d"
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-200 text-neutral-800"
              }`}
            >
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
              activeTab === "photos"
                ? "bg-black text-white shadow-xs"
                : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:bg-white"
            }`}
          >
            <span>🎨 Photo Retouching Uploaded</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                activeTab === "photos"
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-200 text-neutral-800"
              }`}
            >
              {photoWorks.length}
            </span>
          </button>
        </div>

        {/* TAB 1: 3D Files List */}
        {activeTab === "3d" && (
          <div className="mt-6">
            {loadingProducts ? (
              <div className="py-16 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent mb-2" />
                <p className="text-xs font-semibold text-neutral-500">Loading uploaded 3D files...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <span className="text-3xl">📦</span>
                <p className="mt-2 text-sm font-bold text-neutral-700">No 3D files found</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Upload your first 3D model using the uploader studio.
                </p>
                <Link
                  href="/admin/upload-3d"
                  className="mt-4 inline-block rounded-full bg-black px-5 py-2 text-xs font-bold text-white hover:bg-neutral-800"
                >
                  + Upload 3D File Now
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      <th className="pb-3 pl-2">3D Asset</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Views</th>
                      <th className="pb-3 pr-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredProducts.map((p) => (
                      <tr key={p._id} className="hover:bg-neutral-50/80 transition">
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                              {p.thumbnail ? (
                                <img
                                  src={p.thumbnail}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-lg">
                                  📦
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-black text-sm">{p.name}</p>
                              <p className="text-[11px] text-neutral-400 truncate max-w-xs">
                                {p.modelFileName || "3D WebGL Asset"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4">
                          <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                            {p.category || "3D Model"}
                          </span>
                        </td>

                        <td className="py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              p.status === "Published"
                                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                                : "bg-amber-50 border border-amber-200 text-amber-800"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                p.status === "Published" ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                            />
                            {p.status || "Published"}
                          </span>
                        </td>

                        <td className="py-4 font-semibold text-neutral-600">
                          {p.views || 0}
                        </td>

                        <td className="py-4 pr-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-bold text-black hover:border-black hover:bg-white transition shadow-xs cursor-pointer"
                            >
                              Edit ✏️
                            </button>
                            <Link
                              href={`/portfolio/${p.slug || p._id}`}
                              target="_blank"
                              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-800 hover:border-black transition shadow-xs"
                            >
                              View Live ↗
                            </Link>
                            <button
                              onClick={() => deleteProduct(p._id, p.name)}
                              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Photo Retouching List */}
        {activeTab === "photos" && (
          <div className="mt-6">
            {loadingPhotos ? (
              <div className="py-16 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent mb-2" />
                <p className="text-xs font-semibold text-neutral-500">Loading uploaded photo retouching works...</p>
              </div>
            ) : filteredPhotoWorks.length === 0 ? (
              <div className="py-16 text-center">
                <span className="text-3xl">🎨</span>
                <p className="mt-2 text-sm font-bold text-neutral-700">No photo retouching works found</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Upload your first Before/After photo comparison work.
                </p>
                <Link
                  href="/admin/upload-photo"
                  className="mt-4 inline-block rounded-full bg-black px-5 py-2 text-xs font-bold text-white hover:bg-neutral-800"
                >
                  + Upload Photo Work Now
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      <th className="pb-3 pl-2">Photo Work</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Resolution / Tools</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 pr-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredPhotoWorks.map((work) => {
                      const isBeforeAfter =
                        (work.workType === "before_after" || !work.workType) &&
                        Boolean(work.beforeImage) &&
                        work.beforeImage !== work.afterImage;

                      return (
                        <tr key={work._id} className="hover:bg-neutral-50/80 transition">
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                                <img
                                  src={work.afterImage || work.thumbnail}
                                  alt={work.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-bold text-black text-sm max-w-xs truncate">
                                  {work.title}
                                </p>
                                <span
                                  className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.2 text-[9.5px] font-bold ${
                                    isBeforeAfter
                                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                                      : "bg-blue-50 text-blue-700 border border-blue-200"
                                  }`}
                                >
                                  {isBeforeAfter ? "⚡ Before / After" : "🎨 Creative Banner"}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4">
                            <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                              {work.category}
                            </span>
                          </td>

                          <td className="py-4">
                            <p className="font-semibold text-neutral-700">
                              {work.resolution || "4K Ultra HD"}
                            </p>
                            <p className="text-[10px] text-neutral-400 truncate max-w-[140px]">
                              {Array.isArray(work.softwareUsed)
                                ? work.softwareUsed.join(", ")
                                : "Photoshop"}
                            </p>
                          </td>

                          <td className="py-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                work.status === "Published"
                                  ? "bg-blue-50 border border-blue-200 text-blue-800"
                                  : "bg-amber-50 border border-amber-200 text-amber-800"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  work.status === "Published" ? "bg-blue-500" : "bg-amber-500"
                                }`}
                              />
                              {work.status || "Published"}
                            </span>
                          </td>

                          <td className="py-4 pr-2 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingPhoto(work)}
                                className="rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-bold text-black hover:border-black hover:bg-white transition shadow-xs cursor-pointer"
                              >
                                Edit ✏️
                              </button>
                              <button
                                onClick={() => setPreviewPhoto(work)}
                                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-800 hover:border-black transition shadow-xs cursor-pointer"
                              >
                                {isBeforeAfter ? "Preview Slider 👁️" : "Preview Banner 👁️"}
                              </button>
                              <button
                                onClick={() => deletePhotoWork(work._id, work.title)}
                                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* EDIT MODAL: 3D Product with Drag & Drop */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <h4 className="text-lg font-black text-black">Edit 3D Product Details</h4>
                <p className="text-xs text-neutral-500">
                  Update model details or drag & drop new 3D files and thumbnail covers
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="rounded-full bg-neutral-100 p-2 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Product / Model Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                    placeholder="e.g. Packaging, Bottle, Fashion, Horology"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Status</label>
                  <select
                    value={editingProduct.status || "Published"}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        status: e.target.value as "Draft" | "Published",
                      })
                    }
                    className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                  >
                    <option value="Published">Published (Live on Platform)</option>
                    <option value="Draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              {/* DRAG & DROP: Thumbnail Cover */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Thumbnail Cover (Drag & Drop or Upload)
                </label>
                <input
                  ref={thumbInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadEditFile(file, "thumbnail");
                  }}
                />

                <div
                  onDragOver={(e) => handleDragOver(e, "thumbnail")}
                  onDragLeave={(e) => handleDragLeave(e, "thumbnail")}
                  onDrop={(e) => handleDrop(e, "thumbnail")}
                  onClick={() => thumbInputRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition cursor-pointer ${
                    dragActiveField === "thumbnail"
                      ? "border-black bg-neutral-100"
                      : "border-neutral-300 bg-neutral-50/70 hover:border-black hover:bg-white"
                  }`}
                >
                  {uploadingEditFile.thumbnail ? (
                    <div className="py-2 text-center text-blue-600 font-bold animate-pulse">
                      ⏳ Uploading thumbnail image...
                    </div>
                  ) : editingProduct.thumbnail ? (
                    <div className="flex items-center gap-4 w-full">
                      <img
                        src={editingProduct.thumbnail}
                        alt="Cover"
                        className="h-16 w-24 rounded-xl object-cover border border-neutral-200 shadow-xs"
                      />
                      <div className="text-left flex-1">
                        <p className="font-bold text-black text-xs">Cover Image Uploaded</p>
                        <p className="text-[11px] text-neutral-500 truncate max-w-xs">
                          {editingProduct.thumbnail}
                        </p>
                        <span className="mt-1 inline-block rounded-md bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-800">
                          Click or Drag to Replace 🔄
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2">
                      <span className="text-2xl">🖼️</span>
                      <p className="mt-1 font-bold text-black">Drag & drop thumbnail image here</p>
                      <p className="text-[11px] text-neutral-500">or click to browse from device (PNG, JPG, WebP)</p>
                    </div>
                  )}
                </div>

                {/* Direct URL Fallback */}
                <input
                  type="text"
                  placeholder="Or paste direct image URL..."
                  value={editingProduct.thumbnail || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, thumbnail: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2 text-[11px] font-medium text-black focus:border-black focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* DRAG & DROP: 3D Model File */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  3D Model File (Drag & Drop .GLB, .glTF, .OBJ, .FBX, .blend)
                </label>
                <input
                  ref={modelInputRef}
                  type="file"
                  accept=".glb,.gltf,.obj,.fbx,.blend,.stl,.zip"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadEditFile(file, "model");
                  }}
                />

                <div
                  onDragOver={(e) => handleDragOver(e, "model")}
                  onDragLeave={(e) => handleDragLeave(e, "model")}
                  onDrop={(e) => handleDrop(e, "model")}
                  onClick={() => modelInputRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition cursor-pointer ${
                    dragActiveField === "model"
                      ? "border-black bg-neutral-100"
                      : "border-neutral-300 bg-neutral-50/70 hover:border-black hover:bg-white"
                  }`}
                >
                  {uploadingEditFile.model ? (
                    <div className="py-2 text-center text-blue-600 font-bold animate-pulse">
                      ⏳ Uploading 3D Model File...
                    </div>
                  ) : editingProduct.modelUrl ? (
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-xl text-white">
                        📦
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-black text-xs">
                          {editingProduct.modelFileName || "3D Model Asset Attached"}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate max-w-xs">
                          {editingProduct.modelUrl}
                        </p>
                        <span className="mt-1 inline-block rounded-md bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-800">
                          Click or Drag to Replace 🔄
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2">
                      <span className="text-2xl">📦</span>
                      <p className="mt-1 font-bold text-black">Drag & drop 3D model file here</p>
                      <p className="text-[11px] text-neutral-500">
                        Supports GLB, GLTF, Blend, OBJ, FBX, STL, ZIP (Up to 250MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Direct Model URL Fallback */}
                <input
                  type="text"
                  placeholder="Or paste direct 3D model file URL..."
                  value={editingProduct.modelUrl || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, modelUrl: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2 text-[11px] font-medium text-black focus:border-black focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-xl border border-neutral-300 px-4 py-2.5 font-bold text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct || uploadingEditFile.thumbnail || uploadingEditFile.model}
                  className="rounded-xl bg-black px-6 py-2.5 font-bold text-white hover:bg-neutral-800 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {savingProduct ? "Saving..." : "Save 3D Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL: Photo Retouching Work with Drag & Drop */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <h4 className="text-lg font-black text-black">Edit Photo Retouching Work</h4>
                <p className="text-xs text-neutral-500">
                  Update titles, categories, or drag & drop new Before/After comparison images
                </p>
              </div>
              <button
                onClick={() => setEditingPhoto(null)}
                className="rounded-full bg-neutral-100 p-2 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Work Title</label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title || ""}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-neutral-700">Category</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomPhotoCategory(!isCustomPhotoCategory)}
                      className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      {isCustomPhotoCategory ? "← Select List" : "✏️ + Manual Add"}
                    </button>
                  </div>

                  {!isCustomPhotoCategory ? (
                    <select
                      value={editingPhoto.category || "Product Retouching"}
                      onChange={(e) => {
                        if (e.target.value === "__CUSTOM__") {
                          setIsCustomPhotoCategory(true);
                        } else {
                          setEditingPhoto({ ...editingPhoto, category: e.target.value });
                        }
                      }}
                      className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden cursor-pointer"
                    >
                      {photoCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__CUSTOM__">➕ Add New Custom Category...</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Type new category..."
                        value={customPhotoCategoryInput}
                        onChange={(e) => {
                          setCustomPhotoCategoryInput(e.target.value);
                          setEditingPhoto({ ...editingPhoto, category: e.target.value });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = customPhotoCategoryInput.trim();
                            if (val) {
                              if (!photoCategories.includes(val)) {
                                setPhotoCategories((prev) => [...prev, val]);
                              }
                              setEditingPhoto({ ...editingPhoto, category: val });
                              setCustomPhotoCategoryInput("");
                              setIsCustomPhotoCategory(false);
                            }
                          }
                        }}
                        className="flex-1 rounded-xl border border-black bg-white p-2 text-xs font-semibold text-black outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = customPhotoCategoryInput.trim();
                          if (val) {
                            if (!photoCategories.includes(val)) {
                              setPhotoCategories((prev) => [...prev, val]);
                            }
                            setEditingPhoto({ ...editingPhoto, category: val });
                            setCustomPhotoCategoryInput("");
                            setIsCustomPhotoCategory(false);
                          }
                        }}
                        className="rounded-xl bg-black px-3 py-2 text-[10px] font-bold text-white hover:bg-neutral-800 transition cursor-pointer shrink-0"
                      >
                        Use ✓
                      </button>
                    </div>
                  )}

                  {editingPhoto.category && (
                    <p className="mt-1 text-[10px] font-semibold text-neutral-500">
                      Active: <strong className="text-black">{editingPhoto.category}</strong>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Status</label>
                  <select
                    value={editingPhoto.status || "Published"}
                    onChange={(e) =>
                      setEditingPhoto({
                        ...editingPhoto,
                        status: e.target.value as "Draft" | "Published",
                      })
                    }
                    className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* DRAG & DROP: Before Image & After Image */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* 1. Before Image Dropzone */}
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    1. Before / Raw Image (Drag & Drop) *
                  </label>
                  <input
                    ref={photoBeforeInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadEditFile(file, "photoBefore");
                    }}
                  />

                  <div
                    onDragOver={(e) => handleDragOver(e, "photoBefore")}
                    onDragLeave={(e) => handleDragLeave(e, "photoBefore")}
                    onDrop={(e) => handleDrop(e, "photoBefore")}
                    onClick={() => photoBeforeInputRef.current?.click()}
                    className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-3 text-center transition cursor-pointer aspect-4/3 ${
                      dragActiveField === "photoBefore"
                        ? "border-black bg-neutral-100"
                        : "border-neutral-300 bg-neutral-50/70 hover:border-black hover:bg-white"
                    }`}
                  >
                    {uploadingEditFile.photoBefore ? (
                      <div className="text-center text-blue-600 font-bold animate-pulse">
                        ⏳ Uploading Before image...
                      </div>
                    ) : editingPhoto.beforeImage ? (
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={editingPhoto.beforeImage}
                          alt="Before"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/80 px-2 py-0.5 text-[9px] font-bold text-white">
                          Before • Drag to Replace
                        </span>
                      </div>
                    ) : (
                      <div className="py-2">
                        <span className="text-xl">📷</span>
                        <p className="mt-1 font-bold text-black text-[11px]">Drag Before Image</p>
                        <p className="text-[10px] text-neutral-500">or click to browse</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Or paste Before image URL..."
                    value={editingPhoto.beforeImage || ""}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, beforeImage: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2 text-[10px] font-medium text-black focus:border-black focus:bg-white focus:outline-hidden"
                  />
                </div>

                {/* 2. After Image Dropzone */}
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    2. After / Retouched Image (Drag & Drop) *
                  </label>
                  <input
                    ref={photoAfterInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadEditFile(file, "photoAfter");
                    }}
                  />

                  <div
                    onDragOver={(e) => handleDragOver(e, "photoAfter")}
                    onDragLeave={(e) => handleDragLeave(e, "photoAfter")}
                    onDrop={(e) => handleDrop(e, "photoAfter")}
                    onClick={() => photoAfterInputRef.current?.click()}
                    className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-3 text-center transition cursor-pointer aspect-4/3 ${
                      dragActiveField === "photoAfter"
                        ? "border-black bg-neutral-100"
                        : "border-neutral-300 bg-neutral-50/70 hover:border-black hover:bg-white"
                    }`}
                  >
                    {uploadingEditFile.photoAfter ? (
                      <div className="text-center text-blue-600 font-bold animate-pulse">
                        ⏳ Uploading After image...
                      </div>
                    ) : editingPhoto.afterImage ? (
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        <img
                          src={editingPhoto.afterImage}
                          alt="After"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-emerald-800 px-2 py-0.5 text-[9px] font-bold text-white">
                          After • Drag to Replace
                        </span>
                      </div>
                    ) : (
                      <div className="py-2">
                        <span className="text-xl">✨</span>
                        <p className="mt-1 font-bold text-black text-[11px]">Drag After Image</p>
                        <p className="text-[10px] text-neutral-500">or click to browse</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Or paste After image URL..."
                    value={editingPhoto.afterImage || ""}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, afterImage: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2 text-[10px] font-medium text-black focus:border-black focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Resolution</label>
                  <input
                    type="text"
                    value={editingPhoto.resolution || ""}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, resolution: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                    placeholder="e.g. 4K Ultra HD, 6000x4000"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Software Used</label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editingPhoto.softwareUsed)
                        ? editingPhoto.softwareUsed.join(", ")
                        : editingPhoto.softwareUsed || ""
                    }
                    onChange={(e) =>
                      setEditingPhoto({
                        ...editingPhoto,
                        softwareUsed: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full rounded-xl border border-neutral-300 p-2.5 font-medium text-black focus:border-black focus:outline-hidden"
                    placeholder="e.g. Adobe Photoshop, Lightroom"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="rounded-xl border border-neutral-300 px-4 py-2.5 font-bold text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    savingPhoto ||
                    uploadingEditFile.photoBefore ||
                    uploadingEditFile.photoAfter
                  }
                  className="rounded-xl bg-emerald-700 px-6 py-2.5 font-bold text-white hover:bg-emerald-800 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {savingPhoto ? "Saving..." : "Save Photo Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Before/After Interactive Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <h4 className="text-base font-black text-black">{previewPhoto.title}</h4>
                <p className="text-xs text-neutral-500">{previewPhoto.category}</p>
              </div>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="rounded-full bg-neutral-100 p-2 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="mt-5 aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-950 flex items-center justify-center">
              {previewPhoto.beforeImage && previewPhoto.beforeImage !== previewPhoto.afterImage ? (
                <BeforeAfterSlider
                  beforeImage={previewPhoto.beforeImage}
                  afterImage={previewPhoto.afterImage}
                  aspectRatio="aspect-[4/3]"
                  fitMode="contain"
                  showFitToggle={true}
                  enableAutoScan={true}
                />
              ) : (
                <img
                  src={previewPhoto.afterImage || previewPhoto.thumbnail}
                  alt={previewPhoto.title}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeforeAfterSlider from "@/components/photo-editing/BeforeAfterSlider";

const DEFAULT_CATEGORIES = [
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

export default function AdminUploadPhotoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);

  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");

  const [beforeUrl, setBeforeUrl] = useState("");
  const [afterUrl, setAfterUrl] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "Product Retouching",
    description: "",
    shortDescription: "",
    softwareUsed: "Adobe Photoshop, Capture One",
    resolution: "4K / Ultra HD",
    clientName: "",
    projectYear: "2026",
    tags: "",
    featured: "true",
    status: "Published",
  });

  // Load existing categories from uploaded works
  useEffect(() => {
    async function loadExistingCategories() {
      try {
        const res = await fetch("/api/photo-works");
        if (res.ok) {
          const data = await res.json();
          if (data.works && Array.isArray(data.works)) {
            const loaded = data.works.map((w: any) => w.category).filter(Boolean);
            setCategories(Array.from(new Set([...DEFAULT_CATEGORIES, ...loaded])));
          }
        }
      } catch {
        // Keep defaults
      }
    }
    loadExistingCategories();
  }, []);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddCustomCategory = (newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    update("category", trimmed);
    setCustomCategoryInput("");
    setIsCustomCategory(false);
  };

  const uploadImage = async (file: File, type: "before" | "after") => {
    if (type === "before") setUploadingBefore(true);
    else setUploadingAfter(true);

    const data = new FormData();
    data.append("file", file);
    data.append("title", `${type}-${file.name}`);
    data.append("uploadType", "thumbnail");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Image upload failed");
        return;
      }

      const url = result.url || result.media?.url;
      if (type === "before") setBeforeUrl(url);
      else setAfterUrl(url);
    } catch {
      alert("Image upload failed");
    } finally {
      if (type === "before") setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const submit = async (statusOverride = "") => {
    if (uploadingBefore || uploadingAfter) {
      alert("Please wait for images to finish uploading.");
      return;
    }

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (!beforeUrl || !afterUrl) {
      alert("Both Before Image and After Image are required for retouching showcase.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/photo-works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category.trim(),
          description: form.description,
          shortDescription: form.shortDescription || form.description?.slice(0, 120),
          beforeImage: beforeUrl,
          afterImage: afterUrl,
          thumbnail: afterUrl,
          softwareUsed: form.softwareUsed.split(",").map((s) => s.trim()).filter(Boolean),
          resolution: form.resolution,
          clientName: form.clientName,
          projectYear: form.projectYear,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          featured: form.featured === "true",
          status: statusOverride || form.status,
        }),
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        alert("✅ Photo retouching project added successfully!");
        router.push("/admin");
      } else {
        alert(result.message || "Failed to add photo retouching work.");
      }
    } catch {
      setLoading(false);
      alert("Failed to submit photo project.");
    }
  };

  return (
    <div className="pb-16 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
            Retouching Studio Admin
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
            Upload Photo Retouching Work
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            Upload Before & After images with live comparison slider preview and custom category management.
          </p>
        </div>

        <Link
          href="/admin"
          className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-bold text-black transition hover:border-black"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* Left Form */}
        <div className="space-y-6">
          {/* Basic Details */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-black">Project Information</h2>

            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Project Title *
                </span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. High-Fashion Editorial Beauty & Skin Retouching"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              {/* Category Select & Manual Option Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-neutral-700">Category *</span>
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(!isCustomCategory)}
                      className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      {isCustomCategory ? "← Select List" : "✏️ + Manual Add"}
                    </button>
                  </div>

                  {!isCustomCategory ? (
                    <select
                      value={form.category}
                      onChange={(e) => {
                        if (e.target.value === "__CUSTOM__") {
                          setIsCustomCategory(true);
                        } else {
                          update("category", e.target.value);
                        }
                      }}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__CUSTOM__">➕ Add New Custom Category...</option>
                    </select>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          autoFocus
                          placeholder="Type custom category..."
                          value={customCategoryInput}
                          onChange={(e) => {
                            setCustomCategoryInput(e.target.value);
                            update("category", e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomCategory(customCategoryInput);
                            }
                          }}
                          className="flex-1 rounded-2xl border border-black bg-white px-3.5 py-2.5 text-xs font-semibold text-black outline-none focus:ring-2 focus:ring-black/10"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomCategory(customCategoryInput)}
                          className="rounded-2xl bg-black px-3 py-2.5 text-[11px] font-bold text-white hover:bg-neutral-800 transition cursor-pointer shrink-0"
                        >
                          Add ✓
                        </button>
                      </div>
                    </div>
                  )}

                  {form.category && (
                    <p className="mt-1 text-[10.5px] font-medium text-neutral-500">
                      Current: <strong className="text-black">{form.category}</strong>
                    </p>
                  )}
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                    Resolution / Quality
                  </span>
                  <input
                    type="text"
                    value={form.resolution}
                    onChange={(e) => update("resolution", e.target.value)}
                    placeholder="e.g. 6000 x 4000 (24 MP Raw)"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Project Description
                </span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe the retouching techniques used: dodge & burn, frequency separation, color grading, background cleaning..."
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-medium text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Tags (Comma separated)
                </span>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => update("tags", e.target.value)}
                  placeholder="beauty, skin, fashion, dodge-burn, commercial"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>
            </div>
          </div>

          {/* Before & After Image Uploads */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-black">Before & After Images</h2>
            <p className="mt-1 text-xs text-neutral-500">
              Upload high-resolution images to generate the interactive before/after split slider.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* Before Image */}
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/70 p-4">
                <span className="block text-xs font-bold text-neutral-800">
                  1. Raw / Before Image *
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file, "before");
                  }}
                  className="mt-2 w-full text-xs text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white cursor-pointer"
                />

                {uploadingBefore && (
                  <div className="mt-2 text-xs font-semibold text-blue-600 animate-pulse">
                    Uploading Before image...
                  </div>
                )}

                {beforeUrl && !uploadingBefore && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200 aspect-video bg-neutral-950">
                    <img src={beforeUrl} alt="Before Preview" className="h-full w-full object-contain" />
                  </div>
                )}
              </div>

              {/* After Image */}
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/70 p-4">
                <span className="block text-xs font-bold text-neutral-800">
                  2. Retouched / After Image *
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file, "after");
                  }}
                  className="mt-2 w-full text-xs text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white cursor-pointer"
                />

                {uploadingAfter && (
                  <div className="mt-2 text-xs font-semibold text-blue-600 animate-pulse">
                    Uploading After image...
                  </div>
                )}

                {afterUrl && !uploadingAfter && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200 aspect-video bg-neutral-950">
                    <img src={afterUrl} alt="After Preview" className="h-full w-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-black">Publishing & Software</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Software Used
                </span>
                <input
                  type="text"
                  value={form.softwareUsed}
                  onChange={(e) => update("softwareUsed", e.target.value)}
                  placeholder="Adobe Photoshop, Lightroom, Capture One"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Client / Campaign
                </span>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                  placeholder="e.g. Vogue Series / Aura Cosmetics"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Visibility Status
                </span>
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white cursor-pointer"
                >
                  <option value="Published">Published (Live on Website)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Feature in Retouching Library
                </span>
                <select
                  value={form.featured}
                  onChange={(e) => update("featured", e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white cursor-pointer"
                >
                  <option value="true">Yes — Feature in Highlights</option>
                  <option value="false">No — Normal Listing</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Live Preview & Submit */}
        <div className="space-y-6">
          <div className="sticky top-28 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-black">Live Slider Preview</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Interactive preview with mouse follow.
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950">
              {beforeUrl && afterUrl ? (
                <BeforeAfterSlider
                  beforeImage={beforeUrl}
                  afterImage={afterUrl}
                  aspectRatio="aspect-[4/3]"
                  fitMode="contain"
                  showFitToggle={true}
                  enableAutoScan={true}
                />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center p-6 text-center text-xs text-neutral-400">
                  <span className="text-3xl mb-2">🎨</span>
                  <span>Upload both Before and After images to see interactive comparison slider</span>
                </div>
              )}
            </div>

            {/* Quick Summary */}
            <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Title:</span>
                <span className="font-bold text-black truncate max-w-[180px]">
                  {form.title || "Untitled Project"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Category:</span>
                <span className="font-bold text-emerald-700">{form.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="font-bold text-neutral-800">{form.status}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => submit("Published")}
                disabled={loading || uploadingBefore || uploadingAfter}
                className="w-full rounded-2xl bg-black py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Publishing Work..." : "Publish to Retouching Library 🚀"}
              </button>

              <button
                type="button"
                onClick={() => submit("Draft")}
                disabled={loading || uploadingBefore || uploadingAfter}
                className="w-full rounded-2xl border border-neutral-300 bg-white py-3 text-xs font-bold text-neutral-700 transition hover:border-black hover:text-black disabled:opacity-50 cursor-pointer"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

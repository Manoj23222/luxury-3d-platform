"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ModelViewer from "@/components/3d/ModelViewer";

type UploadedFileData = {
  url: string;
  name: string;
  type: string;
  size: number;
};

type UploadKey =
  | "model"
  | "thumbnail"
  | "glb"
  | "gltf"
  | "fbx"
  | "blend"
  | "obj"
  | "stl"
  | "zip";

const MB = 1024 * 1024;

const FILE_LIMITS: Record<string, number> = {
  thumbnail: 15 * MB,
  model: 250 * MB,
  glb: 250 * MB,
  gltf: 250 * MB,
  fbx: 250 * MB,
  blend: 250 * MB,
  obj: 250 * MB,
  stl: 250 * MB,
  zip: 500 * MB,
};

function formatMB(size: number) {
  return `${(size / MB).toFixed(1)} MB`;
}

function validateUploadFile(file: File, type: keyof typeof FILE_LIMITS) {
  const max = FILE_LIMITS[type] || 200 * MB;

  if (file.size > max) {
    alert(
      `❌ ${file.name} is too large.\n\nSelected: ${formatMB(
        file.size
      )}\nMaximum allowed: ${formatMB(max)}`
    );
    return false;
  }

  return true;
}

export default function AdminUpload3DPage() {
  const router = useRouter();
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileData>>({});
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.categories?.length > 0) {
          setCategories(data.categories);
        } else {
          setCategories([
            { _id: "c1", name: "Furniture" },
            { _id: "c2", name: "Packaging" },
            { _id: "c3", name: "Electronics" },
            { _id: "c4", name: "Bottle" },
            { _id: "c5", name: "Cosmetics" },
            { _id: "c6", name: "Automotive" },
            { _id: "c7", name: "Interior" },
          ]);
        }
      } catch {
        setCategories([
          { _id: "c1", name: "Furniture" },
          { _id: "c2", name: "Packaging" },
          { _id: "c3", name: "Electronics" },
          { _id: "c4", name: "Bottle" },
          { _id: "c5", name: "Cosmetics" },
          { _id: "c6", name: "Automotive" },
          { _id: "c7", name: "Interior" },
        ]);
      }
    }
    loadCategories();
  }, []);

  const [form, setForm] = useState({
    name: "",
    category: "Packaging",
    description: "",
    license: "All Rights Reserved / Showcase",
    downloadZipUrl: "",
    tags: "",
    softwareUsed: "Blender, Substance 3D Painter",
    renderEngine: "Cycles / Eevee",
    projectYear: "2026",
    status: "Published",
    featured: "true",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getAssetName = (file: File) => {
    return file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  };

  const isPreviewable = (file?: File | null) => {
    if (!file) return false;
    const name = file.name.toLowerCase();
    return name.endsWith(".glb") || name.endsWith(".gltf");
  };

  const selectModel = (file: File | null) => {
    setModelFile(file);

    if (file && !form.name) {
      update("name", getAssetName(file));
    }

    if (file && isPreviewable(file)) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const autoUploadFile = async (key: UploadKey, file: File | null) => {
    if (!file) return;

    setUploadingFiles((prev) => ({ ...prev, [key]: true }));

    const data = new FormData();
    data.append("file", file);
    data.append("title", file.name);
    data.append("uploadType", key);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || `${key} upload failed`);
        return;
      }

      setUploadedFiles((prev) => ({
        ...prev,
        [key]: {
          url: result.url || result.media?.url,
          name: file.name,
          type: file.name.split(".").pop()?.toLowerCase() || "",
          size: file.size,
        },
      }));
    } catch {
      alert(`${key} upload failed`);
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [key]: false }));
    }
  };

  const submit = async (statusOverride = "") => {
    const isAnyUploading = Object.values(uploadingFiles).some(Boolean);

    if (isAnyUploading) {
      alert("Please wait for all file uploads to complete.");
      return;
    }

    if (!uploadedFiles.model?.url && !previewUrl) {
      alert("Please select and upload a 3D Model file (GLB / GLTF).");
      return;
    }

    if (!form.name.trim()) {
      alert("3D Asset Name is required.");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("isFree", "true");
    data.append("price", "0");
    data.append("license", form.license);
    data.append("downloadZipUrl", form.downloadZipUrl || uploadedFiles.zip?.url || "");
    data.append("tags", form.tags);
    data.append("softwareUsed", form.softwareUsed);
    data.append("projectYear", form.projectYear);
    data.append("status", statusOverride || form.status);
    data.append("featured", form.featured);
    data.append("modelUrl", uploadedFiles.model?.url || "");
    data.append("modelFileName", uploadedFiles.model?.name || modelFile?.name || "");
    data.append("modelFileType", uploadedFiles.model?.type || "glb");

    data.append("thumbnailUrl", uploadedFiles.thumbnail?.url || "");
    data.append("glbUrl", uploadedFiles.glb?.url || uploadedFiles.model?.url || "");
    data.append("gltfUrl", uploadedFiles.gltf?.url || "");
    data.append("fbxUrl", uploadedFiles.fbx?.url || "");
    data.append("blendUrl", uploadedFiles.blend?.url || "");
    data.append("objUrl", uploadedFiles.obj?.url || "");
    data.append("stlUrl", uploadedFiles.stl?.url || "");
    data.append("zipUrl", uploadedFiles.zip?.url || form.downloadZipUrl || "");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        alert("✅ 3D Work published successfully to portfolio!");
        router.push("/admin/products");
      } else {
        alert(result.message || "Failed to publish 3D asset.");
      }
    } catch {
      setLoading(false);
      alert("Failed to submit 3D project.");
    }
  };

  return (
    <div className="pb-16 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
            3D Studio Admin
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
            Upload 3D Portfolio Work
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            Add interactive GLB 3D models, multi-format renders, and project specifications.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-bold text-black transition hover:border-black"
        >
          View All 3D Works →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Left Form Column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-black">Project Details</h2>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Project / Asset Name *
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Luxury Minimalist Perfume Bottle 3D"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                    Category *
                  </span>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                    Project Year
                  </span>
                  <input
                    type="text"
                    value={form.projectYear}
                    onChange={(e) => update("projectYear", e.target.value)}
                    placeholder="2026"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Description & Overview
                </span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe the 3D model geometry, materials, lighting setup, and aesthetic intention..."
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-medium text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Keywords / Tags (Comma separated)
                </span>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => update("tags", e.target.value)}
                  placeholder="perfume, glass, octane, blender, commercial, luxury"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>
            </div>
          </div>

          {/* 3D Files & Media */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-black">3D Media & File Uploads</h2>
            <p className="mt-1 text-xs text-neutral-500">
              Upload the interactive GLB preview model and supporting asset files.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FileBox
                label="Primary 3D Model (GLB / GLTF) *"
                accept=".glb,.gltf"
                type="model"
                uploading={uploadingFiles.model}
                uploaded={uploadedFiles.model}
                onChange={(file) => {
                  selectModel(file);
                  autoUploadFile("model", file);
                }}
              />

              <FileBox
                label="Thumbnail Cover Image"
                accept="image/*"
                type="thumbnail"
                uploading={uploadingFiles.thumbnail}
                uploaded={uploadedFiles.thumbnail}
                onChange={(file) => {
                  setThumbnailFile(file);
                  autoUploadFile("thumbnail", file);
                }}
              />

              <FileBox
                label="BLEND Project File"
                accept=".blend"
                type="blend"
                uploading={uploadingFiles.blend}
                uploaded={uploadedFiles.blend}
                onChange={(file) => autoUploadFile("blend", file)}
              />

              <FileBox
                label="FBX File"
                accept=".fbx"
                type="fbx"
                uploading={uploadingFiles.fbx}
                uploaded={uploadedFiles.fbx}
                onChange={(file) => autoUploadFile("fbx", file)}
              />

              <FileBox
                label="OBJ File"
                accept=".obj"
                type="obj"
                uploading={uploadingFiles.obj}
                uploaded={uploadedFiles.obj}
                onChange={(file) => autoUploadFile("obj", file)}
              />

              <FileBox
                label="Complete Asset ZIP Archive"
                accept=".zip,.rar,.7z"
                type="zip"
                uploading={uploadingFiles.zip}
                uploaded={uploadedFiles.zip}
                onChange={(file) => autoUploadFile("zip", file)}
              />
            </div>

            <div className="mt-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  External Download Link (Optional)
                </span>
                <input
                  type="text"
                  value={form.downloadZipUrl}
                  onChange={(e) => update("downloadZipUrl", e.target.value)}
                  placeholder="https://drive.google.com/... or https://res.cloudinary.com/..."
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-medium text-black outline-none focus:border-black focus:bg-white"
                />
              </label>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-black">Technical Specifications</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Software Used
                </span>
                <input
                  type="text"
                  value={form.softwareUsed}
                  onChange={(e) => update("softwareUsed", e.target.value)}
                  placeholder="Blender, Substance 3D, Maya"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  License
                </span>
                <input
                  type="text"
                  value={form.license}
                  onChange={(e) => update("license", e.target.value)}
                  placeholder="All Rights Reserved / Showcase"
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
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                >
                  <option value="Published">Published (Visible on Portfolio)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-neutral-700">
                  Featured on Home Page
                </span>
                <select
                  value={form.featured}
                  onChange={(e) => update("featured", e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold text-black outline-none focus:border-black focus:bg-white"
                >
                  <option value="true">Yes, Feature on Home Showcase</option>
                  <option value="false">No, Archive Only</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Right Preview & Action Column */}
        <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs lg:sticky lg:top-24">
          <h3 className="text-sm font-bold text-black">Live 3D Preview</h3>

          <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            {previewUrl ? (
              <ModelViewer url={previewUrl} fileName={modelFile?.name} />
            ) : thumbnailFile ? (
              <img
                src={URL.createObjectURL(thumbnailFile)}
                alt="Thumbnail"
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square flex-col items-center justify-center p-6 text-center text-xs text-neutral-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-200 text-neutral-500">
                  📦
                </div>
                <p className="mt-2 font-semibold text-neutral-600">No Model Selected</p>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  Select a GLB / GLTF file to preview in 3D
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              onClick={() => submit("Published")}
              disabled={loading || Object.values(uploadingFiles).some(Boolean)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3.5 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {Object.values(uploadingFiles).some(Boolean)
                ? "Uploading files to cloud..."
                : loading
                ? "Publishing Project..."
                : "Publish 3D Portfolio Work"}
            </button>

            <button
              onClick={() => submit("Draft")}
              disabled={loading || Object.values(uploadingFiles).some(Boolean)}
              className="w-full rounded-2xl border border-neutral-300 bg-white py-3 text-xs font-bold text-neutral-700 transition hover:border-black hover:text-black disabled:opacity-50"
            >
              Save as Hidden Draft
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FileBox({
  label,
  accept,
  type,
  uploading,
  uploaded,
  onChange,
}: {
  label: string;
  accept: string;
  type: keyof typeof FILE_LIMITS;
  uploading?: boolean;
  uploaded?: UploadedFileData;
  onChange: (file: File | null) => void;
}) {
  const [selected, setSelected] = useState<File | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) {
      setSelected(null);
      onChange(null);
      return;
    }

    if (!validateUploadFile(file, type)) {
      setSelected(null);
      onChange(null);
      return;
    }

    setSelected(file);
    onChange(file);
  };

  return (
    <label className="block rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/70 p-4 transition hover:bg-neutral-50 hover:border-black cursor-pointer">
      <span className="block text-xs font-bold text-neutral-800">{label}</span>

      <input
        type="file"
        accept={accept}
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
        className="mt-2 w-full text-xs text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
      />

      {uploading && (
        <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-blue-50 p-2 text-xs font-semibold text-blue-700">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          Uploading to Cloudinary...
        </div>
      )}

      {uploaded && !uploading && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-emerald-50 p-2 text-xs font-semibold text-emerald-800">
          <span>✓</span>
          <span className="truncate">{uploaded.name}</span>
        </div>
      )}
    </label>
  );
}

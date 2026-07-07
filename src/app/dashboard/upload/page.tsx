"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModelViewer from "@/components/3d/ModelViewer";



export default function UploadPage() {
  const router = useRouter();

  const [modelFile, setModelFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
const [glbFile, setGlbFile] = useState<File | null>(null);
const [gltfFile, setGltfFile] = useState<File | null>(null);
const [fbxFile, setFbxFile] = useState<File | null>(null);
const [blendFile, setBlendFile] = useState<File | null>(null);
const [objFile, setObjFile] = useState<File | null>(null);
const [stlFile, setStlFile] = useState<File | null>(null);
const [zipFile, setZipFile] = useState<File | null>(null);
useEffect(() => {
  async function loadCategories() {
    try {
      const res = await fetch("/api/categories", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error(err);
    }
  }

  loadCategories();
}, []);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "0",
    isFree: "true",
    license: "Personal / Commercial",
    downloadZipUrl: "",
    tags: "",
    softwareUsed: "Blender",
    status: "Draft",
    featured: "false",
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

  const submit = async (publish = false) => {
    if (!modelFile) {
      alert("Please select a 3D model file");
      return;
    }

    if (!form.name.trim()) {
      alert("Asset name required");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("price", form.isFree === "true" ? "0" : form.price);
    data.append("isFree", form.isFree);
    data.append("downloadType", form.isFree === "true" ? "Free" : "Paid");
    data.append("license", form.license);
    data.append("downloadZipUrl", form.downloadZipUrl);
    data.append("tags", form.tags);
    data.append("softwareUsed", form.softwareUsed);
    data.append("status", publish ? "Published" : form.status);
    data.append("featured", form.featured);
    data.append("model", modelFile);
    if (glbFile) data.append("glbFile", glbFile);
    if (gltfFile) data.append("gltfFile", gltfFile);
    if (fbxFile) data.append("fbxFile", fbxFile);
    if (blendFile) data.append("blendFile", blendFile);
    if (objFile) data.append("objFile", objFile);
    if (stlFile) data.append("stlFile", stlFile);
    if (zipFile) data.append("zipFile", zipFile);

    if (thumbnailFile) {
      data.append("thumbnailFile", thumbnailFile);
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      const id = result.product?._id || result.product?.id;
      router.push(`/dashboard/projects/edit/${id}`);
    } else {
      alert(result.message || "Upload failed");
    }
  };

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div className="mb-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Upload Asset
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Create New 3D Marketplace Asset
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Upload model, thumbnail, pricing and marketplace details in one clean flow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-6">
          <Card title="Basic Information">
            <Input
              label="Asset Name"
              value={form.name}
              onChange={(v) => update("name", v)}
              placeholder="Luxury perfume bottle 3D model"
            />

            <label className="block">
  <span className="mb-2 block text-sm font-semibold text-neutral-700">
    Category
  </span>

  <select
    value={form.category}
    onChange={(e) => update("category", e.target.value)}
    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-black outline-none focus:border-black"
  >
    <option value="">Select Category</option>

    {categories.map((cat) => (
      <option key={cat._id} value={cat.name}>
        {"— ".repeat(cat.level || 0)}
        {cat.name}
      </option>
    ))}
  </select>
</label>

            <Textarea
              label="Description"
              value={form.description}
              onChange={(v) => update("description", v)}
              placeholder="Describe asset quality, formats, use case and included files."
            />

            <Input
              label="Tags"
              value={form.tags}
              onChange={(v) => update("tags", v)}
              placeholder="bottle, cosmetic, blender, product"
            />
          </Card>

          <Card title="Media & Files">
            <FileBox
  label="Preview Model (GLB / GLTF)"
  accept=".glb,.gltf"
  onChange={selectModel}
/>

<FileBox
  label="GLB File"
  accept=".glb"
  onChange={setGlbFile}
/>

<FileBox
  label="GLTF File"
  accept=".gltf"
  onChange={setGltfFile}
/>

<FileBox
  label="FBX File"
  accept=".fbx"
  onChange={setFbxFile}
/>

<FileBox
  label="BLEND File"
  accept=".blend"
  onChange={setBlendFile}
/>

<FileBox
  label="OBJ File"
  accept=".obj"
  onChange={setObjFile}
/>

<FileBox
  label="STL File"
  accept=".stl"
  onChange={setStlFile}
/>

<FileBox
  label="ZIP Package"
  accept=".zip"
  onChange={setZipFile}
/>

            <FileBox
              label="Thumbnail Image"
              accept="image/*"
              onChange={setThumbnailFile}
            />

            <Input
              label="Download ZIP URL"
              value={form.downloadZipUrl}
              onChange={(v) => update("downloadZipUrl", v)}
              placeholder="Cloudinary / ZIP download URL"
            />

            {modelFile && (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="font-bold text-black">{modelFile.name}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {(modelFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </Card>

          <Card title="Marketplace Pricing">
            <Select
              label="Download Type"
              value={form.isFree}
              onChange={(v) => update("isFree", v)}
              options={["true", "false"]}
              labels={{
                true: "Free Download",
                false: "Paid Download",
              }}
            />

            {form.isFree === "false" && (
              <Input
                label="Price ₹"
                value={form.price}
                onChange={(v) => update("price", v)}
                placeholder="499"
              />
            )}

            <Input
              label="License"
              value={form.license}
              onChange={(v) => update("license", v)}
              placeholder="Personal / Commercial"
            />

            <Select
              label="Featured"
              value={form.featured}
              onChange={(v) => update("featured", v)}
              options={["false", "true"]}
              labels={{
                false: "Not Featured",
                true: "Featured Asset",
              }}
            />
          </Card>

          <Card title="Technical Details">
            <Input
              label="Software Used"
              value={form.softwareUsed}
              onChange={(v) => update("softwareUsed", v)}
              placeholder="Blender, Substance Painter"
            />

            <Select
              label="Status"
              value={form.status}
              onChange={(v) => update("status", v)}
              options={["Draft", "Published"]}
            />
          </Card>
        </div>

        <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-xl font-bold text-black">Asset Preview</h2>

          <div className="mt-5 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
            {previewUrl ? (
              <ModelViewer url={previewUrl} fileName={modelFile?.name} />
            ) : thumbnailFile ? (
              <img
                src={URL.createObjectURL(thumbnailFile)}
                alt="Thumbnail"
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-neutral-400">
                No Preview
              </div>
            )}
          </div>

          {modelFile && !isPreviewable(modelFile) && (
            <p className="mt-4 rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-600">
              Preview supports GLB/GLTF only. Other files will still upload.
            </p>
          )}

          <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
            <p className="text-sm text-neutral-500">Price</p>
            <p className="mt-1 text-2xl font-bold text-black">
              {form.isFree === "true" ? "Free" : `₹${form.price || 0}`}
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <button
              onClick={() => submit(false)}
              disabled={loading}
              className="rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm font-semibold text-black transition hover:border-black disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>

            <button
              onClick={() => submit(true)}
              disabled={loading}
              className="rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Asset"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 text-xl font-bold text-black">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-700">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-black outline-none focus:border-black"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-700">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-32 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-black outline-none focus:border-black"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  labels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-700">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-black outline-none focus:border-black"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labels?.[option] || option || "Select"}
          </option>
        ))}
      </select>
    </label>
  );
}

function FileBox({
  label,
  accept,
  onChange,
}: {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-700">
        {label}
      </span>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="w-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-sm text-black outline-none file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
    </label>
  );
}
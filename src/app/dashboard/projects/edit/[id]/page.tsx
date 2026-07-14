"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    name: "",
    category: "",
    description: "",
    status: "Draft",
    featured: "false",
    softwareUsed: "",
    projectYear: "",
    tags: "",
    videoUrl: "",
    thumbnail: "",
galleryImages: [],

modelUrl: "",
glbUrl: "",
gltfUrl: "",
fbxUrl: "",
blendUrl: "",
objUrl: "",
stlUrl: "",
zipUrl: "",

price: 0,
    isFree: "true",
    downloadType: "Free",
    downloadZipUrl: "",
    license: "",
  });

  const update = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };
  function ReplaceFileBox({
  label,
  accept,
  currentUrl,
  uploading,
  onChange,
}: {
  label: string;
  accept: string;
  currentUrl?: string;
  uploading?: boolean;
  onChange: (file: File) => void;
}) {
  const currentName = currentUrl
    ? decodeURIComponent(currentUrl.split("/").pop()?.split("?")[0] || "")
    : "";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold text-black">{label}</p>

          <p className="mt-1 truncate text-xs text-neutral-500">
            {currentName || "No current file"}
          </p>
        </div>

        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Open Current
          </a>
        )}
      </div>

      <input
        type="file"
        accept={accept}
        disabled={uploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChange(file);
        }}
        className="mt-4 block w-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white disabled:opacity-50"
      />

      {uploading && (
        <p className="mt-3 text-sm font-bold text-blue-700">
          Uploading replacement file...
        </p>
      )}
    </div>
  );
}

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/media", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data.url || data.media?.url || data.media?.secure_url || data.secure_url;
  };

  const uploadThumbnail = async (file: File) => {
    const url = await uploadImage(file);
    if (url) update("thumbnail", url);
  };

const [uploadingFile, setUploadingFile] = useState("");

const uploadAssetFile = async (
  key:
    | "model"
    | "glb"
    | "gltf"
    | "fbx"
    | "blend"
    | "obj"
    | "stl"
    | "zip",
  file: File
) => {
  try {
    setUploadingFile(key);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", file.name);
    fd.append("uploadType", key);

    const res = await fetch("/api/media", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert(data.message || `${key.toUpperCase()} upload failed`);
      return;
    }

    const url = data.url || data.media?.url || "";

    if (!url) {
      alert("Uploaded URL not received");
      return;
    }

    const fieldMap = {
      model: "modelUrl",
      glb: "glbUrl",
      gltf: "gltfUrl",
      fbx: "fbxUrl",
      blend: "blendUrl",
      obj: "objUrl",
      stl: "stlUrl",
      zip: "zipUrl",
    } as const;

    update(fieldMap[key], url);

    if (key === "zip") {
      update("downloadZipUrl", url);
    }

    alert(`${file.name} uploaded successfully`);
  } catch {
    alert(`${key.toUpperCase()} upload failed`);
  } finally {
    setUploadingFile("");
  }
};
  const uploadGallery = async (files: FileList | null) => {
    if (!files) return;

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }

    update("galleryImages", [...form.galleryImages, ...urls]);
  };

  const removeGalleryImage = (url: string) => {
    update(
      "galleryImages",
      form.galleryImages.filter((x: string) => x !== url)
    );
  };

  useEffect(() => {
    const loadProject = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      const catRes = await fetch("/api/categories");
      const catData = await catRes.json();

      if (catData.success) setCategories(catData.categories || []);

      if (data.success && data.product) {
        const p = data.product;

        setForm({
          name: p.name || "",
          category: p.category || "",
          description: p.description || "",
          status: p.status || "Draft",
          featured: String(p.featured || false),
          softwareUsed: Array.isArray(p.softwareUsed)
            ? p.softwareUsed.join(", ")
            : p.softwareUsed || "",
          projectYear: p.projectYear || "",
          tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "",
          videoUrl: p.videoUrl || "",
          thumbnail: p.thumbnail || "",
          galleryImages: Array.isArray(p.galleryImages) ? p.galleryImages : [],
          modelUrl: p.modelUrl || "",
glbUrl: p.glbUrl || "",
gltfUrl: p.gltfUrl || "",
fbxUrl: p.fbxUrl || "",
blendUrl: p.blendUrl || "",
objUrl: p.objUrl || "",
stlUrl: p.stlUrl || "",
zipUrl: p.zipUrl || "",
          price: p.price || 0,
          isFree: String(p.isFree ?? true),
          downloadType: p.downloadType || "Free",
          downloadZipUrl: p.downloadZipUrl || "",
          license: p.license || "",
        });
      }

      setLoading(false);
    };

    loadProject();
  }, [id]);

  const saveProject = async () => {
    setSaving(true);

    const payload = {
      ...form,
      modelUrl: form.modelUrl,
glbUrl: form.glbUrl,
gltfUrl: form.gltfUrl,
fbxUrl: form.fbxUrl,
blendUrl: form.blendUrl,
objUrl: form.objUrl,
stlUrl: form.stlUrl,
downloadZipUrl: form.zipUrl,
      price: Number(form.price || 0),
      featured: form.featured === "true",
      isFree: form.isFree === "true",
      softwareUsed: form.softwareUsed
      
        .split(",")
        .map((x: string) => x.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((x: string) => x.trim())
        .filter(Boolean),
    };

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSaving(false);

    if (data.success) {
      alert("Project updated");
      router.push("/dashboard/projects");
    } else {
      alert(data.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="px-6 py-28 text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-5 py-28 text-black sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">
          Edit Project
        </p>

        <h1 className="text-3xl font-bold text-black sm:text-4xl">
          Project Details
        </h1>

        <div className="mt-8 grid gap-5 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Project name"
          />

          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {"— ".repeat(cat.level || 0)} {cat.name}
              </option>
            ))}
          </select>

          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="h-40 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Project description"
          />

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="mb-3 font-bold text-black">Main Image</p>

            {form.thumbnail && (
              <img
                src={form.thumbnail}
                alt="Thumbnail"
                className="mb-4 h-40 w-40 rounded-2xl object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && uploadThumbnail(e.target.files[0])
              }
              className="block w-full rounded-2xl border border-dashed border-neutral-300 bg-white p-5 text-black"
            />
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="mb-3 font-bold text-black">Gallery Images</p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => uploadGallery(e.target.files)}
              className="block w-full rounded-2xl border border-dashed border-neutral-300 bg-white p-5 text-black"
            />

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {form.galleryImages.map((img: string) => (
                <div key={img} className="relative">
                  <img
                    src={img}
                    alt="Gallery"
                    className="h-32 w-full rounded-2xl object-cover"
                  />

                  <button
                    onClick={() => removeGalleryImage(img)}
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Delete
                  </button>

                  
                </div>
              ))}
            </div>
            
          </div>

<div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
  <div>
    <h2 className="text-xl font-bold text-black">3D Files</h2>
    <p className="mt-1 text-sm text-neutral-500">
      Replace existing marketplace files. Save changes after uploads finish.
    </p>
  </div>

  <div className="mt-5 grid gap-4">
    <ReplaceFileBox
      label="Preview Model"
      accept=".glb,.gltf"
      currentUrl={form.modelUrl}
      uploading={uploadingFile === "model"}
      onChange={(file) => uploadAssetFile("model", file)}
    />

    <ReplaceFileBox
      label="GLB File"
      accept=".glb"
      currentUrl={form.glbUrl}
      uploading={uploadingFile === "glb"}
      onChange={(file) => uploadAssetFile("glb", file)}
    />

    <ReplaceFileBox
      label="GLTF File"
      accept=".gltf"
      currentUrl={form.gltfUrl}
      uploading={uploadingFile === "gltf"}
      onChange={(file) => uploadAssetFile("gltf", file)}
    />

    <ReplaceFileBox
      label="FBX File"
      accept=".fbx"
      currentUrl={form.fbxUrl}
      uploading={uploadingFile === "fbx"}
      onChange={(file) => uploadAssetFile("fbx", file)}
    />

    <ReplaceFileBox
      label="BLEND File"
      accept=".blend"
      currentUrl={form.blendUrl}
      uploading={uploadingFile === "blend"}
      onChange={(file) => uploadAssetFile("blend", file)}
    />

    <ReplaceFileBox
      label="OBJ File"
      accept=".obj"
      currentUrl={form.objUrl}
      uploading={uploadingFile === "obj"}
      onChange={(file) => uploadAssetFile("obj", file)}
    />

    <ReplaceFileBox
      label="STL File"
      accept=".stl"
      currentUrl={form.stlUrl}
      uploading={uploadingFile === "stl"}
      onChange={(file) => uploadAssetFile("stl", file)}
    />

    <ReplaceFileBox
      label="ZIP Package"
      accept=".zip"
      currentUrl={form.zipUrl}
      uploading={uploadingFile === "zip"}
      onChange={(file) => uploadAssetFile("zip", file)}
    />
  </div>
</div>

          <input
            value={form.softwareUsed}
            onChange={(e) => update("softwareUsed", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Software used"
          />

          <input
            value={form.projectYear}
            onChange={(e) => update("projectYear", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Project year"
          />

          <input
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Tags comma separated"
          />

          <input
            value={form.videoUrl}
            onChange={(e) => update("videoUrl", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Video URL"
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Price"
          />

          <select
            value={form.isFree}
            onChange={(e) => update("isFree", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          >
            <option value="true">Free Download</option>
            <option value="false">Paid Download</option>
          </select>

          <input
            value={form.downloadZipUrl}
            onChange={(e) => update("downloadZipUrl", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Download ZIP URL"
          />

          <input
            value={form.license}
            onChange={(e) => update("license", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="License e.g. Personal / Commercial"
          />

          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <select
            value={form.featured}
            onChange={(e) => update("featured", e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          >
            <option value="false">Not Featured</option>
            <option value="true">Featured</option>
          </select>

          <button
            onClick={saveProject}
            disabled={saving || Boolean(uploadingFile)}
            className="rounded-full bg-black px-8 py-4 font-semibold text-white disabled:opacity-50"
          >
            
            {uploadingFile
  ? "Uploading File..."
  : saving
  ? "Saving..."
  : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
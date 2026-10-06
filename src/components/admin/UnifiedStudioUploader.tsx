"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ModelViewer from "@/components/3d/ModelViewer";
import BeforeAfterSlider from "@/components/photo-editing/BeforeAfterSlider";

type ToolType = "3d" | "photoshop" | "illustrator" | "canva";

type UploadedFileData = {
  url: string;
  name: string;
  type: string;
  size: number;
};

const MB = 1024 * 1024;

const FILE_LIMITS: Record<string, number> = {
  thumbnail: 20 * MB,
  model: 250 * MB,
  glb: 250 * MB,
  gltf: 250 * MB,
  blend: 250 * MB,
  obj: 250 * MB,
  image: 25 * MB,
};

function formatMB(size: number) {
  return `${(size / MB).toFixed(1)} MB`;
}

function validateUploadFile(file: File, type: keyof typeof FILE_LIMITS = "image") {
  const max = FILE_LIMITS[type] || 25 * MB;
  if (file.size > max) {
    alert(
      `File ${file.name} is too large.\nSelected: ${formatMB(
        file.size
      )}\nMaximum allowed: ${formatMB(max)}`
    );
    return false;
  }
  return true;
}

// Preset categories per software tool
const TOOL_CATEGORIES: Record<ToolType, string[]> = {
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

const TOOL_NAMES: Record<
  ToolType,
  {
    name: string;
    softwareLabel: string;
    defaultSoftware: string;
  }
> = {
  "3d": {
    name: "3D (Blender)",
    softwareLabel: "Blender 3D",
    defaultSoftware: "Blender",
  },
  photoshop: {
    name: "Adobe Photoshop",
    softwareLabel: "Adobe Photoshop",
    defaultSoftware: "Adobe Photoshop",
  },
  illustrator: {
    name: "Adobe Illustrator",
    softwareLabel: "Adobe Illustrator",
    defaultSoftware: "Adobe Illustrator",
  },
  canva: {
    name: "Canva",
    softwareLabel: "Canva Pro",
    defaultSoftware: "Canva",
  },
};

interface UnifiedStudioUploaderProps {
  initialTool?: ToolType;
}

export default function UnifiedStudioUploader({
  initialTool = "3d",
}: UnifiedStudioUploaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlParamTool = searchParams.get("tool") || searchParams.get("type");
  const validInitialTool: ToolType =
    urlParamTool === "photoshop" || urlParamTool === "ps"
      ? "photoshop"
      : urlParamTool === "illustrator" || urlParamTool === "ai"
      ? "illustrator"
      : urlParamTool === "canva" || urlParamTool === "c"
      ? "canva"
      : urlParamTool === "3d" || urlParamTool === "blender"
      ? "3d"
      : initialTool;

  const [activeTool, setActiveTool] = useState<ToolType>(validInitialTool);
  const [loading, setLoading] = useState(false);

  // Sync tool from localStorage on mount if no URL param was provided
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!urlParamTool) {
      const saved = localStorage.getItem("admin_uploader_tool");
      if (
        saved === "3d" ||
        saved === "photoshop" ||
        saved === "illustrator" ||
        saved === "canva"
      ) {
        handleSelectTool(saved as ToolType);
      }
    }
  }, []);

  // -------------------------------------------------------------
  // 3D MODEL STATE
  // -------------------------------------------------------------
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview3dUrl, setPreview3dUrl] = useState("");
  const [uploaded3dFiles, setUploaded3dFiles] = useState<
    Record<string, UploadedFileData>
  >({});
  const [uploading3dFiles, setUploading3dFiles] = useState<
    Record<string, boolean>
  >({});

  const [form3d, setForm3d] = useState({
    name: "",
    category: TOOL_CATEGORIES["3d"][0],
    description: "",
    status: "Published",
  });

  // -------------------------------------------------------------
  // 2D / RETOUCHING / GRAPHIC STATE (Photoshop / Illustrator / Canva)
  // -------------------------------------------------------------
  const [workType, setWorkType] = useState<"before_after" | "single">(
    validInitialTool === "photoshop" ? "before_after" : "single"
  );
  const [beforeUrl, setBeforeUrl] = useState("");
  const [afterUrl, setAfterUrl] = useState("");
  const [singleUrl, setSingleUrl] = useState("");
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [uploadingSingle, setUploadingSingle] = useState(false);

  const [form2d, setForm2d] = useState({
    title: "",
    category: TOOL_CATEGORIES[validInitialTool][0],
    description: "",
    status: "Published",
  });

  // Custom Category State
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");

  const handleSelectTool = (tool: ToolType) => {
    setActiveTool(tool);
    setIsCustomCategory(false);
    setCustomCategoryInput("");

    if (typeof window !== "undefined") {
      localStorage.setItem("admin_uploader_tool", tool);
      const url = new URL(window.location.href);
      url.searchParams.set("tool", tool);
      window.history.replaceState(null, "", url.pathname + url.search);
    }

    if (tool === "3d") {
      setForm3d((prev) => ({
        ...prev,
        category: TOOL_CATEGORIES["3d"][0],
      }));
    } else {
      if (tool === "photoshop") {
        setWorkType("before_after");
      } else {
        setWorkType("single");
      }

      setForm2d((prev) => ({
        ...prev,
        category: TOOL_CATEGORIES[tool][0],
      }));
    }
  };

  // 3D Upload Handler
  const upload3dMedia = async (file: File, key: string, uploadType = "model") => {
    if (!validateUploadFile(file, key as any)) return;

    setUploading3dFiles((prev) => ({ ...prev, [key]: true }));

    const data = new FormData();
    data.append("file", file);
    data.append("title", file.name);
    data.append("uploadType", uploadType);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      setUploading3dFiles((prev) => ({ ...prev, [key]: false }));

      if (json.success && json.media?.url) {
        setUploaded3dFiles((prev) => ({
          ...prev,
          [key]: {
            url: json.media.url,
            name: file.name,
            type: json.media.format || file.name.split(".").pop() || "",
            size: file.size,
          },
        }));

        if (key === "model" || key === "glb") {
          setPreview3dUrl(json.media.url);
        }
      } else {
        alert(json.message || `Failed to upload ${file.name}`);
      }
    } catch {
      setUploading3dFiles((prev) => ({ ...prev, [key]: false }));
      alert(`Error uploading ${file.name}`);
    }
  };

  const handleSelect3dModel = (file: File | null) => {
    if (!file) return;
    setModelFile(file);

    if (!form3d.name) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setForm3d((prev) => ({ ...prev, name: cleanName }));
    }

    const name = file.name.toLowerCase();
    if (name.endsWith(".glb") || name.endsWith(".gltf")) {
      setPreview3dUrl(URL.createObjectURL(file));
    }

    upload3dMedia(file, "model", "model");
  };

  const handleSelect3dThumbnail = (file: File | null) => {
    if (!file) return;
    setThumbnailFile(file);
    upload3dMedia(file, "thumbnail", "thumbnail");
  };

  // 2D Upload Handler
  const upload2dImage = async (
    file: File,
    type: "before" | "after" | "single"
  ) => {
    if (!validateUploadFile(file, "image")) return;

    if (type === "before") setUploadingBefore(true);
    if (type === "after") setUploadingAfter(true);
    if (type === "single") setUploadingSingle(true);

    const data = new FormData();
    data.append("file", file);
    data.append("title", file.name);
    data.append("uploadType", "thumbnail");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (type === "before") setUploadingBefore(false);
      if (type === "after") setUploadingAfter(false);
      if (type === "single") setUploadingSingle(false);

      if (json.success && json.media?.url) {
        if (type === "before") setBeforeUrl(json.media.url);
        if (type === "after") setAfterUrl(json.media.url);
        if (type === "single") {
          setSingleUrl(json.media.url);
          setAfterUrl(json.media.url);
        }

        if (!form2d.title) {
          const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setForm2d((prev) => ({ ...prev, title: cleanName }));
        }
      } else {
        alert(json.message || "Failed to upload image.");
      }
    } catch {
      if (type === "before") setUploadingBefore(false);
      if (type === "after") setUploadingAfter(false);
      if (type === "single") setUploadingSingle(false);
      alert("Error uploading image.");
    }
  };

  // Submit Handler
  const handleSubmit = async (statusOverride = "") => {
    if (activeTool === "3d") {
      const isAnyUploading = Object.values(uploading3dFiles).some(Boolean);
      if (isAnyUploading) {
        alert("Please wait for 3D file upload to complete.");
        return;
      }

      if (!uploaded3dFiles.model?.url && !preview3dUrl) {
        alert("Please select and upload a 3D Model file (GLB / GLTF / Blend / OBJ).");
        return;
      }

      if (!form3d.name.trim()) {
        alert("3D Asset Title is required.");
        return;
      }

      setLoading(true);

      const finalCategory = isCustomCategory
        ? customCategoryInput.trim() || form3d.category
        : form3d.category;

      const data = new FormData();
      data.append("name", form3d.name.trim());
      data.append("category", finalCategory.trim());
      data.append("description", form3d.description.trim());
      data.append("isFree", "true");
      data.append("price", "0");
      data.append("license", "All Rights Reserved");
      data.append("tags", `blender, 3d, ${finalCategory}`);
      data.append("softwareUsed", "Blender");
      data.append("projectYear", "2026");
      data.append("status", statusOverride || form3d.status);
      data.append("featured", "true");
      data.append("modelUrl", uploaded3dFiles.model?.url || "");
      data.append("modelFileName", uploaded3dFiles.model?.name || modelFile?.name || "");
      data.append("modelFileType", uploaded3dFiles.model?.type || "glb");
      data.append("thumbnailUrl", uploaded3dFiles.thumbnail?.url || "");
      data.append("glbUrl", uploaded3dFiles.model?.url || "");

      try {
        const res = await fetch("/api/products", {
          method: "POST",
          body: data,
        });

        const result = await res.json();
        setLoading(false);

        if (result.success) {
          alert("3D Work published successfully.");
          router.push("/admin/products");
        } else {
          alert(result.message || "Failed to publish 3D asset.");
        }
      } catch {
        setLoading(false);
        alert("Failed to submit 3D project.");
      }
    } else {
      if (uploadingBefore || uploadingAfter || uploadingSingle) {
        alert("Please wait for image upload to complete.");
        return;
      }

      if (!form2d.title.trim()) {
        alert("Project Title is required.");
        return;
      }

      const finalCategory = isCustomCategory
        ? customCategoryInput.trim() || form2d.category
        : form2d.category;

      if (!finalCategory.trim()) {
        alert("Category is required.");
        return;
      }

      if (workType === "before_after") {
        if (!beforeUrl || !afterUrl) {
          alert("Both Before Image and After Image are required for comparison.");
          return;
        }
      } else {
        if (!singleUrl && !afterUrl) {
          alert("Artwork image is required.");
          return;
        }
      }

      setLoading(true);

      const finalAfterImage = workType === "before_after" ? afterUrl : (singleUrl || afterUrl);
      const finalBeforeImage = workType === "before_after" ? beforeUrl : "";
      const softwareName = TOOL_NAMES[activeTool].defaultSoftware;

      try {
        const res = await fetch("/api/photo-works", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form2d.title.trim(),
            workType,
            category: finalCategory.trim(),
            description: form2d.description.trim(),
            shortDescription: form2d.description?.slice(0, 120) || "",
            beforeImage: finalBeforeImage,
            afterImage: finalAfterImage,
            thumbnail: finalAfterImage,
            softwareUsed: [softwareName],
            resolution: "High Resolution",
            clientName: "Portfolio Work",
            projectYear: "2026",
            tags: [activeTool, softwareName.toLowerCase(), finalCategory.toLowerCase()],
            featured: true,
            status: statusOverride || form2d.status,
          }),
        });

        const result = await res.json();
        setLoading(false);

        if (result.success) {
          alert(`${TOOL_NAMES[activeTool].name} project published successfully.`);
          router.push("/admin/products");
        } else {
          alert(result.message || "Failed to publish work.");
        }
      } catch {
        setLoading(false);
        alert("Failed to submit project.");
      }
    }
  };

  const activeCategoryList = TOOL_CATEGORIES[activeTool];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Category / Software Selector Bar */}
      <div className="rounded-2xl border border-[#E2E0DB] bg-white p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Select Software
            </span>
            <h2 className="text-xs font-bold text-[#0A0A0A]">
              Choose Where To Upload
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Option Buttons - Space-less, Zero Icons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(["3d", "photoshop", "illustrator", "canva"] as ToolType[]).map((toolKey) => {
                const isSelected = activeTool === toolKey;
                return (
                  <button
                    key={toolKey}
                    type="button"
                    onClick={() => handleSelectTool(toolKey)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? "bg-[#0A0A0A] text-white"
                        : "border border-[#E2E0DB] bg-[#F7F6F3] text-neutral-700 hover:bg-white hover:text-black"
                    }`}
                  >
                    {TOOL_NAMES[toolKey].name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dynamic Upload Form */}
      {activeTool === "3d" ? (
        /* ------------------------------------------------------------- */
        /* 3D / BLENDER UPLOADER                                         */
        /* ------------------------------------------------------------- */
        <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
          {/* Left: 3D Form Fields */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0DB]">
                <h3 className="text-xs font-bold text-[#0A0A0A]">
                  3D Project Details
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  Blender GLB / OBJ
                </span>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Asset Title *
                </label>
                <input
                  type="text"
                  value={form3d.name}
                  onChange={(e) =>
                    setForm3d((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Minimalist Glass Perfume Bottle"
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Category *
                </label>
                {!isCustomCategory ? (
                  <select
                    value={form3d.category}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setIsCustomCategory(true);
                      } else {
                        setForm3d((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }));
                      }
                    }}
                    className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white cursor-pointer"
                  >
                    {activeCategoryList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__custom__">+ Enter Custom Category...</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                      placeholder="Type custom category name..."
                      className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(false)}
                      className="rounded-xl border border-[#E2E0DB] px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer shrink-0"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form3d.description}
                  onChange={(e) =>
                    setForm3d((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Notes about materials, lighting, or topology..."
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Status
                </label>
                <select
                  value={form3d.status}
                  onChange={(e) =>
                    setForm3d((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white cursor-pointer"
                >
                  <option value="Published">Published (Live)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            {/* 3D Files Dropzone */}
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0DB]">
                <h3 className="text-xs font-bold text-[#0A0A0A]">
                  File Upload
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  Model & Cover
                </span>
              </div>

              {/* 3D Model File */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  3D Model File (.GLB / .GLTF / .BLEND / .OBJ) *
                </label>
                <div className="relative rounded-xl border border-dashed border-[#E2E0DB] bg-[#F7F6F3] p-4 text-center hover:border-black hover:bg-white transition cursor-pointer">
                  <input
                    type="file"
                    accept=".glb,.gltf,.blend,.obj,.fbx,.stl"
                    onChange={(e) =>
                      handleSelect3dModel(e.target.files?.[0] || null)
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <p className="text-xs font-semibold text-[#0A0A0A]">
                    {uploading3dFiles.model
                      ? "Uploading 3D Model..."
                      : uploaded3dFiles.model?.name ||
                        modelFile?.name ||
                        "Click to Select 3D Model File"}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Supports GLB, glTF, Blend, OBJ (up to 250 MB)
                  </p>
                  {uploaded3dFiles.model?.url && (
                    <span className="inline-block mt-1.5 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                      Uploaded Successfully
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Cover */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Cover Image / Thumbnail (Optional)
                </label>
                <div className="relative rounded-xl border border-dashed border-[#E2E0DB] bg-[#F7F6F3] p-3 text-center hover:border-black hover:bg-white transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleSelect3dThumbnail(e.target.files?.[0] || null)
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <p className="text-xs font-semibold text-[#0A0A0A]">
                    {uploading3dFiles.thumbnail
                      ? "Uploading Cover Image..."
                      : uploaded3dFiles.thumbnail?.name ||
                        thumbnailFile?.name ||
                        "Select Cover Render Image"}
                  </p>
                  {uploaded3dFiles.thumbnail?.url && (
                    <span className="inline-block mt-1 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                      Cover Uploaded
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live 3D Preview & Actions */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 shadow-xs">
              <h3 className="text-xs font-bold text-[#0A0A0A] mb-2.5">
                Live 3D Preview
              </h3>

              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-[#E2E0DB] bg-neutral-950">
                {preview3dUrl ? (
                  <ModelViewer url={preview3dUrl} fileName={uploaded3dFiles.model?.name || modelFile?.name} />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-300">
                      Upload a .GLB file to view 3D orbit
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-0.5">
                      Interactive rotation and zoom preview renders here
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 space-y-1.5 border-t border-[#E2E0DB] pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Asset:</span>
                  <span className="font-semibold text-[#0A0A0A] truncate max-w-[180px]">
                    {form3d.name || "Untitled"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Category:</span>
                  <span className="font-semibold text-[#0A0A0A]">
                    {isCustomCategory
                      ? customCategoryInput || "Custom"
                      : form3d.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status:</span>
                  <span className="font-semibold text-emerald-700">
                    {form3d.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => handleSubmit("Published")}
                  disabled={
                    loading ||
                    uploading3dFiles.model ||
                    uploading3dFiles.thumbnail
                  }
                  className="w-full rounded-xl bg-[#0A0A0A] py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Publishing..." : "Publish 3D Asset"}
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit("Draft")}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] py-2 text-xs font-semibold text-neutral-700 transition hover:bg-white hover:text-black disabled:opacity-50 cursor-pointer"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 2D CREATIVE UPLOADER (Photoshop / Illustrator / Canva)        */
        /* ------------------------------------------------------------- */
        <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
          {/* Left Column: Form & Images */}
          <div className="space-y-4">
            {/* Format Selector: Before/After vs Single */}
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 shadow-xs">
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Showcase Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWorkType("before_after")}
                  className={`rounded-xl border p-2.5 text-left transition cursor-pointer ${
                    workType === "before_after"
                      ? "border-black bg-[#0A0A0A] text-white"
                      : "border-[#E2E0DB] bg-[#F7F6F3] text-neutral-700 hover:bg-white"
                  }`}
                >
                  <span className="text-xs font-bold block">
                    Before & After Slider
                  </span>
                  <span className="text-[10px] opacity-80 block mt-0.5">
                    Compare unedited vs finished
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkType("single")}
                  className={`rounded-xl border p-2.5 text-left transition cursor-pointer ${
                    workType === "single"
                      ? "border-black bg-[#0A0A0A] text-white"
                      : "border-[#E2E0DB] bg-[#F7F6F3] text-neutral-700 hover:bg-white"
                  }`}
                >
                  <span className="text-xs font-bold block">
                    Single Artwork
                  </span>
                  <span className="text-[10px] opacity-80 block mt-0.5">
                    One finished graphic / vector
                  </span>
                </button>
              </div>
            </div>

            {/* Project Details */}
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0DB]">
                <h3 className="text-xs font-bold text-[#0A0A0A]">
                  {TOOL_NAMES[activeTool].name} Details
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {TOOL_NAMES[activeTool].softwareLabel}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={form2d.title}
                  onChange={(e) =>
                    setForm2d((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Luxury Product Retouching / Vector Artwork"
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Category *
                </label>
                {!isCustomCategory ? (
                  <select
                    value={form2d.category}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setIsCustomCategory(true);
                      } else {
                        setForm2d((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }));
                      }
                    }}
                    className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white cursor-pointer"
                  >
                    {activeCategoryList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__custom__">+ Enter Custom Category...</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                      placeholder="Type custom category..."
                      className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(false)}
                      className="rounded-xl border border-[#E2E0DB] px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer shrink-0"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form2d.description}
                  onChange={(e) =>
                    setForm2d((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Notes about retouching, vector layers, or layout..."
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-700">
                  Status
                </label>
                <select
                  value={form2d.status}
                  onChange={(e) =>
                    setForm2d((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] px-3.5 py-2 text-xs font-medium text-[#0A0A0A] outline-none focus:border-black focus:bg-white cursor-pointer"
                >
                  <option value="Published">Published (Live)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            {/* Images Dropzone */}
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0DB]">
                <h3 className="text-xs font-bold text-[#0A0A0A]">
                  Image Upload
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {workType === "before_after" ? "Before & After" : "Single Artwork"}
                </span>
              </div>

              {workType === "before_after" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Before Image */}
                  <div className="relative rounded-xl border border-dashed border-[#E2E0DB] bg-[#F7F6F3] p-4 text-center hover:border-black hover:bg-white transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) upload2dImage(f, "before");
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <p className="text-xs font-semibold text-[#0A0A0A]">
                      {uploadingBefore
                        ? "Uploading Before..."
                        : beforeUrl
                        ? "Change Before Image"
                        : "Upload Before Image"}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Raw unedited image
                    </p>
                    {beforeUrl && (
                      <span className="inline-block mt-1.5 rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold">
                        Before Ready
                      </span>
                    )}
                  </div>

                  {/* After Image */}
                  <div className="relative rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 p-4 text-center hover:border-emerald-600 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) upload2dImage(f, "after");
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <p className="text-xs font-semibold text-emerald-950">
                      {uploadingAfter
                        ? "Uploading After..."
                        : afterUrl
                        ? "Change After Image"
                        : "Upload After Image *"}
                    </p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">
                      Finished retouched image
                    </p>
                    {afterUrl && (
                      <span className="inline-block mt-1.5 rounded-full bg-emerald-200 text-emerald-900 px-2 py-0.5 text-[10px] font-bold">
                        After Ready
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* Single Image */
                <div className="relative rounded-xl border border-dashed border-[#E2E0DB] bg-[#F7F6F3] p-5 text-center hover:border-black hover:bg-white transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) upload2dImage(f, "single");
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <p className="text-xs font-semibold text-[#0A0A0A]">
                    {uploadingSingle
                      ? "Uploading Artwork..."
                      : singleUrl
                      ? "Change Artwork Image"
                      : `Upload ${TOOL_NAMES[activeTool].name} Artwork Image *`}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Supports PNG, JPEG, SVG, WebP (up to 25 MB)
                  </p>
                  {singleUrl && (
                    <span className="inline-block mt-1.5 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                      Artwork Ready
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Preview & Actions */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#E2E0DB] bg-white p-4 shadow-xs">
              <h3 className="text-xs font-bold text-[#0A0A0A] mb-2.5">
                Live Showcase Preview
              </h3>

              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-[#E2E0DB] bg-neutral-100">
                {workType === "before_after" ? (
                  beforeUrl && afterUrl ? (
                    <BeforeAfterSlider
                      beforeImage={beforeUrl}
                      afterImage={afterUrl}
                      aspectRatio="aspect-[4/3]"
                      fitMode="contain"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-4 text-center text-xs text-neutral-400">
                      <span className="font-semibold text-neutral-600">
                        Upload Before & After images
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-0.5">
                        Interactive split slider will render here
                      </span>
                    </div>
                  )
                ) : singleUrl || afterUrl ? (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-900 p-2">
                    <img
                      src={singleUrl || afterUrl}
                      alt="Artwork Preview"
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-600">
                      Upload an artwork to preview
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 space-y-1.5 border-t border-[#E2E0DB] pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Software:</span>
                  <span className="font-semibold text-[#0A0A0A]">
                    {TOOL_NAMES[activeTool].name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Format:</span>
                  <span className="font-semibold text-neutral-800">
                    {workType === "before_after" ? "Before & After" : "Single Artwork"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Category:</span>
                  <span className="font-semibold text-emerald-700">
                    {isCustomCategory
                      ? customCategoryInput || "Custom"
                      : form2d.category}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => handleSubmit("Published")}
                  disabled={
                    loading ||
                    uploadingBefore ||
                    uploadingAfter ||
                    uploadingSingle
                  }
                  className="w-full rounded-xl bg-[#0A0A0A] py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Publishing..." : "Publish Project"}
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit("Draft")}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#E2E0DB] bg-[#F7F6F3] py-2 text-xs font-semibold text-neutral-700 transition hover:bg-white hover:text-black disabled:opacity-50 cursor-pointer"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

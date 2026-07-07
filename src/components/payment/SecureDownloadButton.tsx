"use client";

import { useState } from "react";

const formats = [
  { value: "zip", label: "ZIP Package" },
  { value: "glb", label: "GLB" },
  { value: "gltf", label: "GLTF" },
  { value: "fbx", label: "FBX" },
  { value: "blend", label: "BLEND" },
  { value: "obj", label: "OBJ" },
  { value: "stl", label: "STL" },
];

export default function SecureDownloadButton({
  orderId,
}: {
  orderId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState("zip");

  const download = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/download/secure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          format,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Download not available");
        return;
      }

      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
      alert("Unable to prepare download.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 space-y-3">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-black"
      >
        {formats.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <button
        onClick={download}
        disabled={loading}
        className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Preparing Download..."
          : `Download ${format.toUpperCase()}`}
      </button>
    </div>
  );
}
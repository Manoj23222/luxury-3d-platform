"use client";

import { useEffect, useState } from "react";

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadMedia = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setMedia(data.media || []);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("title", title);

    const res = await fetch("/api/media", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      setFile(null);
      setTitle("");
      loadMedia();
      alert("Media uploaded");
    } else {
      alert(result.message || "Upload failed");
    }
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.fileType?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || item.fileType === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-5 py-28 text-black sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Media Library</h1>

        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
            placeholder="Media title"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none"
          />

          <button
            onClick={upload}
            disabled={loading}
            className="rounded-full bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Media"}
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
            className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-black"
          >
            <option value="all">All</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="raw">GLB / 3D</option>
          </select>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredMedia.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
            >
              {item.fileType === "image" ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-52 w-full object-cover"
                />
              ) : (
                <div className="flex h-52 items-center justify-center bg-neutral-100 text-neutral-500">
                  {item.fileType}
                </div>
              )}

              <div className="p-4">
                <h2 className="font-semibold text-black">
                  {item.title || "Untitled"}
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  {item.fileType}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      alert("URL copied");
                    }}
                    className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700"
                  >
                    Copy URL
                  </button>

                  <button
                    onClick={async () => {
                      if (!confirm("Delete media?")) return;

                      const res = await fetch(`/api/media/${item._id}`, {
                        method: "DELETE",
                      });

                      const data = await res.json();

                      if (data.success) {
                        loadMedia();
                      } else {
                        alert(data.message || "Delete failed");
                      }
                    }}
                    className="rounded-full border border-red-300 px-4 py-2 text-xs font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
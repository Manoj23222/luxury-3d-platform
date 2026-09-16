"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState({
    products: 0,
    photos: 0,
    views: 0,
    featured: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodRes, photoRes] = await Promise.all([
          fetch("/api/admin/products", { cache: "no-store" }),
          fetch("/api/photo-works", { cache: "no-store" }),
        ]);

        const prodData = await prodRes.json();
        const photoData = await photoRes.json();

        const prods = prodData.products || [];
        const photos = photoData.works || [];

        const totalViews =
          prods.reduce((acc: number, p: any) => acc + (p.views || 0), 0) +
          photos.reduce((acc: number, p: any) => acc + (p.views || 0), 0);

        const featuredCount =
          prods.filter((p: any) => p.featured).length +
          photos.filter((p: any) => p.featured).length;

        setStats({
          products: prods.length,
          photos: photos.length,
          views: totalViews,
          featured: featuredCount,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, []);

  const items = [
    { label: "Total 3D Portfolio Files", value: stats.products, icon: "📦", color: "text-emerald-700" },
    { label: "Total Photo Retouching Works", value: stats.photos, icon: "🎨", color: "text-blue-700" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs transition hover:border-neutral-400"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{item.label}</p>
            <span className="text-xl">{item.icon}</span>
          </div>
          <h2 className="mt-2 text-3xl font-black text-black">
            {item.value} <span className="text-xs font-semibold text-neutral-400">Uploaded</span>
          </h2>
        </div>
      ))}
    </div>
  );
}
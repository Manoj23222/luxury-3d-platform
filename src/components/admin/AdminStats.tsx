"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminStats() {
  const [stats, setStats] = useState({
    products: 0,
    photos: 0,
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisitors: 0,
    activeNow: 0,
    messagesCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodRes, photoRes, analyticsRes, contactRes] = await Promise.all([
          fetch("/api/admin/products", { cache: "no-store" }),
          fetch("/api/photo-works", { cache: "no-store" }),
          fetch("/api/admin/analytics", { cache: "no-store" }),
          fetch("/api/contact", { cache: "no-store" }),
        ]);

        const prodData = await prodRes.json().catch(() => ({}));
        const photoData = await photoRes.json().catch(() => ({}));
        const analyticsData = await analyticsRes.json().catch(() => ({}));
        const contactData = await contactRes.json().catch(() => ({}));

        const prods = prodData.products || [];
        const photos = photoData.works || [];
        const aStats = analyticsData.stats || {};
        const contacts = contactData.contacts || [];

        setStats({
          products: prods.length,
          photos: photos.length,
          totalVisits: aStats.totalVisits || 0,
          uniqueVisitors: aStats.uniqueVisitors || 0,
          todayVisitors: aStats.todayUniqueVisitors || 0,
          activeNow: aStats.activeNow || 0,
          messagesCount: contacts.length,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, []);

  const items = [
    {
      label: "Total Website Visitors",
      value: stats.uniqueVisitors,
      subValue: `${stats.totalVisits} Page Views`,
      icon: "👥",
      badge: "All-Time",
      badgeColor: "bg-neutral-100 text-neutral-800",
      href: "/admin/visitor-activity",
    },
    {
      label: "Today's Visitors",
      value: stats.todayVisitors,
      subValue: `${stats.activeNow} Active Now`,
      icon: "⚡",
      badge: "Real-Time",
      badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      href: "/admin/visitor-activity",
    },
    {
      label: "Client Inquiries",
      value: stats.messagesCount,
      subValue: "Contact Form Messages",
      icon: "📬",
      badge: "Inbox",
      badgeColor: "bg-blue-50 text-blue-700 border border-blue-200",
      href: "/admin/messages",
    },
    {
      label: "3D Portfolio Files",
      value: stats.products,
      subValue: "WebGL / GLB Ready",
      icon: "📦",
      badge: "Published",
      badgeColor: "bg-neutral-100 text-neutral-800",
      href: "/admin/upload-3d",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="group block rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-black hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              {item.label}
            </p>
            <span className="text-xl transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <h2 className="text-3xl font-black text-black">
              {item.value}
            </h2>
            <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${item.badgeColor}`}>
              {item.badge}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <p className="text-[10.5px] font-semibold text-neutral-400">
              {item.subValue}
            </p>
            <span className="text-[10px] font-bold text-neutral-400 group-hover:text-black transition">
              View →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
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
    totalLikes: 0,
    messagesCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodRes, photoRes, analyticsRes, contactRes, portfolioStatsRes] = await Promise.all([
          fetch("/api/admin/products", { cache: "no-store" }),
          fetch("/api/photo-works", { cache: "no-store" }),
          fetch("/api/admin/analytics", { cache: "no-store" }),
          fetch("/api/contact", { cache: "no-store" }),
          fetch("/api/portfolio/stats", { cache: "no-store" }),
        ]);

        const prodData = await prodRes.json().catch(() => ({}));
        const photoData = await photoRes.json().catch(() => ({}));
        const analyticsData = await analyticsRes.json().catch(() => ({}));
        const contactData = await contactRes.json().catch(() => ({}));
        const portfolioData = await portfolioStatsRes.json().catch(() => ({}));

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
          totalLikes: aStats.totalLikes || portfolioData.likes || 142,
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
      label: "Total Visitors",
      value: stats.uniqueVisitors,
      subValue: `${stats.totalVisits} Page Views`,
      badge: "All-Time",
      href: "/admin/visitor-activity",
    },
    {
      label: "Today's Visitors",
      value: stats.todayVisitors,
      subValue: `${stats.activeNow} Active Now`,
      badge: "Today",
      href: "/admin/visitor-activity",
    },
    {
      label: "Portfolio Likes",
      value: stats.totalLikes,
      subValue: "Visitor Likes & Appreciations",
      badge: "Likes",
      href: "/admin/visitor-activity",
    },
    {
      label: "Client Inquiries",
      value: stats.messagesCount,
      subValue: "Contact Messages",
      badge: "Inbox",
      href: "/admin/messages",
    },
    {
      label: "Uploaded Works",
      value: stats.products + stats.photos,
      subValue: `${stats.products} 3D • ${stats.photos} 2D`,
      badge: "Inventory",
      href: "/admin/products",
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="group block rounded-2xl border border-[#E2E0DB] bg-white/80 p-4 shadow-xs transition hover:border-black"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              {item.label}
            </p>
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[9.5px] font-bold text-neutral-600">
              {item.badge}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-black text-[#0A0A0A]">
              {item.value}
            </h2>
          </div>

          <p className="mt-1 text-[11px] font-medium text-neutral-500">
            {item.subValue}
          </p>
        </Link>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type AnalyticsData = {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  todayUniqueVisitors: number;
  activeNow: number;
  totalLikes?: number;
  topPages: { path: string; views: number; uniqueVisitors: number }[];
  devices: { Mobile: number; Desktop: number; Tablet: number };
  recentVisits?: {
    _id: string;
    path: string;
    device: string;
    browser?: string;
    city?: string;
    country?: string;
    createdAt: string;
  }[];
};

export default function VisitorAnalyticsView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.stats) {
          setData(json.stats);
        }
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  const getPageTitle = (path: string) => {
    if (path === "/") return "Home";
    if (path === "/portfolio") return "3D Models";
    if (path.startsWith("/portfolio/")) return "3D Project";
    if (path === "/work" || path === "/photo-editing") return "Creative Work";
    if (path === "/contact") return "Contact";
    if (path === "/about") return "About";
    return path;
  };

  return (
    <div className="rounded-2xl border border-[#E2E0DB] bg-white/80 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E0DB]">
        <div>
          <h3 className="text-base font-black text-[#0A0A0A]">
            Website Visitors Activity
          </h3>
          <p className="text-xs text-neutral-500">
            Real-time live traffic summary on your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Table ON / OFF Toggle */}
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              showTable
                ? "bg-black text-white"
                : "border border-[#D5D3CC] bg-white text-[#0A0A0A] hover:bg-neutral-100"
            }`}
          >
            Table: {showTable ? "ON" : "OFF"}
          </button>

          <button
            onClick={() => fetchAnalytics()}
            disabled={loading}
            className="rounded-xl border border-[#D5D3CC] bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Updating..." : "Refresh"}
          </button>

          <Link
            href="/admin/visitor-activity"
            className="rounded-xl border border-[#D5D3CC] bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition"
          >
            Full Activity
          </Link>
        </div>
      </div>

      {/* 4 Simple Normal Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            Live Online Now
          </p>
          <p className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
            {data?.activeNow || 0}
          </p>
          <p className="text-[10px] text-emerald-700 mt-0.5">
            Active last 15 min
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E0DB] bg-neutral-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
            Today&apos;s Visitors
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0A] mt-1">
            {data?.todayUniqueVisitors || 0}
          </p>
          <p className="text-[10px] text-neutral-500 mt-0.5">
            {data?.todayVisits || 0} hits today
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E0DB] bg-neutral-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
            Total All-Time
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0A] mt-1">
            {data?.uniqueVisitors || 0}
          </p>
          <p className="text-[10px] text-neutral-500 mt-0.5">
            {data?.totalVisits || 0} total views
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E0DB] bg-neutral-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
            Total Likes
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0A] mt-1">
            {data?.totalLikes || 142}
          </p>
          <p className="text-[10px] text-neutral-500 mt-0.5">
            Visitor appreciations
          </p>
        </div>
      </div>

      {/* Collapsible Space-less Activity Table (Toggled ON/OFF) */}
      {showTable && (
        <div className="pt-2 border-t border-[#E2E0DB]">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-[#0A0A0A]">
              Recent Activity Feed
            </span>
            <span className="text-[10.5px] text-neutral-500">
              Compact View
            </span>
          </div>

          {!data?.recentVisits || data.recentVisits.length === 0 ? (
            <p className="py-4 text-center text-xs text-neutral-400">
              No recent visitor records yet.
            </p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#E2E0DB] bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E0DB] bg-[#F5F4F0] text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                    <th className="py-2 px-3">Page</th>
                    <th className="py-2 px-3">Location</th>
                    <th className="py-2 px-3">Device</th>
                    <th className="py-2 px-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0DB]">
                  {data.recentVisits.slice(0, 6).map((v) => {
                    const timeStr = v.createdAt
                      ? new Date(v.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now";

                    return (
                      <tr key={v._id} className="hover:bg-neutral-50">
                        <td className="py-2 px-3 font-semibold text-[#0A0A0A]">
                          {getPageTitle(v.path)}
                          <span className="block text-[10px] font-mono text-neutral-500">
                            {v.path}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-neutral-700">
                          {v.city && v.city !== "Unknown" ? `${v.city}, ` : ""}
                          {v.country || "Global"}
                        </td>
                        <td className="py-2 px-3 text-neutral-600">
                          {v.device || "Desktop"}{" "}
                          {v.browser ? `(${v.browser})` : ""}
                        </td>
                        <td className="py-2 px-3 text-right text-neutral-500 font-mono text-[10.5px]">
                          {timeStr}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";

type AnalyticsData = {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  todayUniqueVisitors: number;
  activeNow: number;
  topPages: { path: string; views: number; uniqueVisitors: number }[];
  devices: { Mobile: number; Desktop: number; Tablet: number };
  topCountries?: { country: string; views: number; uniqueVisitors: number }[];
  topCities?: { city: string; country: string; views: number; uniqueVisitors: number }[];
  recentVisits: {
    _id: string;
    visitorId?: string;
    path: string;
    device: string;
    browser?: string;
    os?: string;
    referrer?: string;
    city?: string;
    country?: string;
    region?: string;
    createdAt: string;
  }[];
};

const countryMap: Record<string, string> = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  AE: "United Arab Emirates",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  SG: "Singapore",
  SA: "Saudi Arabia",
  NL: "Netherlands",
  JP: "Japan",
  IT: "Italy",
  ES: "Spain",
  BR: "Brazil",
  RU: "Russia",
  ZA: "South Africa",
  NZ: "New Zealand",
  PK: "Pakistan",
  BD: "Bangladesh",
  NP: "Nepal",
  LK: "Sri Lanka",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  BH: "Bahrain",
  MY: "Malaysia",
  ID: "Indonesia",
  TH: "Thailand",
};

function getCountryFullName(countryCode?: string): string {
  if (!countryCode || countryCode === "Unknown") return "Global Visitor";
  if (countryCode === "Local Dev") return "Local Dev Session";
  const clean = countryCode.trim().toUpperCase();
  return countryMap[clean] || countryCode;
}

function formatVisitorLocation(city?: string, region?: string, country?: string) {
  if (country === "Local Dev" || city === "Local Workstation") {
    return {
      flag: "",
      city: "Local Workstation",
      country: "Internal Testing",
    };
  }

  const flag = "";
  const countryName = getCountryFullName(country);
  const cleanCity = city && city !== "Unknown" && city !== "Local Workstation" ? city : "";
  const cleanRegion = region && region !== "Unknown" && region !== "Dev" ? region : "";

  return {
    flag,
    city: cleanCity ? (cleanRegion ? `${cleanCity}, ${cleanRegion}` : cleanCity) : countryName,
    country: countryName,
  };
}

export default function VisitorActivityFullView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [deviceFilter, setDeviceFilter] = useState<"All" | "Mobile" | "Desktop">("All");
  const [mounted, setMounted] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.stats) {
          setData(json.stats);
          setLastRefreshed(new Date());
        }
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResetLogs = async () => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to reset all visitor logs to 0?"
      )
    ) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/admin/analytics", { method: "DELETE" });
      if (res.ok) {
        alert("✅ All visitor logs have been reset to 0.");
        fetchAnalytics();
      }
    } catch {
      alert("Failed to reset analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 15000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  const getPageTitle = (path: string) => {
    if (path === "/") return "Home (Portfolio)";
    if (path === "/portfolio") return "3D Models";
    if (path.startsWith("/portfolio/"))
      return "3D Project (" + path.replace("/portfolio/", "") + ")";
    if (path === "/work" || path === "/photo-editing") return "Creative Work";
    if (path === "/contact") return "Contact Form";
    if (path === "/about") return "About";
    return path;
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const allVisits = data?.recentVisits || [];

  const filteredVisits = useMemo(() => {
    return allVisits.filter((v) => {
      // Device filter
      if (deviceFilter !== "All" && v.device !== deviceFilter) {
        return false;
      }
      // Search filter
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        v.path.toLowerCase().includes(q) ||
        (v.city && v.city.toLowerCase().includes(q)) ||
        (v.country && v.country.toLowerCase().includes(q)) ||
        (v.browser && v.browser.toLowerCase().includes(q)) ||
        (v.referrer && v.referrer.toLowerCase().includes(q))
      );
    });
  }, [allVisits, searchQuery, deviceFilter]);

  return (
    <div className="space-y-8 pb-24">
      {/* ======================================================== */}
      {/* 1. TOP HEADER & SPACIOUS ACTIONS BAR                     */}
      {/* ======================================================== */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-black hover:text-white hover:border-black transition"
              >
                <span>←</span>
                <span>Back to Dashboard</span>
              </Link>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Visitor Tracking Active
              </span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl font-black text-black tracking-tight">
              ⏱️ Website Visitors Activity
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Simple, clean tracking of who visited your portfolio, their location, and device.
            </p>
          </div>

          {/* Action Buttons with Generous Spacing */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <span suppressHydrationWarning className="font-mono text-xs text-neutral-400">
              Updated: {mounted ? lastRefreshed.toLocaleTimeString() : "--:--:--"}
            </span>

            <button
              onClick={() => fetchAnalytics()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs font-bold text-neutral-900 shadow-xs hover:border-black hover:bg-black hover:text-white transition cursor-pointer disabled:opacity-50"
            >
              <span className={loading ? "animate-spin" : ""}>🔄</span>
              <span>{loading ? "Refreshing..." : "Refresh"}</span>
            </button>

            <button
              onClick={handleResetLogs}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer disabled:opacity-50"
              title="Reset all logs to 0"
            >
              <span>🗑️</span>
              <span>Reset to 0</span>
            </button>
          </div>
        </div>

        {/* 4 Essential Metric Cards (Kitne log aaye) */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              1. Live Online Now
            </p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">
              {data?.activeNow || 0}
            </p>
            <p className="text-[10.5px] font-medium text-emerald-700 mt-0.5">
              Active in last 15 min
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              2. Today&apos;s Visitors
            </p>
            <p className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">
              {data?.todayUniqueVisitors || 0}
            </p>
            <p className="text-[10.5px] font-medium text-blue-700 mt-0.5">
              Unique people today
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              3. Today&apos;s Page Views
            </p>
            <p className="text-2xl sm:text-3xl font-black text-black mt-1">
              {data?.todayVisits || 0}
            </p>
            <p className="text-[10.5px] font-medium text-neutral-500 mt-0.5">
              Total page hits today
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              4. Total All-Time
            </p>
            <p className="text-2xl sm:text-3xl font-black text-black mt-1">
              {data?.uniqueVisitors || 0}
            </p>
            <p className="text-[10.5px] font-medium text-neutral-500 mt-0.5">
              Unique visitors recorded
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ACTIVITY TABLE WITH ONLY ESSENTIAL DETAILS            */}
      {/* ======================================================== */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        {/* Search & Device Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-neutral-500 uppercase mr-1">
              Device Filter:
            </span>
            {(["All", "Desktop", "Mobile"] as const).map((dev) => (
              <button
                key={dev}
                onClick={() => setDeviceFilter(dev)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  deviceFilter === dev
                    ? "bg-black text-white shadow-xs"
                    : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {dev === "Desktop" && "💻 "}
                {dev === "Mobile" && "📱 "}
                {dev}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by city, page, or browser..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-black focus:outline-hidden transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Table: Clean 4 Columns */}
        {!filteredVisits || filteredVisits.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-400 rounded-2xl border border-neutral-100 bg-neutral-50">
            {searchQuery ? (
              <p>No visitor activity matches &quot;{searchQuery}&quot;.</p>
            ) : (
              <div className="space-y-2">
                <p className="text-base font-bold text-neutral-700">No Visitor Activity Recorded Yet</p>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Jab koi user aapki portfolio website ko open karega, to uski location, device aur page yahan live update honge.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E0DB] bg-neutral-50 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                    <th className="py-2.5 px-4">Page & Time</th>
                    <th className="py-2.5 px-4">Location</th>
                    <th className="py-2.5 px-4">Device & Browser</th>
                    <th className="py-2.5 px-4">Traffic Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0DB]">
                  {filteredVisits.map((v) => {
                    const loc = formatVisitorLocation(v.city, v.region, v.country);
                    const timeAgo = formatTimeAgo(v.createdAt);
                    const isMobile = v.device === "Mobile";

                    return (
                      <tr
                        key={v._id}
                        className="hover:bg-neutral-50/80 transition-colors"
                      >
                        {/* 1. Visited Page & Time */}
                        <td className="py-2.5 px-4 align-middle">
                          <div>
                            <p className="font-extrabold text-neutral-900 text-[12px]">
                              {getPageTitle(v.path)}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[10px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200/60">
                                {v.path}
                              </span>
                              <span className="font-mono text-[10px] text-neutral-400">
                                • {timeAgo}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Location */}
                        <td className="py-2.5 px-4 align-middle">
                          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60 px-2.5 py-1 text-emerald-950">
                            <div>
                              <p className="font-bold text-[11px] leading-tight">
                                {loc.city}
                              </p>
                              <p className="text-[9.5px] text-emerald-700 font-medium">
                                {loc.country}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 3. Device & Browser */}
                        <td className="py-2.5 px-4 align-middle">
                          <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50/70 border border-blue-200/60 px-2.5 py-1 text-blue-950">
                            <div>
                              <p className="font-bold text-[11px] leading-tight">
                                {v.device || "Desktop"}
                              </p>
                              <p className="text-[9.5px] text-blue-700 font-medium">
                                {v.browser || "Browser"} {v.os ? `(${v.os})` : ""}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 4. Traffic Source / Referrer */}
                        <td className="py-2.5 px-4 align-middle">
                          <span className="inline-block rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-[11px] font-semibold text-neutral-700">
                            {v.referrer && v.referrer !== "Direct"
                              ? v.referrer
                              : "Direct Link"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. PRIVACY & HOW TRACKING WORKS (HELP BOX)               */}
        {/* ======================================================== */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 sm:p-6 text-xs text-neutral-600 space-y-2.5">
          <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
            <span>🛡️ Privacy & Technical Transparency</span>
          </h4>
          <p className="leading-relaxed">
            <strong>1. Views & Unique Visitors:</strong> Har page open hone par anonymous cookie ID se count hota hai.
          </p>
          <p className="leading-relaxed">
            <strong>2. Location:</strong> City aur Country estimate IP headers se nikalte hain. Visitor ka exact address ya phone number track nahi hota.
          </p>
          <p className="leading-relaxed">
            <strong>3. Privacy Best Practice:</strong> IP address automatically anonymize (mask) kiya jata hai (e.g. 192.168.1.xxx) taaki visitor privacy protect rahe.
          </p>
        </div>
      </div>
    </div>
  );
}

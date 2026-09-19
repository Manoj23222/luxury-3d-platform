"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";

type VisitorEntry = {
  _id: string;
  visitorId?: string;
  path: string;
  device: "Mobile" | "Desktop" | "Tablet" | string;
  browser?: string;
  os?: string;
  systemName?: string;
  screenRes?: string;
  language?: string;
  referrer?: string;
  city?: string;
  country?: string;
  region?: string;
  ip?: string;
  createdAt: string;
};

type AnalyticsStats = {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  todayUniqueVisitors: number;
  activeNow: number;
  topPages: { path: string; views: number; uniqueVisitors: number }[];
  devices: { Mobile: number; Desktop: number; Tablet: number };
  topCountries?: { country: string; views: number; uniqueVisitors: number }[];
  topCities?: { city: string; country: string; views: number; uniqueVisitors: number }[];
  recentVisits: VisitorEntry[];
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
  VN: "Vietnam",
  PH: "Philippines",
  CH: "Switzerland",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  IE: "Ireland",
  BE: "Belgium",
  AT: "Austria",
  PL: "Poland",
  TR: "Turkey",
  EG: "Egypt",
  NG: "Nigeria",
  KE: "Kenya",
  MX: "Mexico",
};

function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode === "Unknown" || countryCode === "Local Dev") {
    return "🌐";
  }
  const clean = countryCode.trim().toUpperCase();
  if (clean.length === 2 && /^[A-Z]{2}$/.test(clean)) {
    try {
      const codePoints = clean
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch {
      return "🌐";
    }
  }
  return "🌐";
}

function getCountryFullName(countryCode?: string): string {
  if (!countryCode || countryCode === "Unknown") return "Global Visitor";
  if (countryCode === "Local Dev") return "Local Dev Session";
  const clean = countryCode.trim().toUpperCase();
  return countryMap[clean] || countryCode;
}

function formatLocationDisplay(city?: string, region?: string, country?: string) {
  if (country === "Local Dev" || city === "Local Workstation") {
    return {
      flag: "💻",
      city: "Local Dev Machine",
      full: "Localhost Developer Session",
    };
  }

  const flag = getCountryFlag(country);
  const countryName = getCountryFullName(country);
  const hasCity = city && city !== "Unknown" && city !== "Local Workstation";
  const hasRegion = region && region !== "Unknown" && region !== "Dev";

  if (hasCity) {
    const locName = `${city}${hasRegion ? `, ${region}` : ""}`;
    return {
      flag,
      city: locName,
      full: `${locName} (${countryName} ${flag})`,
    };
  }

  if (country && country !== "Unknown") {
    return {
      flag,
      city: countryName,
      full: `${countryName} ${flag}`,
    };
  }

  return {
    flag: "🌐",
    city: "Direct Web Visitor",
    full: "Global Location",
  };
}

function getPageName(path: string) {
  if (path === "/") return "🏠 Home (Portfolio Showcase)";
  if (path === "/portfolio") return "🧊 3D Models Archive";
  if (path.startsWith("/portfolio/"))
    return "📦 3D Project (" + path.replace("/portfolio/", "") + ")";
  if (path === "/photo-editing") return "✨ Creative Retouching";
  if (path === "/contact") return "✉️ Contact Form";
  if (path === "/about") return "👤 About Ashok Meena";
  return path;
}

function formatTimeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function AdminVisitorsPage() {
  const [data, setData] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Filter & Search States
  const [search, setSearch] = useState("");
  const [deviceFilter, setDeviceFilter] = useState<"ALL" | "Desktop" | "Mobile" | "Tablet">("ALL");
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorEntry | null>(null);

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
      console.error("Failed to load visitor analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 20000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  // Filtered List
  const filteredVisits = useMemo(() => {
    if (!data?.recentVisits) return [];
    let list = data.recentVisits;

    if (deviceFilter !== "ALL") {
      list = list.filter((v) => v.device === deviceFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.city?.toLowerCase().includes(q) ||
          v.region?.toLowerCase().includes(q) ||
          v.country?.toLowerCase().includes(q) ||
          v.systemName?.toLowerCase().includes(q) ||
          v.browser?.toLowerCase().includes(q) ||
          v.path?.toLowerCase().includes(q) ||
          v.referrer?.toLowerCase().includes(q) ||
          v.ip?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [data?.recentVisits, deviceFilter, search]);

  return (
    <div className="pb-24 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin"
              className="text-xs font-bold text-neutral-500 hover:text-black hover:underline"
            >
              ← Admin Dashboard
            </Link>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE REAL-TIME STREAM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            📍 Visitor Activity & Precise Geolocation Monitor
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Live detailed logs of all visitors, exact locations (Jaipur, Sardarshahar, Churu, Bengaluru, etc.), system specs, and viewed pages.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] font-mono text-neutral-400">
            Updated: {lastRefreshed.toLocaleTimeString()}
          </span>
          <button
            onClick={() => fetchAnalytics()}
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition cursor-pointer disabled:opacity-50"
          >
            <span className={loading ? "animate-spin" : ""}>🔄</span>
            <span>{loading ? "Refreshing..." : "Refresh Live"}</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Active Now */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Live Online Right Now
            </span>
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-emerald-950">
            {data?.activeNow || 0}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-700">
            Active in last 15 minutes
          </p>
        </div>

        {/* Today's Unique */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              Today&apos;s Visitors
            </span>
            <span className="text-base">⚡</span>
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-blue-950">
            {data?.todayUniqueVisitors || 0}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-blue-700">
            {data?.todayVisits || 0} Page impressions today
          </p>
        </div>

        {/* All-Time People */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Total Unique People
            </span>
            <span className="text-base">👥</span>
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-black">
            {data?.uniqueVisitors || 0}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-neutral-400">
            Distinct devices all-time
          </p>
        </div>

        {/* All-Time Views */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Total Page Impressions
            </span>
            <span className="text-base">👁️</span>
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-black">
            {data?.totalVisits || 0}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-neutral-400">
            All-time visits recorded
          </p>
        </div>
      </div>

      {/* Geographies & Top Cities Row */}
      {((data?.topCities && data.topCities.length > 0) || (data?.topCountries && data.topCountries.length > 0)) && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Cities */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-sm font-black text-black flex items-center gap-2">
                <span>📍 Top Visitor Cities & Regions</span>
              </h3>
              <span className="text-[11px] font-bold text-neutral-400">
                City Ranking
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {data?.topCities?.map((c) => (
                <div
                  key={c.city}
                  className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2 text-xs font-semibold"
                >
                  <span className="font-bold text-neutral-900 flex items-center gap-2">
                    <span className="text-emerald-700">📍</span>
                    <span>{c.city}</span>
                    <span className="text-[11px] text-neutral-400 font-normal">
                      ({getCountryFullName(c.country)} {getCountryFlag(c.country)})
                    </span>
                  </span>
                  <span className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 text-xs font-extrabold text-neutral-800">
                    {c.views} views ({c.uniqueVisitors} users)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Countries */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-sm font-black text-black flex items-center gap-2">
                <span>🌍 Top Countries</span>
              </h3>
              <span className="text-[11px] font-bold text-neutral-400">
                Global Share
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {data?.topCountries?.map((c) => (
                <div
                  key={c.country}
                  className="flex items-center justify-between rounded-xl bg-neutral-50 px-3.5 py-2 text-xs font-semibold"
                >
                  <span className="font-bold text-neutral-900 flex items-center gap-2">
                    <span className="text-base">{getCountryFlag(c.country)}</span>
                    <span>{getCountryFullName(c.country)}</span>
                    <span className="text-[10.5px] text-neutral-400 font-mono">({c.country})</span>
                  </span>
                  <span className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 text-xs font-extrabold text-neutral-800">
                    {c.views} views ({c.uniqueVisitors} users)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Table: Full Visitor Activity Stream List */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        {/* Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <h2 className="text-xl font-black text-black flex items-center gap-2">
              <span>📋 Detailed Visitor Activity Log Table</span>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-bold text-neutral-700">
                {filteredVisits.length} Records
              </span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Click on any row to inspect complete visitor telemetry, screen, and IP information.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by City (Jaipur, Churu...), OS, Page..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-black placeholder:text-neutral-400 focus:border-black focus:bg-white focus:outline-hidden"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2 text-xs text-neutral-400 hover:text-black cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Device Filter Buttons */}
            <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1">
              {(["ALL", "Desktop", "Mobile", "Tablet"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDeviceFilter(d)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition cursor-pointer ${
                    deviceFilter === d
                      ? "bg-black text-white shadow-2xs"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {d === "ALL" ? "All Devices" : d === "Desktop" ? "💻 Desktop" : d === "Mobile" ? "📱 Mobile" : "📟 Tablet"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        {loading && !data ? (
          <div className="py-20 text-center">
            <div className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-black border-t-transparent mb-2" />
            <p className="text-xs font-semibold text-neutral-500">Loading live visitor data...</p>
          </div>
        ) : filteredVisits.length === 0 ? (
          <div className="py-20 text-center">
            <span className="text-4xl">🔍</span>
            <p className="mt-3 text-sm font-bold text-neutral-700">No matching visitor activity found</p>
            <p className="text-xs text-neutral-400 mt-1">
              Try searching with a different city name or clearing the device filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Time</th>
                  <th className="pb-3">📍 Location Name</th>
                  <th className="pb-3">💻 System & Device</th>
                  <th className="pb-3">📄 Visited Page</th>
                  <th className="pb-3">🔗 Source</th>
                  <th className="pb-3 pr-2 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredVisits.map((v) => {
                  const loc = formatLocationDisplay(v.city, v.region, v.country);
                  const isVeryRecent =
                    Date.now() - new Date(v.createdAt).getTime() < 1000 * 60 * 5;

                  return (
                    <tr
                      key={v._id}
                      onClick={() => setSelectedVisitor(v)}
                      className="hover:bg-neutral-50/90 transition cursor-pointer group"
                    >
                      {/* Time */}
                      <td className="py-3.5 pl-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                            isVeryRecent
                              ? "bg-emerald-100 text-emerald-900 animate-pulse"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {isVeryRecent && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          )}
                          {formatTimeAgo(v.createdAt)}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 max-w-xs">
                          <span className="text-base shrink-0">{loc.flag}</span>
                          <div>
                            <p className="font-bold text-neutral-900 text-xs truncate">
                              📍 {loc.city}
                            </p>
                            <p className="text-[10px] text-emerald-700 font-medium">
                              {getCountryFullName(v.country)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* System */}
                      <td className="py-3.5">
                        <div className="max-w-xs">
                          <p className="font-bold text-neutral-900 text-xs flex items-center gap-1.5 truncate">
                            <span>{v.device === "Mobile" ? "📱" : v.device === "Tablet" ? "📟" : "💻"}</span>
                            <span>{v.systemName || v.os || "Desktop PC"}</span>
                          </p>
                          <p className="text-[10px] text-neutral-500 truncate">
                            {v.browser || "Web"} {v.screenRes ? `• ${v.screenRes}` : ""}
                          </p>
                        </div>
                      </td>

                      {/* Page */}
                      <td className="py-3.5">
                        <div className="max-w-xs">
                          <p className="font-bold text-neutral-800 truncate text-xs">
                            {getPageName(v.path)}
                          </p>
                          <p className="text-[10px] font-mono text-neutral-400 truncate">
                            {v.path}
                          </p>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3.5">
                        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10.5px] font-semibold text-neutral-700">
                          {v.referrer && v.referrer !== "Direct" && v.referrer !== "Direct / Internal"
                            ? v.referrer
                            : "⚡ Direct"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 pr-2 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVisitor(v);
                          }}
                          className="rounded-lg border border-neutral-300 bg-white px-3 py-1 text-xs font-bold text-neutral-700 hover:border-black hover:bg-black hover:text-white transition shadow-2xs cursor-pointer"
                        >
                          View 🔍
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VISITOR DETAIL MODAL */}
      {selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <div>
                  <h3 className="text-lg font-black text-black">
                    Visitor Telemetry Details
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    ID: #{selectedVisitor.visitorId || "anonymous"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVisitor(null)}
                className="rounded-full bg-neutral-100 p-2 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              {/* 📍 Location Info */}
              <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-4 space-y-2 text-emerald-950">
                <p className="font-bold uppercase tracking-wider text-[10.5px] text-emerald-800">
                  📍 Precise Geolocation
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-emerald-700 block text-[10px]">City / Region:</span>
                    <strong className="text-emerald-950 font-bold">
                      {selectedVisitor.city || "Unknown City"}, {selectedVisitor.region || ""}
                    </strong>
                  </div>
                  <div>
                    <span className="text-emerald-700 block text-[10px]">Country:</span>
                    <strong className="text-emerald-950 font-bold flex items-center gap-1">
                      {getCountryFlag(selectedVisitor.country)} {getCountryFullName(selectedVisitor.country)}
                    </strong>
                  </div>
                  {selectedVisitor.ip && (
                    <div className="col-span-2 pt-1 border-t border-emerald-200/60 font-mono text-[11px]">
                      <span className="text-emerald-700">Client IP: </span>
                      <strong className="text-emerald-950">{selectedVisitor.ip}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 💻 System & Device Info */}
              <div className="rounded-2xl bg-blue-50/80 border border-blue-200 p-4 space-y-2 text-blue-950">
                <p className="font-bold uppercase tracking-wider text-[10.5px] text-blue-800">
                  💻 System, Device & Browser
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-blue-700 block text-[10px]">System Name:</span>
                    <strong className="text-blue-950 font-bold">
                      {selectedVisitor.systemName || selectedVisitor.os || "Desktop PC"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-blue-700 block text-[10px]">Device Category:</span>
                    <strong className="text-blue-950 font-bold">
                      {selectedVisitor.device}
                    </strong>
                  </div>
                  <div>
                    <span className="text-blue-700 block text-[10px]">Browser Engine:</span>
                    <strong className="text-blue-950 font-bold">
                      {selectedVisitor.browser || "Unknown Browser"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-blue-700 block text-[10px]">Screen Resolution:</span>
                    <strong className="text-blue-950 font-bold">
                      {selectedVisitor.screenRes || "Standard Screen"}
                    </strong>
                  </div>
                  {selectedVisitor.language && (
                    <div className="col-span-2 pt-1 border-t border-blue-200/60">
                      <span className="text-blue-700">Language: </span>
                      <strong className="text-blue-950 font-mono">{selectedVisitor.language}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 📄 Page & Referrer Info */}
              <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                <p className="font-bold uppercase tracking-wider text-[10.5px] text-neutral-500">
                  📄 Session & Interaction
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Page Viewed:</span>
                    <strong className="text-black font-bold truncate max-w-[220px]">
                      {getPageName(selectedVisitor.path)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">URL Path:</span>
                    <strong className="text-neutral-800 font-mono">{selectedVisitor.path}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Traffic Source:</span>
                    <strong className="text-neutral-800">{selectedVisitor.referrer || "Direct"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Timestamp:</span>
                    <strong className="text-neutral-800 font-mono">
                      {new Date(selectedVisitor.createdAt).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setSelectedVisitor(null)}
                className="rounded-full bg-black px-6 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

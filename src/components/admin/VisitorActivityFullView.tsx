"use client";

import { useEffect, useState, useCallback } from "react";
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
    systemName?: string;
    screenRes?: string;
    language?: string;
    referrer?: string;
    city?: string;
    country?: string;
    region?: string;
    ip?: string;
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
  if (countryCode === "Local Dev") return "Local Dev / Test";
  const clean = countryCode.trim().toUpperCase();
  return countryMap[clean] || countryCode;
}

function formatVisitorLocation(city?: string, region?: string, country?: string) {
  if (country === "Local Dev" || city === "Local Workstation") {
    return {
      flag: "💻",
      main: "Local Dev Workstation",
      sub: "Internal Dev Session",
    };
  }

  const flag = getCountryFlag(country);
  const countryName = getCountryFullName(country);
  const hasCity = city && city !== "Unknown" && city !== "Local Workstation";
  const hasRegion = region && region !== "Unknown" && region !== "Dev";

  if (hasCity) {
    return {
      flag,
      main: `${city}${hasRegion ? `, ${region}` : ""}`,
      sub: `${countryName} ${flag}`,
    };
  }

  if (country && country !== "Unknown") {
    return {
      flag,
      main: countryName,
      sub: `${country} ${flag}`,
    };
  }

  return {
    flag: "🌐",
    main: "Direct Web Visitor",
    sub: "Global Location",
  };
}

function formatVisitorSystem(
  systemName?: string,
  os?: string,
  browser?: string,
  screenRes?: string,
  device?: string
) {
  const sys =
    systemName ||
    (os && os !== "Unknown" ? `${os} System` : device === "Mobile" ? "Mobile Device" : "PC / Laptop");
  const brw = browser && browser !== "Unknown" ? browser : "Web Browser";
  const icon = device === "Mobile" ? "📱" : device === "Tablet" ? "📟" : "💻";

  return {
    icon,
    sysTitle: sys,
    browserTitle: brw,
    screen: screenRes || "",
  };
}

export default function VisitorActivityFullView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
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
    if (path === "/") return "🏠 Home (Portfolio Showcase)";
    if (path === "/portfolio") return "🧊 3D Models Archive";
    if (path.startsWith("/portfolio/"))
      return "📦 3D Project (" + path.replace("/portfolio/", "") + ")";
    if (path === "/photo-editing") return "✨ Creative & Retouching";
    if (path === "/contact") return "✉️ Contact Form";
    if (path === "/about") return "👤 About Ashok Meena";
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
  const filteredVisits = allVisits.filter((v) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.path.toLowerCase().includes(q) ||
      (v.city && v.city.toLowerCase().includes(q)) ||
      (v.country && v.country.toLowerCase().includes(q)) ||
      (v.systemName && v.systemName.toLowerCase().includes(q)) ||
      (v.browser && v.browser.toLowerCase().includes(q)) ||
      (v.visitorId && v.visitorId.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-bold text-neutral-700 hover:bg-black hover:text-white hover:border-black transition"
              >
                <span>←</span>
                <span>Back to Admin Dashboard</span>
              </Link>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed Stream
              </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-black tracking-tight">
              ⏱️ Recent Visitor Activity Stream
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Live chronological activity log of visitors browsing your 3D models and portfolio with location & system details.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <span suppressHydrationWarning className="text-[11px] text-neutral-400">
              Updated: {mounted ? lastRefreshed.toLocaleTimeString() : "--:--:--"}
            </span>
            <button
              onClick={() => fetchAnalytics()}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-bold text-neutral-800 shadow-xs hover:border-black hover:bg-black hover:text-white transition cursor-pointer disabled:opacity-50"
            >
              <span className={loading ? "animate-spin" : ""}>🔄</span>
              <span>{loading ? "Refreshing..." : "Refresh Feed"}</span>
            </button>
            <button
              onClick={handleResetLogs}
              disabled={loading}
              className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer disabled:opacity-50"
              title="Reset all logs to 0"
            >
              <span>🗑️</span>
              <span>Reset Logs to 0</span>
            </button>
          </div>
        </div>

        {/* Mini Summary Strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Live Online Now
            </p>
            <p className="text-2xl font-black text-emerald-950 mt-1">
              {data?.activeNow || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
              Today&apos;s Visitors
            </p>
            <p className="text-2xl font-black text-blue-950 mt-1">
              {data?.todayUniqueVisitors || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
              Total Unique People
            </p>
            <p className="text-2xl font-black text-black mt-1">
              {data?.uniqueVisitors || 0}
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
              Recorded Sessions
            </p>
            <p className="text-2xl font-black text-black mt-1">
              {allVisits.length}
            </p>
          </div>
        </div>
      </div>

      {/* Feed List Section */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        {/* Search & Switcher Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-black text-black flex items-center gap-2">
              <span>Activity Feed Records</span>
              <span className="rounded-full bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 text-xs font-bold text-neutral-700">
                {filteredVisits.length} results
              </span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Click &quot;Open Page ↗&quot; on any record to view the live page in a new browser tab.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search page, city, country, system..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 sm:w-72 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-black focus:outline-hidden transition"
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

            {/* View Switcher */}
            <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-100 p-0.5 text-xs">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-2xs"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                <span>📋</span>
                <span>List Feed</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-2xs"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                <span>🎴</span>
                <span>Cards Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {!filteredVisits || filteredVisits.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-400 rounded-2xl border border-neutral-100 bg-neutral-50">
            {searchQuery ? (
              <p>No visitor activity matches &quot;{searchQuery}&quot;.</p>
            ) : (
              <div className="space-y-2">
                <p className="text-base font-bold text-neutral-700">No Visitor Activity Yet</p>
                <p className="text-xs text-neutral-400">
                  All counters are currently reset to 0. Open your portfolio in another tab to record live visitors!
                </p>
              </div>
            )}
          </div>
        ) : viewMode === "list" ? (
          /* =================== 📋 LIST FEED VIEW =================== */
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
                    <th className="py-3.5 px-4">Visited Page & Route</th>
                    <th className="py-3.5 px-4">📍 Location</th>
                    <th className="py-3.5 px-4">💻 System & Specs</th>
                    <th className="py-3.5 px-4 text-right">Time & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredVisits.map((v) => {
                    const loc = formatVisitorLocation(v.city, v.region, v.country);
                    const sys = formatVisitorSystem(
                      v.systemName,
                      v.os,
                      v.browser,
                      v.screenRes,
                      v.device
                    );
                    const isVeryRecent =
                      Date.now() - new Date(v.createdAt).getTime() < 1000 * 60 * 5;

                    return (
                      <tr
                        key={v._id}
                        className="group hover:bg-neutral-50/90 transition-colors"
                      >
                        {/* 1. Visited Page & Route */}
                        <td className="py-4 px-4 align-middle">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                isVeryRecent
                                  ? "bg-emerald-500 ring-4 ring-emerald-100 animate-pulse"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <div className="min-w-0 max-w-[300px]">
                              <p className="font-extrabold text-neutral-900 truncate text-[13px] group-hover:text-black">
                                {getPageTitle(v.path)}
                              </p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="font-mono text-[10.5px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200/60">
                                  {v.path}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  ID: #{v.visitorId ? v.visitorId.slice(-6) : "user"}
                                </span>
                                {v.referrer && v.referrer !== "Direct" && v.referrer !== "Direct / Internal" && (
                                  <span className="text-[10px] font-semibold text-neutral-600 truncate max-w-[130px]">
                                    🔗 {v.referrer}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. 📍 Location */}
                        <td className="py-4 px-4 align-middle">
                          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 text-emerald-950">
                            <span className="text-lg leading-none">
                              {loc.flag}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-[11.5px] leading-tight truncate max-w-[180px]">
                                📍 {loc.main}
                              </p>
                              <p className="text-[10px] text-emerald-700 font-medium truncate mt-0.5">
                                {loc.sub}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 3. 💻 System & Device */}
                        <td className="py-4 px-4 align-middle">
                          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50/90 border border-blue-200/80 px-3 py-1.5 text-blue-950">
                            <span className="text-lg leading-none">
                              {sys.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-[11.5px] leading-tight truncate max-w-[190px]">
                                {sys.sysTitle}
                              </p>
                              <p className="text-[10px] text-blue-700 font-medium truncate mt-0.5 flex items-center gap-1.5">
                                <span>{sys.browserTitle}</span>
                                {sys.screen && <span>• 🖥️ {sys.screen}</span>}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 4. Time & Open Page Button */}
                        <td className="py-4 px-4 align-middle text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <span
                              suppressHydrationWarning
                              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                isVeryRecent
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-neutral-100 text-neutral-600"
                              }`}
                            >
                              {mounted ? formatTimeAgo(v.createdAt) : "Recently"}
                            </span>

                            {/* Open Page Button */}
                            <a
                              href={v.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-black text-neutral-800 shadow-2xs hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer group/btn"
                              title={`Open ${v.path} in a new tab`}
                            >
                              <span>Open Page</span>
                              <span className="text-neutral-400 group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                                ↗
                              </span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* =================== 🎴 CARDS GRID VIEW =================== */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVisits.map((v) => {
              const loc = formatVisitorLocation(v.city, v.region, v.country);
              const sys = formatVisitorSystem(
                v.systemName,
                v.os,
                v.browser,
                v.screenRes,
                v.device
              );
              const isVeryRecent =
                Date.now() - new Date(v.createdAt).getTime() < 1000 * 60 * 5;

              return (
                <div
                  key={v._id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 text-xs shadow-2xs hover:border-black/30 hover:shadow-md transition-all duration-200"
                >
                  {/* Top: Visited Page & Time Badge */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-neutral-100">
                    <div className="min-w-0">
                      <p className="font-extrabold text-neutral-900 truncate text-[13px] leading-tight">
                        {getPageTitle(v.path)}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                        {v.path}
                      </p>
                    </div>
                    <span
                      suppressHydrationWarning
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1 ${
                        isVeryRecent
                          ? "bg-emerald-100 text-emerald-800 animate-pulse"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {isVeryRecent && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                      {mounted ? formatTimeAgo(v.createdAt) : "Recently"}
                    </span>
                  </div>

                  {/* Middle: Prominent Location & System Badges */}
                  <div className="my-3 space-y-2.5">
                    {/* 📍 Location Name Box */}
                    <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 p-2.5 text-emerald-950">
                      <span className="text-lg shrink-0 leading-none mt-0.5">
                        {loc.flag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11.5px] leading-tight truncate">
                          📍 {loc.main}
                        </p>
                        <p className="text-[10px] text-emerald-700 font-medium truncate mt-0.5">
                          {loc.sub}
                        </p>
                      </div>
                    </div>

                    {/* 💻 System Name & Device Box */}
                    <div className="flex items-start gap-2.5 rounded-xl bg-blue-50/80 border border-blue-100 p-2.5 text-blue-950">
                      <span className="text-lg shrink-0 leading-none mt-0.5">
                        {sys.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11.5px] leading-tight truncate">
                          💻 {sys.sysTitle}
                        </p>
                        <p className="text-[10px] text-blue-700 font-medium truncate mt-0.5 flex items-center gap-1.5">
                          <span>🌐 {sys.browserTitle}</span>
                          {sys.screen && (
                            <>
                              <span>•</span>
                              <span>🖥️ {sys.screen}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Visitor ID, Referrer, and Open Page Button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                    <div className="min-w-0 pr-2">
                      <span className="font-mono text-neutral-400 text-[10px]">
                        ID: #{v.visitorId ? v.visitorId.slice(-6) : "anon"}
                      </span>
                      <span className="font-semibold text-neutral-600 truncate block mt-0.5 text-[10.5px]">
                        {v.referrer && v.referrer !== "Direct" && v.referrer !== "Direct / Internal"
                          ? `🔗 ${v.referrer}`
                          : "⚡ Direct Visit"}
                      </span>
                    </div>

                    <a
                      href={v.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-black text-neutral-800 shadow-2xs hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer group"
                      title={`Open ${v.path} in a new tab`}
                    >
                      <span>Open Page</span>
                      <span className="text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

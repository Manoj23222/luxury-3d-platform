"use client";

import { useEffect, useState, useCallback } from "react";

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
  dailyChart: { date: string; views: number; uniqueVisitors: number }[];
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

export default function VisitorAnalyticsView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [showAllRecent, setShowAllRecent] = useState(false);
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

  useEffect(() => {
    setMounted(true);
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  const totalDeviceCount =
    (data?.devices.Mobile || 0) +
    (data?.devices.Desktop || 0) +
    (data?.devices.Tablet || 0);

  const mobilePct = totalDeviceCount
    ? Math.round(((data?.devices.Mobile || 0) / totalDeviceCount) * 100)
    : 0;
  const desktopPct = totalDeviceCount
    ? Math.round(((data?.devices.Desktop || 0) / totalDeviceCount) * 100)
    : 0;
  const tabletPct = totalDeviceCount
    ? Math.max(0, 100 - mobilePct - desktopPct)
    : 0;

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

  const visibleVisits = showAllRecent
    ? filteredVisits
    : filteredVisits.slice(0, 12);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Live Visitor Tracking Active
            </span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-black">
            Website Traffic & Live Visitor Monitor
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time analytics for your portfolio visits, system/device details, and geo-locations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span suppressHydrationWarning className="text-[11px] text-neutral-400">
            Updated: {mounted ? lastRefreshed.toLocaleTimeString() : "--:--:--"}
          </span>
          <button
            onClick={() => fetchAnalytics()}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-bold text-neutral-800 shadow-xs hover:border-black hover:bg-black hover:text-white transition cursor-pointer disabled:opacity-50"
          >
            <span className={loading ? "animate-spin" : ""}>🔄</span>
            <span>{loading ? "Refreshing..." : "Refresh Live Stats"}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Card 1: Live Now */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Live Online Now
            </p>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-emerald-950">
            {data?.activeNow || 0}
          </p>
          <p className="mt-1 text-[10.5px] font-semibold text-emerald-700">
            Active in last 15 mins
          </p>
        </div>

        {/* Card 2: Today's Visitors */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              Today&apos;s Unique Visitors
            </p>
            <span className="text-base">⚡</span>
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-blue-950">
            {data?.todayUniqueVisitors || 0}
          </p>
          <p className="mt-1 text-[10.5px] font-semibold text-blue-700">
            {data?.todayVisits || 0} page views today
          </p>
        </div>

        {/* Card 3: Total Unique Visitors */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              Total Unique People
            </p>
            <span className="text-base">👥</span>
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-black">
            {data?.uniqueVisitors || 0}
          </p>
          <p className="mt-1 text-[10.5px] font-semibold text-neutral-500">
            Distinct visitors all-time
          </p>
        </div>

        {/* Card 4: Total Page Views */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
              Total Page Views
            </p>
            <span className="text-base">👁️</span>
          </div>
          <p className="mt-2 text-3xl sm:text-4xl font-black text-black">
            {data?.totalVisits || 0}
          </p>
          <p className="mt-1 text-[10.5px] font-semibold text-neutral-500">
            All-time website impressions
          </p>
        </div>
      </div>

      {/* 2-Column Analytics Breakdown: Top Pages & Device Distribution */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left: Top Visited Pages (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h4 className="text-sm font-black text-black">
              📊 Most Visited Pages
            </h4>
            <span className="text-[11px] font-bold text-neutral-400">
              By Page Views
            </span>
          </div>

          {!data?.topPages || data.topPages.length === 0 ? (
            <div className="py-10 text-center text-xs text-neutral-400">
              No page visits recorded yet. Open your portfolio in another tab to see live stats!
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {data.topPages.map((item) => {
                const maxViews = data.topPages[0]?.views || 1;
                const pct = Math.round((item.views / maxViews) * 100);

                return (
                  <div key={item.path} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-neutral-800 font-bold truncate max-w-[280px]">
                        {getPageTitle(item.path)}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-neutral-500 text-[11px]">
                          {item.uniqueVisitors} visitors
                        </span>
                        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-black text-black">
                          {item.views} views
                        </span>
                      </div>
                    </div>
                    {/* Visual bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Device Breakdown & Referrers (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5 shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h4 className="text-sm font-black text-black">
                📱 Visitor Device Breakdown
              </h4>
              <span className="text-[11px] font-bold text-neutral-400">
                {totalDeviceCount} Sessions
              </span>
            </div>

            {/* Device Percentages */}
            <div className="mt-5 space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-neutral-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span>📱</span> Mobile Devices
                  </span>
                  <span>{mobilePct}% ({data?.devices.Mobile || 0})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${mobilePct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-neutral-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span>💻</span> Laptop / Desktop
                  </span>
                  <span>{desktopPct}% ({data?.devices.Desktop || 0})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${desktopPct}%` }}
                  />
                </div>
              </div>

              {tabletPct > 0 && (
                <div>
                  <div className="flex justify-between font-bold text-neutral-800 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span>📟</span> Tablet / iPad
                    </span>
                    <span>{tabletPct}% ({data?.devices.Tablet || 0})</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${tabletPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500">
            💡 <strong className="text-neutral-800">Pro Tip:</strong> Har bar jab koi user aapka portfolio kholta hai, uska Location aur Device/System yahan real-time live log hota hai.
          </div>
        </div>
      </div>

      {/* 🌍 Geographic Locations Breakdown (Countries & Cities) */}
      {(data?.topCountries && data.topCountries.length > 0) || (data?.topCities && data.topCities.length > 0) ? (
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-black flex items-center gap-2">
              <span>🌍 Visitor Locations & Top Geographies</span>
            </h4>
            <span className="text-[11px] font-bold text-neutral-400">
              Live Geo Tracking
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Top Countries */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4">
              <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
                Top Countries
              </p>
              {data.topCountries && data.topCountries.length > 0 ? (
                <div className="space-y-2">
                  {data.topCountries.map((c) => (
                    <div key={c.country} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <span className="text-base">{getCountryFlag(c.country)}</span>
                        <span>{getCountryFullName(c.country)}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">({c.country})</span>
                      </span>
                      <span className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 font-bold text-neutral-700">
                        {c.views} views ({c.uniqueVisitors} visitors)
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-400">Locations recorded as visitors arrive.</p>
              )}
            </div>

            {/* Top Cities */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4">
              <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
                Top Cities / Regions
              </p>
              {data.topCities && data.topCities.length > 0 ? (
                <div className="space-y-2">
                  {data.topCities.map((city) => (
                    <div key={city.city} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-800 flex items-center gap-1.5 truncate max-w-[200px]">
                        <span>📍</span> {city.city} {city.country ? `(${getCountryFullName(city.country)} ${getCountryFlag(city.country)})` : ""}
                      </span>
                      <span className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 font-bold text-neutral-700 shrink-0">
                        {city.views} views
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-400">City data recorded via cloud edge network.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* ⏱️ Live Recent Visitor Activity Stream with List View & Open Page Button */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
          <div>
            <h4 className="text-base font-black text-black flex items-center gap-2">
              <span>⏱️ Recent Visitor Activity Stream</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Live Feed
              </span>
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              Real-time feed of pages viewed, system specs, and exact geo-locations with one-click page preview.
            </p>
          </div>

          {/* View Toggle & Search Bar */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search filter input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search page, city, device..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 sm:w-56 rounded-xl border border-neutral-200 bg-neutral-50/70 px-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-black focus:outline-hidden transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle: List vs Grid */}
            <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-100 p-0.5 text-xs">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-2xs"
                    : "text-neutral-600 hover:text-black"
                }`}
                title="List Feed View"
              >
                <span>📋</span>
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-2xs"
                    : "text-neutral-600 hover:text-black"
                }`}
                title="Cards Grid View"
              >
                <span>🎴</span>
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>

        {!filteredVisits || filteredVisits.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-400 rounded-2xl border border-neutral-100 bg-neutral-50">
            {searchQuery
              ? `No visitor logs matching "${searchQuery}".`
              : "No recent activity recorded yet. Open the website on your phone or laptop to test live logging!"}
          </div>
        ) : viewMode === "list" ? (
          /* =================== 📋 LIST FEED VIEW =================== */
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
                    <th className="py-3 px-4">Visited Page & Route</th>
                    <th className="py-3 px-4">📍 Location</th>
                    <th className="py-3 px-4">💻 System & Specs</th>
                    <th className="py-3 px-4 text-right">Time & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {visibleVisits.map((v) => {
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
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                isVeryRecent
                                  ? "bg-emerald-500 ring-4 ring-emerald-100 animate-pulse"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <div className="min-w-0 max-w-[280px]">
                              <p className="font-extrabold text-neutral-900 truncate text-[12.5px] group-hover:text-black">
                                {getPageTitle(v.path)}
                              </p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="font-mono text-[10.5px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                                  {v.path}
                                </span>
                                <span className="text-[10px] text-neutral-400">
                                  ID: #{v.visitorId ? v.visitorId.slice(-6) : "user"}
                                </span>
                                {v.referrer && v.referrer !== "Direct" && v.referrer !== "Direct / Internal" && (
                                  <span className="text-[10px] font-semibold text-neutral-500 truncate max-w-[120px]">
                                    🔗 {v.referrer}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. 📍 Location */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 px-2.5 py-1.5 text-emerald-950">
                            <span className="text-base leading-none">
                              {loc.flag}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-[11px] leading-tight truncate max-w-[170px]">
                                📍 {loc.main}
                              </p>
                              <p className="text-[9.5px] text-emerald-700 font-medium truncate mt-0.5">
                                {loc.sub}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 3. 💻 System & Device */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50/80 border border-blue-200/70 px-2.5 py-1.5 text-blue-950">
                            <span className="text-base leading-none">
                              {sys.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-[11px] leading-tight truncate max-w-[180px]">
                                {sys.sysTitle}
                              </p>
                              <p className="text-[9.5px] text-blue-700 font-medium truncate mt-0.5 flex items-center gap-1">
                                <span>{sys.browserTitle}</span>
                                {sys.screen && <span>• {sys.screen}</span>}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 4. Time & Open Page Button */}
                        <td className="py-3.5 px-4 align-middle text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <span
                              suppressHydrationWarning
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                isVeryRecent
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-neutral-100 text-neutral-600"
                              }`}
                            >
                              {mounted ? formatTimeAgo(v.createdAt) : "Recently"}
                            </span>

                            {/* Open Page Button (opens in new tab) */}
                            <a
                              href={v.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-black text-neutral-800 shadow-2xs hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer group/btn"
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleVisits.map((v) => {
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
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 text-xs shadow-2xs hover:border-black/30 hover:shadow-xs transition-all duration-200"
                >
                  {/* Top: Visited Page & Time Badge */}
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-100">
                    <div className="min-w-0">
                      <p className="font-extrabold text-neutral-900 truncate text-[12px] leading-tight">
                        {getPageTitle(v.path)}
                      </p>
                      <p className="text-[10.5px] text-neutral-400 mt-0.5 font-mono">
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
                  <div className="my-3 space-y-2">
                    {/* 📍 Location Name Box */}
                    <div className="flex items-start gap-2 rounded-xl bg-emerald-50/70 border border-emerald-100 p-2 text-emerald-950">
                      <span className="text-base shrink-0 leading-none mt-0.5">
                        {loc.flag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11px] leading-tight truncate">
                          📍 {loc.main}
                        </p>
                        <p className="text-[10px] text-emerald-700/90 font-medium truncate mt-0.5">
                          {loc.sub}
                        </p>
                      </div>
                    </div>

                    {/* 💻 System Name & Device Box */}
                    <div className="flex items-start gap-2 rounded-xl bg-blue-50/70 border border-blue-100 p-2 text-blue-950">
                      <span className="text-base shrink-0 leading-none mt-0.5">
                        {sys.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11px] leading-tight truncate">
                          💻 {sys.sysTitle}
                        </p>
                        <p className="text-[10px] text-blue-700/90 font-medium truncate mt-0.5 flex items-center gap-1.5">
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
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500">
                    <div className="min-w-0 pr-2">
                      <span className="font-mono text-neutral-400">
                        ID: #{v.visitorId ? v.visitorId.slice(-6) : "anon"}
                      </span>
                      <span className="font-semibold text-neutral-600 truncate block mt-0.5">
                        {v.referrer && v.referrer !== "Direct" && v.referrer !== "Direct / Internal"
                          ? `🔗 ${v.referrer}`
                          : "⚡ Direct Visit"}
                      </span>
                    </div>

                    <a
                      href={v.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-xl border border-neutral-300 bg-white px-2.5 py-1 text-[11px] font-black text-neutral-800 shadow-2xs hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer group"
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

        {/* View More / Show Less toggle if more than 12 */}
        {filteredVisits.length > 12 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAllRecent(!showAllRecent)}
              className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-50 hover:border-black transition cursor-pointer"
            >
              {showAllRecent
                ? "Show Less Recent Visits ▲"
                : `View All ${filteredVisits.length} Recent Visits ▼`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


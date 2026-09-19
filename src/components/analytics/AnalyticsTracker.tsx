"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent double tracking same path in same render
    if (!pathname || pathname === lastTrackedPath.current) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    lastTrackedPath.current = pathname;

    // 1. Get or Create Persistent Unique Anonymous Visitor ID
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("lux3d_visitor_id") || "";
      if (!visitorId) {
        visitorId = "v_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        localStorage.setItem("lux3d_visitor_id", visitorId);
      }
    } catch {
      visitorId = "anon_" + Math.random().toString(36).substring(2, 10);
    }

    // 2. Comprehensive System, Device, Browser & Screen Detection
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const maxTouchPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints || 0 : 0;
    const navPlatform = typeof navigator !== "undefined" ? navigator.platform || "" : "";

    let device: "Mobile" | "Desktop" | "Tablet" = "Desktop";
    let os = "Other";
    let systemName = "PC / Workstation";
    let browser = "Other";

    // Detect Device Type
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (navPlatform === "MacIntel" && maxTouchPoints > 1)) {
      device = "Tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
      device = "Mobile";
    } else {
      device = "Desktop";
    }

    // Detect OS & System Name
    if (/iPhone/i.test(ua)) {
      os = "iOS";
      systemName = "Apple iPhone";
    } else if (/iPad/i.test(ua) || (navPlatform === "MacIntel" && maxTouchPoints > 1)) {
      os = "iPadOS";
      systemName = "Apple iPad";
    } else if (/Macintosh|Mac OS X|MacIntel/i.test(ua)) {
      os = "macOS";
      systemName = "Apple Mac (macOS)";
    } else if (/Windows NT 10.0/i.test(ua)) {
      os = "Windows";
      systemName = "Windows 11 / 10 PC";
    } else if (/Windows NT/i.test(ua) || /Windows/i.test(ua)) {
      os = "Windows";
      systemName = "Windows PC";
    } else if (/Android/i.test(ua)) {
      os = "Android";
      const match = ua.match(/Android\s+([\d.]+);\s+([^;)]+)/i);
      if (match && match[2]) {
        systemName = `Android (${match[2].trim()})`;
      } else {
        systemName = "Android Device";
      }
    } else if (/CrOS/i.test(ua)) {
      os = "ChromeOS";
      systemName = "Chromebook / ChromeOS";
    } else if (/Linux/i.test(ua)) {
      os = "Linux";
      systemName = "Linux PC";
    }

    // Detect Browser Name
    if (/Edg\//i.test(ua)) {
      browser = "Microsoft Edge";
    } else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) {
      browser = "Opera";
    } else if (/SamsungBrowser\//i.test(ua)) {
      browser = "Samsung Internet";
    } else if (/Chrome\//i.test(ua)) {
      browser = "Google Chrome";
    } else if (/Firefox\//i.test(ua)) {
      browser = "Mozilla Firefox";
    } else if (/Safari\//i.test(ua)) {
      browser = "Apple Safari";
    }

    // Screen resolution & language
    const screenRes = typeof window !== "undefined" && window.screen ? `${window.screen.width}×${window.screen.height}` : "";
    const language = typeof navigator !== "undefined" ? (navigator.language || "") : "";

    // 5. Get Referrer
    let referrer = typeof document !== "undefined" && document.referrer ? document.referrer : "Direct";
    if (referrer.includes(window.location.hostname)) {
      referrer = "Direct / Internal";
    } else if (referrer.includes("google.")) {
      referrer = "Google Search";
    } else if (referrer.includes("instagram.")) {
      referrer = "Instagram";
    } else if (referrer.includes("wa.me") || referrer.includes("whatsapp.")) {
      referrer = "WhatsApp";
    } else if (referrer.includes("linkedin.")) {
      referrer = "LinkedIn";
    } else if (referrer.includes("facebook.") || referrer.includes("fb.com")) {
      referrer = "Facebook";
    }

    // 6. Send payload to analytics endpoint
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          path: pathname,
          referrer,
          device,
          browser,
          os,
          systemName,
          screenRes,
          language,
        }),
        keepalive: true,
      }).catch(() => {
        // Silent catch
      });
    } catch {
      // Silent catch
    }
  }, [pathname]);

  return null;
}

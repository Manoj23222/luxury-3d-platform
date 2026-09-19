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

    // 2. Detect Device Type
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    let device: "Mobile" | "Desktop" | "Tablet" = "Desktop";
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      device = "Tablet";
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
        ua
      )
    ) {
      device = "Mobile";
    }

    // 3. Detect Browser Name
    let browser = "Other";
    if (ua.includes("Firefox/")) browser = "Firefox";
    else if (ua.includes("Edg/")) browser = "Edge";
    else if (ua.includes("Chrome/")) browser = "Chrome";
    else if (ua.includes("Safari/")) browser = "Safari";
    else if (ua.includes("Opera") || ua.includes("OPR/")) browser = "Opera";

    // 4. Detect OS
    let os = "Other";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Linux")) os = "Linux";

    // 5. Get Referrer
    const referrer = typeof document !== "undefined" && document.referrer ? document.referrer : "Direct";

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

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CookieConsentBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Do not show on admin pages
    if (pathname && pathname.startsWith("/admin")) {
      return;
    }

    try {
      const consent = localStorage.getItem("lux3d_cookie_consent");
      if (!consent) {
        // Wait 1 second before showing for a polite, smooth experience
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, [pathname]);

  const sendLocationUpdate = async (locationData: {
    city?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    postalCode?: string;
    locationMethod?: string;
  }) => {
    try {
      const visitorId = localStorage.getItem("lux3d_visitor_id") || "";
      if (!visitorId) return;

      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updateVisitorLocation: true,
          visitorId,
          path: pathname || "/",
          city: locationData.city,
          region: locationData.region,
          country: locationData.country,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          postalCode: locationData.postalCode,
          consentGranted: true,
          locationMethod: locationData.locationMethod || "Verified",
        }),
        keepalive: true,
      });
    } catch {
      // Silent catch
    }
  };

  const resolveExactLocation = async () => {
    // 1. Try Browser Geolocation for exact precision
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          let city = "";
          let region = "";
          let country = "";
          let postalCode = "";

          try {
            // Free client-side reverse geocoding API (no API key required)
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              city = data.city || data.locality || "";
              region = data.principalSubdivision || "";
              country = data.countryName || "";
              postalCode = data.postcode || "";
            }
          } catch {
            // Reverse geocode fallback
          }

          sendLocationUpdate({
            latitude: lat,
            longitude: lon,
            city,
            region,
            country,
            postalCode,
            locationMethod: "GPS Precise",
          });
        },
        async () => {
          // If user denies or GPS unavailable, fallback to high-precision IP lookup
          await fallbackIpLookup();
        },
        { timeout: 7000, maximumAge: 300000 }
      );
    } else {
      await fallbackIpLookup();
    }
  };

  const fallbackIpLookup = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        sendLocationUpdate({
          city: data.city,
          region: data.region,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          postalCode: data.postal,
          locationMethod: "IP Geolocation",
        });
      }
    } catch {
      // Silent catch
    }
  };

  const handleAccept = () => {
    try {
      localStorage.setItem("lux3d_cookie_consent", "accepted");
      localStorage.setItem("lux3d_consent_time", new Date().toISOString());
      document.cookie = "lux3d_consent=accepted; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      // Storage catch
    }

    setVisible(false);

    // Resolve location with consent
    resolveExactLocation();
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("lux3d_cookie_consent", "necessary");
      document.cookie = "lux3d_consent=necessary; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      // Storage catch
    }

    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl border border-white/10 bg-[#121214]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Cookie &amp; Experience Preferences
            </h4>
            <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
              We use cookies and anonymous analytics to optimize 3D WebGL rendering,
              tailor showcase assets, and deliver precise regional portfolio performance.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:border-white hover:text-white transition cursor-pointer"
          >
            Necessary Only
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-xl bg-white px-4 py-1.5 text-xs font-bold text-black hover:bg-neutral-200 transition cursor-pointer shadow-xs"
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </aside>
  );
}

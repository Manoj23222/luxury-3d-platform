import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import VisitorLog from "@/models/VisitorLog";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      visitorId,
      path,
      referrer,
      device,
      browser,
      os,
      systemName,
      screenRes,
      language,
      city: clientCity,
      region: clientRegion,
      country: clientCountry,
      postalCode,
      latitude,
      longitude,
      consentGranted,
      locationMethod,
      updateVisitorLocation,
    } = body;

    // Check if this is an explicit update from Cookie Consent banner
    if (updateVisitorLocation && visitorId) {
      await connectDB();
      const updateData: any = {
        consentGranted: true,
      };

      if (clientCity && clientCity !== "Unknown") updateData.city = clientCity.slice(0, 80);
      if (clientRegion && clientRegion !== "Unknown") updateData.region = clientRegion.slice(0, 50);
      if (clientCountry && clientCountry !== "Unknown") updateData.country = clientCountry.slice(0, 50);
      if (postalCode) updateData.postalCode = String(postalCode).slice(0, 20);
      if (typeof latitude === "number") updateData.latitude = latitude;
      if (typeof longitude === "number") updateData.longitude = longitude;
      if (locationMethod) updateData.locationMethod = String(locationMethod).slice(0, 40);

      await VisitorLog.updateMany({ visitorId }, { $set: updateData });

      return NextResponse.json({ success: true, updated: true });
    }

    // Do not track empty, admin paths, or internal api paths
    if (!path || path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // Extract Geo IP location headers (Vercel / Cloudflare / Proxies)
    let country =
      (clientCountry && clientCountry !== "Unknown" ? clientCountry : "") ||
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "";
    let city =
      (clientCity && clientCity !== "Unknown" ? clientCity : "") ||
      req.headers.get("x-vercel-ip-city") ||
      "";
    let region =
      (clientRegion && clientRegion !== "Unknown" ? clientRegion : "") ||
      req.headers.get("x-vercel-ip-country-region") ||
      "";
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const rawIp = forwardedFor.split(",")[0]?.trim() || "";

    // Privacy-conscious IP anonymization (Mask last octet e.g. 192.168.1.xxx)
    const anonymizedIp = rawIp.includes(".")
      ? rawIp.replace(/\.\d+$/, ".xxx")
      : rawIp.includes(":")
      ? rawIp.split(":").slice(0, 3).join(":") + "::xxxx"
      : "";

    // If running in local dev or headers not present
    if (!country && (!rawIp || rawIp === "127.0.0.1" || rawIp === "::1")) {
      country = "Local Dev";
      city = "Local Workstation";
      region = "Dev";
    } else if (!country) {
      country = "Unknown";
      city = city || "Unknown";
      region = region || "Unknown";
    }

    await connectDB();

    await VisitorLog.create({
      visitorId: visitorId || "anonymous-" + Math.random().toString(36).substring(2, 9),
      path: path.slice(0, 200),
      referrer: (referrer || "Direct").slice(0, 300),
      device: ["Mobile", "Desktop", "Tablet"].includes(device) ? device : "Desktop",
      browser: (browser || "Unknown").slice(0, 60),
      os: (os || "Unknown").slice(0, 60),
      systemName: (systemName || os || "PC").slice(0, 80),
      screenRes: (screenRes || "").slice(0, 30),
      language: (language || "").slice(0, 20),
      country: country.slice(0, 50),
      city: decodeURIComponent(city || "Unknown").slice(0, 80),
      region: region.slice(0, 50),
      postalCode: postalCode ? String(postalCode).slice(0, 20) : "",
      latitude: typeof latitude === "number" ? latitude : null,
      longitude: typeof longitude === "number" ? longitude : null,
      consentGranted: Boolean(consentGranted),
      locationMethod: locationMethod ? String(locationMethod).slice(0, 40) : "",
      ip: anonymizedIp.slice(0, 60),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Analytics tracking error:", error?.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

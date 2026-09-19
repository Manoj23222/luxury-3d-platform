import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import VisitorLog from "@/models/VisitorLog";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, path, referrer, device, browser, os } = body;

    // Do not track empty, admin paths, or internal api paths
    if (!path || path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // Extract Geo IP location headers (Vercel / Cloudflare / Proxies)
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "Unknown";
    const city =
      req.headers.get("x-vercel-ip-city") ||
      req.headers.get("x-vercel-ip-country-region") ||
      "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") || "Unknown";
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0]?.trim() || "";

    await connectDB();

    await VisitorLog.create({
      visitorId: visitorId || "anonymous-" + Math.random().toString(36).substring(2, 9),
      path: path.slice(0, 200),
      referrer: (referrer || "Direct").slice(0, 300),
      device: ["Mobile", "Desktop", "Tablet"].includes(device) ? device : "Desktop",
      browser: (browser || "Unknown").slice(0, 50),
      os: (os || "Unknown").slice(0, 50),
      country: country.slice(0, 50),
      city: decodeURIComponent(city).slice(0, 80),
      region: region.slice(0, 50),
      ip: ip.slice(0, 60),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Analytics tracking error:", error?.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PortfolioStats from "@/models/PortfolioStats";
import VisitorLog from "@/models/VisitorLog";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const visitorId = searchParams.get("visitorId");

    await connectDB();

    // 1. Get or create the site stats document
    let stats = await PortfolioStats.findOne({ key: "home" });
    if (!stats) {
      stats = await PortfolioStats.create({
        key: "home",
        likes: 142,
        likedVisitors: [],
        viewsBaseline: 1250,
      });
    }

    // 2. Fetch actual recorded visitor count from VisitorLog
    let visitorCount = 0;
    try {
      visitorCount = await VisitorLog.countDocuments();
    } catch {
      visitorCount = 0;
    }

    const baseline = stats.viewsBaseline || 1250;
    const totalViews = baseline + visitorCount;

    // 3. Check if this visitor has already liked
    const hasLiked = Boolean(
      visitorId && stats.likedVisitors && stats.likedVisitors.includes(visitorId)
    );

    return NextResponse.json(
      {
        success: true,
        views: totalViews,
        likes: stats.likes,
        hasLiked,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching portfolio stats:", error?.message);
    // Graceful fallback response
    return NextResponse.json(
      {
        success: true,
        views: 1390,
        likes: 142,
        hasLiked: false,
      },
      { status: 200 }
    );
  }
}

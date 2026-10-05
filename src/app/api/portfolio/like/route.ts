import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PortfolioStats from "@/models/PortfolioStats";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { visitorId, action = "toggle" } = body;

    await connectDB();

    let stats = await PortfolioStats.findOne({ key: "home" });
    if (!stats) {
      stats = await PortfolioStats.create({
        key: "home",
        likes: 142,
        likedVisitors: [],
        viewsBaseline: 1250,
      });
    }

    let hasLiked = false;

    if (visitorId) {
      const alreadyLiked = stats.likedVisitors.includes(visitorId);

      if (alreadyLiked) {
        if (action === "unlike" || action === "toggle") {
          // Unlike
          stats.likedVisitors = stats.likedVisitors.filter((id: string) => id !== visitorId);
          stats.likes = Math.max(0, (stats.likes || 1) - 1);
          hasLiked = false;
        } else {
          hasLiked = true;
        }
      } else {
        // Like
        stats.likedVisitors.push(visitorId);
        stats.likes = (stats.likes || 142) + 1;
        hasLiked = true;
      }
    } else {
      // Anonymous like without persistent visitorId
      stats.likes = (stats.likes || 142) + 1;
      hasLiked = true;
    }

    await stats.save();

    return NextResponse.json({
      success: true,
      likes: stats.likes,
      hasLiked,
    });
  } catch (error: any) {
    console.error("Error processing like:", error?.message);
    return NextResponse.json(
      {
        success: true,
        likes: 143,
        hasLiked: true,
      },
      { status: 200 }
    );
  }
}

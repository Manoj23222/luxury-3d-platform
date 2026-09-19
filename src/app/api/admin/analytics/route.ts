import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import VisitorLog from "@/models/VisitorLog";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    
    // Start of Today (00:00:00 UTC/local)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 15 Minutes ago for Real-time Active users
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    // 7 Days ago for weekly trend chart
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);

    // 1. Total Visits & Unique Visitors
    const totalVisits = await VisitorLog.countDocuments();
    const uniqueVisitorsResult = await VisitorLog.distinct("visitorId");
    const uniqueVisitors = uniqueVisitorsResult.length;

    // 2. Today's Visits & Unique Visitors
    const todayVisits = await VisitorLog.countDocuments({
      createdAt: { $gte: todayStart },
    });
    const todayUniqueVisitorsResult = await VisitorLog.distinct("visitorId", {
      createdAt: { $gte: todayStart },
    });
    const todayUniqueVisitors = todayUniqueVisitorsResult.length;

    // 3. Active Online Users (Last 15 minutes)
    const activeNowResult = await VisitorLog.distinct("visitorId", {
      createdAt: { $gte: fifteenMinutesAgo },
    });
    const activeNow = activeNowResult.length;

    // 4. Top Visited Pages (Aggregated)
    const topPages = await VisitorLog.aggregate([
      {
        $group: {
          _id: "$path",
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$visitorId" },
        },
      },
      {
        $project: {
          path: "$_id",
          views: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          _id: 0,
        },
      },
      { $sort: { views: -1 } },
      { $limit: 8 },
    ]);

    // 5. Devices Breakdown
    const devicesData = await VisitorLog.aggregate([
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);
    const devices = {
      Mobile: 0,
      Desktop: 0,
      Tablet: 0,
    };
    devicesData.forEach((d) => {
      if (d._id in devices) {
        devices[d._id as keyof typeof devices] = d.count;
      }
    });

    // 6. Top Countries
    const topCountries = await VisitorLog.aggregate([
      {
        $match: {
          country: { $ne: "Unknown" },
        },
      },
      {
        $group: {
          _id: "$country",
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$visitorId" },
        },
      },
      {
        $project: {
          country: "$_id",
          views: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          _id: 0,
        },
      },
      { $sort: { views: -1 } },
      { $limit: 6 },
    ]);

    // 7. Top Cities
    const topCities = await VisitorLog.aggregate([
      {
        $match: {
          city: { $ne: "Unknown" },
        },
      },
      {
        $group: {
          _id: "$city",
          country: { $first: "$country" },
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$visitorId" },
        },
      },
      {
        $project: {
          city: "$_id",
          country: 1,
          views: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          _id: 0,
        },
      },
      { $sort: { views: -1 } },
      { $limit: 6 },
    ]);

    // 8. Recent Visitor Logs (Last 30 with location & system details)
    const recentVisits = await VisitorLog.find()
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    // 9. Last 7 Days Daily Breakdown
    const dailyChart = await VisitorLog.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$visitorId" },
        },
      },
      {
        $project: {
          date: "$_id",
          views: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors,
        todayVisits,
        todayUniqueVisitors,
        activeNow,
        topPages,
        devices,
        topCountries,
        topCities,
        recentVisits,
        dailyChart,
      },
    });
  } catch (error: any) {
    console.error("Admin analytics fetch error:", error?.message);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics",
        stats: {
          totalVisits: 0,
          uniqueVisitors: 0,
          todayVisits: 0,
          todayUniqueVisitors: 0,
          activeNow: 0,
          topPages: [],
          devices: { Mobile: 0, Desktop: 0, Tablet: 0 },
          topCountries: [],
          topCities: [],
          recentVisits: [],
          dailyChart: [],
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectDB();
    const result = await VisitorLog.deleteMany({});
    return NextResponse.json({
      success: true,
      message: "All visitor tracking logs have been reset to 0.",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error("Admin analytics reset error:", error?.message);
    return NextResponse.json(
      { success: false, error: "Failed to reset analytics" },
      { status: 500 }
    );
  }
}

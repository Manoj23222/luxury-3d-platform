import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      );
    }

    await connectDB();

    const dbUser = await User.findById(authUser.id).select("-password").lean();

    if (!dbUser || dbUser.isActive === false) {
      return NextResponse.json(
        { success: false, user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: dbUser._id.toString(),
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role || "customer",
        permissions: dbUser.permissions || [],
        isActive: dbUser.isActive !== false,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, user: null },
      { status: 500 }
    );
  }
}
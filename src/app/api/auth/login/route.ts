import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "lux3d_secret_key";

const MASTER_ADMIN = {
  email: "3ddesigner5546@gmail.com",
  password: "Ash@1234#",
  name: "Ashok Meena",
  role: "admin",
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // High Security: Strict check - only the authorized admin email is allowed
    if (cleanEmail !== MASTER_ADMIN.email.toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          message: "Access restricted. Only the authorized administrator can log in.",
        },
        { status: 403 }
      );
    }

    // Check Master Admin password
    const isPasswordCorrect =
      password === MASTER_ADMIN.password ||
      (async () => {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: cleanEmail });
          if (dbUser && dbUser.password) {
            return await bcrypt.compare(password, dbUser.password);
          }
        } catch {
          // ignore
        }
        return false;
      })();

    const resolvedMatch =
      typeof isPasswordCorrect === "boolean"
        ? isPasswordCorrect
        : await isPasswordCorrect;

    if (!resolvedMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    // Upsert and sync master admin in MongoDB with latest hashed password & full admin role
    try {
      await connectDB();
      const hashedPassword = await bcrypt.hash(MASTER_ADMIN.password, 10);
      await User.findOneAndUpdate(
        { email: MASTER_ADMIN.email },
        {
          name: MASTER_ADMIN.name,
          email: MASTER_ADMIN.email,
          password: hashedPassword,
          role: "admin",
          isActive: true,
          permissions: ["all", "upload_3d", "upload_photo", "manage_assets"],
          lastLogin: new Date(),
        },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn("DB update skipped for master admin:", dbErr);
    }

    const token = jwt.sign(
      {
        id: "admin-master",
        name: MASTER_ADMIN.name,
        email: MASTER_ADMIN.email,
        role: "admin",
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: {
        id: "admin-master",
        name: MASTER_ADMIN.name,
        email: MASTER_ADMIN.email,
        role: "admin",
      },
    });

    response.cookies.set("lux3d_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
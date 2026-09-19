import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "lux3d_secret_key";

const MASTER_ADMIN = {
  email: "ashokm3414@gmail.com",
  password: "Ash@7424",
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

    // Check Master Admin direct credentials
    if (
      cleanEmail === MASTER_ADMIN.email &&
      password === MASTER_ADMIN.password
    ) {
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
    }

    // Standard database authentication
    await connectDB();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user || user.isActive === false) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch =
      user.password === password || (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const role =
      cleanEmail === MASTER_ADMIN.email ? "admin" : user.role || "customer";

    const token = jwt.sign(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role,
      },
    });

    response.cookies.set("lux3d_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
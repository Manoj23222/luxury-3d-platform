import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactNotificationEmail } from "@/lib/email";

export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      contacts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Save contact record in MongoDB database
    let contact = null;
    try {
      await connectDB();
      contact = await Contact.create({
        name,
        email,
        subject,
        message,
        status: "New",
      });
    } catch (dbErr) {
      console.warn("MongoDB save warning for contact:", dbErr);
    }

    // 2. Dispatch real email notification to admin (ashokm3414@gmail.com / 3ddesigner5546@gmail.com)
    const emailResult = await sendContactNotificationEmail({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      contact,
      emailSent: emailResult.sent,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process message",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectDB();

    if (id) {
      await Contact.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Message deleted" });
    }

    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
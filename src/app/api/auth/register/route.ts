import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Public registration is disabled for security reasons.",
    },
    { status: 403 }
  );
}
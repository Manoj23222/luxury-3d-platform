import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";

const allowedStatus = [
  "Pending",
  "Payment Submitted",
  "Paid",
  "Failed",
  "Rejected",
  "Refunded",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    await connectDB();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};

    if (body.action === "approve") {
      if (
        order.paymentMethod === "UPI" &&
        !String(order.upiTransactionId || "").trim()
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "UPI transaction ID is missing",
          },
          { status: 400 }
        );
      }

      updateData.status = "Paid";
      updateData.downloadEnabled = true;
      updateData.paymentVerifiedAt = new Date();
      updateData.paymentVerifiedBy = currentUser.email || currentUser.id;
      updateData.paymentNote = String(body.paymentNote || "Payment approved");
    } else if (body.action === "reject") {
      updateData.status = "Rejected";
      updateData.downloadEnabled = false;
      updateData.paymentVerifiedAt = new Date();
      updateData.paymentVerifiedBy = currentUser.email || currentUser.id;
      updateData.paymentNote = String(
        body.paymentNote || "Payment verification rejected"
      );
    } else {
      if (body.status) {
        if (!allowedStatus.includes(body.status)) {
          return NextResponse.json(
            { success: false, error: "Invalid status" },
            { status: 400 }
          );
        }

        updateData.status = body.status;
      }

      if (typeof body.downloadEnabled === "boolean") {
        updateData.downloadEnabled = body.downloadEnabled;
      }

      if (typeof body.paymentNote === "string") {
        updateData.paymentNote = body.paymentNote.trim();
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update order";

    console.error("ADMIN ORDER UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
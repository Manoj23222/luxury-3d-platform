import mongoose, { Schema, Document } from "mongoose";

export interface IVisitorLog extends Document {
  visitorId: string;
  path: string;
  referrer?: string;
  device: "Mobile" | "Desktop" | "Tablet";
  browser?: string;
  os?: string;
  createdAt: Date;
}

const VisitorLogSchema = new Schema<IVisitorLog>(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    path: {
      type: String,
      required: true,
      index: true,
    },
    referrer: {
      type: String,
      default: "Direct",
    },
    device: {
      type: String,
      enum: ["Mobile", "Desktop", "Tablet"],
      default: "Desktop",
    },
    browser: {
      type: String,
      default: "Unknown",
    },
    os: {
      type: String,
      default: "Unknown",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound indexes for fast aggregations
VisitorLogSchema.index({ createdAt: -1 });
VisitorLogSchema.index({ path: 1, createdAt: -1 });

export default mongoose.models.VisitorLog ||
  mongoose.model<IVisitorLog>("VisitorLog", VisitorLogSchema);

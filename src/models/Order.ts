import mongoose, { Schema, models } from "mongoose";

const DownloadHistorySchema = new Schema(
  {
    format: {
      type: String,
      default: "",
    },

    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new Schema(
  {
    // Customer
    userId: {
      type: String,
      default: "",
      index: true,
    },

    customerName: {
      type: String,
      default: "",
    },

    customerEmail: {
      type: String,
      default: "",
      index: true,
    },

    customerPhone: {
      type: String,
      default: "",
    },

    // Product
    productId: {
      type: String,
      required: true,
      index: true,
    },

    productName: {
      type: String,
      default: "",
    },

    productImage: {
      type: String,
      default: "",
    },

    // Amount
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // Order status
    status: {
      type: String,
      enum: [
        "Pending",
        "Payment Submitted",
        "Paid",
        "Failed",
        "Rejected",
        "Refunded",
      ],
      default: "Pending",
      index: true,
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: ["Razorpay", "UPI"],
      default: "Razorpay",
      index: true,
    },

    paymentProvider: {
      type: String,
      default: "Razorpay",
    },

    // Razorpay
    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    // Manual UPI
    upiId: {
      type: String,
      default: "",
    },

    upiTransactionId: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    paymentScreenshot: {
      type: String,
      default: "",
    },

    paymentSubmittedAt: {
      type: Date,
      default: null,
    },

    paymentVerifiedAt: {
      type: Date,
      default: null,
    },

    paymentVerifiedBy: {
      type: String,
      default: "",
    },

    paymentNote: {
      type: String,
      default: "",
    },

    // Download access
    downloadEnabled: {
      type: Boolean,
      default: false,
      index: true,
    },

    downloadCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastDownloadedAt: {
      type: Date,
      default: null,
    },

    downloadHistory: {
      type: [DownloadHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ productId: 1, status: 1 });
OrderSchema.index({ paymentMethod: 1, status: 1 });

const Order = models.Order || mongoose.model("Order", OrderSchema);

export default Order;
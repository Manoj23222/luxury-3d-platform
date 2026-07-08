import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    // User
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

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      index: true,
    },

    paymentProvider: {
      type: String,
      default: "Razorpay",
    },

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

    downloadEnabled: {
      type: Boolean,
      default: false,
      index: true,
    },
    
  },
  
  {
    downloadCount: {
  type: Number,
  default: 0,
},

lastDownloadedAt: {
  type: Date,
  default: null,
},

downloadHistory: [
  {
    format: { type: String, default: "" },
    downloadedAt: { type: Date, default: Date.now },
  },
],
    timestamps: true,
  }
);

const Order =
  models.Order || mongoose.model("Order", OrderSchema);

export default Order;
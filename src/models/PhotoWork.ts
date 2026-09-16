import mongoose, { Schema, models } from "mongoose";

const PhotoWorkSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, default: "", trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "Product Retouching",
    },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },

    // Primary Before/After Images
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },

    // Technical Details
    softwareUsed: {
      type: [String],
      default: ["Adobe Photoshop", "Adobe Lightroom"],
    },
    resolution: { type: String, default: "4K / Ultra HD" },
    clientName: { type: String, default: "" },
    projectYear: { type: String, default: "2026" },
    tags: { type: [String], default: [] },

    // Status & Visibility
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PhotoWorkSchema.index({ category: 1 });
PhotoWorkSchema.index({ status: 1 });
PhotoWorkSchema.index({ featured: 1 });

if (models.PhotoWork) {
  delete models.PhotoWork;
}

const PhotoWork = mongoose.model("PhotoWork", PhotoWorkSchema);

export default PhotoWork;

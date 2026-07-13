import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },

    category: { type: String, default: "" },
    subCategory: { type: String, default: "" },
    childCategory: { type: String, default: "" },
    categoryPath: { type: [String], default: [] },

    thumbnail: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },

    modelUrl: { type: String, default: "" },
    modelFileName: { type: String, default: "" },
    modelFileType: { type: String, default: "" },

    glbUrl: { type: String, default: "" },
    gltfUrl: { type: String, default: "" },
    fbxUrl: { type: String, default: "" },
    blendUrl: { type: String, default: "" },
    objUrl: { type: String, default: "" },
    stlUrl: { type: String, default: "" },
    zipUrl: { type: String, default: "" },

    videoUrl: { type: String, default: "" },
    hdriUrl: { type: String, default: "" },

    clientName: { type: String, default: "" },
    brandName: { type: String, default: "" },

    softwareUsed: { type: [String], default: [] },
    projectYear: { type: String, default: "" },
    duration: { type: String, default: "" },

    tags: { type: [String], default: [] },

    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: true },
    downloadType: {
      type: String,
      enum: ["Free", "Paid"],
      default: "Free",
    },
    downloadZipUrl: { type: String, default: "" },
    license: { type: String, default: "" },

    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    featured: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },

    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },

    creatorId: {
  type: String,
  required: true,
  index: true,
},

creatorName: {
  type: String,
  default: "",
},

creatorEmail: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ creatorId: 1 });

const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;
import mongoose, { Schema, Document } from "mongoose";

export interface IDeletedAsset extends Document {
  assetId: string;
  cleanId?: string;
  title?: string;
  slug?: string;
  itemType?: string;
  deletedAt: Date;
}

const DeletedAssetSchema = new Schema<IDeletedAsset>(
  {
    assetId: { type: String, required: true, index: true },
    cleanId: { type: String, index: true },
    title: { type: String, index: true },
    slug: { type: String, index: true },
    itemType: { type: String, default: "unknown" },
    deletedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.DeletedAsset ||
  mongoose.model<IDeletedAsset>("DeletedAsset", DeletedAssetSchema);

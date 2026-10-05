import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolioStats extends Document {
  key: string;
  likes: number;
  likedVisitors: string[];
  viewsBaseline: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioStatsSchema = new Schema<IPortfolioStats>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "home",
    },
    likes: {
      type: Number,
      default: 142,
    },
    likedVisitors: {
      type: [String],
      default: [],
    },
    viewsBaseline: {
      type: Number,
      default: 1250,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PortfolioStats ||
  mongoose.model<IPortfolioStats>("PortfolioStats", PortfolioStatsSchema);

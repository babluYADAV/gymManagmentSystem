import mongoose, { Document, Schema } from "mongoose";

export interface IProgramCategory extends Document {
  title: string;
  image: string[];
  description: string;
  schedule: string;
  programTime?: string;
  price: number;
  duration: string;
  status: boolean;
}

const programCategorySchema: Schema<IProgramCategory> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: [String], required: true },
    description: { type: String, required: true },
    schedule: { type: String, required: true },
    programTime: { type: String },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default programCategorySchema;

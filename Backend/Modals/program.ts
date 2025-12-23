import mongoose, { Document, Schema } from "mongoose";
import programCategorySchema, { IProgramCategory } from "./programCategory";

export interface IProgram extends Document {
  title: string;
  description?: string;
  image: string;
  trainer: string;
  qualification: string;
  subCategories: IProgramCategory[];
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const programSchema: Schema<IProgram> = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    trainer: { type: String, required: true },
    qualification: { type: String, required: true },
    subCategories: [programCategorySchema],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProgram>("Program", programSchema);

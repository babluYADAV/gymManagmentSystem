import mongoose from "mongoose";
import programCategorySchema from "./programCategory";

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // e.g. Yoga, Cardio, Strength
    },

    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    trainer: {
      type: String,
      required: true,
      qualification: {
        type: String,
        required: true,
      },
    },
    subCategories: [programCategorySchema],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Program", programSchema);

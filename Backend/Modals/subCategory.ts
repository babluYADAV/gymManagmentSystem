const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    schedule: {
      type: String, // e.g. Mon-Fri 6AM – 7AM
      required: true,
    },

    programTime: {
      type: String, // e.g. 1 Hour
    },

    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String, // e.g. 3 Months
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategorySchema);

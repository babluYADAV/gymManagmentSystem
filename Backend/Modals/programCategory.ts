const mongoose = require("mongoose");

const programCategorySchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
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

export default programCategorySchema;

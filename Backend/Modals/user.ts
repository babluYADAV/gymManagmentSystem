import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // ✅ REQUIRED FOR LOGIN
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    mnumber: { type: String, required: true },
    hieght: { type: String, required: true },
    weight: { type: String, required: true },
    disease: { type: String, required: true },
    label: { type: String, required: true },
    profilePic: { type: String, required: true },
    resetPasswordOTP: { type: String },
    resetPasswordOTPExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

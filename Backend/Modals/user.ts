import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: string;
  mnumber: string;
  hieght: string;
  weight: string;
  disease: string;
  label: string;
  profilePic: string;
  role: "user" | "admin";
  resetPasswordOTP?: string;
  resetPasswordOTPExpiry?: Date;
}
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
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

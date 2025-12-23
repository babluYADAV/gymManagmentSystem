import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Modals/user";
import crypto from "crypto";
import nodemailer from "nodemailer";

/* REGISTER */
export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      dob,
      mnumber,
      hieght,
      weight,
      disease,
      label,
      profilePic,
      role,
    } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      mnumber,
      hieght,
      weight,
      disease,
      label,
      profilePic,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGIN */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        label: user.label,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ message: "No user found!!" });
    }
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(400).json({ message: "No user found!!" });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const {id}=req.body
    const user = await User.findOne({id});
    if (!user) {
      return res.status(400).json({ message: "No user found!!" });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "No user found!!" });
  }
};
// / Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "shivramyadav52@gmail.com",
    pass: "clwo ygle xrla uijp",
  },
});

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const otp = crypto.randomInt(100000, 1000000); // 6-digit OTP
      user.resetPasswordOTP = otp.toString();
      user.resetPasswordOTPExpiry = new Date(Date.now() + 15 * 60 * 1000);

      await user.save();
      const mailOptions = {
        from: "shivramyadav52@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is ${otp}. It will expire in 15 minutes.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending OTP email:", error);
          return res.status(500).json({ message: "Error sending OTP email" });
        } else {
          console.log("OTP email sent:", info.response);
          return res.json({ message: "OTP sent successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const validateOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (
      !user ||
      user.resetPasswordOTP !== otp ||
      !user.resetPasswordOTPExpiry ||
      user.resetPasswordOTPExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP is valid" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (
      !user ||
      user.resetPasswordOTP !== otp ||
      !user.resetPasswordOTPExpiry ||
      user.resetPasswordOTPExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGOUT */
export const logout = (_req: Request, res: Response) => {
  // JWT logout handled client-side
  res.json({ message: "Logged out successfully" });
};

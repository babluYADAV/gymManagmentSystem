import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Modals/user";

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
      profilePic
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
      profilePic
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

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        label: user.label,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGOUT */
export const logout = (_req: Request, res: Response) => {
  // JWT logout handled client-side
  res.json({ message: "Logged out successfully" });
};

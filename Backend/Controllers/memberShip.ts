import { Request, Response } from "express";
import MemberShip from "../Modals/membership";

// CREATE MEMBERSHIP
export const createMembership = async (req: Request, res: Response) => {
  try {
    const {
      users,
      price,
      program,
      startDate,
      endDate,
      personalTrainer,
    } = req.body;

    const membership = new MemberShip({
      users,
      price,
      program,
      startDate,
      endDate,
      personalTrainer,
    });

    await membership.save();

    res.status(201).json({
      success: true,
      message: "Membership created successfully",
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create membership",
    });
  }
};
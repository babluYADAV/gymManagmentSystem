import { Request, Response } from "express";
import MemberShip from "../Modals/memberShip";
const Stripe = require("stripe");
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.CLIENT_SECRET);



export const createSubscriptionPayment = async (req: Request, res: Response) => {
  try {
    const { userId, programId, subCategory, price, duration} = req.body;

    if (!userId || !programId || !subCategory || !price || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1️⃣ Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // convert to cents
      currency: "usd",
      metadata: {
        userId,
        programId,
        subCategory,
        durationInDays: duration,
      },
    });

    res.status(200).json({
      paymentIntent
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 2️⃣ Confirm Payment & Create Subscription
export const confirmSubscription = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, userId, programId, subCategory, personalTrainer ,duration} = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    const subscription = new MemberShip({
      user: userId,
      program: programId,
      subCategory,
      startDate,
      endDate,
      status: "active",
      personalTrainer
    });

    const savedSubscription = await subscription.save();
    res.status(201).json({
      message:'You have successfully registerd for the trainig',
      data:savedSubscription
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

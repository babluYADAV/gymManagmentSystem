// import { Request, Response } from "express";
// import MemberShip from "../Modals/membership";

// import Stripe from "stripe";

// import dotenv from "dotenv";
// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2022-11-15",
// });



// export const createSubscriptionPayment = async (req: Request, res: Response) => {
//   try {
//     const { userId, programId, subCategory, price, durationInDays } = req.body;

//     if (!userId || !programId || !subCategory || !price || !durationInDays) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 1️⃣ Create Stripe Payment Intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: price * 100, // convert to cents
//       currency: "usd",
//       metadata: {
//         userId,
//         programId,
//         subCategory,
//         durationInDays: durationInDays.toString(),
//       },
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // 2️⃣ Confirm Payment & Create Subscription
// export const confirmSubscription = async (req: Request, res: Response) => {
//   try {
//     const { paymentIntentId, userId, programId, subCategory, price, durationInDays } = req.body;

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     const startDate = new Date();
//     const endDate = new Date(startDate);
//     endDate.setDate(endDate.getDate() + durationInDays);

//     const subscription = new Subscription({
//       user: userId,
//       program: programId,
//       subCategory,
//       price,
//       startDate,
//       endDate,
//       status: "active",
//     });

//     const savedSubscription = await subscription.save();
//     res.status(201).json(savedSubscription);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

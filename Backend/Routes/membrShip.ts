import { Router } from "express";


import { admin, protect } from "../Middleware/auth";
import { confirmSubscription, createSubscriptionPayment } from "../Controllers/memberShip";

const router = Router();


router.post('/payment',protect,createSubscriptionPayment)
router.post('/success',protect,confirmSubscription)

export default router;
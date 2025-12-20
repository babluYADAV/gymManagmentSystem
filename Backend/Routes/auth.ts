import { Router } from "express";
import { register, login, sendOTP,logout, validateOTP,resetPassword } from "../Controllers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendOTP", sendOTP);
router.post("/validateOTP", validateOTP);
router.post("/resetPassword", resetPassword);

router.post("/logout", logout);

export default router;

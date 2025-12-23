import { Router } from "express";
import { register, login, sendOTP,logout, validateOTP,resetPassword, getAllUsers, getUser } from "../Controllers/auth";
import { admin, protect } from "../Middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/users',admin,getAllUsers)
router.get('/profile',protect,getUser)
router.post("/sendOTP", sendOTP);
router.post("/validateOTP", validateOTP);
router.post("/resetPassword", resetPassword);

router.post("/logout", logout);

export default router;

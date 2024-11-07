import express from "express";
import { loginUser, registerUser, adminLogin, verifyOtp } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/verify-otp', verifyOtp); // New route for OTP verification

export default userRouter;

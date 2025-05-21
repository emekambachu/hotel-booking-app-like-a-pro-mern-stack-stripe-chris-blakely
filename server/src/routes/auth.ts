import express, {Request, Response} from "express";
import {check, validationResult} from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post(
    "/login",

    [
        check("email", "Email is required").isEmail(),
        check("password", "Password must be 6 or more characters").isLength({ min: 6 })
    ],

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()[0].msg,
            });
        }

        const {email, password} = req.body;

        try{
            // Check if user exists
            const user = await User.findOne({email});

            if(!user){
                return res.status(400).json({
                    success: false,
                    message: "Invalid Credentials",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string, {
                    expiresIn: "1d",
                }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // secure cookie in production
                maxAge: 86400000
            });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
            });

        }catch (error){
            console.error("Login Error", error);
            return res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({
        userId: req.userId,
    });
});

router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("auth_token");
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
});

export default router;
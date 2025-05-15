// @ts-ignore
import express, {Request, Response} from "express";
import User from "../models/user";
// @ts-ignore
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post("/register", [

    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({ min: 6 }),
    check("first_name", "First name is required").isString(),
    check("last_name", "Last name is required").isString()

], async (req: Request, res: Response) => {

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()[0].msg,
        });
    }

    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // use in case of destructuring
        // const {email, password, first_name, last_name} = req.body;
        // const newUser = new User({email, password, first_name, last_name});
        // newUser.save();

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d",
            }
        );

        res.cookie("auth_token", token, {
            //expires: new Date(Date.now() + 900000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // secure cookie in production
            maxAge: 86400000
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: user
        });

    }catch (error) {
        console.log("Server Error", error);
        res.status(500).json({
            success: false,
            message: "Server error, contact your administrator"
        });
    }
});

export default router;
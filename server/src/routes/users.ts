// @ts-nocheck
import express, {Request, Response} from "express";
import User from "../models/user";
const router = express.Router();
router.post("/register", async (req, res) => {
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

        user = new User(req.body);
        await user.save();

    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error, contact your administrator"
        });
    }
})
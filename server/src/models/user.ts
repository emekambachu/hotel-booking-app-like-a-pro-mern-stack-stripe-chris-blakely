import mongoose from "mongoose";
// @ts-ignore
import bcrypt from "bcryptjs";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
import { Schema, model } from "mongoose";
import { User } from "@common";

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: false,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<User>("User", userSchema, "users");

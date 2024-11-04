import { RequestHandler } from "express";
import userModel from "../model/user";
import bcrypt from "bcrypt";

export const listUsers: RequestHandler = async (req, res) => {
    if (req.body) req.body = {};

    if (req.query.q) {
        if (typeof req.query.q !== "string" || req.query.q.trim()) {
            res.status(400).json({
                error: "Wrong Query Usage",
            });
            return;
        }

        try {
            const users = await userModel.find({ name: req.query.q });

            users.forEach((user) => {
                user.password = "The password must be hidden for privacy";
            });

            res.status(200).json({
                message: "Users Listed",
                users,
            });
            return;
        } catch (error) {
            res.status(404).json({
                error: "Users Not Found",
            });
            return;
        }
    }

    try {
        const users = await userModel.find();

        users.forEach((user) => {
            user.password = "The password must be hidden for privacy";
        });

        res.status(200).json({
            message: "Users Listed",
            users,
        });
        return;
    } catch (error) {}
};

export const addUser: RequestHandler = async (req, res) => {
    let { name, email, password, role } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: "Missing Fields",
        });
        return;
    }

    if (!role) role = "user";

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            res.status(400).json({
                error: "User Already Exists",
            });
            return;
        }

        bcrypt.hash(password, 10, async (error, hashed) => {
            if (error) {
                res.status(500).json({
                    error: "Password Hashing Error: " + error,
                });
                return;
            }

            const newUser = new userModel({
                name,
                email,
                password: hashed,
                role,
            });

            const savedUser = await newUser.save();

            savedUser.password = "The password must be hidden for privacy";

            res.status(201).json({
                message: "User Created",
                user: savedUser,
            });
            return;
        });
    } catch (error) {
        res.status(500).json({
            error: "User Creation Error: " + error,
        });
    }
};

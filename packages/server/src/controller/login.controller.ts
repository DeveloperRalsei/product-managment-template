import { RequestHandler } from "express";
import { findUserByEmail } from "../service/user.service";
import { compare } from "../utils/hasher";
import { createToken } from "../utils/token";
import env from "../config/env";

export const loginController: RequestHandler = async (req, res) => {
    let { email, password, remeberMe } = req.body;

    if (req.headers["content-type"] !== "application/json") {
        res.status(406).json({
            error: "Not Acceptable, Only JSON is supported",
        });
        return;
    }

    if (!remeberMe) remeberMe = false;

    if (!email || !password) {
        res.status(400).json({
            error: "Email or Password is required",
        });
        return;
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            res.status(400).json({
                error: "Email or Password is invalid",
            });
            return;
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({
                error: "Email or Password is invalid",
            });
            return;
        }

        const { password: _password, ...userData } = user;

        const token = createToken(userData);

        res.cookie("userToken", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            maxAge: remeberMe ? 7 * 24 * 3600 * 1000 : 3600 * 1000,
            path: "/dashboard",
        })
            .status(200)
            .json({
                message: "Login Success",
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};

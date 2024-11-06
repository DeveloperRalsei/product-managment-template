import { RequestHandler } from "express";
import env from "../config/env";
import { verifyToken } from "../utils/token";

export const authMiddleware: RequestHandler = (req, res, next) => {
    const token = req.cookies.userToken;

    if (!token) {
        res.status(401).json({
            error: "Unauthorized",
            success: false,
        });
        return;
    }

    try {
        const isTokenValid = verifyToken(token);
        if (!isTokenValid) {
            res.status(401).json({
                error: "Unauthorized",
                success: false,
            });
            return;
        }

        next();
    } catch (error) {
        res.status(401).json({
            error: "Unauthorized",
            success: false,
        });
        return;
    }
    next();
};

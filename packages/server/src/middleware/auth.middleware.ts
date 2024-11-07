import { RequestHandler } from "express";
import { verifyToken } from "../utils/token";

export const authMiddleware: RequestHandler = (req, res, next) => {
    const userToken = req.cookies.userToken;

    if (!userToken) {
        res.status(401).json({
            error: "Unauthorized",
            success: false,
        });
        return;
    }

    try {
        const isTokenValid = verifyToken(userToken);
        if (!isTokenValid) {
            res.status(401).json({
                error: "Unauthorized",
                success: false,
            });
            return;
        }

        req.user = isTokenValid._doc;

        next();
    } catch (error) {
        res.status(401).json({
            error: "Unauthorized",
            success: false,
        });
        return;
    }
    return;
};

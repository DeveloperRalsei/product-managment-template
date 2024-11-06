import { RequestHandler } from "express";
import { decodeToken, getTokenFromCookie } from "../utils/token";

export const meController: RequestHandler = (req, res) => {
    try {
        const userToken = getTokenFromCookie(req);
        const user = decodeToken(userToken);
        res.status(200).json({
            message: "Success",
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error,
        });
    }
};

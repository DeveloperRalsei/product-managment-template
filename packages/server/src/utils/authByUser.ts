import { Request, Response } from "express";

export function authByUser(req: Request, res: Response) {
    if (!req.user) {
        res.status(401).json({
            message: "No user logged in",
            success: false,
        });
        return;
    }

    if (req.user.role !== "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action",
            success: false,
        });
        return;
    }
}

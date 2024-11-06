import { RequestHandler } from "express";

export const logoutController: RequestHandler = (_req, res) => {
    res.clearCookie("userToken", {
        maxAge: 0,
        path: "/",
    })
        .status(200)
        .json({
            message: "Logout Success",
        });
};

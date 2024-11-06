import jwt from "jsonwebtoken";
import { User } from "@common";
import env from "../config/env";
import { Request } from "express";

const { JWT_SECRET } = env;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}

export function createToken(user: Omit<User, "password">) {
    return jwt.sign(user, JWT_SECRET!, {
        expiresIn: "1h",
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET!, { maxAge: "1h" });
}

export function decodeToken(token: string) {
    return jwt.decode(token);
}

export function getTokenFromCookie(req: Request) {
    return req.cookies.userToken;
}

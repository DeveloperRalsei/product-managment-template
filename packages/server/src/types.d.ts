import { User } from "@common";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

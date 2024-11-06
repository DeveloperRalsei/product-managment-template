import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const api = express();

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cookieParser());
api.use((req, _res, next) => {
    console.log(req.ip, req.hostname, req.path, req.method);
    next();
});

import { loginRoutes, userRoutes, meRoute, logoutRoute } from "./routes";
import { authMiddleware } from "./middleware/auth.middleware";
api.use("/api/v1", loginRoutes);
api.use("/api/v1", logoutRoute);
api.use("/api/v1", authMiddleware, meRoute);
api.use("/api/v1", authMiddleware, userRoutes);

api.use("*", (_req, res) => {
    res.status(404).json({
        error: "Wrong Usage",
    });
});

export default api;

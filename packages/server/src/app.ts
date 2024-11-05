import express from "express";
import cors from "cors";

const api = express();

api.use(cors());
api.use(express.json());
api.use((req, _res, next) => {
    console.log(req.ip, req.host, req.path, req.method);
    next();
});

import { loginRoutes, userRoutes } from "./routes";
api.use("/api/v1", userRoutes);
api.use("/api/v1", loginRoutes);

api.use("*", (_req, res) => {
    res.status(404).json({
        error: "Wrong Usage",
    });
});

export default api;

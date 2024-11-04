import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, _res, next) => {
    console.log(req.ip, req.baseUrl, req.path, req.method);
    next();
});

import userRoutes from "./routes/user";
app.use("/api/v1", userRoutes);

app.use("*", (_req, res) => {
    res.status(404).json({
        error: "Wrong Usage",
    });
});

export default app;

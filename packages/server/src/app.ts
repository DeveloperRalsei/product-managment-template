import express from "express";

const app = express();

app.use((req, _res, next) => {
    console.log(req.ip, req.baseUrl, req.path, req.method);
    next();
});

import userRoutes from "./routes/user";
app.use("/api/v1", userRoutes);

export default app;

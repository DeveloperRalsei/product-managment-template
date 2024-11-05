import { Router } from "express";
const router = Router();

router.post("/login", async (req, res, next) => {
    next();
});

export default router;

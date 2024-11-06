import { Router } from "express";
const router = Router();

import { logoutController } from "../controller";

router.post("/logout", logoutController);

export default router;

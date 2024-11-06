import { Router } from "express";
const router = Router();
import { meController } from "../controller";

router.get("/me", meController);

export default router;

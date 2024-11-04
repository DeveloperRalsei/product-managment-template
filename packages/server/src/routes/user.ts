import { Router } from "express";
import { userController } from "../controller";

const router = Router();

router.get("/users", userController.listUsers);

export default router;

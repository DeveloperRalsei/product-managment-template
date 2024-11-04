import { Router } from "express";
import { userController } from "../controller";

const router = Router();

router.get("/users", userController.listUsers);
router.post("/users/add", userController.addUser);

export default router;

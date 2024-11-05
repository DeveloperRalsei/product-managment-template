import { Router } from "express";
import { userController } from "../controller";

const router = Router();

router.get("/users", userController.listUsers);
router.get("/users/:id", userController.getUser);
router.post("/users/add", userController.addUser);

export default router;

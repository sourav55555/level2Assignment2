import { Router } from "express";

import { authenticate } from "../../middleware/auth";
import { userController } from "./users.controllers";

const router = Router();

// router.get("/")
router.get("/", authenticate('admin'), userController.getAllUsers);
router.put("/:userId", authenticate("admin", "customer"), userController.updateUser);
router.delete("/:userId", authenticate("admin"), userController.deleteUser)

export default router
import { Router } from "express";
import { authController } from "./auth.controllers";

const router = Router();

// router.get("/")
router.post("/signin", authController.signinUser);
router.post("/signup", authController.createUser);

export default router
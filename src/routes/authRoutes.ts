import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createUser } from "../controllers/authControllers";

const router = Router();

router.post("/login", authMiddleware, createUser);

export default router;

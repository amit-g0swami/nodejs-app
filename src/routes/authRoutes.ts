import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { login } from "../controllers/authControllers";

const router = Router();

router.post("/login", authMiddleware, login);

export default router;

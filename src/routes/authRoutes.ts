import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { AUTH_ROUTE } from '../types/auth.interface'
import { authController } from '../controllers/authControllers'

const router = Router()

router.post(AUTH_ROUTE.LOGIN, authMiddleware, authController)

export default router

import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { createUser } from '../controllers/authControllers'
import { AUTH_ROUTE } from '../types/auth.interface'

const router = Router()

router.post(AUTH_ROUTE.LOGIN, authMiddleware, createUser)

export default router

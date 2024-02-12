import User from '../models/User'
import { Request, Response } from 'express'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../types/shared.interface'
import { AUTH_MESSAGE, IAuthResponse } from '../types/auth.interface'
import { authService } from '../services/auth.service'

const zero = 0

export const authController = async (
  req: Request,
  res: Response<IAuthResponse>
) => {
  try {
    const { email, name, createdAs } = req.body

    const users = await authService.findUserByEmail(email)

    if (users.length === zero) {
      const newUser = new User({
        email,
        name,
        createdAs,
        sellerId: null
      })
      return res.status(HTTP_STATUS_CODE.CREATED).json({
        message: AUTH_MESSAGE.USER_CREATED,
        user: newUser,
        status: HTTP_STATUS_CODE.CREATED
      })
    }

    const usersWithCreatedAs = await authService.findUserByEmailAndCreatedAs(
      email,
      createdAs
    )

    if (usersWithCreatedAs.length === zero) {
      const newUser = await authService.createUser({
        email,
        name,
        createdAs,
        sellerId: null
      })
      return res.status(HTTP_STATUS_CODE.CREATED).json({
        message: AUTH_MESSAGE.USER_CREATED,
        user: newUser,
        status: HTTP_STATUS_CODE.CREATED
      })
    }

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: AUTH_MESSAGE.USER_ALREADY_EXISTS,
      user: usersWithCreatedAs[0],
      status: HTTP_STATUS_CODE.FORBIDDEN
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}

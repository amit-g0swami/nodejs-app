import User from '../models/User'
import {
  AUTH_MESSAGE,
  IAuthResponse,
  IUserData,
  IUserDataDocument
} from '../types/auth.interface'
import { HTTP_STATUS_CODE } from '../types/shared.interface'

const createUser = async (userData: IUserData): Promise<IAuthResponse> => {
  const newUser = new User(userData)
  await newUser.validate()
  await newUser.save()
  return {
    message: AUTH_MESSAGE.USER_CREATED,
    user: newUser,
    status: HTTP_STATUS_CODE.CREATED
  }
}

const findUserByEmail = (email: string): Promise<IUserDataDocument[]> => {
  return User.find({ email })
}

const findUserByEmailAndCreatedAs = (
  email: string,
  createdAs: string
): Promise<IUserDataDocument[]> => {
  return User.find({ email, createdAs })
}

export const authService = {
  createUser,
  findUserByEmail,
  findUserByEmailAndCreatedAs
}

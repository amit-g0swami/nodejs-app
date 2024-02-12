import User from '../models/User'
import { IUserData, IUserDataDocument } from '../types/auth.interface'

const createUser = async (userData: IUserData): Promise<IUserDataDocument> => {
  try {
    const newUser = new User(userData)
    await newUser.validate()
    await newUser.save()
    return newUser
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message)
  }
}

const findUserByEmail = async (email: string): Promise<IUserDataDocument[]> => {
  return await User.find({ email })
}

const findUserByEmailAndCreatedAs = async (
  email: string,
  createdAs: string
): Promise<IUserDataDocument[]> => {
  return await User.find({ email, createdAs })
}

export const authService = {
  createUser,
  findUserByEmail,
  findUserByEmailAndCreatedAs
}

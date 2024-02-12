import { ValidationError } from 'joi'
import { CREATED_AS, ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { Document, Types } from 'mongoose'

export enum AUTH_MESSAGE {
  USER_CREATED = 'User created successfully',
  USER_ALREADY_EXISTS = 'User already exists'
}

export enum AUTH_ROUTE {
  LOGIN = '/login'
}

export interface IUserData {
  name: string
  email: string
  createdAs: CREATED_AS
  sellerId?: Types.ObjectId | null
}

export interface IUserDataDocument extends Document, IUserData {}

export interface IAuthResponse {
  message: AUTH_MESSAGE | ERROR_MESSAGE
  user?: IUserDataDocument | IUserDataDocument[]
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
}

import { ValidationError } from 'joi'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { Document } from 'mongoose'
import { IUserDocument } from './auth.interface'

export enum CUSTOMER_MESSAGE {
  ADDRESS_CREATED = 'Address created successfully',
  ADDRESS_FETCHED = 'Address fetched successfully',
  INVALID_SELLER_ID = 'Invalid Seller ID',
  SELLER_NOT_FOUND = 'Seller not found',
  ADDRESS_ALREADY_SUBMITTED = 'Address already submitted',
  USER_ID_REQUIRED = 'User ID is required',
  INVALID_PAYLOAD = 'Invalid payload',
  USER_NOT_FOUND = 'User not found',
  SELLER_ID_ADDED_SUCCESSFULLY = 'Seller ID added successfully'
}

export enum CUSTOMER_ROUTE {
  GET_ADDRESS = '/address',
  CREATE_ADDRESS = '/address/:id',
  ADD_SELLER_ID = '/:userId/sellerId'
}

export interface IAddressDocument extends Document {
  streetAddress: string
  city: string
  state: string
  zipCode: number
  userId: string
  sellerId: string
}

export interface ICustomerResponse {
  message: CUSTOMER_MESSAGE | ERROR_MESSAGE
  address?: IAddressDocument | IAddressDocument[]
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
  user?: IUserDocument
}

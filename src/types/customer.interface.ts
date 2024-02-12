import { ValidationError } from 'joi'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { ISellerOrderDocument } from './seller.interface'

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
  CREATE_ORDER = '/order/:id',
  ADD_SELLER_ID = '/:userId/sellerId'
}

interface IUserDocument {
  userId: string
}

export interface ISellerOrderDocumentWithUserId
  extends ISellerOrderDocument,
    IUserDocument {}

export interface ICustomerResponse {
  message: CUSTOMER_MESSAGE | ERROR_MESSAGE
  order?: any
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
  user?: IUserDocument | any
}

import { ValidationError } from 'joi'
import {
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE
} from './shared.interface'
import { Document, Types } from 'mongoose'
import { IUserDocument } from './auth.interface'

interface IOrderDetail {
  productName: string
  quantity: number
  unitPrice: number
  totalAmount: number
}

interface IBuyerDetails {
  email: string
  fullName: string
  mobileNumber: string
}

interface IOrderPlaced {
  completeAddress: string
  landMark?: string
  pinCode: string
  city: string
  state: string
  country: string
}

interface IPackageDetails {
  deadWeight: number
  packageDimension?:
    | {
        length: number
        width: number
        height: number
      }
    | null
    | undefined
}

export enum SELLER_MESSAGE {
  ORDER_CREATED = 'Order created successfully',
  INVALID_SELLER_ID = 'Invalid Seller ID',
  SELLER_NOT_FOUND = 'Seller not found',
  INVALID_PAYLOAD = 'Invalid payload',
  SELLERS_FETCHED = 'Sellers fetched successfully',
  ORDERS_FETCHED = 'Orders fetched successfully'
}

export enum SELLER_ROUTE {
  SELLER = '/seller',
  CREATE_ORDER = '/:id/order',
  SEARCH_SELLER_BY_ID = '/seller/:id'
}

export interface ISellerOrderDocument extends Document {
  sellerId: string
  orderDetails: Types.DocumentArray<IOrderDetail>
  buyerDetails?: IBuyerDetails | null
  orderPlaced?: IOrderPlaced | null
  packageDetails?: IPackageDetails | null
  paymentDetails?: { paymentMode: PAYMENT_TYPE } | null
  isSavedToShiprocket: boolean
}

export interface ISellerResponse {
  message: SELLER_MESSAGE | ERROR_MESSAGE
  order?: ISellerOrderDocument | any
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
  seller?: IUserDocument[] | []
  orders?: ISellerOrderDocument[] | [] | any
}

export interface ISellerQueryRequest {
  filters: string
}

export interface IResBody {
  id: string
}

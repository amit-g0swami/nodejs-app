import { ValidationError } from 'joi'
import {
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE
} from './shared.interface'
import { Document } from 'mongoose'
import { IUserDataDocument } from './auth.interface'

export interface IOrderDetail {
  productName: string
  quantity: number
  unitPrice: number
  totalAmount: number
}

export interface IBuyerDetails {
  email: string
  fullName: string
  mobileNumber: string
}

export interface IOrderPlaced {
  completeAddress: string
  landMark?: string | null
  pinCode: string
  city: string
  state: string
  country: string
}

export interface IPackageDetails {
  deadWeight: number
  packageDimension?: {
    length: number
    width: number
    height: number
  } | null
}

export enum SELLER_MESSAGE {
  ORDER_CREATED = 'Order created successfully',
  INVALID_SELLER_ID = 'Invalid Seller ID',
  SELLER_NOT_FOUND = 'Seller not found',
  INVALID_PAYLOAD = 'Invalid payload',
  SELLERS_FETCHED = 'Sellers fetched successfully',
  ORDERS_FETCHED = 'Orders fetched successfully',
  INVALID_DATE_RANGE = 'Invalid date range'
}

export enum SELLER_ROUTE {
  GET_SELLER_ORDERS = '/seller/:id/orders',
  CREATE_ORDER = '/:id/order',
  SEARCH_SELLER_BY_ID = '/seller/:id'
}

export interface ISellerOrderDocument extends Document {
  sellerId: string
  orderDetails?: IOrderDetail | null
  buyerDetails?: IBuyerDetails | null
  orderPlaced?: IOrderPlaced | null
  packageDetails?: IPackageDetails | null
  paymentDetails?: { paymentMode: PAYMENT_TYPE } | null
  isSavedToShiprocket?: boolean | null
}

export interface ISellerResponse {
  message: SELLER_MESSAGE | ERROR_MESSAGE
  order?: ISellerOrderDocument
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
  seller?: IUserDataDocument[] | []
  orders?: ISellerOrderDocument[] | []
}

export interface ISellerQueryRequest {
  filters: string
}

export interface ISellerReqParams {
  id: string
}

export interface ISearchSellerByIdQuery {
  sellerId: string
  createdAt: {
    $gte: Date
    $lte: Date
  }
}

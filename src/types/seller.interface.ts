import { ValidationError } from "joi";
import {
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE,
} from "./shared.interface";
import { Document, Types } from "mongoose";

interface IOrderDetail {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

interface IBuyerDetails {
  email: string;
  fullName: string;
  mobileNumber: string;
}

interface IOrderPlaced {
  completeAddress: string;
  landMark: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
}

interface IPackageDetails {
  deadWeight: number;
  packageDimension?:
    | {
        length: number;
        width: number;
        height: number;
      }
    | null
    | undefined;
}

export enum SELLER_MESSAGE {
  ORDER_CREATED = "Order created successfully",
  INVALID_SELLER_ID = "Invalid Seller ID",
  SELLER_NOT_FOUND = "Seller not found",
}

export enum SELLER_ROUTE {
  CREATE_ORDER = "/:id/order",
}

export interface ISellerDocument extends Document {
  sellerId: string;
  orderDetails: Types.DocumentArray<IOrderDetail>;
  buyerDetails?: IBuyerDetails | null;
  orderPlaced?: IOrderPlaced | null;
  packageDetails?: IPackageDetails | null;
  paymentDetails?: { paymentMode: PAYMENT_TYPE } | null;
}

export interface ISellerResponse {
  message: SELLER_MESSAGE | ERROR_MESSAGE;
  order?: ISellerDocument;
  errors?: ValidationError;
  status?: HTTP_STATUS_CODE;
}

import { ValidationError } from "joi";
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from "./shared.interface";
import { Document } from "mongoose";

export enum CUSTOMER_MESSAGE {
  ADDRESS_CREATED = "Address created successfully",
  ADDRESS_FETCHED = "Address fetched successfully",
  INVALID_SELLER_ID = "Invalid Seller ID",
  SELLER_NOT_FOUND = "Seller not found",
  ADDRESS_ALREADY_SUBMITTED = "Address already submitted",
  USER_ID_REQUIRED = "User ID is required",
}

export enum CUSTOMER_ROUTE {
  GET_ADDRESS = "/address",
  CREATE_ADDRESS = "/address/:id",
}

export interface IAddressDocument extends Document {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  userId: string;
  sellerId: string;
}

export interface ICustomerResponse {
  message: CUSTOMER_MESSAGE | ERROR_MESSAGE;
  address?: IAddressDocument | IAddressDocument[];
  errors?: ValidationError;
  status?: HTTP_STATUS_CODE;
}

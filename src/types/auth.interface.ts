import { ValidationError } from "joi";
import { CREATED_AS, ERROR_MESSAGE } from "./shared.interface";
import { Document } from "mongoose";

export enum AUTH_MESSAGE {
  USER_CREATED = "User created successfully",
  USER_ALREADY_EXISTS = "User already exists",
}

export enum AUTH_ROUTE {
  LOGIN = "/login",
}

export interface IAuthResponse<T> {
  message: AUTH_MESSAGE | ERROR_MESSAGE;
  user?: T | T[] | null;
  errors?: ValidationError;
}

export interface IUserDocument extends Document {
  name: string;
  email: string;
  createdAs: CREATED_AS;
}

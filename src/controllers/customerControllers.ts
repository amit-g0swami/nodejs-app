import Address from "../models/Address";
import { Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from "../types/shared.interface";
import {
  CUSTOMER_MESSAGE,
  IAddressDocument,
  ICustomerResponse,
} from "../types/customer.interface";

export const createAddress = async (
  req: Request,
  res: Response<ICustomerResponse<IAddressDocument>>
) => {
  try {
    const { streetAddress, city, state, zipCode, userId } = req.body;
    const sellerId = req.params.id;

    const newAddress = new Address({
      userId,
      streetAddress,
      city,
      state,
      zipCode,
      sellerId,
    });

    await newAddress.save();

    res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: CUSTOMER_MESSAGE.ADDRESS_CREATED, address: newAddress });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

export const getAddress = async (
  req: Request,
  res: Response<ICustomerResponse<IAddressDocument>>
) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: CUSTOMER_MESSAGE.USER_ID_REQUIRED });
    }

    const address = await Address.find({ userId });
    res
      .status(HTTP_STATUS_CODE.OK)
      .json({ message: CUSTOMER_MESSAGE.ADDRESS_FETCHED, address });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

import Order from "../models/Order";
import { Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from "../types/shared.interface";
import {
  ISellerDocument,
  ISellerResponse,
  SELLER_MESSAGE,
} from "../types/seller.interface";

export const createOrder = async (
  req: Request,
  res: Response<ISellerResponse<ISellerDocument>>
) => {
  try {
    const sellerId = req.params.id;

    const {
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails,
    } = req.body;

    const newOrder = new Order({
      sellerId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails,
    });

    await newOrder.save();
    res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: SELLER_MESSAGE.ORDER_CREATED, order: newOrder });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

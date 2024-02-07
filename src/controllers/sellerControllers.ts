import Order from "../models/Order";
import { Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from "../types/shared.interface";
import { ISellerResponse, SELLER_MESSAGE } from "../types/seller.interface";

export const createOrder = async (
  req: Request,
  res: Response<ISellerResponse>
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
    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: SELLER_MESSAGE.ORDER_CREATED,
      order: newOrder,
      status: HTTP_STATUS_CODE.CREATED,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODE.OK)
      .json({
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      });
  }
};

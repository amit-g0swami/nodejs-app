import Order from "../models/Order";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
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
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

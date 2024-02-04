import Address from "../models/Address";
import { Request, Response } from "express";

export const createAddress = async (req: Request, res: Response) => {
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
      .status(201)
      .json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const address = await Address.find({ userId });
    res.status(200).json({ message: "Address fetched successfully", address });
  } catch (error) {
    console.error("Error getting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

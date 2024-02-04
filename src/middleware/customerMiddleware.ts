import mongoose from "mongoose";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { CREATED_AS } from "../shared/shared.interface";

export const customerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sellerId = req.params.id;

  if (!sellerId) {
    return res.status(201).json({ message: "Seller ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    return res.status(201).json({ message: "Invalid Seller ID format" });
  }

  try {
    const user = await User.findById(sellerId);

    if (!user || user.createdAs !== CREATED_AS.SELLER) {
      return res.status(201).json({ message: "Seller not found" });
    }

    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

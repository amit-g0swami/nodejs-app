import User from "../models/User";
import { Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from "../types/shared.interface";
import { AUTH_MESSAGE, IAuthResponse } from "../types/auth.interface";

export const createUser = async (
  req: Request,
  res: Response<IAuthResponse>
) => {
  try {
    const { email, name, createdAs } = req.body;

    const users = await User.find({ email });

    if (users.length === 0) {
      const newUser = new User({
        email,
        name,
        createdAs,
      });
      await newUser.save();
      return res
        .status(HTTP_STATUS_CODE.CREATED)
        .json({ message: AUTH_MESSAGE.USER_CREATED, user: newUser });
    }

    if (users.length === 1) {
      if (users.some((user) => user.createdAs !== createdAs)) {
        const newUser = new User({
          email,
          name,
          createdAs,
        });
        await newUser.save();
        return res
          .status(HTTP_STATUS_CODE.CREATED)
          .json({ message: AUTH_MESSAGE.USER_CREATED, user: newUser });
      } else {
        return res
          .status(HTTP_STATUS_CODE.CREATED)
          .json({ message: AUTH_MESSAGE.USER_ALREADY_EXISTS, user: users[0] });
      }
    }

    if (users.length >= 2) {
      const filteredUser = users.filter((user) => user.createdAs === createdAs);
      return res.status(HTTP_STATUS_CODE.CREATED).json({
        message: AUTH_MESSAGE.USER_ALREADY_EXISTS,
        user: filteredUser[0],
      });
    }
  } catch (error) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

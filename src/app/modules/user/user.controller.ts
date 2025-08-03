import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletServices } from "../wallet/wallet.services";
import { UserServices } from "./user.services";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.register(req.body);
    const wallet = await WalletServices.createWallet(user._id);

    const data = { user, wallet };

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User Create Successfully",
      data,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies: any = req.cookies;
    const user = await UserServices.getMe(cookies);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Get Successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { total, users } = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users Get Successfully",
      data: users,
      meta: {
        total,
      },
    });
  }
);

export const UserController = {
  register,
  getMe,
  getAllUsers,
};

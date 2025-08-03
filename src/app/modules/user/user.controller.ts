import { NextFunction, Request, Response } from "express";
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

export const UserController = {
  register,
};

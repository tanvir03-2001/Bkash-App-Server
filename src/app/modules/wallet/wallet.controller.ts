import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletServices } from "./wallet.services";

const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await WalletServices.blockUser(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Wallet Block Successfully",
      data: user,
    });
  }
);
const UnBlockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await WalletServices.unBlockUser(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Wallet Unblock Successfully",
      data: user,
    });
  }
);

export const WalletControllers = {
  blockUser,
  UnBlockUser,
};

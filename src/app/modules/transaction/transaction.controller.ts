import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TransactionServices } from "./transaction.services";

const myTransaction = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    const me = await TransactionServices.myTransaction(token);

    const message =
      me.length === 0 ? "No Transaction Found" : "Transaction Get Successfully";

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message,
      data: me,
    });
  }
);

const allTransaction = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const all = await TransactionServices.allTransaction();

    const message =
      all.length === 0
        ? "No Transaction Found"
        : "Transaction Get Successfully";

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message,
      data: all,
    });
  }
);

export const TransactionController = {
  myTransaction,
  allTransaction,
};

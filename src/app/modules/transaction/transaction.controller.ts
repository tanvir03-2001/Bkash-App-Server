import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TransactionServices } from "./transaction.services";

const myTransaction = catchAsync(
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

export const TransactionController = {
  myTransaction,
};

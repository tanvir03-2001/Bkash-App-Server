import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TransactionServices } from "../transaction/transaction.services";
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
const addMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone, amount } = req.body;
    const userResult = await WalletServices.addMoney(phone, amount);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Add Money Successfully",
      data: userResult,
    });
  }
);
const withdrawMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone, amount } = req.body;
    const userResult = await WalletServices.withdrawMoney(phone, amount);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Add Money Successfully",
      data: userResult,
    });
  }
);
const sendMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    const sendMoneyResult = await WalletServices.sendMoney(
      req.body,
      accessToken
    );

    const transactionData = await TransactionServices.createTransaction(
      sendMoneyResult
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Send Money Successfully",
      data: transactionData,
    });
  }
);
const cashIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    const cashInResult = await WalletServices.cashIn(req.body, accessToken);

    const transactionData = await TransactionServices.createTransaction(
      cashInResult
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cash-In Successfully",
      data: transactionData,
    });
  }
);

export const WalletControllers = {
  blockUser,
  UnBlockUser,
  addMoney,
  withdrawMoney,
  sendMoney,
  cashIn,
};

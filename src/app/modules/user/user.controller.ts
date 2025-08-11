/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

const agentApproved = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.agentApproved(
      req.cookies.accessToken,
      req.body.phone
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Agent Approved successfully",
      data: user,
    });
  }
);

const agentSuspended = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.agentSuspended(
      req.cookies.accessToken,
      req.body.phone
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Agent Suspended successfully",
      data: user,
    });
  }
);
const allAgents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agents = await UserServices.allAgents();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Agent GET successfully",
      data: agents,
    });
  }
);
const allUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.allUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users GET successfully",
      data: users,
    });
  }
);

export const UserController = {
  register,
  getMe,
  agentApproved,
  agentSuspended,
  allUsers,
  allAgents,
};

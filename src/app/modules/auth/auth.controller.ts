import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { AuthServices } from "./auth.services";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jwtToken, user } = await AuthServices.login(req.body);

    setAuthCookie(res, jwtToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login Successful",
      data: {
        token: jwtToken,
        user: user,
      },
    });
  }
);

export const AuthController = {
  login,
};

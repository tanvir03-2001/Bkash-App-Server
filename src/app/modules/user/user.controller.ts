import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("controller");
    const user = await UserServices.register(req.body);
    console.log("controller 2");

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User Create Successfully",
      data: user,
    });
  }
);

export const UserController = {
  register,
};

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { GetWalletByUserId } from "../helper/getWalletByUserId";
import { AgentStatus, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Token Received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = (await User.findOne({
        phone: verifiedToken.phone,
      })) as Partial<IUser>;

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User dose not exist");
      }
      if (
        isUserExist?.agentStatus &&
        isUserExist?.agentStatus !== AgentStatus.PENDING
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Agent is ${isUserExist.agentStatus}`
        );
      }

      const userWallet = await GetWalletByUserId(
        isUserExist._id as Types.ObjectId
      );

      if (userWallet.blocked) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "You are not permitted to access this route"
        );
      }

      // req.user = verifiedToken;

      next();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      next(error);
    }
  };

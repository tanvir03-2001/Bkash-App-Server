import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";

export const VerifyAndDecodeToken = (token: string): JwtPayload => {
  if (!token) {
    throw new AppError(404, "Token not found");
  }
  const decoded = verifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
  if (!decoded?.phone) {
    throw new AppError(401, "Invalid token. Please login again.");
  }
  return decoded;
};

import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { verifyToken } from "../../utils/jwt";
import { AgentStatus, IUser, Role } from "./user.interface";
import { User } from "./user.model";

const register = async (payload: Partial<IUser>) => {
  const { phone, password, role } = payload;

  const isUserExist = await User.findOne({ phone });

  if (isUserExist) {
    throw new AppError(500, "User already exist");
  }
  const hashPassword = await bcryptjs.hash(password as string, 10);

  let newUser = { ...payload, password: hashPassword };
  if (role === Role.AGENT) {
    newUser.agentStatus = AgentStatus.PENDING;
  }

  console.log("isUserExist", hashPassword);
  const user = User.create(newUser);
  return user;
};

const getMe = async (token: { accessToken: string; refreshToken: string }) => {
  if (!token.accessToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "No Token Received");
  }

  const decode = verifyToken(
    token.accessToken,
    envVars.JWT_ACCESS_SECRET
  ) as JwtPayload;

  const user = (await User.findOne({
    phone: decode.phone,
  }).lean()) as Partial<IUser>;

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Login...");
  }

  delete user.password;

  return user;
};

const getAllUsers = async () => {
  const users = await User.find({}).select("-password");
  const total = await User.countDocuments();
  return { users, total };
};

export const UserServices = {
  register,
  getMe,
  getAllUsers,
};

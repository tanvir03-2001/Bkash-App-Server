import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { VerifyAndDecodeToken } from "../../helper/verifyAndDecodeToken";
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

  const newUser = { ...payload, password: hashPassword };
  if (role === Role.AGENT) {
    newUser.agentStatus = AgentStatus.PENDING;
  }

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

// const agent = AgentStatus.APPROVED || AgentStatus.SUSPENDED
const agentApproved = async (accessToken: string, agentPhone: string) => {
  if (!agentPhone) {
    throw new AppError(404, "Updated phone not found");
  }

  const { phone } = VerifyAndDecodeToken(accessToken);

  const adminInfo = await User.find({ phone: phone });

  if (!adminInfo) {
    throw new AppError(404, "Admin Not Found");
  }
  // if (adminInfo.role !== role) {
  //   throw new AppError(500, "Admin Not valid");
  // }

  const updatedAgent = await User.findOneAndUpdate(
    { phone: agentPhone },
    { agentStatus: AgentStatus.APPROVED },
    { upsert: true, runValidators: true }
  );
  return updatedAgent;
};
// const agent = AgentStatus.APPROVED || AgentStatus.SUSPENDED
const agentSuspended = async (accessToken: string, agentPhone: string) => {
  if (!agentPhone) {
    throw new AppError(404, "Updated phone not found");
  }
  const { phone, role } = VerifyAndDecodeToken(accessToken);

  const adminInfo = await User.findOne({ phone: phone });

  if (!adminInfo) {
    throw new AppError(404, "Admin Not Found");
  }
  if (adminInfo.role !== role) {
    throw new AppError(500, "Admin Not valid");
  }

  const updatedAgent = await User.findOneAndUpdate(
    { phone: agentPhone },
    { agentStatus: AgentStatus.SUSPENDED },
    { upsert: true, runValidators: true }
  );
  return updatedAgent;
};

const allAgents = async () => {
  const allAgents = await User.findOne({ role: Role.AGENT });
  return allAgents;
};
const allUsers = async () => {
  const allUsers = await User.findOne({ role: Role.USER });
  return allUsers;
};

export const UserServices = {
  register,
  getMe,
  agentApproved,
  agentSuspended,
  allAgents,
  allUsers,
};

import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
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

export const UserServices = {
  register,
};

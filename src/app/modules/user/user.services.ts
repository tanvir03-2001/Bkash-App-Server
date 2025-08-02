import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const register = async (payload: Partial<IUser>) => {
  const { phone, password } = payload;

  const isUserExist = await User.findOne({ phone });

  if (isUserExist) {
    throw new AppError(500, "User already exist");
  }

  const hashPassword = await bcryptjs.hash(password as string, 10);

  console.log("isUserExist", hashPassword);
  const user = User.create({
    ...payload,
    password: hashPassword,
  });
  return user;
};

export const UserServices = {
  register,
};

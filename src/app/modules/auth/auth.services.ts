import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { generateToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const login = async (data: Partial<IUser>) => {
  const { phone, password } = data;

  const ifUserExist = (await User.findOne({ phone }).lean()) as Partial<IUser>;
  if (!ifUserExist) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "User Not found Register First"
    );
  }

  const matchPass = bcrypt.compare(
    password as string,
    ifUserExist.password as string
  );

  if (!matchPass) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password Not match");
  }

  const accessToken = generateToken(
    { phone: ifUserExist.phone, role: ifUserExist.role },
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    { phone: ifUserExist.phone, role: ifUserExist.role },
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  delete ifUserExist.password;
  delete ifUserExist._id;

  return { user: ifUserExist, jwtToken: { accessToken, refreshToken } };
};

export const AuthServices = {
  login,
};

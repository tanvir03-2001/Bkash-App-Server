import AppError from "../errorHelpers/AppError";
import { Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const GetUserByPhone = async (phone: string, role?: Role) => {
  const user = await User.findOne({ phone });
  if (!user || (role && user.role !== role)) {
    throw new AppError(404, "User not found or invalid role");
  }
  return user;
};

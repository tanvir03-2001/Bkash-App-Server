/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { Wallet } from "../modules/wallet/wallet.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      phone: "+8801712345678",
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    if (!hashedPassword) {
      throw new AppError(httpStatus.BAD_REQUEST, "Password Hashed Error");
    }

    const payload: IUser = {
      name: "Super Admin",
      phone: envVars.SUPER_ADMIN_PHONE,
      role: Role.SUPPER_ADMIN,
      nid: 123456789,
      password: hashedPassword,
    };

    const superAdmin = await User.create(payload);

    if (!superAdmin._id) {
      throw new AppError(httpStatus.BAD_REQUEST, "Supper Admin Not Create");
    }

    await Wallet.create({ user: superAdmin._id });

    console.log("Super Admin create successfully! \n");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};

import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Wallet } from "./wallet.model";

const createWallet = async (userId: Types.ObjectId) => {
  if (!userId) {
    throw new AppError(500, "User Id Not Found!");
  }

  const wallet = await Wallet.create({ user: userId });
  return wallet;
};

const blockUser = async (userId: string) => {
  if (!userId) {
    throw new AppError(500, "User Id Not Found!");
  }
  const blockUserData = await Wallet.findOneAndUpdate(
    { user: userId },
    { blocked: true },
    { upsert: true }
  );

  if (!blockUserData) {
    throw new AppError(500, "User not found!");
  }

  return blockUserData;
};

const unBlockUser = async (userId: string) => {
  if (!userId) {
    throw new AppError(500, "User Id Not Found!");
  }
  const UnBlockUserData = await Wallet.findOneAndUpdate(
    { user: userId },
    { blocked: false },
    { upsert: true }
  );

  if (!UnBlockUserData) {
    throw new AppError(500, "User not found!");
  }

  return UnBlockUserData;
};

export const WalletServices = {
  createWallet,
  blockUser,
  unBlockUser,
};

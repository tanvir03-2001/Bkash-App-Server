import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Wallet } from "./wallet.model";

const createWallet = async (userID: Types.ObjectId) => {
  if (!userID) {
    throw new AppError(500, "User Id Not Found!");
  }

  const wallet = await Wallet.create({ user: userID });
  return wallet;
};

export const WalletServices = {
  createWallet,
};

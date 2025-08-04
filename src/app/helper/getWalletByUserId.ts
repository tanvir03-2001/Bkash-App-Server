import { Types } from "mongoose";
import AppError from "../errorHelpers/AppError";
import { Wallet } from "../modules/wallet/wallet.model";

export const GetWalletByUserId = async (userId: Types.ObjectId | string) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new AppError(404, "Wallet not found");
  return wallet;
};

import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { GetUserByPhone } from "../../helper/getUserByPhone";
import { GetWalletByUserId } from "../../helper/getWalletByUserId";
import { ProcessTransaction } from "../../helper/processTransaction";
import { ValidateAmount } from "../../helper/validateAmount";
import { VerifyAndDecodeToken } from "../../helper/verifyAndDecodeToken";
import { TransactionType } from "../transaction/transaction.interface";
import { AgentStatus, Role } from "../user/user.interface";
import { User } from "../user/user.model";
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

const addMoney = async (phone: string, amount: string) => {
  if (!phone) {
    throw new AppError(500, "Phone Undefined");
  }

  const ifUserExist = await User.findOne({ phone: phone });

  if (!ifUserExist) {
    throw new AppError(500, "User Not Found!");
  }

  const ifWalletExist = await Wallet.findOne({
    user: ifUserExist._id,
  }).populate({
    path: "user",
    select: "-_id -password",
  });
  if (!ifWalletExist) {
    throw new AppError(500, "Wallet Not Found!");
  }

  ifWalletExist.balance = Number(ifWalletExist.balance) + Number(amount);
  const wallet = await ifWalletExist.save();
  return wallet;
};

const withdrawMoney = async (phone: string, amount: string) => {
  if (!phone) {
    throw new AppError(500, "Phone Undefined");
  }

  const ifUserExist = await User.findOne({ phone: phone });

  if (!ifUserExist) {
    throw new AppError(500, "User Not Found!");
  }

  const ifWalletExist = await Wallet.findOne({
    user: ifUserExist._id,
  }).populate({
    path: "user",
    select: "-_id -password",
  });
  if (!ifWalletExist) {
    throw new AppError(500, "Wallet Not Found!");
  }

  if (Number(ifWalletExist.balance) - Number(amount) < 0) {
    throw new AppError(404, "Insufficient balance");
  }

  ifWalletExist.balance = Number(ifWalletExist.balance) - Number(amount);
  const wallet = await ifWalletExist.save();
  return wallet;
};

const sendMoney = async (
  body: { phone: string; amount: string },
  accessToken: string
) => {
  if (!accessToken) throw new AppError(401, "Access token not provided");

  const { phone, amount } = body;
  if (!phone || !amount)
    throw new AppError(400, "Phone and amount are required");

  const amountToTransfer = ValidateAmount(amount);
  const decoded = VerifyAndDecodeToken(accessToken);

  if (decoded.role !== Role.USER) {
    throw new AppError(403, "Only users can send money");
  }

  const sender = await GetUserByPhone(decoded.phone, Role.USER);
  const receiver = await GetUserByPhone(phone, Role.USER);

  const senderWallet = await GetWalletByUserId(sender._id);
  if (senderWallet.balance < amountToTransfer) {
    throw new AppError(403, "Insufficient balance");
  }

  const receiverWallet = await GetWalletByUserId(receiver._id);

  return ProcessTransaction(
    senderWallet,
    receiverWallet,
    amountToTransfer,
    TransactionType.SEND_MONEY
  );
};

const cashIn = async (
  body: { phone: string; amount: string },
  accessToken: string
) => {
  if (!accessToken) throw new AppError(401, "Access token not provided");

  const { phone, amount } = body;
  if (!phone || !amount)
    throw new AppError(400, "Phone and amount are required");

  const amountToTransfer = ValidateAmount(amount);
  const decoded = VerifyAndDecodeToken(accessToken);

  if (decoded.role !== Role.AGENT) {
    throw new AppError(403, "Only agents can perform Cash In");
  }

  const sender = await GetUserByPhone(decoded.phone, Role.AGENT);
  if (sender.agentStatus !== AgentStatus.APPROVED) {
    throw new AppError(403, "Agent is not approved for Cash In");
  }

  const receiver = await GetUserByPhone(phone, Role.USER);

  const senderWallet = await GetWalletByUserId(sender._id);
  if (senderWallet.balance < amountToTransfer) {
    throw new AppError(403, "Insufficient balance");
  }

  const receiverWallet = await GetWalletByUserId(receiver._id);

  return ProcessTransaction(
    senderWallet,
    receiverWallet,
    amountToTransfer,
    TransactionType.CASH_IN
  );
};

export const WalletServices = {
  createWallet,
  blockUser,
  unBlockUser,
  addMoney,
  withdrawMoney,
  sendMoney,
  cashIn,
};

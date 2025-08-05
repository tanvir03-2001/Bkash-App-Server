import { GetUserByPhone } from "../../helper/getUserByPhone";
import { GetWalletByUserId } from "../../helper/getWalletByUserId";
import { VerifyAndDecodeToken } from "../../helper/verifyAndDecodeToken";
import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const createTransaction = async (transactionData: ITransaction) => {
  const result = await Transaction.create(transactionData);
  return result;
};

const myTransaction = async (token: string) => {
  const { phone } = VerifyAndDecodeToken(token);

  const user = await GetUserByPhone(phone);
  const wallet = await GetWalletByUserId(user._id);

  const matchedTransactions = await Transaction.find({
    $or: [{ "from.wallet": wallet._id }, { "to.wallet": wallet._id }],
  });

  return matchedTransactions;
};

export const TransactionServices = {
  createTransaction,
  myTransaction,
};

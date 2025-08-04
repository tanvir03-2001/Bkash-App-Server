import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const createTransaction = async (transactionData: ITransaction) => {
  const result = await Transaction.create(transactionData);
  return result;
};

export const TransactionServices = {
  createTransaction,
};

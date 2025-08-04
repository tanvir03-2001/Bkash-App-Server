import {
  ITransaction,
  TransactionStatus,
  TransactionType,
} from "../modules/transaction/transaction.interface";
import { BalanceUpdate } from "../utils/balanceUpdate";

export const ProcessTransaction = async (
  fromWallet: any,
  toWallet: any,
  amount: number,
  type: TransactionType
): Promise<ITransaction> => {
  BalanceUpdate(fromWallet, "SUBTRACT", amount);
  BalanceUpdate(toWallet, "ADD", amount);

  await fromWallet.save();
  await toWallet.save();

  return {
    status: TransactionStatus.COMPLETED,
    amount,
    from: {
      wallet: fromWallet._id,
      type,
      balance: fromWallet.balance,
    },
    to: {
      wallet: toWallet._id,
      type,
      balance: toWallet.balance,
    },
  };
};

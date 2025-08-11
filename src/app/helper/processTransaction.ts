import {
  AmountType,
  ITransaction,
  TransactionStatus,
  TransactionType,
} from "../modules/transaction/transaction.interface";
import { BalanceUpdate } from "../utils/balanceUpdate";

export const ProcessTransaction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromWallet: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      amount_type: AmountType.DEBIT,
      balance: fromWallet.balance,
    },
    to: {
      wallet: toWallet._id,
      type,
      amount_type: AmountType.CREDIT,
      balance: toWallet.balance,
    },
  };
};

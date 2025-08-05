import { Types } from "mongoose";

export enum TransactionType {
  SEND_MONEY = "SEND_MONEY",
  WITHDRAW = "WITHDRAW",
  CASH_IN = "CASH_IN",
  ADD_MONEY = "ADD_MONEY",
  CASH_OUT = "CASH_OUT",
}
export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
export enum AmountType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export interface IFromTo {
  wallet: Types.ObjectId;
  type: TransactionType;
  amount_type: AmountType;
  balance: number;
}

export interface ITransaction {
  amount: number;
  from: IFromTo;
  to: IFromTo;
  fee?: number;
  commission?: number;
  status: TransactionStatus;
}

import { Types } from "mongoose";

export enum TransactionType {
  SEND_MONEY = "SEND_MONEY",
  WITHDRAW = "WITHDRAW",
  CASH_IN = "CASH_IN",
}
export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface ITransaction {
  type: TransactionType;
  from: Types.ObjectId;
  to: Types.ObjectId;
  amount: number;
  fee?: number;
  commission?: number;
  initiated_by: Types.ObjectId;
  status: TransactionStatus;
}

import { model, Schema } from "mongoose";
import {
  IFromTo,
  ITransaction,
  TransactionStatus,
  TransactionType,
} from "./transaction.interface";

const FromToSchema = new Schema<IFromTo>(
  {
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { _id: false, versionKey: false }
);

const transactionSchema = new Schema<ITransaction>(
  {
    from: FromToSchema,
    to: FromToSchema,
    amount: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
    },
    commission: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.COMPLETED,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);

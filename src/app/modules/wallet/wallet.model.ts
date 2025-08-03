import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    balance: { type: Number, default: 50.0 },
    blocked: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Wallet = model<IWallet>("Wallet", walletSchema);

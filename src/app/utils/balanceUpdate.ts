import { Document } from "mongoose";
import AppError from "../errorHelpers/AppError";

// Type
export type UpdateType = "ADD" | "SUBTRACT";

// Constant
export const UpdateAction = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
} as const;

// Extend Document to include balance
interface BalanceDoc extends Document {
  balance: number;
}

export function BalanceUpdate(
  modelData: BalanceDoc | null,
  updateType: UpdateType,
  amount: number
): BalanceDoc {
  if (!modelData) {
    throw new AppError(500, "Model Data Not Found");
  }

  if (typeof modelData.balance !== "number") {
    throw new AppError(500, "Balance field is invalid or missing");
  }

  modelData.balance =
    updateType === "ADD"
      ? modelData.balance + amount
      : modelData.balance - amount;

  return modelData;
}

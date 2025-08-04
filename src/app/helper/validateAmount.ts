import AppError from "../errorHelpers/AppError";

export const ValidateAmount = (amountStr: string): number => {
  const amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    throw new AppError(400, "Invalid amount");
  }
  return amount;
};

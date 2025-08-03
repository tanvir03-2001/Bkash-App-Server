import z from "zod";

export const createWalletZodSchema = z.object({
  user: z.string({ message: "User Id is Must be string" }),
  balance: z.number({ message: "Balance Must Be Number" }),
  blocked: z.boolean({ message: "Blocked Must Be Boolean" }),
});

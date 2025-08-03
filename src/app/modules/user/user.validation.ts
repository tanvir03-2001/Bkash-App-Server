import z from "zod";
import { AgentStatus, Role } from "./user.interface";

// Zod schema for user registration validation
export const registerUserZodSchema = z.object({
  name: z.string({ message: "Name Must Be Text" }),
  phone: z.string(),
  password: z
    .string({ message: "Password Must Be Text" })
    .min(6, { message: "Password Must Be Minimum 8 Characters" }),
  nid: z.number({ message: "NID Must Be A Number" }),
  role: z.enum(Object.values(Role)),
  agentStatus: z.enum(Object.values(AgentStatus)).optional(),
});

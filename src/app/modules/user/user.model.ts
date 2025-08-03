import { model, Schema } from "mongoose";
import { AgentStatus, IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    nid: { type: Number, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    agentStatus: { type: String, enum: Object.values(AgentStatus) },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);

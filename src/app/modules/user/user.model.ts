import { model, Schema } from "mongoose";
import { AccountType, IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true, maxlength: 10, minlength: 3 },
    last_name: { type: String, required: true, maxlength: 10, minlength: 3 },
    account_type: {
      type: String,
      enum: Object.values(AccountType),
      default: AccountType.USER,
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    nid: { type: Number, required: true },
    phone: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);

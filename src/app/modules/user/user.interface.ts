export enum AccountType {
  USER = "USER",
  AGENT = "AGENT",
  ADMIN = "ADMIN",
  SUPPER_ADMIN = "SUPPER_ADMIN",
}

export interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  nid: number;
  account_type: AccountType;
}

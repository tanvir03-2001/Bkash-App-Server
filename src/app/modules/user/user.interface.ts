export enum Role {
  USER = "USER",
  AGENT = "AGENT",
  ADMIN = "ADMIN",
  SUPPER_ADMIN = "SUPPER_ADMIN",
}

export enum AgentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  SUSPENDED = "SUSPENDED",
}

export interface IUser {
  name: string;
  phone: string;
  password: string;
  nid: number;
  role: Role;
  agentStatus?: AgentStatus;
}

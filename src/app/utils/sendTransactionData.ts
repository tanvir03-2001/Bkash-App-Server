import { Response } from "express";

interface TMeta {
  total: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}

export const sendTransactionData = <T>(data: TResponse<T>) => {
  return {};
};

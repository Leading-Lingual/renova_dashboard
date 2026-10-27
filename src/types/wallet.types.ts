import { bankSchema, createWithdrawSchema } from "@/validations/wallet.validation";
import z from "zod";

export type bankFormValues = z.infer<typeof bankSchema>;

export type WithdrawFormValues = z.infer<ReturnType<typeof createWithdrawSchema>>;
export type BankAccount = {
  id: string;
  bank: string;
  accountNumber: string;
  isDefault: boolean;
};

export interface WalletTransaction {
  id: string;
  description: string;
  amount: string;
  date: string;
  status: string;
  reference?: string;
  type: "CREDIT" | "DEBIT";
}
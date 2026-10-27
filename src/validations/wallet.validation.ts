import { object, string } from "zod";

export const bankSchema = object({
  bank: string().trim().min(1, "Please select your bank"),
  accountNumber: string().trim().min(1, "please input your account number"),
});

export const createWithdrawSchema = (availableBalance: number) =>
  object({
    amount: string()
      .trim()
      .min(1, "Enter an amount to withdraw")
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value),
        "Enter a valid amount",
      )
      .refine(
        (value) => Number(value) > 0,
        "Amount must be greater than zero",
      )
      .refine(
        (value) => Number(value) <= availableBalance,
        "Amount cannot exceed your available balance",
      ),
    account: string().min(1, "Select an account to receive your withdrawal"),
  });

import { object, string } from "zod";

export const bankSchema = object({
  bankCode: string().trim().min(1, "Please select your bank"),
  accountNumber: string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit account number"),
});

export const createWithdrawSchema = (availableBalance: number) =>
  object({
    amountNgn: string()
      .trim()
      .min(1, "Enter an amount to withdraw")
      .refine(
        (value) => /^\d+(\.\d+)?$/.test(value),
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
    payoutAccountId: string().min(1, "Select an account to receive your withdrawal"),
  });

import { apiClient } from "@/lib/api-client";
import { Payout, PayoutAccount } from "@/types/wallet.types";
import { mutationOptions } from "@tanstack/react-query";

export const addPayoutAccountMutation = mutationOptions({
  mutationKey: ["addAccount"],
  mutationFn: (payload: {
    bankCode: string;
    accountNumber: string;
    otp: string;
  }) =>
    apiClient<PayoutAccount>("/v1/wallet/payout-accounts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["accounts"],
    });
  },
});

export const deletePayoutAccountMutation = mutationOptions({
  mutationKey: ["deleteAccount"],
  mutationFn: (payload: { accountId: string; otp: string }) =>
    apiClient<{
      message: "string";
    }>(`/v1/wallet/payout-accounts/${payload.accountId}`, {
      method: "DELETE",
      body: JSON.stringify({ otp: payload.otp }),
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["accounts"],
    });
  },
});

export const getAccountOtpMutation = mutationOptions({
  mutationKey: ["accountOtp"],
  mutationFn: (payload: { action: string }) =>
    apiClient<{
      message: "string";
    }>("/v1/wallet/payout-accounts/otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const createPayoutMutation = mutationOptions({
  mutationKey: ["createPayout"],
  retry: false,
  mutationFn: (payload: {
    amountNgn: string;
    payoutAccountId: string;
    idempotencyKey: string;
  }) =>
    apiClient<Payout>("/v1/payouts", {
      method: "POST",
      headers: { "Idempotency-Key": payload.idempotencyKey },
      body: JSON.stringify({
        amountNgn: payload.amountNgn,
        payoutAccountId: payload.payoutAccountId,
      }),
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    void context.client.invalidateQueries({ queryKey: ["wallet"] });
    void context.client.invalidateQueries({ queryKey: ["payouts"] });
    void context.client.invalidateQueries({ queryKey: ["transactions"] });
  },
});

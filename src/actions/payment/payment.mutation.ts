import { apiClient } from "@/lib/api-client";
import type { PaymentVerificationResponse, RetryPaymentResponse } from "@/types/payment.types";
import { mutationOptions } from "@tanstack/react-query";

export const verifyPaymentMutation = mutationOptions({
  mutationKey: ["verifyPayment"],
  retry: false,
  mutationFn: (reference: string) =>
    apiClient<PaymentVerificationResponse>(`/v1/payments/${encodeURIComponent(reference)}/verify`, {
      method: "POST",
    }),
  onSuccess: (data, _variables, _onMutateResult, context) => {
    if (data.paymentStatus !== "SUCCESS" || data.purchaseStatus !== "PAID") return;
    void context.client.invalidateQueries({ queryKey: ["cart"] });
    void context.client.invalidateQueries({ queryKey: ["purchase", data.purchaseId] });
    void context.client.invalidateQueries({ queryKey: ["paymentReceipt", data.purchaseId] });
    void context.client.invalidateQueries({ queryKey: ["dashboard"] });
  },
});

export const retryPaymentMutation = mutationOptions({
  mutationKey: ["retryPayment"],
  retry: false,
  mutationFn: ({ purchaseId, idempotencyKey }: {
    purchaseId: string;
    idempotencyKey: string;
  }) => apiClient<RetryPaymentResponse>(`/v1/purchases/${encodeURIComponent(purchaseId)}/payments/retry`, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
  }),
  onSuccess: (_data, { purchaseId }, _onMutateResult, context) => {
    void context.client.invalidateQueries({ queryKey: ["purchase", purchaseId] });
  },
});

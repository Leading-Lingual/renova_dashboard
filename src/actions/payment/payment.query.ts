import { apiClient } from "@/lib/api-client";
import type { PaymentReceiptResponse, PurchaseResponse } from "@/types/payment.types";
import { queryOptions } from "@tanstack/react-query";

export const getPurchaseQuery = (purchaseId: string) => queryOptions({
  queryKey: ["purchase", purchaseId],
  queryFn: ({ signal }) => apiClient<PurchaseResponse>(`/v1/purchases/${encodeURIComponent(purchaseId)}`, { signal }),
  enabled: !!purchaseId,
});

export const getPaymentReceiptQuery = (purchaseId: string) => queryOptions({
  queryKey: ["paymentReceipt", purchaseId],
  queryFn: ({ signal }) => apiClient<PaymentReceiptResponse>(`/v1/purchases/${encodeURIComponent(purchaseId)}/receipt`, { signal }),
  enabled: !!purchaseId,
  retry: false,
});

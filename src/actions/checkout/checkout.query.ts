import { apiClient } from "@/lib/api-client";
import type { CheckoutPreviewResponse, CheckoutRequest } from "@/types/checkout.types";
import { queryOptions } from "@tanstack/react-query";

export const getCheckoutPreviewQuery = (body: CheckoutRequest) => queryOptions({
  queryKey: ["checkoutPreview", body],
  queryFn: ({ signal }) => apiClient<CheckoutPreviewResponse>("/v1/checkout/preview", {
    method: "POST",
    body: JSON.stringify(body),
    signal,
  }),
  retry: false,
});

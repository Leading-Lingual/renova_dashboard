import { apiClient } from "@/lib/api-client";
import type { CheckoutRequest, CheckoutResponse } from "@/types/checkout.types";
import { mutationOptions } from "@tanstack/react-query";

export const checkoutMutation = mutationOptions({
  mutationKey: ["checkout"],
  retry: false,
  mutationFn: ({ body, idempotencyKey }: {
    body: CheckoutRequest;
    idempotencyKey: string;
  }) => apiClient<CheckoutResponse>("/v1/checkout", {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(body),
  }),
});

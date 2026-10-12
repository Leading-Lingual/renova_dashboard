import { apiClient } from "@/lib/api-client";
import { CartListingsResponse } from "@/types/cart.types";
import { mutationOptions } from "@tanstack/react-query";

export const addToCartMutation = mutationOptions({
  mutationKey: ["addToCart"],
  mutationFn: (payload: {
  listingId: string
}) =>
    apiClient<CartListingsResponse>("/v1/cart/items", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["cart"],
    });
  },
});

export const removefromCartMutation = mutationOptions({
  mutationKey: ["removefromCart"],
  mutationFn: (listingId:string) =>
    apiClient<CartListingsResponse>(`/v1/cart/items/${listingId}`, {
      method: "DELETE",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["cart"],
    });
  },
});

export const deleteCartMutation = mutationOptions({
  mutationKey: ["deleteCart"],
  mutationFn: () =>
    apiClient<"">(`/v1/cart`, {
      method: "DELETE",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["cart"],
    });
  },
});
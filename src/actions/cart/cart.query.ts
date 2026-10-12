import { apiClient } from "@/lib/api-client";
import { CartListingsResponse } from "@/types/cart.types";
import { queryOptions } from "@tanstack/react-query";

export const getCartItems = queryOptions({
  queryKey: ["cart"],
  queryFn: () => apiClient<CartListingsResponse>("/v1/cart"),
});

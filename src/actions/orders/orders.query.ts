import { apiClient } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { GetOrdersResponse, Order, OrderStatus } from "@/types/orders.types";

export interface GetOrdersParams {
  role?: "BUYER" | "SELLER";
  view?: "ALL" | "IN_PROGRESS" | "COMPLETED";
  q?: string;
  status?: OrderStatus;
  from?: string;
  to?: string;
  sort?: string;
  limit?: number;
  cursor?: string;
}

export const getOrdersQuery = (params: GetOrdersParams = {}) =>
  queryOptions({
    queryKey: ["orders", params],
    refetchInterval: 30 * 1000,
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      if (params.role) {
        searchParams.set("role", params.role);
      }

      if (params.view) {
        searchParams.set("view", params.view);
      }

      if (params.q) {
        searchParams.set("q", params.q);
      }

      if (params.status) {
        searchParams.set("status", params.status);
      }

      if (params.from) {
        searchParams.set("from", params.from);
      }

      if (params.to) {
        searchParams.set("to", params.to);
      }

      if (params.sort) {
        searchParams.set("sort", params.sort);
      }

      const queryString = searchParams.toString();

      return apiClient<GetOrdersResponse>(`/v1/orders?${queryString}`);
    },
  });

export const getOrderDetailQuery = (orderId: string) =>
  queryOptions({
    queryKey: ["orderDetail", orderId],
    queryFn: () => apiClient<Order>(`/v1/orders/${orderId}`),
    enabled: !!orderId,
  });

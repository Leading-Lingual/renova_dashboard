import { apiClient } from "@/lib/api-client";
import {
  BanksResponse,
  EarningStatus,
  EarningTypes,
  getEarningResponse,
  getTransactionsResponse,
  getWalletResponse,
  Payout,
  PayoutAccountsResponse,
  PayoutsResponse,
  TransactionTypes,
} from "@/types/wallet.types";
import { queryOptions } from "@tanstack/react-query";

export interface GetWalletTransactionsParams {
  to?: string;
  from?: string;
  type?: TransactionTypes;
  limit?: number;
  cursor?: string;
}

export interface GetWalletEarningParams {
  status?: EarningStatus;
  type?: EarningTypes;
  limit?: number;
  cursor?: string;
}

export interface GetPayoutsParams {
  limit?: number;
  cursor?: string;
}

export const getWalletQuery = queryOptions({
  queryKey: ["wallet"],
  queryFn: () => apiClient<getWalletResponse>("/v1/wallet"),
});

export const getWalletTransactionsQuery = (
  params: GetWalletTransactionsParams = {},
) =>
  queryOptions({
    queryKey: ["transactions", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.to) {
        searchParams.set("to", params.to);
      }

      if (params.from) {
        searchParams.set("from", params.from);
      }

      if (params.type) {
        searchParams.set("type", params.type);
      }

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      const queryString = searchParams.toString();

      return apiClient<getTransactionsResponse>(
        `/v1/wallet/transactions?${queryString}`,
      );
    },
  });

export const getWalletEarningQuery = (params: GetWalletEarningParams = {}) =>
  queryOptions({
    queryKey: ["earnings", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.status) {
        searchParams.set("status", params.status);
      }

      if (params.type) {
        searchParams.set("type", params.type);
      }

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      const queryString = searchParams.toString();

      return apiClient<getEarningResponse>(
        `/v1/wallet/earnings?${queryString}`,
      );
    },
  });

export const getWalletPayoutAccountsQuery = queryOptions({
  queryKey: ["accounts"],
  queryFn: () => apiClient<PayoutAccountsResponse>("/v1/wallet/payout-accounts"),
});

export const getBanks = queryOptions({
  queryKey: ["banks"],
  queryFn: () => apiClient<BanksResponse>("/v1/payouts/banks"),
});

export const getPayoutsQuery = (params: GetPayoutsParams = {}) =>
  queryOptions({
    queryKey: ["payouts", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      const queryString = searchParams.toString();

      return apiClient<PayoutsResponse>(`/v1/payouts?${queryString}`);
    },
  });

export const getPayoutDetailQuery = (payoutId: string) =>
  queryOptions({
    queryKey: ["payoutDetails", payoutId],
    queryFn: () => apiClient<Payout>(`/v1/payouts/${payoutId}`),
    enabled: !!payoutId,
  });

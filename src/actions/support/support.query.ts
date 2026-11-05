import { apiClient } from "@/lib/api-client";
import { ListingSort } from "@/types/listing.types";
import {
  GetArticleResponse,
  GetTicketsresponse,
  TicketCategory,
  TicketResponse,
  TicketStatus,
} from "@/types/support.types";
import { queryOptions } from "@tanstack/react-query";

export interface GetTicketsParams {
  status?: TicketStatus;
  q?: string;
  sort?: ListingSort;
  limit?: number;
  cursor?: string;
  category?: TicketCategory;
}

export const GetTicketsQuery = (params: GetTicketsParams = {}) =>
  queryOptions({
    queryKey: ["tickets", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.status) {
        searchParams.set("status", params.status);
      }

      if (params.category) {
        searchParams.set("category", params.category);
      }

      if (params.q) {
        searchParams.set("q", params.q);
      }

      if (params.sort) {
        searchParams.set("sort", params.sort);
      }

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      const queryString = searchParams.toString();

      return apiClient<GetTicketsresponse>(
        `/v1/support/tickets?${queryString}`,
      );
    },
  });

export const getTicketDetailQuery = (ticketId: string) =>
  queryOptions({
    queryKey: ["ticketDetail", ticketId],
    queryFn: () => apiClient<TicketResponse>(`/v1/support/tickets/${ticketId}`),
    enabled: !!ticketId,
  });

  export const GetArticlesQuery = (params: GetTicketsParams = {}) =>
  queryOptions({
    queryKey: ["tickets", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.category) {
        searchParams.set("category", params.category);
      }

      if (params.q) {
        searchParams.set("q", params.q);
      }

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      const queryString = searchParams.toString();

      return apiClient<GetArticleResponse>(
        `/v1/support/articles?${queryString}`,
      );
    },
  });

  export const getArticleDetailQuery = (articleId: string) =>
  queryOptions({
    queryKey: ["articleDetail", articleId],
    queryFn: () => apiClient<TicketResponse>(`/v1/support/articles/${articleId}`),
    enabled: !!articleId,
  });
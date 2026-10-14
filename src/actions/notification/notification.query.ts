import { apiClient } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { GetNotificationResponse } from "@/types/notification.types";

export interface GetNotificationParams {
  unreadOnly?: string;
  limit?: number;
  cursor?: string;
}

export const getNotificationQuery = (params: GetNotificationParams = {}) =>
  queryOptions({
    queryKey: ["notification", params],
    refetchInterval:  30 * 1000,
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      if (params.unreadOnly) {
        searchParams.set("unreadOnly", params.unreadOnly);
      }

      const queryString = searchParams.toString();

      return apiClient<GetNotificationResponse>(
        `/v1/notifications?${queryString}`,
      );
    },
  });

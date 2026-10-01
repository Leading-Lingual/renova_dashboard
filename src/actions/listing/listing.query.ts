import { apiClient } from "@/lib/api-client";
import {
  GetListingResponse,
  Listing,
  ListingSort,
  ListingStatus,
  MaterialType,
} from "@/types/listing.types";
import { queryOptions } from "@tanstack/react-query";

export interface GetListingParams {
  status?: ListingStatus;
  materialType?: MaterialType;
  q?: string;
  sort?: ListingSort;
  limit?: number;
  cursor?: string;
}

export const GetListingQuery = (params: GetListingParams = {}) =>
  queryOptions({
    queryKey: ["listings", params],
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.status) {
        searchParams.set("status", params.status);
      }

      if (params.materialType) {
        searchParams.set("materialType", params.materialType);
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

      return apiClient<GetListingResponse>(
        `/v1/material-listings?${queryString}`,
      );
    },
  });

export const getListingDetailQuery = (listingId: string) =>
  queryOptions({
    queryKey: ["listingDetail", listingId],
    queryFn: () => apiClient<Listing>(`/v1/material-listings/${listingId}`),
    enabled: !!listingId,
  });

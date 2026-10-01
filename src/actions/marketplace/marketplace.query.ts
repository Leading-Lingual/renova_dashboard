import { apiClient } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { GetMarketplaceListingResponse } from "@/types/marketplace.types";
import {
  Listing,
  ListingSort,
  ListingStatus,
  MaterialType,
  PickupPreference,
} from "@/types/listing.types";

export interface GetMarketplaceListingParams {
  status?: ListingStatus;
  materialType?: MaterialType;
  q?: string;
  sort?: ListingSort;
  limit?: number;
  cursor?: string;
  state?: string;
  city?: string;
  pickupPreference?: PickupPreference;
  minQuantityKg?: number;
  maxQuantityKg?: number;
  minPricePerKg?: number;
  maxPricePerKg?: number;
  savedOnly?: string;
}

export const getMarketPlaceListingsQuery = (params: GetMarketplaceListingParams = {}) =>
  queryOptions({
    queryKey: ["markplaceListings", params],
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

      if (params.savedOnly) {
        searchParams.set("savedOnly", params.savedOnly);
      }

      if (params.limit) {
        searchParams.set("limit", String(params.limit));
      }

      if (params.cursor) {
        searchParams.set("cursor", params.cursor);
      }

      const queryString = searchParams.toString();

      return apiClient<GetMarketplaceListingResponse>(
        `/v1/marketplace/listings?${queryString}`,
      );
    },
  });

  export const getMarketplaceListingDetailQuery = (listingId: string) =>
    queryOptions({
      queryKey: ["marketplaceListingDetail", listingId],
      queryFn: () => apiClient<Listing>(`/v1/marketplace/listings/${listingId}`),
      enabled: !!listingId,
    });

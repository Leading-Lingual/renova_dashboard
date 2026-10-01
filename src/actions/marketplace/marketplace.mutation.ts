import { apiClient } from "@/lib/api-client";
import { mutationOptions } from "@tanstack/react-query";

export const saveListingMutation = mutationOptions({
  mutationKey: ["saveListing"],
  mutationFn: (listingId: string) =>
    apiClient<"">(`/v1/marketplace/listings/${listingId}/save`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey;

        return (
          key.includes("markplaceListings") ||
          key.includes("marketplaceListingDetail")
        );
      },
    });
  },
});

export const unSaveListingMutation = mutationOptions({
  mutationKey: ["saveListing"],
  mutationFn: (listingId: string) =>
    apiClient<"">(`/v1/marketplace/listings/${listingId}/save`, {
      method: "DELETE",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey;

        return (
          key.includes("markplaceListings") ||
          key.includes("marketplaceListingDetail")
        );
      },
    });
  },
});

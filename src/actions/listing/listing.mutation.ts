import { apiClient } from "@/lib/api-client";
import { Listing, listingFormValues } from "@/types/listing.types";
import { mutationOptions } from "@tanstack/react-query";

export const CreateListingMutation = mutationOptions({
  mutationKey: ["createListing"],
  mutationFn: (payload: listingFormValues) => {
    const formData = new FormData();

    formData.append("materialType", payload.materialType);
    formData.append("quantityKg", String(payload.quantityKg));
    formData.append("pricePerKg", String(payload.pricePerKg));
    formData.append("pickupPreference", payload.pickupPreference);
    formData.append("currency", payload.currency);
    formData.append("unit", payload.unit);

    if (payload.scanId) {
      formData.append("scanId", payload.scanId);
    }

    payload.images.forEach((image) => {
      formData.append("images", image);
    });

    return apiClient<Listing>("/v1/material-listings", {
      method: "POST",
      body: formData,
    });
  },
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["listings"],
    });
  },
});

export const DeleteListingMutation = mutationOptions({
  mutationKey: ["deleteListing"],
  mutationFn: ({
    listingId,
    imageId,
  }: {
    listingId: string;
    imageId: string;
  }) =>
    apiClient<"">(`/v1/material-listings/${listingId}/images/${imageId}`, {
      method: "DELETE",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["listings"],
    });
  },
});

export const ArchiveListingMutation = mutationOptions({
  mutationKey: ["archiveListing"],
  mutationFn: (listingId: string) =>
    apiClient<"">(`/v1/material-listings/${listingId}/archive`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["listings"],
    });
  },
});

export const RestoreListingMutation = mutationOptions({
  mutationKey: ["restoreListing"],
  mutationFn: (listingId: string) =>
    apiClient<"">(`/v1/material-listings/${listingId}/restore`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["listings"],
    });
  },
});

export const PublishListingMutation = mutationOptions({
  mutationKey: ["publishListing"],
  mutationFn: (listingId: string) =>
    apiClient<"">(`/v1/material-listings/${listingId}/publish`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["listings"],
    });
  },
});


export const UnPublishListingMutation = mutationOptions({
  mutationKey: ["unPublishListing"],
  mutationFn: (listingId: string) =>
    apiClient<"">(`/v1/material-listings/${listingId}/unpublish`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["listings"],
    });
  },
});

"use client";
import { useCallback } from "react";
import { useMutation, UseMutationOptions, WithRequired } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { ArchiveListingMutation, PublishListingMutation, RestoreListingMutation, UnPublishListingMutation } from "@/actions/listing/listing.mutation";

type ListingActionConfig = {
  mutation: WithRequired<UseMutationOptions<"", Error, string, unknown>, "mutationKey">
  successMessage: string;
  errorMessage: string;
};
const useListingAction = ({
  mutation,
  successMessage,
  errorMessage,
}: ListingActionConfig) => {
  const { mutate, ...rest } = useMutation(mutation);

  const run = useCallback(
    (listingId: string) =>
      mutate(listingId, {
        onSuccess: () => toast.success(successMessage),
        onError: (error) => toast.error(error.message || errorMessage),
      }),
    [mutate, successMessage, errorMessage],
  );

  return { run, ...rest };
};

export const useListingActions = () => {
  const archive = useListingAction({
    mutation: ArchiveListingMutation,
    successMessage: "Listing archived!",
    errorMessage: "Failed to archive listing",
  });

  const restore = useListingAction({
    mutation: RestoreListingMutation,
    successMessage: "Listing restored!",
    errorMessage: "Failed to restore listing",
  });

  const publish = useListingAction({
    mutation: PublishListingMutation,
    successMessage: "Listing published!",
    errorMessage: "Failed to publish listing",
  });

  const unPublish = useListingAction({
    mutation: UnPublishListingMutation,
    successMessage: "Moved to draft",
    errorMessage: "Failed to convert to draft",
  });

  const isAnyPending =
    archive.isPending ||
    restore.isPending ||
    publish.isPending ||
    unPublish.isPending;

  return { archive, restore, publish, unPublish, isAnyPending };
};
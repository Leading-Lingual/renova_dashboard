"use client";

import { useTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Listing } from "@/types/listing.types";

import { features } from "./data-table-features";
import { getListingColumns } from "./ListingTableColumn";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  ArchiveListingMutation,
  PublishListingMutation,
  RestoreListingMutation,
  UnPublishListingMutation,
} from "@/actions/listing/listing.mutation";
import { toast } from "sonner";

interface ListingTableProps {
  listings: Listing[];
  isFetching?: boolean;
}

const ListingTable = ({ listings, isFetching }: ListingTableProps) => {
  const { mutate: archiveListing } = useMutation(ArchiveListingMutation);
  const { mutate: restoreListing } = useMutation(RestoreListingMutation);
  const { mutate: publishListing } = useMutation(PublishListingMutation);
  const { mutate: unPublishListing } = useMutation(UnPublishListingMutation);

  const handleArchive = (listingId: string) => {
    archiveListing(listingId, {
      onSuccess: () => {
        toast.success("Listing Archived!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to archive listing");
      },
    });
  };
  const handleRestore = (listingId: string) => {
    restoreListing(listingId, {
      onSuccess: () => {
        toast.success("Listing Restored!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to restore listing");
      },
    });
  };

  const handlePublish = (listingId: string) => {
    publishListing(listingId, {
      onSuccess: () => {
        toast.success("Listing Published!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to publish listing");
      },
    });
  };

  const handleUnPublish = (listingId: string) => {
    unPublishListing(listingId, {
      onSuccess: () => {
        toast.success("Moved to drat");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to convert to draft");
      },
    });
  };

  const columns = getListingColumns({
  onArchive: handleArchive,
  onRestore: handleRestore,
  onPublish: handlePublish,
  onUnPublish: handleUnPublish,
});
  const table = useTable({
    features,
    data: listings,
    columns: columns,
  });

  return (
    <div className="border rounded-lg px-4 overflow-x-auto">
      <Table aria-label="Listing">
        <TableHeader className="border-b-[0.5px] border-black-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-m-bold! font-bold!">
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                {isFetching ? (
                  <Loader2 className="animate-spin m-auto" />
                ) : (
                  "No listings found."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingTable;

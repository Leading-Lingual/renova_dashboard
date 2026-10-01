"use client";

import EmptyState from "@/components/EmptyState";
import EmptyStateImg from "../../../../public/rafiki.svg";
import { Loader2, Plus } from "lucide-react";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { useRouter } from "next/navigation";
import { GetListingQuery } from "@/actions/listing/listing.query";
import ListingTable from "@/components/Listing/ListingsTable";
import ListingHeading from "@/components/Listing/ListingHeading";
import ListingNav from "@/components/Listing/ListingNav";
import PaginationControls from "@/components/PaginationControls";
import { useCursorPagination } from "@/hooks/useCursorPagination";
import { useState } from "react";
import {
  ListingSort,
  ListingStatus,
  MaterialType,
} from "@/types/listing.types";

const LIMIT = 5;

const ListingPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ListingStatus>();
  const [materialType, setMaterialType] = useState<MaterialType>();
  const [sort, setSort] = useState<ListingSort>("NEWEST");

  const { data, isPending, isFetching, controlProps, reset } =
    useCursorPagination({
      limit: LIMIT,
      buildQuery: (cursor) =>
        GetListingQuery({
          status,
          materialType,
          q: search,
          sort,
          limit: LIMIT,
          cursor,
        }),
      getTotalItems: ({ counts }) => {
        switch (status) {
          case "DRAFT":
            return counts.draft;
          case "AVAILABLE":
            return counts.available;
          case "ARCHIVED":
            return counts.archived;
          default:
            return counts.all;
        }
      },
    });

  const listings = data?.items ?? [];

  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-auto px-6 md:px-8 py-6">
      <ListingHeading
        isOverview={false}
        showActions={data && data?.counts.all !== 0}
      />

      {isPending ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : data?.counts.all === 0 ? (
        <EmptyState
          title="No Listing"
          subtile="You currently do not have any listed waste material"
          image={EmptyStateImg}
          firstButton={{
            text: "Scan Material",
            icon: ScanFilledIcon,
          }}
          secondButton={{
            text: "Create New Listing",
            icon: Plus,
            onClick: () => router.push("/listing/newListing"),
          }}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <ListingNav
            counts={data?.counts}
            search={search}
            status={status}
            materialType={materialType}
            sort={sort}
            onSearchChange={(value) => {
              setSearch(value);
              reset();
            }}
            onStatusChange={(value) => {
              setStatus(value);
              reset();
            }}
            onMaterialTypeChange={(value) => {
              setMaterialType(value);
              reset();
            }}
            onSortChange={(value) => {
              setSort(value);
              reset();
            }}
          />

          <ListingTable isFetching={isFetching} listings={listings} />

          <PaginationControls {...controlProps} />
        </div>
      )}
    </div>
  );
};

export default ListingPage;
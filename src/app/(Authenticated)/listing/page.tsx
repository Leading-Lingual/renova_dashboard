"use client";

import EmptyState from "@/components/EmptyState";
import EmptyStateImg from "../../../../public/rafiki.svg";
import { Plus } from "lucide-react";
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
        showActions={isPending || (data !== undefined && data.counts.all !== 0)}
      />

      {isPending ? (
        <div
          className="flex flex-col gap-4"
          aria-label="Loading listings"
          aria-busy="true"
        >
          <ListingNav
            counts={undefined}
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
          <div className="md:border rounded-lg md:px-4 overflow-hidden">
            <div className="hidden md:grid grid-cols-8 gap-4 border-b border-black-100 px-4 py-4">
              {[0, 1, 2, 3, 4, 5].map((item, index) => (
                <div
                  key={item}
                  className={`${index === 0 ? "col-span-3" : ""} w-1/2  h-4 rounded bg-black-50 animate-pulse`}
                />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {[0, 1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-5 md:grid-cols-8 items-center gap-2 rounded-lg border p-2 md:border-0 md:border-b"
                >
                  <div className="col-span-3 flex gap-2 md:gap-4 items-center flex-1">
                    <div className="size-16 md:h-18 md:w-26.5 rounded bg-black-50 animate-pulse" />
                    <div className="flex flex-1 flex-col gap-2 w-80 ">
                      <div className="h-3 w-5/8 md:w-1/4 rounded bg-black-50 animate-pulse" />
                      <div className="h-3 w-4/5 md:w-1/8 rounded bg-black-50 animate-pulse" />
                      <div className="h-3 w-2/8 md:w-1/4 rounded bg-black-50 animate-pulse" />
                    </div>
                  </div>
                  <div className="hidden md:block h-4 w-20 rounded bg-black-50 animate-pulse" />
                  <div className="hidden md:flex flex-col gap-2 w-20 ">
                    <div className="h-3 w-1/9 rounded bg-black-50 animate-pulse" />
                    <div className="h-3 w-1/4 rounded bg-black-50 animate-pulse" />
                  </div>
                  <div className="hidden md:block h-7 w-11 animate-pulse rounded-md bg-black-50" />
                  <div className="flex flex-1 flex-col gap-2 w-80 ">
                    <div className="h-7 w-11 md:h-3 md:w-1/4 rounded bg-black-50 animate-pulse" />
                    <div className="h-3 w-1/8 rounded bg-black-50 animate-pulse" />
                  </div>
                  <div className="justify-self-end md:justify-self-start h-6 w-5 rounded bg-black-50 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <PaginationControls {...controlProps} />
        </div>
      ) : data?.counts.all === 0 ? (
        <EmptyState
          title="No Listing"
          subtitle="You currently do not have any listed waste material"
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

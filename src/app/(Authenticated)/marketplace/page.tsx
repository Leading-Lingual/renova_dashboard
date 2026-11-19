"use client";
import { getMarketPlaceListingsQuery } from "@/actions/marketplace/marketplace.query";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import { ListingSort, MaterialType } from "@/types/listing.types";
import { useState } from "react";
import EmptyStateImg from "../../../../public/rafiki.svg";
import MarketPlaceNav from "@/components/MarketPlace/MarketPlaceNav";
import MarketPlaceListings from "@/components/MarketPlace/MarketPlaceListings";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useCursorPagination } from "@/hooks/useCursorPagination";
import PaginationControls from "@/components/PaginationControls";

const MarketplacePage = () => {
  const { isMobile, isSmallLaptop } = useWindowSize();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "SAVED">("ALL");
  const [savedOnly, setSaveOnly] = useState("false");
  const [materialType, setMaterialType] = useState<MaterialType>();
  const [sort, setSort] = useState<ListingSort>("NEWEST");

  const limit = isMobile ? 4 : isSmallLaptop ? 6 : 8;

  const { data, isPending, controlProps, reset } =
    useCursorPagination({
      limit: limit,
      buildQuery: (cursor) =>
        getMarketPlaceListingsQuery({
          materialType,
          q: search,
          sort,
          limit,
          cursor,
          savedOnly,
        }),
      getTotalItems: ({ counts }) => {
        switch (status) {
          case "SAVED":
            return counts.saved;
          case "ALL":
            return counts.available;

          default:
            return counts.available;
        }
      },
    });

  const listings = data?.items ?? [];

  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-auto px-6 md:px-8 py-6">
      <Heading
        title="Marketplace"
        subtitle="View, manage and buy recyclable waste material listed from verified Sellers."
      />
      {isPending ? (
        <div className="flex flex-col gap-4" aria-label="Loading marketplace listings" aria-busy="true">
          <MarketPlaceNav
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
              setSaveOnly(value === "SAVED" ? "true" : "false");
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-4">
            {Array.from({ length: limit }, (_, index) => (
              <div key={index} className="p-4 rounded-2xl border flex flex-col gap-4.5 md:gap-5.5">
                <div className="w-full h-25.25 md:h-39.75 shrink-0 overflow-hidden rounded-lg bg-black-50 animate-pulse" />
                <div className="flex flex-col gap-3">
                  <div className="h-4 w-2/3 rounded bg-black-50 animate-pulse" />
                  <div className="flex justify-between gap-3">
                    <div className="h-3 w-1/3 rounded bg-black-50 animate-pulse" />
                    <div className="h-3 w-1/4 rounded bg-black-50 animate-pulse" />
                  </div>
                  <div className="h-3 w-1/2 rounded bg-black-50 animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-black-50 animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-9 flex-1 rounded-lg bg-black-50 animate-pulse" />
                  <div className="hidden md:block h-9 flex-1 rounded-lg bg-black-50 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <PaginationControls {...controlProps} />
        </div>
      ) : data?.counts.available === 0 ? (
        <EmptyState
          title="No Listing"
          subtitle="There is currently no listed waste material, check back later!"
          image={EmptyStateImg}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <MarketPlaceNav
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
              setSaveOnly(value === "SAVED" ? "true" : "false");
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
          <MarketPlaceListings listings={listings} />
          <PaginationControls {...controlProps} />
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;

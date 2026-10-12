"use client";
import { getMarketPlaceListingsQuery } from "@/actions/marketplace/marketplace.query";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import { ListingSort, MaterialType } from "@/types/listing.types";
import {
  Loader2,
} from "lucide-react";
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
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
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

"use client";

import EmptyState from "@/components/EmptyState";
import EmptyStateImg from "../../../../public/rafiki.svg";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRight,
  Loader2,
  Plus,
} from "lucide-react";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetListingQuery } from "@/actions/listing/listing.query";
import ListingTable from "@/components/Listing/ListingsTable";
import ListingHeading from "@/components/Listing/ListingHeading";
import ListingNav from "@/components/Listing/ListingNav";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";
import {
  ListingSort,
  ListingStatus,
  MaterialType,
} from "@/types/listing.types";

const ListingPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [cursors, setCursors] = useState<Record<number, string | undefined>>({
    1: undefined,
  });
  const [isResolvingPage, setIsResolvingPage] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ListingStatus>();
  const [materialType, setMaterialType] = useState<MaterialType>();
  const [sort, setSort] = useState<ListingSort>("NEWEST");

  const limit = 5;

  const { data, isPending, isFetching } = useQuery({
    ...GetListingQuery({
      status,
      materialType,
      q: search,
      sort,
      limit,
      cursor: cursors[page],
    }),
  });

  const listings = data?.items ?? [];

  const totalItems = (() => {
    if (!data?.counts) return 0;

    switch (status) {
      case "DRAFT":
        return data.counts.draft;

      case "AVAILABLE":
        return data.counts.available;

      case "ARCHIVED":
        return data.counts.archived;

      default:
        return data.counts.all;
    }
  })();

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const resetPagination = () => {
    setPage(1);
    setCursors({
      1: undefined,
    });
  };

  const handleFirstPage = () => {
    if (page === 1 || isResolvingPage) return;

    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page === 1 || isResolvingPage) return;

    setPage((current) => current - 1);
  };

  const handleNextPage = () => {
    if (!data?.nextCursor || page >= totalPages || isResolvingPage) return;

    setCursors((current) => ({
      ...current,
      [page + 1]: data.nextCursor,
    }));

    setPage((current) => current + 1);
  };

  const resolveCursorForPage = async (targetPage: number) => {
    if (targetPage === 1 || cursors[targetPage] !== undefined) {
      return cursors[targetPage];
    }

    let knownPage = targetPage - 1;
    while (knownPage > 1 && cursors[knownPage] === undefined) {
      knownPage -= 1;
    }

    setIsResolvingPage(true);
    try {
      const resolved = { ...cursors };

      for (let p = knownPage; p < targetPage; p++) {
        const result = await queryClient.fetchQuery(
          GetListingQuery({
            status,
            materialType,
            q: search,
            sort,
            limit,
            cursor: resolved[p],
          }),
        );

        if (!result?.nextCursor) break;
        resolved[p + 1] = result.nextCursor;
      }

      setCursors(resolved);
      return resolved[targetPage];
    } finally {
      setIsResolvingPage(false);
    }
  };

  const handleLastPage = async () => {
    if (page === totalPages || isResolvingPage) return;

    await resolveCursorForPage(totalPages);
    setPage(totalPages);
  };

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber === page || isResolvingPage) return;

    if (pageNumber !== 1 && cursors[pageNumber] === undefined) {
      await resolveCursorForPage(pageNumber);
    }

    setPage(pageNumber);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) {
      return [
        1,
        2,
        3,
        "ellipsis",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }

    if (page >= totalPages - 2) {
      return [
        1,
        2,
        "ellipsis",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }

    return [
      1,
      "ellipsis",
      page - 1,
      page,
      page + 1,
      "ellipsis",
      totalPages,
    ] as const;
  };

  const pageNumbers = getPageNumbers();

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
              resetPagination();
            }}
            onStatusChange={(value) => {
              setStatus(value);
              resetPagination();
            }}
            onMaterialTypeChange={(value) => {
              setMaterialType(value);
              resetPagination();
            }}
            onSortChange={(value) => {
              setSort(value);
              resetPagination();
            }}
          />

          <ListingTable isFetching={isFetching} listings={listings} />

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className="gap-4 md:gap-8">
                <PaginationItem>
                  <PaginationLink
                    variant="secondary"
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handleFirstPage();
                    }}
                    className={
                      page === 1 || isResolvingPage
                        ? "pointer-events-none opacity-50"
                        : "bg-black-100! hover:bg-black-200! size-6 md:size-8 rounded-md"
                    }
                  >
                    <ChevronsLeftIcon />
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    variant="secondary"
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handlePreviousPage();
                    }}
                    className={
                      page === 1 || isResolvingPage
                        ? "pointer-events-none opacity-50"
                        : "bg-black-50! hover:bg-black-100! size-6 md:size-8 rounded-md"
                    }
                  >
                    <ChevronLeft />
                  </PaginationLink>
                </PaginationItem>

                {pageNumbers.map((pageNumber, index) => {
                  if (pageNumber === "ellipsis") {
                    return (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem  key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNumber}
                        onClick={(event) => {
                          event.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        variant={page === pageNumber ? "default" : "outline"}
                        className={`${
                          page === pageNumber
                            ? "bg-brand-700! text-white!"
                            : "border-black-50 "
                        } ${isResolvingPage ? "pointer-events-none opacity-40" : ""} size-6 md:size-8 rounded-md text-s! font-bold`}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationLink
                    variant="secondary"
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handleNextPage();
                    }}
                    className={`pr-0! ${
                      !data?.nextCursor || page >= totalPages || isResolvingPage
                        ? "pointer-events-none opacity-50"
                        : "bg-black-50! hover:bg-black-100! size-6 md:size-8 rounded-md"
                    }`}
                  >
                    <ChevronRight />
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    variant="secondary"
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handleLastPage();
                    }}
                    className={`border! ${
                      page >= totalPages || isResolvingPage
                        ? "pointer-events-none opacity-50"
                        : "bg-black-100!  hover:bg-black-200! size-6 md:size-8 rounded-md"
                    }`}
                  >
                    <ChevronsRight />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
};

export default ListingPage;

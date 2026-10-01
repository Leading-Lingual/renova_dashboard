"use client";

import { useState } from "react";
import {
  useQuery,
  useQueryClient,
  type FetchQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";

export type PageNumberItem = number | "ellipsis";

type CursorPage = { nextCursor?: string | null };

type Cursor = string | undefined;

interface UseCursorPaginationOptions<
  TData extends CursorPage,
  TKey extends QueryKey,
> {
  /** Page size. Must match the limit used inside `buildQuery`. */
  limit: number;
  /**
   * Builds the react-query options for a given cursor.
   * Close over your filters/sort/search here (e.g. `GetListingQuery({... cursor})`).
   */
  buildQuery: (cursor: Cursor) => FetchQueryOptions<TData, Error, TData, TKey>;
  /** Derive the total number of items (for the current filters) from the response. */
  getTotalItems: (data: TData) => number;
}

export const getPageNumbers = (
  page: number,
  totalPages: number,
): readonly PageNumberItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, 2, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

export function useCursorPagination<
  TData extends CursorPage,
  TKey extends QueryKey = QueryKey,
>({
  limit,
  buildQuery,
  getTotalItems,
}: UseCursorPaginationOptions<TData, TKey>) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [cursors, setCursors] = useState<Record<number, Cursor>>({
    1: undefined,
  });
  const [isResolvingPage, setIsResolvingPage] = useState(false);

  const query = useQuery(buildQuery(cursors[page]));
  const { data } = query;

  const totalItems = data ? getTotalItems(data) : 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const pageNumbers = getPageNumbers(page, totalPages);

  const hasNext = Boolean(data?.nextCursor) && page < totalPages;
  const hasPrevious = page > 1;

  /** Call whenever filters / search / sort change. */
  const reset = () => {
    setPage(1);
    setCursors({ 1: undefined });
  };

  /**
   * Cursor pagination can't jump ahead directly, so walk from the nearest
   * known cursor up to the target page, caching each cursor along the way.
   */
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
        const result = await queryClient.fetchQuery(buildQuery(resolved[p]));

        if (!result?.nextCursor) break;
        resolved[p + 1] = result.nextCursor;
      }

      setCursors(resolved);
      return resolved[targetPage];
    } finally {
      setIsResolvingPage(false);
    }
  };

  const goToFirstPage = () => {
    if (page === 1 || isResolvingPage) return;
    setPage(1);
  };

  const goToPreviousPage = () => {
    if (!hasPrevious || isResolvingPage) return;
    setPage((current) => current - 1);
  };

  const goToNextPage = () => {
    if (!data?.nextCursor || !hasNext || isResolvingPage) return;

    const nextCursor = data.nextCursor;
    setCursors((current) => ({ ...current, [page + 1]: nextCursor }));
    setPage((current) => current + 1);
  };

  const goToPage = async (pageNumber: number) => {
    if (pageNumber === page || isResolvingPage) return;

    if (pageNumber !== 1 && cursors[pageNumber] === undefined) {
      await resolveCursorForPage(pageNumber);
    }

    setPage(pageNumber);
  };

  const goToLastPage = async () => {
    if (page === totalPages || isResolvingPage) return;

    await resolveCursorForPage(totalPages);
    setPage(totalPages);
  };

  return {
    // query state
    ...query,

    // pagination state
    page,
    totalItems,
    totalPages,
    pageNumbers,
    isResolvingPage,
    hasNext,
    hasPrevious,

    // actions
    reset,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    goToPage,

    /** Spread directly onto <PaginationControls /> */
    controlProps: {
      page,
      totalPages,
      pageNumbers,
      disabled: isResolvingPage,
      hasNext,
      hasPrevious,
      onFirst: goToFirstPage,
      onPrevious: goToPreviousPage,
      onNext: goToNextPage,
      onLast: goToLastPage,
      onPageChange: goToPage,
    },
  };
}
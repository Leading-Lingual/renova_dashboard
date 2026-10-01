"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import type { PageNumberItem } from "@/hooks/useCursorPagination";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  pageNumbers: readonly PageNumberItem[];
  hasNext: boolean;
  hasPrevious: boolean;
  /** Disables all controls (e.g. while a page's cursor is being resolved). */
  disabled?: boolean;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
  onPageChange: (page: number) => void;
}

const BASE = "size-6 md:size-8 rounded-md";
const DISABLED = "pointer-events-none opacity-50";

const PaginationControls = ({
  page,
  totalPages,
  pageNumbers,
  hasNext,
  hasPrevious,
  disabled = false,
  onFirst,
  onPrevious,
  onNext,
  onLast,
  onPageChange,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  const handle =
    (action: () => void) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      action();
    };

  const firstDisabled = !hasPrevious || disabled;
  const lastDisabled = page >= totalPages || disabled;
  const nextDisabled = !hasNext || disabled;

  return (
    <Pagination>
      <PaginationContent className="gap-4 md:gap-8">
        <PaginationItem>
          <PaginationLink
            variant="secondary"
            href="#"
            onClick={handle(onFirst)}
            className={`${BASE} ${
              firstDisabled
                ? DISABLED
                : "bg-black-100! hover:bg-black-200!"
            }`}
          >
            <ChevronsLeftIcon />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            variant="secondary"
            href="#"
            onClick={handle(onPrevious)}
            className={`${BASE} ${
              firstDisabled ? DISABLED : "bg-black-50! hover:bg-black-100!"
            }`}
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

          const isActive = page === pageNumber;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={isActive}
                onClick={handle(() => onPageChange(pageNumber))}
                variant={isActive ? "default" : "outline"}
                className={`${
                  isActive ? "bg-brand-700! text-white!" : "border-black-50"
                } ${disabled ? "pointer-events-none opacity-40" : ""} ${BASE} text-s! font-bold`}
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
            onClick={handle(onNext)}
            className={`pr-0! ${BASE} ${
              nextDisabled ? DISABLED : "bg-black-50! hover:bg-black-100!"
            }`}
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            variant="secondary"
            href="#"
            onClick={handle(onLast)}
            className={`border! ${BASE} ${
              lastDisabled ? DISABLED : "bg-black-100! hover:bg-black-200!"
            }`}
          >
            <ChevronsRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
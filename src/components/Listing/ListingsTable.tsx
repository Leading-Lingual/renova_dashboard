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
import { getListingColumns, statusVariant } from "./ListingTableColumn";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Pill from "../Pill";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";
import Link from "next/link";
import ActionsDropdown from "./ActionsDropdown";

interface ListingTableProps {
  listings: Listing[];
  isFetching?: boolean;
}

const ListingTable = ({ listings, isFetching }: ListingTableProps) => {
  const columns = getListingColumns();
  const table = useTable({
    features,
    data: listings,
    columns: columns,
  });

  return (
    <div className="md:border rounded-lg md:px-4 overflow-x-auto">
      <div className="flex flex-col gap-4 md:hidden w-full">
        {listings.map((item) => {
          return (
            <div
              key={item.id}
              className="flex gap-7.5 border rounded-lg py-2 px-4 justify-between w-full"
            >
              <Link
                href={`/listing/${item.id}`}
                className="flex gap-3 flex-1 shrink-0"
              >
                <div className=" relative size-16 shrink-0 overflow-hidden">
                  <Image
                    fill
                    sizes="64px"
                    className="object-cover"
                    src={item.images?.[0]?.url ?? ""}
                    alt={
                      item.images?.[0]?.id ?? item.materialName ?? "item image"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between">
                    <p className="text-m-medium">{item.materialName}</p>
                    <Pill
                      variant={
                        statusVariant[item.status as keyof typeof statusVariant]
                      }
                    >
                      {formatText(item.status)}
                    </Pill>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-s font-bold">
                      {/* {item.currency}  */}
                      &#x20A6;
                      {formatNumber(formatDecimal(item.estimatedTotal))}
                    </p>

                    <p className="text-2s-medium font-normal">
                      {/* {item.currency} */}
                      &#x20A6;
                      {item.pricePerKg
                        ? formatNumber(formatDecimal(item.pricePerKg))
                        : ""}
                      Per {item.unit}
                    </p>
                  </div>

                  <p className="text-s">
                    {formatDecimal(item.quantityKg)}
                    {item.unit ?? "KG"}
                  </p>
                </div>
              </Link>

              <ActionsDropdown listingId={item.id} status={item.status} />
            </div>
          );
        })}
      </div>
      <Table aria-label="Listing" className="hidden md:table">
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
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

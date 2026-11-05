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
import { features } from "../Listing/data-table-features";

import TicketCard from "./TicketCard";
import { getTicketColumns } from "./TicketTableColumn";
import { Ticket } from "@/types/support.types";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface TicketTableProps {
  tickets?: Ticket[];
  isLoading?: boolean;
}

const TicketTable = ({ tickets = [], isLoading }: TicketTableProps) => {
  const router = useRouter();
  const columns = getTicketColumns((ticket) =>
    router.push(`/support/${ticket.id}`),
  );
  const table = useTable({
    features,
    data: tickets,
    columns,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="md:hidden pb-8 flex flex-col gap-3">
          {isLoading ? (
            <Loader2 className="animate-spin m-auto" />
          ) : table.getRowModel().rows.length ? (
            table
              .getRowModel()
              .rows.slice(0, 3)
              .map((row) => (
                <div
                  key={row.original.id}
                  className="flex group flex-col gap-2"
                >
                  <TicketCard
                    onClick={() => router.push(`/support/${row.original.id}`)}
                    key={row.original.id}
                    ticket={row.original}
                  />
                  <hr className="mx-0.5 group-last:hidden" />
                </div>
              ))
          ) : (
            <p className="m-auto text-center text-sm text-black-400">
              No tickets found.
            </p>
          )}
        </div>
        <Table aria-label="Wallet transactions" className="hidden md:table">
          <TableHeader className="border-b-[0.5px] border-black-200 bg-[#F8F8F8]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-m-bold! font-bold!"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 "
                >
                  <Loader2 className="animate-spin m-auto" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
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
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TicketTable;

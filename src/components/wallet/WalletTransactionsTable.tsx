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
import { getWalletTransactionColumns } from "./WalletTableColumn";
import { features } from "../Listing/data-table-features";
import { useState } from "react";
import TransactionDetail from "./TransactionDetail";
import TransactionCard from "./TransactionCard";
import { WalletTransaction } from "@/types/wallet.types";

interface WalletTransactionsTableProps {
  transactions?: WalletTransaction[];
}

const WalletTransactionsTable = ({
  transactions = [],
}: WalletTransactionsTableProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<WalletTransaction | null>(null);
  const columns = getWalletTransactionColumns(setSelectedTransaction);
  const table = useTable({
    features,
    data: transactions,
    columns,
  });

  return (
    <>
      <div className="border-b overflow-x-auto">
        <div className="md:hidden pb-8">
          {table
            .getRowModel()
            .rows.slice(0, 3)
            .map((row) => (
              <div key={row.original.id} className="flex group flex-col gap-2">
                <TransactionCard
                  key={row.original.id}
                  transaction={row.original}
                />
                <hr className="mx-0.5 group-last:hidden" />
              </div>
            ))}
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
            {table.getRowModel().rows.length ? (
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
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TransactionDetail
        open={selectedTransaction !== null}
        setIsOpen={(open) => {
          if (!open) setSelectedTransaction(null);
        }}
        trasactionDetal={selectedTransaction ?? undefined}
      />
    </>
  );
};

export default WalletTransactionsTable;

import { createColumnHelper, TableFeatures } from "@tanstack/react-table";
import dayjs from "dayjs";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";
import Pill from "../Pill";
import { Button } from "../ui/button";
import { Transaction, TransactionEntityTypes } from "@/types/wallet.types";

const columnHelper = createColumnHelper<TableFeatures, Transaction>();

export const transactionTypeVariant: Record<
  TransactionEntityTypes,
  "brand" | "accent" | "grey" | "error"
> = {
  ORDER: "brand",
  PAYOUT: "brand",
  REFUND: "accent",
  DELIVERY_JOB: "brand",
  DISPUTE: "error"
};

export const getWalletTransactionColumns = (
  onViewTransaction: (transaction: Transaction) => void,
) =>
  columnHelper.columns([
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.original.amount;
        return <p className="">{`₦ ${formatNumber(formatDecimal(amount))}`}</p>;
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: ({ row }) => {
        const date = dayjs(row.original.createdAt);
        return date.isValid() ? (
          <div className="flex gap-1">
            <p className="text-sm">{date.format("MMM DD")},</p>
            <p className="text-sm">{date.format("hh:mm A")}</p>
          </div>
        ) : (
          row.original.createdAt
        );
      },
    }),
    columnHelper.accessor("type", {
      header: "Status",
      cell: ({ row }) => {
        const type = row.original.relatedEntity.type
        return (
          <Pill
            variant={
              transactionTypeVariant[
                 type
              ] ?? "grey"
            }
          >
            {formatText(type)}
          </Pill>
        );
      },
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          type="button"
          aria-label={`View details for ${row.original.description}`}
          className="p-2 text-brand-500"
          onClick={() => onViewTransaction(row.original)}
        >
          View
        </Button>
      ),
    }),
  ]);

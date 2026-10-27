import { createColumnHelper, TableFeatures } from "@tanstack/react-table";
import dayjs from "dayjs";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";
import Pill from "../Pill";
import { WalletTransaction } from "./WalletTransactionsTable";
import { Button } from "../ui/button";

const columnHelper = createColumnHelper<TableFeatures, WalletTransaction>();

export const transactionStatusVariant: Record<
  string,
  "brand" | "accent" | "grey" | "error"
> = {
  COMPLETED: "brand",
  SUCCESS: "brand",
  PENDING: "accent",
  FAILED: "grey",
  CREDIT: "brand",
  DEBIT: "error",
};

export const getWalletTransactionColumns = (
  onViewTransaction: (transaction: WalletTransaction) => void,
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
    columnHelper.accessor("date", {
      header: "Date & Time",
      cell: ({ row }) => {
        const date = dayjs(row.original.date);
        return date.isValid() ? (
          <div className="flex gap-1">
            <p className="text-sm">{date.format("MMM DD")},</p>
            <p className="text-sm">{date.format("hh:mm A")}</p>
          </div>
        ) : (
          row.original.date
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const type = row.original.type
        return (
          <Pill
            variant={
              transactionStatusVariant[
                status.toUpperCase() === "PENDING" ? status.toUpperCase() : type
              ] ?? "grey"
            }
          >
            {formatText(status.toUpperCase() === "PENDING" ? status : type)}
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

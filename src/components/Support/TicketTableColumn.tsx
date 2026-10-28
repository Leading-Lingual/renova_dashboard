import { createColumnHelper, TableFeatures } from "@tanstack/react-table";
import dayjs from "dayjs";
import { formatText } from "@/lib/utils";
import Pill from "../Pill";
import { Button } from "../ui/button";
import { TicketType } from "@/types/support.types";

const columnHelper = createColumnHelper<TableFeatures, TicketType>();

export const ticketStatusVariant: Record<
  string,
  "brand" | "accent" | "grey" | "error"
> = {
  RESOLVED: "brand",
  INPROGRESS: "accent",
};

export const getTicketColumns = (
  onViewTransaction: (ticket: TicketType) => void,
) =>
  columnHelper.columns([
    columnHelper.accessor("subject", {
      header: "Subject",
    }),
    columnHelper.accessor("description", {
      header: "Description",
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
        return (
          <Pill variant={ticketStatusVariant[status.toUpperCase()] ?? "grey"}>
            {formatText(status.toUpperCase())}
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

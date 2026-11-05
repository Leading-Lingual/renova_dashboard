import { createColumnHelper, TableFeatures } from "@tanstack/react-table";
import dayjs from "dayjs";
import { formatText } from "@/lib/utils";
import Pill from "../Pill";
import { Button } from "../ui/button";
import { Ticket, TicketStatus } from "@/types/support.types";

const columnHelper = createColumnHelper<TableFeatures, Ticket>();

export const ticketStatusVariant: Record<
  TicketStatus,
  "brand" | "accent" | "grey" | "error"|"secondary"
> = {
  OPEN:"secondary",
  RESOLVED: "brand",
  IN_PROGRESS: "accent",
};

export const getTicketColumns = (
  onViewTransaction: (ticket: Ticket) => void,
) =>
  columnHelper.columns([
    columnHelper.accessor("subject", {
      header: "Subject",
    }),
    columnHelper.accessor("descriptionPreview", {
      header: "Description",
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
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Pill variant={ticketStatusVariant[status] ?? "grey"}>
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
          aria-label={`View details for ${row.original.id}`}
          className="p-2 text-brand-500"
          onClick={() => onViewTransaction(row.original)}
        >
          View
        </Button>
      ),
    }),
  ]);

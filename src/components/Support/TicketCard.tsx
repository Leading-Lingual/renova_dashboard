import { ArrowDown } from "lucide-react";
import Pill from "../Pill";
import { formatText } from "@/lib/utils";
import dayjs from "dayjs";
import { ticketStatusVariant } from "./TicketTableColumn";
import { TicketType } from "@/types/support.types";

const TicketCard = ({ ticket, onClick }: { ticket: TicketType, onClick?:()=>void }) => {
  const isPending = ticket.status === "INPROGRESS";
  return (
    <div onClick={onClick} className="flex items-center justify-between w-full">
      <div className="flex gap-2 items-center">
        <div
          className={`size-8 rounded-full flex justify-center items-center font-bold
            ${
              isPending
                ? "bg-black-50 text-black-700!"
                : "bg-brand-50/50 text-brand-700!"
            }`}
        >
          <ArrowDown className="size-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">{ticket.description}</p>
          <div className="flex gap-1 text-s">
            <p className="text-sm">{dayjs(ticket.date).format("MMM DD")},</p>
            <p className="text-sm">{dayjs(ticket.date).format("hh:mm A")}</p>
          </div>{" "}
        </div>
      </div>

      <div className="flex flex-col justify-end items-end gap-0.75">
        <Pill
          variant={ticketStatusVariant[ticket.status.toUpperCase()] ?? "grey"}
        >
          {formatText(ticket.status.toUpperCase())}
        </Pill>
      </div>
    </div>
  );
};

export default TicketCard;

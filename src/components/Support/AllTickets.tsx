import { ArrowLeft, ListFilter, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer";
// import FilterDrawer from "./FilterDrawer";
import { useState } from "react";
import Heading from "../Heading";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import advancedFormat from "dayjs/plugin/advancedFormat";
import TicketCard from "./TicketCard";
import { Ticket } from "@/types/support.types";
import { useRouter } from "next/navigation";

dayjs.extend(calendar);
dayjs.extend(advancedFormat);

function formatRelativeOrDate(dateString: string) {
  return dayjs(dateString).calendar(null, {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    nextDay: "dddd, MMMM Do",
    lastWeek: "dddd, MMMM Do",
    nextWeek: "dddd, MMMM Do",
    sameElse: "dddd, MMMM Do",
  });
}

const AllTickets = ({
  open,
  onOpenChange,
  tickets,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tickets?: Ticket[];
  isLoading?: boolean;
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const ticketsByDay = tickets?.reduce<Record<string, Ticket[]>>(
    (groups, ticket) => {
      const day = dayjs(ticket.createdAt);
      const key = day.isValid() ? day.format("YYYY-MM-DD") : "unknown";
      (groups[key] ??= []).push(ticket);
      return groups;
    },
    {},
  );
  const dayKeys = ticketsByDay
    ? Object.keys(ticketsByDay).sort((a, b) => {
        if (a === "unknown") return 1;
        if (b === "unknown") return -1;
        return b.localeCompare(a);
      })
    : [];

  const router = useRouter();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="px-4 pt-4 pb-10  w-full h-dvh max-h-dvh overflow-hidden">
        <div className="flex h-full min-h-0 flex-col gap-6 md:gap-4.5">
          <div className="flex flex-col gap-4">
            <DrawerClose
              className="flex "
              render={
                <Button variant="ghost" size="icon" className="w-fit! h-fit! ">
                  <ArrowLeft className="size-4" />
                </Button>
              }
            />
            <div className="flex justify-between items-center gap-8">
              <Heading
                title="My Tickets"
                subtitle="All your requests tickets in one place. View all tickets here."
              />
              <Button
                onClick={() => setShowFilter(true)}
                variant="outline"
                className="border-black-100"
              >
                <ListFilter />
              </Button>
              {/* <FilterDrawer
                onOpenChange={setShowFilter}
                open={showFilter}
                search={search}
                setSearch={setSearch}
              /> */}
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain">
            {isLoading ? (
              <Loader2 className="animate-spin m-auto" />
            ) : (
              dayKeys.map((dayKey) => (
                <section key={dayKey} className="flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-black-500">
                    {dayKey === "unknown"
                      ? "Unknown date"
                      : formatRelativeOrDate(dayKey)}
                  </h2>
                  <div className="flex flex-col gap-4 p-4 rounded-[12px] bg-[#F8F8F8]">
                    {ticketsByDay?.[dayKey].map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex group flex-col gap-2 w-full"
                      >
                        <TicketCard
                          ticket={ticket}
                          onClick={() => router.push(`/support/${ticket.id}`)}
                        />
                        <hr className=" mx-1 group-last:hidden" />
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AllTickets;

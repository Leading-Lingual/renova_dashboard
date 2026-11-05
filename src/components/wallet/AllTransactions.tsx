import { ArrowLeft, ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer";
import FilterDrawer from "./FilterDrawer";
import { useState } from "react";
import Heading from "../Heading";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import advancedFormat from "dayjs/plugin/advancedFormat";
import TransactionCard from "./TransactionCard";
import { Transaction } from "@/types/wallet.types";

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

const AllTransactions = ({
  open,
  onOpenChange,
  transactions,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactions?: Transaction[];
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const transactionsByDay = transactions?.reduce<
    Record<string, Transaction[]>
  >((groups, transaction) => {
    const day = dayjs(transaction.createdAt);
    const key = day.isValid() ? day.format("YYYY-MM-DD") : "unknown";
    (groups[key] ??= []).push(transaction);
    return groups;
  }, {});
  const dayKeys = transactionsByDay
    ? Object.keys(transactionsByDay).sort((a, b) => {
        if (a === "unknown") return 1;
        if (b === "unknown") return -1;
        return b.localeCompare(a);
      })
    : [];

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
            <div className="flex justify-between items-center">
              <Heading
                title="Transaction History"
                subtitle="View your wallet activity and payout history."
              />
              <Button
                onClick={() => setShowFilter(true)}
                variant="outline"
                className="border-black-100"
              >
                <ListFilter />
              </Button>
              <FilterDrawer
                onOpenChange={setShowFilter}
                open={showFilter}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain">
            {dayKeys.map((dayKey) => (
              <section key={dayKey} className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-black-500">
                  {dayKey === "unknown"
                    ? "Unknown date"
                    : formatRelativeOrDate(dayKey)}
                </h2>
                <div className="flex flex-col gap-4 p-4 rounded-[12px] bg-[#F8F8F8]">
                  {transactionsByDay?.[dayKey].map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex group flex-col gap-2 w-full"
                    >
                      <TransactionCard transaction={transaction} />
                      <hr className=" mx-1 group-last:hidden" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AllTransactions;

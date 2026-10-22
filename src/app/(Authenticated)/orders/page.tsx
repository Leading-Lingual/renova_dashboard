"use client";

import { getUserProfile } from "@/actions/user/user.query";
import { useQuery } from "@tanstack/react-query";
import ShoppingCartArrowUp from "@iconify-react/carbon/shopping-cart-arrow-up";
import ShoppingCartArrowDown from "@iconify-react/carbon/shopping-cart-arrow-down";
import { ReactElement, Suspense, useState } from "react";
import EmptyOrderImg from "@/assets/emptyOrder.svg";
import Image from "next/image";
import OrdersCard from "@/components/orders/OrdersCard";
import { getOrdersQuery } from "@/actions/orders/orders.query";
import { Loader2 } from "lucide-react";
import { useCursorPagination } from "@/hooks/useCursorPagination";
// import { ListingSort } from "@/types/listing.types";
import { useWindowSize } from "@/hooks/useWindowSize";
import PaginationControls from "@/components/PaginationControls";
import useQueryParams from "@/hooks/useQueryParams";

type tabTypes = "SELLER" | "BUYER";
type orderTabTypes = "COMPLETED" | "IN_PROGRESS" | "ALL";

const OrdersPage = () => {
  const [completedCounts, setCompletedCounts] = useState<
    Partial<Record<tabTypes, number>>
  >({});
  const { get, set } = useQueryParams();
  const { data } = useQuery(getUserProfile);
  const userActivities = data?.activities;
  const hasSell = userActivities?.includes("SELL");
  const hasBuy = userActivities?.includes("BUY");
  const hasBoth = hasBuy && hasSell;
  const tabParam = get("tab");
  const viewParam = get("view");
  const tab: tabTypes = tabParam === "BUYER" || tabParam === "SELLER"
    ? tabParam
    : hasBuy && !hasSell ? "BUYER" : "SELLER";
  const orderTab: orderTabTypes = viewParam === "IN_PROGRESS" || viewParam === "COMPLETED"
    ? viewParam
    : "ALL";

  // const [search, setSearch] = useState("");
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  // const [sort, setSort] = useState<ListingSort>("NEWEST");

  const { isMobile, isSmallLaptop } = useWindowSize();

  const limit = isMobile ? 4 : isSmallLaptop ? 6 : 8;

  const {
    data: orders,
    isPending,
    controlProps,
    reset,
  } = useCursorPagination({
    limit: limit,
    buildQuery: (cursor) =>
      getOrdersQuery({
        // q: search,
        sort: "NEWEST",
        limit,
        cursor,
        role: tab,
        view: orderTab,
        // from,
        // to,
      }),
    getTotalItems: ({ counts }) => {
      switch (orderTab) {
        case "ALL":
          return counts.all;
        case "COMPLETED":
          return counts.completed;
        case "IN_PROGRESS":
          return counts.inProgress;
        default:
          return counts.all;
      }
    },
  });

  const ordersList = orders?.items ?? [];

  if (orderTab === "ALL" && orders) {
    const completedCount = orders.items.filter(
      (order) => order.status === "COMPLETED",
    ).length;

    if (completedCounts[tab] !== completedCount) {
      setCompletedCounts({ ...completedCounts, [tab]: completedCount });
    }
  }

  const ordersListLength = orders?.counts.all ?? 0;

  const tabs: { title: string; key: tabTypes; icon: ReactElement }[] = [
    {
      title: "Sales",
      key: "SELLER",
      icon: <ShoppingCartArrowUp className="size-4 hidden md:flex" />,
    },
    {
      title: "Purchases",
      key: "BUYER",
      icon: <ShoppingCartArrowDown className="size-4 hidden md:flex" />,
    },
  ];

  const ordersTabs: { title: string; key: orderTabTypes; count?: number }[] = [
    {
      title: "All sales",
      key: "ALL",
      count: ordersListLength,
    },
    {
      title: "In-progress",
      key: "IN_PROGRESS",
      count: orders?.counts.inProgress,
    },
    {
      title: "Completed",
      key: "COMPLETED",
      count: completedCounts[tab] ?? 0,
    },
  ];

  const currentTabObject = ordersTabs.find((item) => item.key === orderTab);

  return (
    <div className="flex flex-col xl:flex-row  gap-6 xl:gap-11.5 px-6 py-2 md:px-8 md:py-4 h-full">
      {hasBoth && (
        <div className="xl:h-full xl:w-60.25 flex flex-col gap-6 md:gap-3.25">
          <p className="text-xl font-bold">Orders</p>
          <div className="flex xl:flex-col gap-3 md:gap-2.25">
            {tabs.map((item) => (
              <div
                key={item.key}
                onClick={() => {
                  set({ tab: item.key });
                  reset();
                }}
                className={`rounded-md xl:rounded-none  cursor-pointer py-1.5 xl:py-4 text-black-500 flex gap-4 items-center justify-center xl:justify-start w-full ${tab === item.key ? "xl:border-l-8 xl:border-brand-500 xl:px-2 bg-brand-50 font-bold" : "border xl:border-none xl:px-4 font-medium"}`}
              >
                {item.icon}
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="h-full w-full overflow-hidden lg:flex-1 flex flex-col gap-3 md:gap-7.75">
        {isPending ? (
          <Loader2 className="animate-spin m-auto" />
        ) : ordersListLength <= 0 ? (
          <div className="flex flex-col gap-8 items-center justify-center text-center mt-10 lg:mt-[83.14px]">
            <Image src={EmptyOrderImg} alt="empty-state" className="m-auto" />
            <div className="flex flex-col gap-1 text-black-500">
              <p className={`text-heading-xs-semibold `}>
                {`No ${tab === "SELLER" ? "Sales" : "Purchase"}`}
              </p>
              <p className={`text-s font-normal max-w-87.5`}>
                {`Currently, no ${tab === "SELLER" ? "Sales" : "Purchase"} has not been made`}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full grid grid-cols-3 shrink-0 border-b-2 md:border-b-0 md:gap-6.5 border-brand-50/50 overflow-auto">
              {ordersTabs.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => {
                    set({ tab, view: item.key });
                    reset();
                  }}
                  className={`cursor-pointer flex items-center justify-center gap-2 px-2.5 py-1 md:p-2.5 border-b-2 ${orderTab === item.key ? "border-brand-500 md:border-black-500" : "border-transparent"}`}
                >
                  <p
                    className={`text-black-500 text-s md:text-base ${
                      orderTab === item.key ? "font-bold" : ""
                    }`}
                  >
                    {item.title} ({item.count})
                  </p>
                </button>
              ))}
            </div>
            {currentTabObject && currentTabObject.key !== "ALL" &&
            ordersList.length === 0 ? (
              <div className="flex flex-col gap-8 items-center justify-center text-center mt-10 lg:mt-[83.14px]">
                <Image
                  src={EmptyOrderImg}
                  alt="empty-state"
                  className="m-auto"
                />
                <div className="flex flex-col gap-1 text-black-500">
                  <p className={`text-heading-xs-semibold `}>
                    {`No ${currentTabObject.title} orders`}
                  </p>
                  <p className={`text-s font-normal max-w-87.5`}>
                    {`Currently, no ${tab === "SELLER" ? "sales" : "purchase"} orders is ${currentTabObject.title}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-3 gap-5 overflow-auto">
                  {ordersList.map((item) => (
                    <OrdersCard key={item.id} order={item} />
                  ))}
                </div>
                <PaginationControls {...controlProps} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function Orders() {
  return (
    <Suspense fallback={null}>
      <OrdersPage />
    </Suspense>
  );
}

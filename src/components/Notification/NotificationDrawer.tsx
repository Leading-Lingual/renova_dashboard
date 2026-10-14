import { ArrowLeft, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LogoIcon from "@/assets/logoicon.svg";
import Image from "next/image";
import { useCursorPagination } from "@/hooks/useCursorPagination";
import { getNotificationQuery } from "@/actions/notification/notification.query";
import { readNotificationsMutation } from "@/actions/notification/notification.mutation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type tabTypes = "ALL" | "UNREAD" | "READ";

const NotificationDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [tab, setTab] = useState<tabTypes>("ALL");
  const { mutate: readNotification } = useMutation(readNotificationsMutation);
  const [unreadOnly, setUnreadOnly] = useState("false");

  const limit = 10;

  const {
    data,
    isPending,
    isFetching,
    isResolvingPage,
    hasPrevious,
    goToPreviousPage,
    goToPage,
    page,
    reset,
    hasNext,
  } = useCursorPagination({
    limit: limit,
    buildQuery: (cursor) =>
      getNotificationQuery({
        unreadOnly,
        limit,
        cursor,
      }),
    getTotalItems: ({ items, unreadCount }) => {
      switch (tab) {
        case "UNREAD":
          return unreadCount;
        case "READ":
          return items.filter((item) => Boolean(item.readAt)).length;
        case "ALL":
        default:
          return items.length;
      }
    },
  });

  const notificationLength = data?.items.length ?? 0;
  const UnreadCount = data?.unreadCount ?? 0;
  const visibleNotifications = (data?.items ?? []).filter((item) =>
    tab === "READ" ? Boolean(item.readAt) : true,
  );

  const tabs = [
    {
      title: "All",
      value: "ALL" as const,
      count: notificationLength,
    },
    {
      title: "Unread",
      value: "UNREAD" as const,
      count: UnreadCount,
    },
    {
      title: "Read",
      value: "READ" as const,
      count: data?.items.filter((item) => Boolean(item.readAt)).length ?? 0,
    },
  ];

  const onTabClick = (value: tabTypes) => {
    reset();
    setTab(value);
    if (value === "UNREAD") {
      setUnreadOnly("true");
    } else {
      setUnreadOnly("false");
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="px-4 pt-4 pb-10 md:p-10 w-full md:w-114 h-dvh max-h-dvh overflow-hidden">
        <div className="flex h-full min-h-0 flex-col gap-6 md:gap-4.5">
          <div className="flex flex-col gap-4">
            <DrawerClose
              className="flex md:hidden"
              render={
                <Button variant="ghost" size="icon" className="w-fit! h-fit! ">
                  <ArrowLeft className="size-4" />
                </Button>
              }
            />
            <div className=" flex justify-between">
              <DrawerTitle className="text-xl">
                Notification{" "}
                {UnreadCount ? (
                  <Badge variant="default">{UnreadCount} New</Badge>
                ) : (
                  ""
                )}
              </DrawerTitle>
              <DrawerClose
                className="hidden md:flex"
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black-50 size-6 flex justify-center items-center hover:bg-black-50 text-black cursor pointer"
                  >
                    <X className="size-4" />
                  </Button>
                }
              />
            </div>
          </div>
          <hr className="hidden md:flex w-full " />

          {isPending ? (
            <Loader2 className="animate-spin m-auto" />
          ) : notificationLength === 0 ? (
            <div className="m-auto md:mx-auto md:my-0">
              <div className="flex flex-col gap-1 text-black-500">
                <p className="text-heading-xs-semibold text-center">
                  No Notifications
                </p>
                <p className="text-s font-normal text-center">
                  Nothing to see here. Updates and information about your Renova
                  activity will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col gap-4">
              <div className="flex shrink-0 border-b-2 gap-3 md:gap-6 border-brand-50/50 overflow-auto">
                {tabs.map((item) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => {
                      onTabClick(item.value);
                    }}
                    className="flex items-center gap-2 px-2.5 py-1 relative"
                  >
                    <p
                      className={`text-black-500 text-s ${
                        tab === item.value ? "font-bold" : ""
                      }`}
                    >
                      {item.title}
                    </p>

                    {item.count !== undefined && (
                      <span
                        className={`rounded-full size-5 flex justify-center items-center ${tab === item.value ? "text-brand-500 bg-brand-50 font-bold" : "bg-black-50"} text-2s-medium `}
                      >
                        {item.count}
                      </span>
                    )}

                    {tab === item.value && (
                      <hr className="border-[1.5] w-full border-brand-500 absolute bottom-0 right-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain">
                {hasPrevious && (
                  <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={isFetching || isResolvingPage}
                    className="shrink-0 self-center text-sm text-brand-500 disabled:opacity-60"
                  >
                    {isFetching || isResolvingPage ? (
                      <LoadingBubbles />
                    ) : (
                      "View earlier"
                    )}
                  </button>
                )}
                {visibleNotifications.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex shrink-0 flex-col gap-2 w-full"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!item.readAt) readNotification(item.id);
                      }}
                      className="flex w-full justify-between gap-4.25 text-left"
                    >
                      <div className="flex min-w-0 flex-1 gap-2">
                        <Image
                          className="h-fit w-fit"
                          alt="logo"
                          src={LogoIcon}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1 text-black-500 min-w-0">
                            <p className="text-sm font-bold">{item.title}</p>
                            <p className="text-2s-medium font-normal text-wrap md:truncate">
                              {item.message}
                            </p>
                            <span className="text-[10px] flex gap-2.5">
                              <p>{dayjs(item.createdAt).format("MMM DD")}</p>
                              <p>{dayjs(item.createdAt).format("hh:mm a")}</p>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col justify-center items-end gap-2.5">
                        {!item.readAt && (
                          <div className="border bg-brand-500 size-2.5 rounded-full" />
                        )}
                        <p className="text-[8px]">
                          {dayjs(item.createdAt).fromNow()}
                        </p>
                      </div>
                    </button>
                    {index < visibleNotifications.length - 1 && (
                      <hr className="w-full border-black-50 my-2.5" />
                    )}
                  </div>
                ))}
                {hasNext && (
                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={isFetching || isResolvingPage || !hasNext}
                    className="shrink-0 self-center text-sm text-brand-500 disabled:opacity-60"
                  >
                    {isFetching || isResolvingPage ? (
                      <LoadingBubbles />
                    ) : (
                      "View older"
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const LoadingBubbles = () => (
  <span
    className="inline-flex items-center gap-1"
    aria-label="Loading notifications"
  >
    <span className="size-1.5 animate-bounce rounded-full bg-brand-500" />
    <span
      className="size-1.5 animate-bounce rounded-full bg-brand-500"
      style={{ animationDelay: "150ms" }}
    />
    <span
      className="size-1.5 animate-bounce rounded-full bg-brand-500"
      style={{ animationDelay: "300ms" }}
    />
  </span>
);

export default NotificationDrawer;

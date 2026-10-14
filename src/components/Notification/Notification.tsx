"use client";

import { useState } from "react";
import NotificationIcon from "@iconify-react/iconamoon/notification";
import { getNotificationQuery } from "@/actions/notification/notification.query";
import { useQuery } from "@tanstack/react-query";
import NotificationDrawer from "./NotificationDrawer";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(
    getNotificationQuery({ unreadOnly: "true", limit: 1 }),
  );
  const unreadCount = data?.unreadCount ?? 0;

  const open = () => setIsOpen(true);

  return (
    <>
      <button
        type="button"
        aria-label="Open notification"
        onClick={open}
        className="relative"
      >
        {unreadCount > 0 && (
          <div className="absolute rounded-full min-w-5 h-5 px-1 bg-danger-500 flex -right-1 -top-1">
            <p className="text-white m-auto text-2s-medium">{unreadCount}</p>
          </div>
        )}
        <div className="rounded-full size-8 md:size-10 bg-black-50 flex">
          <NotificationIcon className="m-auto size-4 md:size-6 text-black-500" />
        </div>
      </button>

      <NotificationDrawer open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default Notification;

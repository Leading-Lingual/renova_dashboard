import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { OrderTimeline } from "@/types/orders.types";

dayjs.extend(relativeTime);

const OrderTrackingDrawer = ({
  open,
  onOpenChange,
  timeline,
  role
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeline: OrderTimeline[]
  role: "SELLER" | "BUYER"
}) => {
  const steps = role === "BUYER" ?
  [
    {
      title: "Order Confirmed",
      detail: "Payment was Successfully received",
      date: "",
      done: true,
    },
    {
      title: "Seller notified",
      detail: "Seller has been informed of the pickup",
      date: "",
      done: true,
    },
    {
      title: "Pickup scheduled",
      detail: "Pickup scheduled for September 30th 10:00 AM - 2:00 PM",
      date: "",
      done: true,
    },
    {
      title: "Collector assigned",
      detail: "John Victor has been assigned as the collector",
      date: "",
      done: true,
    },
    {
      title: "Material picked up",
      detail:
        "The material has been picked up from the seller at Ikeja, Lagos, Nigeria",
      date: "",
      done: false,
    },
    {
      title: "In transit",
      detail: "Material is on its way to your delivery address.",
      date: "",
      done: false,
    },
    {
      title: "Delivered",
      detail:
        "Material has been successfully delivered to 28 Bola Street, Allen Avenue, Lagos, Nigeria ",
      date: "",
      done: false,
    },
  ]:[
    {
      title: "Order Received",
      detail: "Payment was Successfully received",
      date: "",
      done: true,
    },
    {
      title: "Pickup Scheduled",
      detail: "Pickup scheduled for September 30th 10:00 AM - 2:00 PM",
      date: "",
      done: true,
    },
    {
      title: "Collector Assigned",
      detail: "John Victor has been assigned to collect your material.",
      date: "",
      done: true,
    },
    {
      title: "Material Collected",
      detail: "Your material has been successfully picked up from the you at 28 Toyin street Allen, Ikeja, Lagos, Nigeria.",
      date: "",
      done: true,
    },
    {
      title: "Payment Initiated",
      detail:
        "Your payment is currently being processed",
      date: "",
      done: false,
    },
    {
      title: "Delivered",
      detail: "Material has been successfully delivered.",
      date: "",
      done: false,
    },
    {
      title: "Payment Sent",
      detail:
        "Payment has been successfully sent to your wallet.",
      date: "",
      done: false,
    },
  ];
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
                Order Tracking Infomation
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

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto">
            {steps.map((step) => (
              <div key={step.title} className="flex gap-5.5">
                <div className="flex flex-col gap-1.25">
                  <div
                    className={`size-7  shrink-0 ${step.done ? "bg-brand-500" : " border-4 border-black-200"} flex rounded-full items-center justify-center`}
                  >
                    {step.done && (
                      <Check className="text-white stroke-3 size-4" />
                    )}
                  </div>
                  <div
                    className={`w-px h-6 mx-3.5 my-2.5 ${step.done ? "bg-brand-500" : "  bg-black-200"}`}
                  ></div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{step.title}</p>
                  <p className="text-2s-medium font-normal text-wrap">
                    {step.detail}
                  </p>
                  <span className="text-[10px] flex gap-2.5">
                    <p>{dayjs("2026-10-15T00:32:43.238Z").format("MMM DD")}</p>
                    <p>{dayjs("2026-10-15T00:32:43.238Z").format("hh:mm a")}</p>
                  </span>
                </div>
              </div>
            ))}
            <Button disabled className="h-12 bg-black-200">
              Rate Experience
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderTrackingDrawer;

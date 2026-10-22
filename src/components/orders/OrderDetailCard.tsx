import { CartListing } from "@/types/cart.types";
import SectionCard from "../SectionCard";
import { formatDecimal, formatNumber } from "@/lib/utils";
import dayjs from "dayjs";
// import { Button } from "../ui/button";
import Image from "next/image";
import BaselineStarRateIcon from "@iconify-react/ic/baseline-star-rate";

import advancedFormat from "dayjs/plugin/advancedFormat";
import OrderTrackingDrawer from "./OrderTrackingDrawer";
import { useState } from "react";
import { OrderTimeline } from "@/types/orders.types";
dayjs.extend(advancedFormat);

const OrderDetailCard = ({
  detail,
  OrderTotal,
  orderedAt,
  timeline,
  role,
}: {
  detail: CartListing;
  OrderTotal: string;
  orderedAt: string;
  timeline: OrderTimeline[];
  role: "SELLER" | "BUYER";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionCard
      useAccordion={false}
      title="Order Details"
      subtitle={dayjs(orderedAt).format("MMMM Do, YYYY")}
      headingDetail={
        <p className="text-sm md:text-xl font-bold">
          &#x20A6;
          {formatNumber(formatDecimal(OrderTotal ?? ""))}
        </p>
      }
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="px-4 pt-4 flex gap-5.5 w-full">
          <div className="size-16 overflow-hidden rounded-[8px]">
            <Image
              width={64}
              height={64}
              src={detail.imageUrl ?? ""}
              alt="product-img"
              className="size-16 rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 w-full">
            <div className="flex items-center justify-between text-m-bold">
              <p className="truncate ">{detail.materialName}</p>
              <p className="hidden md:flex">Order ID: {detail.listingId}</p>
              <p className="">
                &#x20A6;
                {formatNumber(formatDecimal(detail.estimatedTotal ?? ""))}
              </p>
            </div>

            <div className="md:hidden text-s text-bold">
              <p className="">Order ID: {detail.listingId}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-s font-medium">Seller</p>
              <div className="flex gap-1 items-center">
                <p className="text-s font-medium">
                  By {detail.seller?.fullName}
                </p>
                <div className="flex gap-1">
                  <BaselineStarRateIcon className="size-4 text-accent-600" />
                  <p className="text-s font-bold text-black-400">4.3</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-s font-medium">Quantity</p>{" "}
              <p className="text-s">
                {formatDecimal(detail.quantityKg)} {detail.unit}
              </p>{" "}
            </div>
          </div>
        </div>
        {/* <Button
          onClick={() => setIsOpen(true)}
          variant="ghost"
          className="text-brand-500 font-bold hover:text-brand-300 cursor-pointer"
        >
          Track Order
        </Button> */}
      </div>
      <OrderTrackingDrawer
        role={role}
        timeline={timeline}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </SectionCard>
  );
};

export default OrderDetailCard;

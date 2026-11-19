"use client";
import { getOrderDetailQuery } from "@/actions/orders/orders.query";
import { getUser } from "@/actions/user/user.query";
import Heading from "@/components/Heading";
import OrderDetailCard from "@/components/orders/OrderDetailCard";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderDetailsContent = ({ orderId }: { orderId: string }) => {
  const { data, error, isPending } = useQuery(getOrderDetailQuery(orderId));
  const { data: me, error: userError, isPending: isUserPending } = useQuery(getUser);
  const role = data?.buyer.id === me?.id ? "BUYER" : "SELLER";
  const progress =
    data?.status === "COMPLETED" ? 100 : data?.status === "PAID" ? 50 : 0;

  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto px-6 py-6 md:gap-6 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-4">
        <Heading
          titleClassName="text-[20px]"
          title="Order Details"
          subtitle="View and Manage Orders"
        />
        {data && data.items.length > 1 && (
          <Progress value={progress} className="w-full">
            <ProgressLabel>Order progress</ProgressLabel>
            <ProgressValue />
          </Progress>
        )}
        {isPending || isUserPending ? (
          <div
            aria-label="Loading order details"
            aria-busy="true"
            className="flex flex-col gap-4"
          >
            <div className="h-2 w-full animate-pulse rounded bg-black-50" />
            <div className="flex flex-col w-full gap-4">
              {Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full gap-1 rounded-[8px] border py-2"
                >
                  <div className="flex items-center justify-between px-4 py-1">
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-32 animate-pulse rounded bg-black-50" />
                      <div className="h-4 w-28 animate-pulse rounded bg-black-50" />
                    </div>
                    <div className="h-5 w-20 animate-pulse rounded bg-black-50" />
                  </div>
                  <hr className="my-2.5 w-full" />
                  <div className="flex w-full gap-5.5 px-4 py-2">
                    <div className="size-16 shrink-0 animate-pulse rounded-[8px] bg-black-50" />
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex justify-between gap-4">
                        <div className="h-5 w-32 animate-pulse rounded bg-black-50" />
                        <div className="h-5 w-20 animate-pulse rounded bg-black-50" />
                      </div>
                      <div className="flex justify-between">
                        <div className="h-4 w-12 animate-pulse rounded bg-black-50" />
                        <div className="h-4 w-28 animate-pulse rounded bg-black-50" />
                      </div>
                      <div className="flex justify-between">
                        <div className="h-4 w-16 animate-pulse rounded bg-black-50" />
                        <div className="h-4 w-16 animate-pulse rounded bg-black-50" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : data && me ? (
          <div className="flex flex-col gap-4">
            {data.items.map((item) => (
              <OrderDetailCard
                key={item.listingId}
                detail={item}
                orderedAt={data.createdAt}
                OrderTotal={data.summary.total}
                timeline={data.timeline}
                role={role}
              />
            ))}
          </div>
        ) : error || userError ? (
          <div className="text-danger-500"> failed to load orders details</div>
        ) : null}{" "}
      </div>
    </div>
  );
};

export default OrderDetailsContent;

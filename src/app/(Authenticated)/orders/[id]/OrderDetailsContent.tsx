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
import { ArrowLeft, Loader2 } from "lucide-react";
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
          <Loader2 className="m-auto animate-spin" />
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

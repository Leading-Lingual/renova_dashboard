import Image from "next/image";
import { Badge } from "../ui/badge";
import { Order } from "@/types/orders.types";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";
import { useRouter } from "next/navigation";

const OrdersCard = ({ order }: { order?: Order }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/orders/${order?.id}`)}
      className="cursor-pointer p-4 border rounded-md flex md:flex-col justify-between text-black-500"
    >
      <div className="flex md:flex-col gap-3 md:gap-3.75 w-full">
        <div className="relative border rounded-md bg-black-50  md:h-40.75">
          <Badge className="hidden md:flex absolute top-3 right-3 bg-accent-400">
            {formatText(order?.status ?? "")}
          </Badge>
          <Image
            src={order?.items?.[0].imageUrl ?? ""}
            alt="product-img"
            className="size-16 md:w-full md:h-full  "
          />
          {order?.items && order?.items?.length > 0 && (
            <Badge className="hidden md:flex absolute bottom-3 right-3 bg-white text-black-500">
              1/{order?.items.length}
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-1.25 w-full">
          <div className="flex justify-between w-full">
            <p className="text-sm">{order?.items?.[0].materialName}</p>
            <Badge className="flex md:hidden bg-accent-400 text-black-500">
              {formatText(order?.status ?? "")}
            </Badge>
          </div>
          <div className="text-s md:text-base font-medium flex justify-between md:justify-start gap-6.25">
            <p className="font-bold md:font-normal">
              &#x20A6;
              {formatNumber(
                formatDecimal(order?.items?.[0].estimatedTotal ?? ""),
              )}
            </p>
            <p>
              {formatNumber(formatDecimal(order?.items?.[0].quantityKg ?? ""))}
              {order?.items?.[0].unit}
            </p>
          </div>
        </div>
      </div>
      <div className=" md:hidden"></div>
    </div>
  );
};

export default OrdersCard;

import { ChevronDown, ChevronRight } from "lucide-react";
import Heading from "../Heading";
import Image from "next/image";
import { formatDecimal, formatNumber } from "@/lib/utils";
import BaselineStarRateIcon from "@iconify-react/ic/baseline-star-rate";
import { useId, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CartListingsResponse } from "@/types/cart.types";

const OrderSummary = ({
  isCheckout,
  cartListing,
  showProceed,
  onProceed,
}: {
  isCheckout?: boolean;
  cartListing?: CartListingsResponse;
  showProceed?: boolean;
  onProceed?: () => void;
}) => {
  const [showBody, setShowBody] = useState(true);
  const detailsId = useId();
  const router = useRouter();

  const listings = cartListing?.items

  const total = cartListing?.summary.subtotal
  const serviceCharge = cartListing?.summary.serviceFee
  const grandTotal = cartListing?.summary.total;
  const formatAmount = (amount: number) => formatNumber(formatDecimal(amount));
  const breakDown = [
    {
      text: "Items",
      count: cartListing?.summary.itemCount,
      value: total,
    },
    {
      text: "Logistics Fee",
      value: cartListing?.summary.logisticsFee ?? "-",
    },
    {
      text: "Service Charge",
      value: serviceCharge,
    },
  ];
  return (
    <div
      className={`shadow-sm flex flex-col h-fit ${showBody ? (isCheckout ? "gap-6" : "gap-2") : "gap-0"} border rounded-[8px] w-full lg:max-w-91.25 py-5.75 px-5.25`}
    >
      <div className="flex justify-between items-center">
        <Heading title="Your Order Summary" titleClassName="text-base" />
        <div className="flex gap-10 items-center">
          <p className="text-s font-bold whitespace-nowrap">
            &#x20A6; {formatAmount(Number(grandTotal))}
          </p>
          <button
            type="button"
            aria-label={
              showBody ? "Collapse order summary" : "Expand order summary"
            }
            aria-expanded={showBody}
            aria-controls={detailsId}
            onClick={() => setShowBody((isShown) => !isShown)}
            className="shrink-0"
          >
            <ChevronDown
              aria-hidden="true"
              className={`transition-transform duration-300 ${showBody ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-11.75">
        <div
          id={detailsId}
          aria-hidden={!showBody}
          className={`w-full overflow-hidden transition-all ease-linear ${showBody ? "opacity-100 max-h-full duration-300" : "opacity-0 max-h-0 duration-200"}`}
        >
          <div
            className={`flex flex-col ${isCheckout ? "gap-6" : "gap-2"} w-full `}
          >
            <hr className="w-full my-2.5" />
            {isCheckout && (
              <>
                <div className="flex flex-col gap-2">
                  {listings?.map((item, index) => (
                    <div key={item.listingId} className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center">
                          <p className="text-s font-bold">Seller</p>
                          <div className="flex items-center">
                            <div className="border-t-[0.8px] border-black-400 w-10 lg:w-17.25" />
                            <ChevronRight className="text-black-400 size-3 -m-1.5" />
                          </div>
                          <div className="flex gap-1 items-center">
                            <p className="text-m-medium">
                              By {item.seller?.fullName}
                            </p>
                            <div className="flex gap-1">
                              <BaselineStarRateIcon className="size-4 text-accent-600" />
                              <p className="text-s font-bold text-black-400">
                                4.3
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex  border rounded-lg gap-2 py-2 px-4 justify-between w-full">
                          <div className="relative size-16 shrink-0 rounded-2xl overflow-hidden">
                            {item.imageUrl ? (
                              <Image
                                fill
                                sizes="64px"
                                className="object-cover"
                                src={item.imageUrl}
                                alt={item.materialName || "Item image"}
                              />
                            ) : (
                              <div
                                aria-hidden="true"
                                className="size-full bg-black-100"
                              />
                            )}
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between">
                              <p className="text-m-medium">
                                {item.materialName}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-s font-bold">
                                {/* {item.currency}  */}
                                &#x20A6;{" "}
                                {formatNumber(
                                  formatDecimal(item.estimatedTotal),
                                )}
                              </p>

                              <p className="text-2s-medium font-normal">
                                {/* {item.currency} */}
                                &#x20A6;{" "}
                                {item.pricePerKg
                                  ? formatNumber(formatDecimal(item.pricePerKg))
                                  : ""}{" "}
                                Per {item.unit}
                              </p>
                            </div>

                            <p className="text-s">
                              {formatDecimal(item.quantityKg)}
                              {item.unit ?? "KG"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < listings.length - 1 && (
                        <hr className="w-full my-2.5" />
                      )}
                    </div>
                  ))}
                </div>
                <hr className="w-full my-2.5" />
              </>
            )}
            <div className="flex flex-col p-2">
              <div className="flex flex-col gap-2">
                {breakDown.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm">
                      {item.text}
                      {"count" in item ? ` (${item.count})` : ""}
                    </p>
                    <p className="text-sm font-bold">
                      {typeof item.value === "number" ? (
                        <>&#x20A6; {formatAmount(item.value)}</>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                ))}
                <hr className="w-full my-1" />
                <div className="flex items-center justify-between font-bold text-xl">
                  <p>Total</p>
                  <p>&#x20A6; {formatAmount(Number(grandTotal))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(showProceed || !isCheckout) && (
          <Button
            onClick={() => (isCheckout ? onProceed?.() : router.push("/checkout?how=cart"))}
            className="h-12"
          >
            {isCheckout ? "Continue to Payment" : "Continue to Checkout"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;

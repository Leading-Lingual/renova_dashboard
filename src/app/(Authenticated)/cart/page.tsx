"use client";
import OrderSummary from "@/components/Checkout/OrderSummary";
import Heading from "@/components/Heading";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { formatDecimal, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BaselineStarRateIcon from "@iconify-react/ic/baseline-star-rate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/actions/cart/cart.query";
import { removefromCartMutation } from "@/actions/cart/cart.mutation";
import { toast } from "sonner";
import Cart from "@iconify-react/ant-design/shopping-cart-outlined";
import MarketplaceIcon from "@iconify-react/roentgen/marketplace";

const CartPage = () => {
  const route = useRouter();
  const { data: cartData } = useQuery(getCartItems);
  const { mutate: removefromCart } = useMutation(removefromCartMutation);

  const handleRemove = (id: string) => {
    removefromCart(id, {
      onError: () => {
        toast.error("failed to remove, try again");
      },
    });
  };

  return (
    <div className="flex text-[24px] h-full w-full flex-col gap-4 overflow-auto px-6 py-6 md:gap-6 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => route.back()}
      />
      <Heading title="Cart" titleClassName="text-[24px]" />
      {cartData?.items.length === 0 ? (
        <div className="pt-10 w-full flex justify-center items-center">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-4 items-center">
              <Cart className="size-10 md:size-21 text-black-300" />
              <Heading
                title="Your cart is empty"
                subtitle="Looks like you haven’t added anything to your cart yet. Explore our marketplace and give waste a second life."
                containerClass="justify-center! text-center! max-w-[340px]"
              />
            </div>
            <Button onClick={() => route.push("/marketplace")} className="h-14">
             <MarketplaceIcon className="size-6"/> Browse Marketplace
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full flex flex-col">
            <SectionCard title="Item Details" titleClassName="text-xl">
              <div className="flex flex-col gap-4 w-full">
                {cartData?.items.length ? (
                  cartData?.items.map((item, index) => (
                    <div key={item.listingId} className="flex flex-col">
                      <div className="flex w-full justify-between gap-7.25">
                        <div className="flex flex-1 min-w-0 gap-4 py-4 first:pt-0 pr-4">
                          <div className="relative h-39.75 w-58.75 shrink-0 overflow-hidden rounded-md bg-black-50">
                            {item.imageUrl ? (
                              <Image
                                fill
                                className="object-cover object-center size-16 md:w-full md:h-full"
                                src={item.imageUrl}
                                alt={item.materialName || "Cart item"}
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 w-full flex flex-col gap-2">
                            <p className="truncate text-m-bold">
                              {item.materialName}
                            </p>
                            <div className="flex justify-between items-center">
                              <p className="text-s font-medium">Seller</p>{" "}
                              <div className="flex gap-1 items-center">
                                <p className="text-s font-medium">
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
                            <div className="flex justify-between items-center">
                              <p className="text-s font-medium">Quantity</p>{" "}
                              <p className="text-s">
                                {formatDecimal(item.quantityKg)} {item.unit}
                              </p>{" "}
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-s font-medium">Price</p>{" "}
                              <div className="flex flex-col gap-1 text-end">
                                <p className="text-m-bold">
                                  &#x20A6;{" "}
                                  {formatNumber(
                                    formatDecimal(item.estimatedTotal ?? ""),
                                  )}
                                </p>
                                <p className="text-s">
                                  &#x20A6;{" "}
                                  {formatNumber(
                                    formatDecimal(item.pricePerKg ?? ""),
                                  )}{" "}
                                  per KG
                                </p>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          aria-label={`Remove ${item.materialName} from cart`}
                          onClick={() => handleRemove(item.listingId)}
                        >
                          <X aria-hidden="true" className="size-4 md:size-6" />
                        </Button>
                      </div>
                      {index < cartData?.items.length - 1 && (
                        <hr className="w-full my-2.5" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-black-400">Your cart is empty.</p>
                )}
              </div>
            </SectionCard>
          </div>
          <OrderSummary cartListing={cartData} />
        </div>
      )}
    </div>
  );
};

export default CartPage;

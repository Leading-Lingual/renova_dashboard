"use client";
import { getListingDetailQuery } from "@/actions/listing/listing.query";
import Heading from "@/components/Heading";
import { statusVariant } from "@/components/Listing/ListingTableColumn";
import Pill from "@/components/Pill";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";
import { formatDecimal, formatText } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocationIcon from "@iconify-react/mi/location";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { useListingActions } from "@/hooks/uselistingActions";
import BaselineStarRateIcon from "@iconify-react/ic/baseline-star-rate";
import { Badge } from "@/components/ui/badge";
import SaveRibbonIcon from "@iconify-react/stash/save-ribbon";
import ShoppingCartOutlinedIcon from "@iconify-react/ant-design/shopping-cart-outlined";
import { getMarketplaceListingDetailQuery } from "@/actions/marketplace/marketplace.query";
import { useBuyNowStore } from "@/stores/buyNow.store";
import { getCartItems } from "@/actions/cart/cart.query";
import { addToCartMutation } from "@/actions/cart/cart.mutation";
import { toast } from "sonner";
import Payment24RegularIcon from "@iconify-react/fluent/payment-24-regular";

type detail = { title: string; value: ReactNode };

const ListingDetailsContent = ({
  listingId,
  isMarketPlace,
  onClose,
}: {
  listingId: string;
  isMarketPlace?: boolean;
  onClose?: () => void;
}) => {
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const { save, unSave } = useListingActions();
  const setBuyNowItem = useBuyNowStore((state) => state.setBuyNowItem);

  const { data, isPending, error } = useQuery(
    isMarketPlace
      ? getMarketplaceListingDetailQuery(listingId)
      : getListingDetailQuery(listingId),
  );

  const { data: cartData } = useQuery(getCartItems);
  const { mutate: addToCart } = useMutation(addToCartMutation);

  const handleAddTocart = (listingId: string) => {
    addToCart(
      { listingId },
      {
        onError: () => {
          toast.error("failed to add");
        },
      },
    );
  };

  const isInCart = cartData?.items.some((item) => item.listingId === listingId);

  const { archive, restore, isAnyPending } = useListingActions();

  const details: detail[] = [
    {
      title: "Price",
      value: (
        <div className="flex flex-col gap-1 text-end">
          <p className="text-m-bold">
            &#x20A6; {formatDecimal(data?.estimatedTotal ?? "")}
          </p>
          <p className="text-s">
            {formatDecimal(data?.pricePerKg ?? "")} per KG
          </p>
        </div>
      ),
    },
    {
      title: "Quantity",
      value: formatDecimal(data?.quantityKg ?? ""),
    },
    {
      title: "Listed on",
      value: (
        <div className="flex flex-col text-s text-end">
          <p>{dayjs(data?.createdAt).format("MMM DD, YYYY")}</p>
          <p>{dayjs(data?.createdAt).format("hh:mm a")}</p>
        </div>
      ),
    },
    {
      title: "Material Type",
      value: formatText(data?.materialType ?? ""),
    },
    {
      title: "Delivery Type",
      value: formatText(data?.pickupPreference ?? ""),
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto px-6 py-6 md:gap-6 md:px-8">
      {isMobile && (
        <ArrowLeft
          className="shrink-0 cursor-pointer"
          onClick={() => router.back()}
        />
      )}
      <div className={`flex flex-col ${isMarketPlace ? "gap-1" : "gap-4"}`}>
        <div className="flex justify-between items-center">
          <Heading titleClassName="text-[20px]" title="Listing detail" />
          {isMarketPlace && !isMobile && (
            <div
              onClick={onClose}
              className="rounded-full bg-black-50 size-6 flex justify-center items-center"
            >
              <X className="size-4" />
            </div>
          )}
        </div>
        {isPending ? (
          <div
            aria-label="Loading listing details"
            aria-busy="true"
            className="flex flex-col gap-4"
          >
            {isMarketPlace && (
              <div className="flex justify-between items-center">
                <div className="h-5 w-36 animate-pulse rounded bg-black-50" />
                <div className="h-4 w-10 animate-pulse rounded bg-black-50" />
              </div>
            )}
            <div className="flex flex-col w-full gap-14">
              <div className="flex flex-col gap-6">
                <div className="h-56.5 w-full animate-pulse rounded-lg bg-black-50" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="h-5 w-44 animate-pulse rounded bg-black-50" />
                      <div className="h-4 w-20 animate-pulse rounded bg-black-50" />
                      <div className="h-4 w-40 animate-pulse rounded bg-black-50" />
                    </div>
                    {!isMarketPlace && (
                      <div className="h-6 w-20 animate-pulse rounded-full bg-black-50" />
                    )}
                  </div>
                  <hr className="bg-brand-100 w-full h-[0.5px] border-none my-2.5" />
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 5 }, (_, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="h-4 w-24 animate-pulse rounded bg-black-50" />
                        <div className="h-4 w-20 animate-pulse rounded bg-black-50" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {isMarketPlace ? (
                <div className="flex w-full gap-4">
                  <div className="h-12 flex-1 animate-pulse rounded-md bg-black-50" />
                  <div className="h-12 flex-1 animate-pulse rounded-md bg-black-50" />
                </div>
              ) : (
                <div className="h-12 w-full animate-pulse rounded-md bg-black-50" />
              )}
            </div>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-4">
            {isMarketPlace && (
              <div className="flex justify-between items-center">
                <p className="text-m-medium">By {data.seller?.fullName}</p>
                <div className="flex gap-1">
                  <BaselineStarRateIcon className="size-4 text-accent-600" />
                  <p className="text-s font-bold text-black-400">4.3</p>
                </div>
              </div>
            )}
            <div className="flex flex-col w-full gap-14">
              <div className="flex flex-col gap-6">
                <div className=" relative w-full h-56.5 shrink-0 overflow-hidden rounded-lg">
                  {isMarketPlace && (
                    <>
                      <Badge className="absolute top-2 left-2 z-10 bg-product">
                        {formatText(data.status)}
                      </Badge>
                      <div
                        onClick={() =>
                          data.isSaved ? unSave.run(data.id) : save.run(data.id)
                        }
                        className="flex size-6 items-center justify-center bg-brand-50 text-brand-500 rounded-full absolute top-2 right-2  z-10"
                      >
                        <SaveRibbonIcon
                          fillOpacity={data.isSaved ? undefined : 0}
                          className="size-4"
                        />
                      </div>
                    </>
                  )}
                  <Image
                    fill
                    className="object-cover"
                    src={data?.images?.[0]?.url ?? ""}
                    alt={
                      data?.images?.[0]?.id ??
                      data?.materialName ??
                      "item image"
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-center gap-2">
                      <p className="text-m-bold">
                        {data.materialName ??
                          `${formatText(data.materialType)} material`}
                      </p>

                      <p className="text-s">
                        {formatDecimal(data.quantityKg)}
                        {data.unit ?? "KG"}
                      </p>

                      <div className="flex items-center gap-1 text-s">
                        <LocationIcon className="size-3" />

                        <p className="text-s">
                          {data.location?.city} {data.location?.state},{" "}
                          {data.location?.country}
                        </p>
                      </div>
                    </div>
                    {!isMarketPlace && (
                      <Pill
                        className="h-fit"
                        variant={
                          statusVariant[
                            data.status as keyof typeof statusVariant
                          ]
                        }
                      >
                        {formatText(data.status)}
                      </Pill>
                    )}
                  </div>
                  <hr className="bg-brand-100 w-full h-[0.5px] border-none my-2.5" />
                  <div className="flex flex-col gap-3">
                    {details.map((detail) => (
                      <div key={detail.title} className="flex justify-between ">
                        <p className="text-m-bold">{detail.title}</p>
                        <span className="text-s">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {isMarketPlace ? (
                <div className="flex w-full gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-12!"
                    disabled={isInCart}
                    onClick={() => handleAddTocart(data.id)}
                  >
                    <ShoppingCartOutlinedIcon />
                    {isInCart ? "Added to cart" : "Add to cart"}
                  </Button>
                  <Button
                    className="flex-1 h-12!"
                    onClick={() => {
                      setBuyNowItem(data);
                      router.push("/checkout?how=buynow");
                    }}
                  >
                    <Payment24RegularIcon />
                    Buy Now
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={isAnyPending}
                  onClick={() =>
                    data.status === "AVAILABLE" || data.status === "DRAFT"
                      ? archive.run(data.id)
                      : restore.run(data.id)
                  }
                  className={`h-12! ${data.status === "AVAILABLE" || data.status === "DRAFT" ? "bg-danger-600" : ""}`}
                >
                  {isAnyPending && <Loader2 className="animate-spin" />}
                  {data.status === "AVAILABLE" || data.status === "DRAFT"
                    ? "Archive"
                    : "Restore"}{" "}
                  listing
                </Button>
              )}
            </div>
          </div>
        ) : error ? (
          <div className="text-danger-500"> failed to load listing details</div>
        ) : null}
      </div>
    </div>
  );
};

export default ListingDetailsContent;

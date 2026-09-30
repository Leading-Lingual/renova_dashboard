"use client";
import { getListingDetailQuery } from "@/actions/listing/listing.query";
import Heading from "@/components/Heading";
import { statusVariant } from "@/components/Listing/ListingTableColumn";
import Pill from "@/components/Pill";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";
import { formatDecimal, formatText } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocationIcon from "@iconify-react/mi/location";
import dayjs from "dayjs";
import { ReactNode, useEffect } from "react";
import { useListingActions } from "@/hooks/uselistingActions";

type detail = { title: string; value: ReactNode };

const ListingDetailsContent = ({ listingId }: { listingId: string }) => {
  const { isMobile } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (!isMobile) router.push("/listing");
  }, [isMobile, router]);

  const { data, isPending, error } = useQuery(getListingDetailQuery(listingId));
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
      value: data?.quantityKg,
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
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-4">
        <Heading titleClassName="text-[20px]" title="Listing detail" />
        {isPending ? (
          <Loader2 className="m-auto animate-spin" />
        ) : data ? (
          <div className="flex flex-col w-full gap-14 ">
            <div className="flex flex-col gap-6">
              <div className=" relative w-full h-56.5 shrink-0 overflow-hidden rounded-lg">
                <Image
                  fill
                  className="object-cover"
                  src={data?.images?.[0]?.url ?? ""}
                  alt={
                    data?.images?.[0]?.id ?? data?.materialName ?? "item image"
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
                  <Pill
                    className="h-fit"
                    variant={
                      statusVariant[data.status as keyof typeof statusVariant]
                    }
                  >
                    {formatText(data.status)}
                  </Pill>
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
          </div>
        ) : error ? (
          <div className="text-danger-500"> failed to load listing details</div>
        ) : null}
      </div>
    </div>
  );
};

export default ListingDetailsContent;

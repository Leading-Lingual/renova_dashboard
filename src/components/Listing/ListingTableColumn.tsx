import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import dayjs from "dayjs";

import LocationIcon from "@iconify-react/mi/location";

import { Listing } from "@/types/listing.types";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";

import Pill from "../Pill";
import { DataTableFeatures } from "./data-table-features";
import ActionsDropdown from "./ActionsDropdown";

const columnHelper = createColumnHelper<DataTableFeatures, Listing>();

export const statusVariant = {
  ARCHIVED: "grey",
  DRAFT: "accent",
  AVAILABLE: "brand",
} as const;

export const getListingColumns = () =>
  columnHelper.columns([
    columnHelper.accessor("materialName", {
      header: "Listing",

      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-4">
            <div className="h-18 w-26.5 shrink-0 overflow-hidden rounded-[8px]">
              <Image
                width={106}
                height={72}
                src={item.images?.[0]?.url ?? ""}
                alt={item.images?.[0]?.id ?? item.materialName ?? "item image"}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-2">
              <p className="text-m-bold">
                {item.materialName ??
                  `${formatText(item.materialType)} material`}
              </p>

              <p className="text-s">
                {formatDecimal(item.quantityKg)}
                {item.unit ?? "KG"}
              </p>

              <div className="flex items-center gap-1 text-s">
                <LocationIcon className="size-3" />

                <p className="text-s">
                  {item.location?.city} {item.location?.state},{" "}
                  {item.location?.country}
                </p>
              </div>
            </div>
          </div>
        );
      },
    }),

    columnHelper.accessor("materialType", {
      header: "Material Type",

      cell: ({ row }) => formatText(row.original.materialType),
    }),

    columnHelper.accessor("estimatedTotal", {
      header: "Price",

      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex flex-col gap-1">
            <p className="text-m-bold">
              {/* {item.currency}  */}
              &#x20A6;
              {formatNumber(formatDecimal(item.estimatedTotal))}
            </p>

            <p className="text-s">
              {/* {item.currency} */}
              &#x20A6;
              {item.pricePerKg
                ? formatNumber(formatDecimal(item.pricePerKg))
                : ""}{" "}
              Per {item.unit}
            </p>
          </div>
        );
      },
    }),

    columnHelper.accessor("status", {
      header: "Status",

      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <Pill variant={statusVariant[status as keyof typeof statusVariant]}>
            {formatText(status)}
          </Pill>
        );
      },
    }),

    columnHelper.accessor("createdAt", {
      header: "Listed on",

      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-m-bold">
            {dayjs(row.original.createdAt).format("MMM DD, YYYY")}
          </p>

          <p className="text-s">
            {dayjs(row.original.createdAt).format("hh:mm a")}
          </p>
        </div>
      ),
    }),

    columnHelper.accessor("id", {
      header: "Actions",

      cell: ({ row }) => {
        const listing = row.original;

        return (
          <ActionsDropdown listingId={listing.id} status={listing.status} />
        );
      },
    }),
  ]);

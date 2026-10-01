import { formatDecimal, formatText } from "@/lib/utils";
import { Listing } from "@/types/listing.types";
import Image from "next/image";
import SaveRibbonIcon from "@iconify-react/stash/save-ribbon";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import BaselineStarRateIcon from "@iconify-react/ic/baseline-star-rate";
import LocationIcon from "@iconify-react/mi/location";
import { useListingActions } from "@/hooks/uselistingActions";
import DetailsDrawer from "./DetailsDrawer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks/useWindowSize";

const MarkertPlaceCard = ({ listing }: { listing: Listing }) => {
  const { save, unSave } = useListingActions();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isMobile } = useWindowSize();
  return (
    <div className="p-4 rounded-2xl border flex flex-col gap-4.5 md:gap-5.5">
      <div className=" relative w-full h-25.25 md:h-39.75 shrink-0 overflow-hidden rounded-lg">
        <Badge className="absolute top-2 right-auto md:right-2  z-10 bg-product rounded-sm! md:rounded-4xl!">
          {formatText(listing.status)}
        </Badge>
        <div
          onClick={() =>
            listing.isSaved ? unSave.run(listing.id) : save.run(listing.id)
          }
          className="flex cursor-pointer md:hidden size-6 items-center justify-center bg-brand-50 text-brand-500 rounded-full absolute top-2 right-2  z-10"
        >
          <SaveRibbonIcon
            fillOpacity={listing.isSaved ? undefined : 0}
            className="size-4"
          />
        </div>
        <Image
          fill
          className="object-cover"
          src={listing?.images?.[0]?.url ?? ""}
          alt={
            listing?.images?.[0]?.id ?? listing?.materialName ?? "item image"
          }
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between items-center">
          <p className="text-s md:text-base font-bold">
            {listing.materialName}
          </p>
          <div
            onClick={() =>
              listing.isSaved ? unSave.run(listing.id) : save.run(listing.id)
            }
            className="cursor-pointer md:flex hidden size-6 items-center justify-center bg-brand-50 text-brand-500 rounded-full"
          >
            <SaveRibbonIcon
              fillOpacity={listing.isSaved ? undefined : 0}
              className="size-4"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="md:font-bold text-2s-medium md:text-s">
            {formatDecimal(listing.pricePerKg)} Per KG
          </p>
          <p className="text-2s-medium font-normal md:text-s">{formatDecimal(listing.quantityKg)} KG</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-2s-medium md:text-s font-medium">By {listing.seller?.fullName}</p>
            <div className="flex gap-0.5 md:gap-1">
              <BaselineStarRateIcon className="size-4 text-accent-600" />
              <p className="text-2s-medium md:text-s md:font-bold text-black-400">4.3</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-s">
            <LocationIcon className="size-3" />

            <p className="text-2s-medium md:text-s">
              {listing.location?.city} {listing.location?.state},{" "}
              {listing.location?.country}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => isMobile ?router.push(`/marketplace/${listing.id}`):setOpen(true)}
          variant="outline"
          className="bg-brand-500 text-white  md:bg-transparent md:text-brand-500 flex-1 text-s! font-bold!"
        >
          View Details
        </Button>
        <Button className="hidden md:flex flex-1">Buy Now</Button>
      </div>
      <DetailsDrawer
        isMarketPlace
        listingId={listing.id}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default MarkertPlaceCard;

"use client";
import { Plus } from "lucide-react";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { useRouter } from "next/navigation";
import ListingTable from "../Listing/ListingsTable";
import EmptyState from "../EmptyState";
import EmptyStateImg from "../../../public/rafiki.svg";
import ListingHeading from "../Listing/ListingHeading";
import { Listing } from "@/types/listing.types";

const ListingOverveiw = ({ listing }: { listing: Listing[] }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-7">
      <ListingHeading showActions />
      {listing.length !== 0 ? (
        <ListingTable listings={listing} />
      ) : (
        <EmptyState
          title="No Listing"
          subtile="You currently do not have any listed waste material"
          image={EmptyStateImg}
          firstButton={{ text: "Scan Material", icon: ScanFilledIcon }}
          secondButton={{
            text: "Create New Listing",
            icon: Plus,
            onClick: () => router.push("/listing/newListing"),
          }}
        />
      )}
    </div>
  );
};

export default ListingOverveiw;

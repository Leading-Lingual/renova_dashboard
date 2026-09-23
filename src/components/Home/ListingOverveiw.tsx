"use client";
import { Plus } from "lucide-react";
import Heading from "../Heading";
import { Button } from "../ui/button";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { useRouter } from "next/navigation";
import { GetListingQuery } from "@/actions/listing/listing.query";
import { useQuery } from "@tanstack/react-query";
import ListingTable from "../Listing/ListingsTable";
import EmptyState from "../EmptyState";
import EmptyStateImg from "../../../public/rafiki.svg";
import ListingHeading from "../Listing/ListingHeading";

const ListingOverveiw = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-7">
      <ListingHeading />
      {/* {data?.items.length !== 0 ? (
        <ListingTable listings={data?.items ?? []} />
      ) : ( */}
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
      {/* )} */}
    </div>
  );
};

export default ListingOverveiw;

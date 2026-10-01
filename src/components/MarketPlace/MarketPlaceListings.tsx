import { Listing } from "@/types/listing.types";
import MarkertPlaceCard from "./MarkertPlaceCard";

const MarketPlaceListings = ({ listings }: { listings: Listing[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-4">
      {listings.map((listing) => (
        <MarkertPlaceCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default MarketPlaceListings;

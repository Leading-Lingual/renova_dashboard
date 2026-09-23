import Heading from "../Heading";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { Plus } from "lucide-react";

const ListingHeading = ({
  isOverview = true,
  showActions,
}: {
  isOverview?: boolean;
  showActions?: boolean;
}) => {
  const router = useRouter();
  return (
    <Heading
      title="My Listings"
      subtitle=" View and manage all the waste material you’ve listed"
      actions={
        showActions && (
          <div
            className={`flex itmes-center gap-4 md:gap-10 w-full md:w-fit  ${isOverview ? "-order-1" : ""} md:order-0`}
          >
            <Button
              variant="outline"
              className="border-brand-500! h-12 md:h-14 px-4! flex-1"
            >
              <ScanFilledIcon className="size-6 text-brand-700" />
              <p className="text-brand-700 text-heading-xs-semibold">
                Scan <span className="hidden md:inline">material</span>
              </p>
            </Button>
            <Button
              onClick={() => router.push("/listing/newListing")}
              className="h-12 md:h-14 px-4! flex-1"
            >
              <Plus className="size-6" />
              <p className="text-heading-xs-semibold">Create new listing</p>
            </Button>
          </div>
        )
      }
    />
  );
};

export default ListingHeading;

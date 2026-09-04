import { Plus } from "lucide-react";
import Heading from "../Heading";
import { Button } from "../ui/button";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import ListingOverviewTable from "./ListingOverviewTable";

const ListingOverveiw = () => {
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="My Listings"
        subtitle=" View and manage all the waste material you’ve listed"
        actions={
          <div className="flex itmes-center gap-4 md:gap-10 w-full md:w-fit -order-1 md:order-0">
            <Button
              variant="outline"
              className="border-brand-500! h-12 md:h-14 px-4! flex-1"
            >
              <ScanFilledIcon className="size-6 text-brand-700" />
              <p className="text-brand-700 text-heading-xs-semibold">
                Scan <span className="hidden md:inline">material</span>
              </p>
            </Button>
            <Button className="h-12 md:h-14 px-4! flex-1">
              <Plus className="size-6" />
              <p className="text-heading-xs-semibold">Create new listing</p>
            </Button>
          </div>
        }
      />

      <ListingOverviewTable/>
    </div>
  );
};

export default ListingOverveiw;

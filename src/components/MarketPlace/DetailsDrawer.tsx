import ListingDetailsContent from "@/app/(Authenticated)/listing/[id]/ListingDetailsContent";
import { Drawer, DrawerContent } from "../ui/drawer";

const DetailsDrawer = ({
  listingId,
  isMarketPlace,
  open,
  onOpenChange,
}: {
  listingId: string;
  isMarketPlace: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent>
        <ListingDetailsContent
          listingId={listingId}
          isMarketPlace={isMarketPlace}
          onClose={() => onOpenChange(false)}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default DetailsDrawer;

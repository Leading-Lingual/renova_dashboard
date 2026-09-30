import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ListingStatus } from "@/types/listing.types";
import { useListingActions } from "@/hooks/uselistingActions";

const ActionsDropdown = ({
  status,
  listingId,
}: {
  status: ListingStatus;
  listingId: string;
}) => {
  const { archive, restore, publish, unPublish } = useListingActions();

  const handleArchive = archive.run;
  const handleRestore = restore.run;
  const handlePublish = publish.run;
  const handleUnPublish = unPublish.run;

  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="rounded-none">
          {status !== "ARCHIVED" && (
            <DropdownMenuItem
              className="rounded-none hover:bg-brand-50!"
              onClick={() => handleArchive(listingId)}
            >
              Archive listing
            </DropdownMenuItem>
          )}

          {status === "ARCHIVED" && (
            <DropdownMenuItem
              className="rounded-none hover:bg-brand-50!"
              onClick={() => handleRestore(listingId)}
            >
              Restore listing
            </DropdownMenuItem>
          )}

          {status === "DRAFT" && (
            <DropdownMenuItem
              className="rounded-none hover:bg-brand-50!"
              onClick={() => handlePublish(listingId)}
            >
              Publish listing
            </DropdownMenuItem>
          )}

          {status === "AVAILABLE" && (
            <DropdownMenuItem
              className="rounded-none hover:bg-brand-50!"
              onClick={() => handleUnPublish(listingId)}
            >
              Make draft
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionsDropdown;

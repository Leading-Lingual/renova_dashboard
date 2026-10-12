import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import AddressSelector from "../AddressSelector";

interface PickupOptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (option: "ACCOUNT_ADDRESS" | "NEW_ADDRESS") => void;
  handleSaveDraft: () => void;
  isPending: boolean;
  isSubmittingDraft: boolean;
}

const PickupOptionModal = ({
  open,
  onOpenChange,
  onSubmit,
  handleSaveDraft,
  isPending,
  isSubmittingDraft,
}: PickupOptionModalProps) => {
  const [selectedOption, setSelectedOption] = useState<
    "ACCOUNT_ADDRESS" | "NEW_ADDRESS"
  >("ACCOUNT_ADDRESS");

  const handleSubmit = () => {
    onSubmit(selectedOption);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-178.5 px-4 py-10 md:p-10 rounded-[24px]">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle className="text-sm font-bold lg:text-2xl">
            Choose Pickup Option
          </DialogTitle>
          <DialogDescription className="text-black-500 text-sm">
            How would you like to handle the pickup for this material{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-12">
          <AddressSelector
            disabled={isPending}
            selected={selectedOption}
            onSelect={(selected) => setSelectedOption(selected)}
          />
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {selectedOption === "ACCOUNT_ADDRESS" && (
              <Button
                onClick={handleSaveDraft}
                className="h-14! w-full md:flex-1"
                variant="outline"
                disabled={isPending}
              >
                {isPending && isSubmittingDraft && (
                  <Loader2 className="animate-spin" />
                )}
                Save as Draft
              </Button>
            )}
            <Button
              type={selectedOption === "ACCOUNT_ADDRESS" ? "submit" : "button"}
              onClick={handleSubmit}
              className="h-14! w-full md:flex-1 "
              disabled={isPending}
            >
              {isPending && !isSubmittingDraft && (
                <Loader2 className="animate-spin" />
              )}

              {selectedOption === "ACCOUNT_ADDRESS"
                ? "List Waste Material"
                : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PickupOptionModal;

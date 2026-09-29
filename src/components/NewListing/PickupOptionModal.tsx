import { ReactElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, MapPinIcon } from "lucide-react";

interface PickupOptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (option: "ACCOUNT_ADDRESS" | "NEW_ADDRESS") => void;
  handleSaveDraft: () => void;
  isPending:boolean
  isSubmittingDraft:boolean
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
  const items: {
    icon: ReactElement;
    key: "ACCOUNT_ADDRESS" | "NEW_ADDRESS";
    title: string;
    text: string;
  }[] = [
    {
      icon: <MapPinIcon />,
      key: "ACCOUNT_ADDRESS",
      title: "Use my account address",
      text: "We’ll use the address you created your account with for pickup",
    },
    {
      icon: <MapPinIcon />,
      key: "NEW_ADDRESS",
      title: "Use a new address",
      text: "Add a different pickup location for this material",
    },
  ];

  const handleSubmit = () => {
    onSubmit(selectedOption);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-178.5 p-10 rounded-[24px]">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle className="text-sm font-bold lg:text-2xl">
            Choose Pickup Option
          </DialogTitle>
          <DialogDescription className="text-black-500 text-sm">
            How would you like to handle the pickup for this material{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-12">
          <div className="flex no-scrollbar w-full gap-4">
            {items.map((item) => (
              <div
                key={item.text}
                onClick={() => isPending ? null :setSelectedOption(item.key)}
                className={`flex flex-col gap-2.5 border px-4 py-2.5 rounded-2xl flex-1 ${selectedOption === item.key ? "border-brand-400" : "border-black-50"}`}
              >
                {item.icon}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-s">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 w-full">
            {selectedOption === "ACCOUNT_ADDRESS" && (
              <Button
                onClick={handleSaveDraft}
                className="h-14 flex-1"
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
              className="h-14 flex-1"
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

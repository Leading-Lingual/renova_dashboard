import { useWindowSize } from "@/hooks/useWindowSize";

import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import PickUpInfoSection from "../NewListing/PickUpInfoSection";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { AddressSchema } from "@/validations/checkout.validation";
import { addressFormValues } from "@/types/checkout.types";

const CheckOutNewAddress = ({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: addressFormValues) => void;
}) => {
  const { isMobile } = useWindowSize();
  const form = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      phoneNumber: "",
      location: {
        country: "",
        state: "",
        formattedAddress: "",
      },
    },
  });

  const onSubmit = (data: addressFormValues) => {
    onAdd(data);
  };

  return isMobile ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full md:min-w-178.5 px-4 pt-4 pb-10 md:p-10 rounded-[24px]"
      >
        <DialogHeader>
          <DialogClose
          className="ml-auto"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black-50 size-6 flex justify-center items-center hover:bg-black-50 text-black cursor pointer"
              >
                <X className="size-4" />
              </Button>
            }
          />
          <DialogTitle className="text-base">
            Buyer Information
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          <PickUpInfoSection
            isSmall
            control={form.control}
            resetField={form.resetField}
            names={{
              phoneNumber: "phoneNumber",
              country: "location.country",
              state: "location.state",
              address: "location.formattedAddress",
            }}
          />
          <Button type="submit" className="h-12!">
            Add New Delivery Address
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="py-9 px-7.5">
        <div className="p-0 pb-4.5 flex justify-between">
          <DrawerTitle className="text-xl">Buyer Information</DrawerTitle>
          <DrawerClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black-50 size-6 flex justify-center items-center hover:bg-black-50 text-black cursor pointer"
              >
                <X className="size-4" />
              </Button>
            }
          />
        </div>
        <hr className="w-full mb-4.5" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16 w-full"
        >
          <PickUpInfoSection
            isSmall
            control={form.control}
            resetField={form.resetField}
            names={{
              phoneNumber: "phoneNumber",
              country: "location.country",
              state: "location.state",
              address: "location.formattedAddress",
            }}
          />
          <Button type="submit" className="h-12!">
            Add New Delivery Address
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckOutNewAddress;

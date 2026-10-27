import { useWindowSize } from "@/hooks/useWindowSize";

import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, X } from "lucide-react";
import { bankSchema } from "@/validations/wallet.validation";
import { bankFormValues } from "@/types/wallet.types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Input } from "../ui/input";

const AddBankAccount = ({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
}) => {
  const { isMobile } = useWindowSize();
  const form = useForm({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      accountNumber: "",
      bank: "",
    },
  });

  const onSubmit = (data: bankFormValues) => {
    const bankName = items.find((item) => item.value === data.bank)?.label;
    if (!bankName) return;

    onAdd();
    form.reset();
  };

  const items = [
    { label: "Access", value: "000" },
    { label: "GTB", value: "111" },
    { label: "Union", value: "222" },
    { label: "Opay", value: "333" },
    { label: "PalmPay", value: "444" },
  ];

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);
    form.reset();
  };

  return isMobile ? (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full md:min-w-178.5 px-4 pt-4 pb-10 md:p-10 rounded-[24px]"
      >
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-base">Add Bank Account</DialogTitle>
          <DialogClose
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
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="bank"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Bank
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      showIcon={false}
                      aria-invalid={fieldState.invalid}
                      // disabled={isSubmitting}
                      className="h-11.25! md:h-14! w-full border-black-200! border-[0.5px]"
                    >
                      <p className="flex-1 text-start">
                        {field.value
                          ? items.find((item) => item.value === field.value)
                              ?.label
                          : "-- Select bank --"}
                      </p>

                      <ChevronRight className="font-bold shrink-0 size-6" />
                    </SelectTrigger>

                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="accountNumber"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Account Number
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="10-digit account number "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    // disabled={isSubmitting}
                    type="text"
                    inputMode="numeric"
                    value={field.value}
                    onChange={(event) => {
                      const value = event.target.value.replace(/,/g, "");
                      if (!/^\d*\.?\d*$/.test(value)) return;
                      field.onChange(value);
                    }}
                    className="h-11.25! md:h-14! w-full border-black-200! border-[0.5px]"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button type="submit" className="h-12!">
            Verify Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={handleOpenChange} swipeDirection="right">
      <DrawerContent className="py-9 px-7.5">
        <div className="p-0 pb-4.5 flex justify-between">
          <DrawerTitle className="text-xl">Add Bank Account</DrawerTitle>
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
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="bank"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Bank
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      showIcon={false}
                      aria-invalid={fieldState.invalid}
                      // disabled={isSubmitting}
                      className="h-11.25! md:h-14! w-full border-black-200! border-[0.5px]"
                    >
                      <p className="flex-1 text-start">
                        {field.value
                          ? items.find((item) => item.value === field.value)
                              ?.label
                          : "-- Select bank --"}
                      </p>

                      <ChevronRight className=" shrink-0 size-6" />
                    </SelectTrigger>

                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="accountNumber"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Account Number
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="10-digit account number "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    // disabled={isSubmitting}
                    type="text"
                    inputMode="numeric"
                    value={field.value}
                    onChange={(event) => {
                      const value = event.target.value.replace(/,/g, "");
                      if (!/^\d*\.?\d*$/.test(value)) return;
                      field.onChange(value);
                    }}
                    className="h-11.25! md:h-14! w-full border-black-200! border-[0.5px]"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Button type="submit" className="h-12!">
            Verify Account
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddBankAccount;

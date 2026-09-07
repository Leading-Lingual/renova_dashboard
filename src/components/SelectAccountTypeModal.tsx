import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import UserFillIcon from "@iconify-react/ri/user-fill";
import { userTypeSchema } from "@/validations/auth.validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export const SelectAccountTypeModal = ({
  onSubmit,
  open,
  close,
}: {
  onSubmit: (data: { userType: string }) => void;
  open: boolean;
  close: () => void;
}) => {
  const form = useForm<z.infer<typeof userTypeSchema>>({
    resolver: zodResolver(userTypeSchema),
    defaultValues: {
      userType: "",
    },
  });

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle> Select Account type</DialogTitle>
          <DialogDescription>
            Select an account type to proceed
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Controller
            control={form.control}
            name="userType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                   Account type
                </FieldLabel>

                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    ref={field.ref}
                    id={field.name}
                    className="h-14! w-full shrink-0 rounded-[12px] px-3 border-black-200!"
                    aria-invalid={fieldState.invalid}
                  >
                    <UserFillIcon className="size-6" />
                    <SelectValue placeholder="Select an account type" />
                  </SelectTrigger>

                  <SelectContent alignItemWithTrigger={false}>
                    {["INDIVIDUAL", "AGENT", "NGO"].map((item) => (
                      <SelectItem
                        className="h-10! px-4!"
                        key={item}
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex gap-6 w-full flex-col md:flex-row h-fit ">
            <Button onClick={close} variant="outline" type="button" className="w-full h-10 md:h-14!">
              Cancel
            </Button>
            <Button type="submit" className="w-full h-10  md:h-14!">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldError } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const AccountOtp = ({
  open,
  onSubmit,
}: {
  open: boolean;
  onSubmit?: (otp: string) => void;
}) => {
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  const handleSubmit = (data: { otp: string }) => {
    onSubmit?.(data.otp);
  };
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="w-full md:max-w-fit px-4 pt-4 pb-10 md:p-10 rounded-[24px]"
      >
        <DialogHeader className="flex flex-row justify-between">
          <div className="flex flex-col ">
            <DialogTitle className="text-base">Enter OTP</DialogTitle>
            <DialogDescription>
              An otp has been sent to your email, enter otp to continue
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-12"
        >
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="otp"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <InputOTP
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup className="flex w-full md:gap-2 justify-between">
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={0}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={1}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={2}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={3}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={4}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button type="submit" className="h-12!">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountOtp;

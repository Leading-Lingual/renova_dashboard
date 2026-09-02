import FormHeader from "@/components/FormHeader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AccountType } from "@/types/onboarding.type";
import { PersonInfoSchema } from "@/validations/onboarding.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import UserFillIcon from "@iconify-react/ri/user-fill";
import LocationIcon from "@iconify-react/mi/location";
import CouponFillIcon from "@iconify-react/mingcute/coupon-fill";
import { useRouter } from "next/navigation";
import PhoneNumberInput from "@/components/PhoneNumberInput";

const PersonalInfo = ({ accountType }: { accountType: AccountType }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PersonInfoSchema>>({
    resolver: zodResolver(PersonInfoSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      referralCode: "",
    },
  });
  const handleSetProfile = () => {
    router.push("/");
  };
  return (
    <form className="flex flex-col gap-6 md:gap-8">
      <FormHeader
        title="Personal Info"
        subtitle="Tell us a bit about your business..."
      />
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-6">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                  {accountType === "individual"
                    ? "Full Name"
                    : accountType === "business"
                      ? "Business Name"
                      : "Organization Name"}
                </FieldLabel>
                <InputGroup className="h-14">
                  <InputGroupAddon>
                    <UserFillIcon className="size-6" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Enter your first and last name"
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <PhoneNumberInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  invalid={fieldState.invalid}
                  defaultCountry="NG"
                  placeholder="9012356781"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex gap-6 flex-col md:flex-row">
            <Controller
              control={form.control}
              name="location"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Country
                  </FieldLabel>
                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <LocationIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Enter your location"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="location"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    State
                  </FieldLabel>
                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <LocationIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Enter your location"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            control={form.control}
            name="location"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                  Address
                </FieldLabel>
                <InputGroup className="h-14">
                  <InputGroupAddon>
                    <LocationIcon className="size-6" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Enter your location"
                  />
                </InputGroup>
                {/* <FieldLabel className="flex gap-2 text-brand-400 items-center">
                  <div className="rounded-full border border-brand-400 flex size-5">
                    <LocationIcon className="size-2.5 m-auto" />
                  </div>
                  <p className="text-s font-medium">Use current location</p>
                </FieldLabel> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="referralCode"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                  Referral Code (optional)
                </FieldLabel>
                <InputGroup className="h-14">
                  <InputGroupAddon>
                    <CouponFillIcon className="size-6" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Enter your referral code"
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button
          // disabled={isPending}
          //   type="submit"
          className="text-white h-14 w-full"
          onClick={handleSetProfile}
        >
          {/* {isPending && <Loader2 className="animate-spin" />} */}
          Set profile
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfo;

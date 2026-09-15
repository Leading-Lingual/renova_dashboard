"use client";
import FormHeader from "@/components/FormHeader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import UserFillIcon from "@iconify-react/ri/user-fill";
import LocationIcon from "@iconify-react/mi/location";
import CouponFillIcon from "@iconify-react/mingcute/coupon-fill";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { Country, State } from "country-state-city";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { OnboardingFormValues } from "@/types/user.type";
import { Loader2 } from "lucide-react";

type PersonalInfoProps = {
  form: UseFormReturn<OnboardingFormValues>;
  onSubmit: (data: OnboardingFormValues) => void;
  isSubmiting: boolean;
};

const PersonalInfo = ({ form, onSubmit, isSubmiting }: PersonalInfoProps) => {
  const accountType = useWatch({
    control: form.control,
    name: "accountType",
  });

  const selectedCountry = useWatch({
    control: form.control,
    name: "location.country",
  });

  const countryList = Country.getAllCountries();

  const selectedCountryCode = countryList.find(
    (country) => country.name === selectedCountry,
  )?.isoCode;

  const statesOfSelectedCountry = selectedCountryCode
    ? State.getStatesOfCountry(selectedCountryCode)
    : [];

  const nameLabel =
    accountType === "INDIVIDUAL"
      ? "Full Name"
      : accountType === "AGENT"
        ? "Business Name"
        : "Organization Name";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 md:gap-8 w-full"
    >
      <FormHeader
        title="Personal Info"
        subtitle="Tell us a bit about your business..."
      />
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-6">
          <Controller
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                  {nameLabel}
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
                    placeholder={
                      accountType === "INDIVIDUAL"
                        ? "Enter your first and last name"
                        : "Enter your business name"
                    }
                    disabled={isSubmiting}
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
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <PhoneNumberInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  invalid={fieldState.invalid}
                  defaultCountry="NG"
                  placeholder="9012356781"
                  disabled={isSubmiting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex gap-6 w-full flex-col md:flex-row">
            <Controller
              control={form.control}
              name="location.country"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Country
                  </FieldLabel>
                  <Combobox
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value ? value : "");
                      form.setValue("location.state", "");
                    }}
                    items={countryList.map((country) => country.name)}
                    disabled={isSubmiting}
                  >
                    <ComboboxInput
                      disabled={isSubmiting}
                      placeholder="Select a country"
                      className="h-14! w-full shrink-0 rounded-[12px] border-black-200!"
                    >
                      <InputGroupAddon>
                        <LocationIcon className="size-6" />
                      </InputGroupAddon>
                    </ComboboxInput>
                    <ComboboxContent alignOffset={-28}>
                      <ComboboxEmpty>No country found.</ComboboxEmpty>
                      <ComboboxList>
                        {(country) => (
                          <ComboboxItem
                            key={country}
                            value={country}
                            className="h-10! px-4!"
                          >
                            {country}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="location.state"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    State
                  </FieldLabel>
                  <Combobox
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value ? value : "")
                    }
                    items={statesOfSelectedCountry.map((state) => state.name)}
                    disabled={!selectedCountryCode || isSubmiting}
                  >
                    <ComboboxInput
                      disabled={!selectedCountryCode || isSubmiting}
                      placeholder={
                        selectedCountryCode
                          ? "Select state"
                          : "Select a country first"
                      }
                      className="h-14! w-full shrink-0 rounded-[12px] border-black-200!"
                    >
                      <InputGroupAddon>
                        <LocationIcon className="size-6" />
                      </InputGroupAddon>
                    </ComboboxInput>
                    <ComboboxContent alignOffset={-28}>
                      <ComboboxEmpty>No state found.</ComboboxEmpty>
                      <ComboboxList>
                        {(state) => (
                          <ComboboxItem
                            key={state}
                            value={state}
                            className="h-10! px-4!"
                          >
                            {state}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            control={form.control}
            name="location.formattedAddress"
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
                    disabled={isSubmiting}
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
                    disabled={isSubmiting}
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
          disabled={isSubmiting}
          type="submit"
          className="text-white h-14 w-full"
        >
          {isSubmiting && <Loader2 className="animate-spin" />}
          Set profile
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfo;

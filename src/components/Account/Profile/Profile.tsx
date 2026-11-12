"use client";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Controller, useForm, useWatch } from "react-hook-form";
import UserFillIcon from "@iconify-react/ri/user-fill";
import LocationIcon from "@iconify-react/mi/location";
// import CouponFillIcon from "@iconify-react/mingcute/coupon-fill";
import { Country, State } from "country-state-city";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/actions/user/user.query";
import Image from "next/image";

const Profile = () => {
  const { data } = useQuery(getUserProfile);
  const accountType = data?.accountType;

  const form = useForm({
    defaultValues: {
      accountType: data?.accountType || "INDIVIDUAL",
      activities: data?.activities || [],
      fullName: data?.fullName || "",
      phoneNumber: data?.phoneNumber || "",
      location: data?.location || {
        country: "",
        state: "",
        city: undefined,
        formattedAddress: "",
        placeId: undefined,
        latitude: undefined,
        longitude: undefined,
        source: "MANUAL",
      },
    },
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
      : accountType === "BUSINESS"
        ? "Business Name"
        : "Organization Name";

  return (
    <div className="flex flex-col gap-10 flex-1">
      <div className="flex gap-2.25">
        <div className="size-16 rounded-full overflow-hidden border flex justify-center items-center">
          {data?.avatarUrl ? (
            <Image
              width={256}
              height={256}
              alt="profile img"
              src={data.avatarUrl}
              className="size-64 rounded-full object-contain"
            />
          ) : (
            <UserFillIcon className="size-10 text-brand-500" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Profile Picture</p>
          <div className="flex gap-3.5">
            <Button>Upload Image</Button>
            <Button variant="outline" className="border-black-100">
              Remove
            </Button>
          </div>
          <p className="text-black-400 text-s">
            We support PNGs, JPEGs under 10mb
          </p>
        </div>
      </div>
      <form className="flex flex-col gap-16">
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
                    // disabled={isSubmiting}
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
                  //   disabled={isSubmiting}
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
                    // disabled={isSubmiting}
                  >
                    <ComboboxInput
                      aria-invalid={fieldState.invalid}
                      //   disabled={isSubmiting}
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
                    disabled={
                      !selectedCountryCode
                      // || isSubmiting
                    }
                  >
                    <ComboboxInput
                      aria-invalid={fieldState.invalid}
                      disabled={
                        !selectedCountryCode
                        // || isSubmiting
                      }
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
                    // disabled={isSubmiting}
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
        </div>
        <div className="flex justify-center gap-10">
          <Button variant="outline" className="h-14 max-w-67.75 flex-1">
            Cancel
          </Button>
          <Button className="h-14 max-w-67.75 flex-1">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

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
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import UserFillIcon from "@iconify-react/ri/user-fill";
import LocationIcon from "@iconify-react/mi/location";
import CouponFillIcon from "@iconify-react/mingcute/coupon-fill";
import { useRouter } from "next/navigation";
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

const PersonalInfo = ({ accountType }: { accountType: AccountType }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PersonInfoSchema>>({
    resolver: zodResolver(PersonInfoSchema),
    defaultValues: {
      name: "",
      phone: "",
      country: "",
      state: "",
      address: "",
      referralCode: "",
    },
  });
  const handleSetProfile = () => {
    router.push("/home");
  };

  const countryList = Country.getAllCountries().map((country) => country.name);
  const selectedCountry = useWatch({ control: form.control, name: "country" });
  const countryCode = Country.getAllCountries().find(
    (item) => item.name === selectedCountry,
  )?.isoCode;
  const statesOfSelectedCountryList = State.getStatesOfCountry(countryCode).map(
    (item) => item.name,
  );

  return (
    <form className="flex flex-col gap-6 md:gap-8 w-full">
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
          <div className="flex gap-6 w-full flex-col md:flex-row">
            <Controller
              control={form.control}
              name="country"
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
                    onValueChange={field.onChange}
                    items={countryList}
                  >
                    <ComboboxInput
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
              name="state"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    State
                  </FieldLabel>
                  <Combobox
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    onValueChange={field.onChange}
                    items={statesOfSelectedCountryList}
                  >
                    <ComboboxInput
                      placeholder="Select state"
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
            name="address"
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

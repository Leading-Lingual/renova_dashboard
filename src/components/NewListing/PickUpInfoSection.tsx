import { listingFormValues } from "@/types/listing.types";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import PhoneNumberInput from "../PhoneNumberInput";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Country, State } from "country-state-city";
import LocationIcon from "@iconify-react/mi/location";

const PickUpInfoSection = ({
  form,
  isSubmitting,
}: {
  form: UseFormReturn<listingFormValues>;
  isSubmitting: boolean;
}) => {
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

  return (
    <div className="flex w-full flex-col gap-10">
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
              disabled={isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                disabled={isSubmitting}
              >
                <ComboboxInput
                  aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                onValueChange={(value) => field.onChange(value ? value : "")}
                items={statesOfSelectedCountry.map((state) => state.name)}
                disabled={!selectedCountryCode || isSubmitting}
              >
                <ComboboxInput
                  aria-invalid={fieldState.invalid}
                  disabled={!selectedCountryCode || isSubmitting}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                disabled={isSubmitting}
              />
            </InputGroup>
            {/* <FieldLabel className="flex gap-2 text-brand-400 items-center">
                      <div className="rounded-full border border-brand-400 flex size-5">
                        <LocationIcon className="size-2.5 m-auto" />
                      </div>
                      <p className="text-s font-medium">Use current location</p>
                    </FieldLabel> */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default PickUpInfoSection;

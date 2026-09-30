import { Controller, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Country } from "country-state-city";
import flags from "react-phone-number-input/flags";

import { listingFormValues } from "@/types/listing.types";
import Heading from "../Heading";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const PricingSection = ({
  form,
  isSubmitting,
}: {
  form: UseFormReturn<listingFormValues>;
  isSubmitting: boolean;
}) => {
  const [selectedCountry, setSelectedCountry] = useState("NG");

  const countryList = Country.getAllCountries();

  const selectedCountryData = countryList.find(
    (country) => country.isoCode === selectedCountry,
  );

  const SelectedFlag = flags[selectedCountry as keyof typeof flags];

  return (
    <div className="flex flex-col gap-2">
      <Heading
        containerClass="hidden md:flex"
        title="Set Price"
        subtitle="Add your price per KG, ensure it is within the market range."
      />

      <div className="flex gap-3">
        <Controller
          control={form.control}
          name="currency"
          render={({ field, fieldState }) => (
            <Field className="w-fit" data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-m-medium text-brand-800"
              >
                Currency
              </FieldLabel>

              <Select
                value={selectedCountry}
                onValueChange={(countryCode) => {
                  const country = countryList.find(
                    (item) => item.isoCode === countryCode,
                  );

                  if (!country?.currency) return;

                  setSelectedCountry(countryCode ?? "");
                  field.onChange(country.currency);
                }}
              >
                <SelectTrigger
                  id={field.name}
                  showIcon={false}
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                  className="pointer-events-none h-11.25! w-full shrink-0 rounded-[12px] border-black-200! px-3"
                >
                  <div className="flex w-full items-center gap-2">
                    {SelectedFlag && (
                      <SelectedFlag title={selectedCountryData?.name ?? ""} />
                    )}

                    <span className="text-m-medium font-normal text-black-300">
                      {selectedCountryData?.currency}
                    </span>
                  </div>
                </SelectTrigger>

                <SelectContent>
                  {countryList.map((item) => {
                    const CountryFlag =
                      flags[item.isoCode as keyof typeof flags];

                    return (
                      <SelectItem key={item.isoCode} value={item.isoCode}>
                        <div className="flex items-center gap-3">
                          {CountryFlag && <CountryFlag title={item.name} />}

                          <span>{item.currency}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="pricePerKg"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-m-medium text-brand-800"
              >
                Amount
              </FieldLabel>

              <Input
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={
                  field.value === undefined || field.value === null
                    ? ""
                    : field.value.toLocaleString("en-NG")
                }
                onChange={(event) => {
                  const value = event.target.value.replace(/,/g, "");

                  if (value === "") {
                    field.onChange(undefined);
                    return;
                  }

                  if (!/^\d*\.?\d*$/.test(value)) return;

                  field.onChange(Number(value));
                }}
                className="h-11.25! w-full shrink-0 rounded-[12px] border-black-200! px-3"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* <div className="flex flex-col gap-2 rounded-[8px] bg-black-50/38 px-4 py-2 text-black-500">
        <p className="text-m-medium">Suggested price range</p>
        <p className="text-s">0.00 - 0.00 per unit</p>
      </div> */}
    </div>
  );
};

export default PricingSection;

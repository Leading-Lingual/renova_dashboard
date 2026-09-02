"use client";

import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import PhoneFilledIcon from "@iconify-react/ant-design/phone-filled";
import { cn } from "@/lib/utils";
import type { Country } from "react-phone-number-input";
import { forwardRef, useEffect, useState } from "react";
import { Field, FieldLabel } from "./ui/field";

type CountryCode = Country;

interface PhoneNumberInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "value" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  defaultCountry?: CountryCode;
  invalid?: boolean;
  placeholder?: string;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      value = "",
      onChange,
      onBlur,
      defaultCountry = "NG",
      invalid,
      className,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [country, setCountry] = useState<CountryCode>(defaultCountry);

    const [phone, setPhone] = useState("");

    const countryCallingCode = getCountryCallingCode(country);

    // Convert the form value back into the phone input value
    useEffect(() => {
      if (!value) {
        setPhone("");
        return;
      }

      const prefix = `+${countryCallingCode}`;

      if (value.startsWith(prefix)) {
        setPhone(value.slice(prefix.length));
      }
    }, [value, countryCallingCode]);

    const handleCountryChange = (newCountry: CountryCode | null) => {
      if (!newCountry) return;
      setCountry(newCountry);

      // Only return a value when we have both country and phone
      if (phone) {
        const newCallingCode = getCountryCallingCode(newCountry);

        onChange?.(`+${newCallingCode}${phone}`);
      } else {
        onChange?.("");
      }
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPhone = event.target.value.replace(/\D/g, "");

      setPhone(newPhone);

      // Only return a value when both exist
      if (country && newPhone) {
        onChange?.(`+${countryCallingCode}${newPhone}`);
      } else {
        onChange?.("");
      }
    };

    const Flag = flags[country as keyof typeof flags];

    return (
      <div className={cn("flex gap-4", className)}>
        <Field
          className="w-30 "

          // data-invalid={fieldState.invalid}
        >
          <FieldLabel
            // htmlFor={field.name}
            className="text-m-medium text-brand-800"
          >
            Country{" "}
          </FieldLabel>

          {/* Country */}
          <Select value={country} onValueChange={handleCountryChange}>
            <SelectTrigger
              className="h-14! w-full shrink-0 rounded-[12px] px-3 border-black-200!"
              aria-invalid={invalid}
            >
              <div className="flex w-full items-center gap-2">
                {Flag && (
                  <Flag
                    title={country}
                    // className="h-6 w-8 shrink-0"
                  />
                )}

                <span className="text-m text-black-500">
                  +{countryCallingCode}
                </span>

              </div>
            </SelectTrigger>

            <SelectContent>
              {getCountries().map((item) => {
                const CountryFlag = flags[item as keyof typeof flags];

                const callingCode = getCountryCallingCode(item);

                return (
                  <SelectItem key={item} value={item}>
                    <div className="flex items-center gap-3">
                      {CountryFlag && (
                        <CountryFlag
                          title={item}
                          // className="h-5 w-7"
                        />
                      )}

                      <span>
                        {item} +{callingCode}
                      </span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>

        {/* Phone Number */}
        <Field
        // data-invalid={fieldState.invalid}
        >
          <FieldLabel
            // htmlFor={}
            className="text-m-medium text-brand-800"
          >
            Phone Number
          </FieldLabel>
          <InputGroup className="h-14 min-w-0 flex-1" data-invalid={invalid}>
            <InputGroupAddon>
              <PhoneFilledIcon className="size-6 rotate-90" />
            </InputGroupAddon>

            <InputGroupInput
              {...props}
              ref={ref}
              value={phone}
              onChange={handlePhoneChange}
              onBlur={onBlur}
              type="tel"
              inputMode="numeric"
              placeholder={placeholder ?? "9012356781"}
            />
          </InputGroup>
        </Field>
      </div>
    );
  },
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;

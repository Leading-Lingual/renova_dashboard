import { Controller, UseFormReturn } from "react-hook-form";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Field, FieldError } from "../ui/field";
import { listingFormValues } from "@/types/listing.types";

const PickupSection = ({
  form,
  isSubmitting,
}: {
  form: UseFormReturn<listingFormValues>;
  isSubmitting: boolean;
}) => {
  const options = [
    {
      key: "COLLECTOR_PICKUP",
      text: "Renova/Collector Pickup",
      subtext: "A collector will pick up the material from my location.",
    },
    {
      key: "RENOVA_DROPOFF",
      text: "Drop off at a Renova center",
      subtext: "I'll take the material to a Renova collection center.",
    },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      <Controller
        control={form.control}
        name="pickupPreference"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
              disabled={isSubmitting}
            >
              {options.map((item) => (
                <div
                  key={item.key}
                  className="flex w-full items-center gap-2.5 md:gap-3 rounded-[8px] border border-black-50 p-2.5"
                >
                  <RadioGroupItem
                    value={item.key}
                    id={item.key}
                    className="border-4 size-6"
                  />

                  <Label htmlFor={item.key} className="flex flex-col gap-1 items-start">
                    <span className="text-s font-bold">{item.text}</span>
                    <span className="text-s md:text-sm">{item.subtext}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default PickupSection;

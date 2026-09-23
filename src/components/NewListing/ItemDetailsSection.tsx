import { Controller, UseFormReturn } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import SearchCategoryIcon from "@iconify-react/streamline-flex/search-category-remix";
import ScaleIcon from "@iconify-react/material-symbols/scale-outline";
import { listingFormValues } from "@/types/listing.types";
import Heading from "../Heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import ImageUpload from "../ImageUpload";

const ItemDetailsSection = ({
  form,
  isSubmitting,
}: {
  form: UseFormReturn<listingFormValues>;
  isSubmitting: boolean;
}) => {
  const items = [
    { label: "Plastic PET", value: "PLASTIC_PET" },
    { label: "plastic HDPE", value: "PLASTIC_HDPE" },
    { label: "Iron", value: "IRON" },
    { label: "Aluminium", value: "ALUMINIUM" },
    { label: "Copper", value: "COPPER" },
    { label: "E waste", value: "E_WASTE" },
    { label: "Glass", value: "GLASS" },
    { label: "Paper", value: "PAPER" },
  ];

  const units = [
    { label: "Kilogram", value: "KG" },
    { label: "Ton", value: "TON" },
    { label: "Piece", value: "PIECE" },
  ];

  return (
    <div className="flex flex-col gap-2 lg:gap-8">
      <div className="flex gap-12">
        <Controller
          control={form.control}
          name="materialType"
          render={({ field, fieldState }) => (
            <Field className="flex-1" data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-m-medium text-brand-800"
              >
                Waste Category
              </FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id={field.name}
                  showIcon={false}
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                  className="h-14! w-full border-black-200! border-[0.5px]"
                >
                  <SearchCategoryIcon className="size-4 md:size-6" />

                  <p className="flex-1 text-start">
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : "-- Select category --"}
                  </p>

                  <ChevronRight className="size-4 shrink-0 md:size-6" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex gap-2 flex-1">
          <Controller
            control={form.control}
            name="unit"
            render={({ field, fieldState }) => (
              <Field
                className="w-full max-w-19.75"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                  Unit
                </FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    showIcon={false}
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    className="h-14! pointer-events-none w-full border-black-200! border-[0.5px] px-3 "
                  >
                    <ScaleIcon className="size-4 shrink-0 md:size-5" />

                    <span className="flex-1 truncate text-start">
                      {field.value ? field.value : "Unit"}
                    </span>
                  </SelectTrigger>

                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="quantityKg"
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-m-medium text-brand-800"
                >
                  Quantity
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="Enter amount"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  className="h-14! w-full border-black-200! border-[0.5px] px-3 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      <Controller
        control={form.control}
        name="images"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {field.value.length === 0 && (
              <Heading title="Image" subtitle="Add the waste material image" />
            )}
            <ImageUpload
              error={fieldState.invalid}
              onChange={field.onChange}
              value={field.value}
              multiple={false}
              disabled={isSubmitting}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default ItemDetailsSection;

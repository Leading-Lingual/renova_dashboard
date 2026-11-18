"use client";

import Heading from "@/components/Heading";
import PickUpInfoSection from "@/components/NewListing/PickUpInfoSection";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { addressFormValues } from "@/types/checkout.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
// import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

type AddressVerificationFormValues = addressFormValues & {
  documentType: string;
  documentImage: File[];
};

const VerifyAddress = () => {
  const router = useRouter();
  const form = useForm<AddressVerificationFormValues>({
    // resolver: zodResolver(AddressSchema),
    defaultValues: {
      phoneNumber: "",
      location: {
        country: "",
        state: "",
        formattedAddress: "",
      },
      documentType: "",
      documentImage: [],
    },
  });

  const documentType = useWatch({
    control: form.control,
    name: "documentType",
  });
  const documentImages = useWatch({
    control: form.control,
    name: "documentImage",
  });
  const selectedImage = documentImages[0];
  const imagePreviewUrl = useMemo(
    () => (selectedImage ? URL.createObjectURL(selectedImage) : undefined),
    [selectedImage],
  );

  useEffect(
    () => () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    },
    [imagePreviewUrl],
  );

  const documentTypes = ["Rental/Lease Agreement", "Bank Statement"];

  const onSubmit = (values: AddressVerificationFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-auto px-6 py-6 md:px-8">
      <ArrowLeft
        aria-label="Go back"
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />

      <div className="flex w-full flex-col gap-8">
        <Heading title="Verify address" titleClassName="text-xl" />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <PickUpInfoSection
            isSmall
            control={form.control}
            resetField={form.resetField}
            names={{
              phoneNumber: "phoneNumber",
              country: "location.country",
              state: "location.state",
              address: "location.formattedAddress",
            }}
          />

          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="documentType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Which document would you like to use{" "}
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("documentImage", []);
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      showIcon={false}
                      aria-invalid={fieldState.invalid}
                      className="h-11.25! w-full border-black-200! border-[0.5px] md:h-14!"
                    >
                      <p className="flex-1 text-start">
                        {field.value || "-- Select document type --"}
                      </p>
                      <ChevronRight className="size-6 shrink-0 font-bold" />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {documentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {documentType && (
              <Controller
                control={form.control}
                name="documentImage"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="address-document"
                      className="text-m-medium text-brand-800"
                    >
                      Upload {documentType}
                    </FieldLabel>
                    <label
                      htmlFor="address-document"
                      className="relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-[0.5px] border-black-200 bg-white px-2 py-5 text-center"
                    >
                      {selectedImage && imagePreviewUrl ? (
                        <>
                          <Image
                            src={imagePreviewUrl}
                            alt={`Selected ${documentType}: ${selectedImage.name}`}
                            fill
                            unoptimized
                            className="absolute inset-0 h-full w-full object-cover opacity-20"
                          />
                          <span className="relative flex items-center gap-2">
                            <span className="max-w-full truncate text-sm font-medium text-brand-800">
                              {selectedImage.name}
                            </span>
                            <button
                              type="button"
                              aria-label="Remove document image"
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                field.onChange([]);
                              }}
                              className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2 text-xs font-medium text-brand-800 shadow-sm"
                            >
                              <X />
                              Remove image
                            </button>
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-black-500">
                          Click to upload
                        </span>
                      )}
                      <Input
                        id="address-document"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onChange={(event) => {
                          field.onChange(
                            Array.from(event.currentTarget.files ?? []),
                          );
                          event.currentTarget.value = "";
                        }}
                        accept="image/*"
                        type="file"
                        aria-invalid={fieldState.invalid}
                        className="sr-only"
                      />
                    </label>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </div>

          <Button type="submit" className="h-14 w-full">
            Verify Address
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAddress;

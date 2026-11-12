"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const VerifyIdentity = () => {
  const router = useRouter();
  const form = useForm<{ documentType: string; documentImage: File[] }>({
    defaultValues: {
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

  const items = [
    { label: "International Passport", value: "International Passport" },
    { label: "Voter's Card", value: "Voter's Card" },
    { label: "Driver's License", value: "Driver's License" },
  ];
  return (
    <div className="flex h-full w-full flex-col  overflow-auto px-6 py-6 gap-2 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-3.75">
        <Heading title="Verify identity" />
        <form
          //   onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="documentType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Document
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
                      //   disabled={isPending}
                      className="h-11.25! md:h-14! w-full border-black-200! border-[0.5px]"
                    >
                      <p className="flex-1 text-start">
                        {field.value
                          ? items.find((item) => item.value === field.value)
                              ?.label
                          : "-- Select a Category --"}
                      </p>

                      <ChevronRight className="font-bold shrink-0 size-6" />
                    </SelectTrigger>

                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
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
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <FieldLabel
                      htmlFor="screenshot"
                      className="text-m-medium text-brand-800"
                    >
                      Upload {documentType}
                    </FieldLabel>
                    <label
                      htmlFor="screenshot"
                      className="relative flex  w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-[0.5px] border-black-200 bg-white px-2 py-5 text-center"
                    >
                      {selectedImage && imagePreviewUrl ? (
                        <>
                          <Image
                            src={imagePreviewUrl}
                            alt={`Selected document image: ${selectedImage.name}`}
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
                              aria-label="Remove screenshot"
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
                        <span className="flex flex-col items-center gap-2 text-sm text-black-500">
                          <span>Click to upload</span>
                        </span>
                      )}
                      <Input
                        id="screenshot"
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
                        //   disabled={isPending}
                      />
                    </label>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            <Field className="flex-1 ">
              <FieldLabel
                htmlFor={"check"}
                className="text-m-medium text-brand-800"
              >
                Document
              </FieldLabel>
              <div className="w-full h-11! md:h-14! flex justify-center items-center text-sm border rounded-lg border-black-200">
                <p className="">Click to begin the liveness check</p> </div>
            </Field>
          </div>
          <Button
            type="submit"
            // disabled={isPending}
            className="h-14 w-full max-w-145 m-auto mb-8"
          >
            {/* {isPending && <Loader2 className="animate-spin" />}  */}
            Verify Identity
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyIdentity;

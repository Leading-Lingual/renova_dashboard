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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const NewSupportTicketPage = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      category: "",
      subject: "",
      image: null as File | null,
      message: "",
    },
  });

  const items = [
    { label: "Payment", value: "000" },
    { label: "Pickup & delivery", value: "111" },
    { label: "Safety & Security", value: "222" },
  ];

  return (
    <div className="flex h-full w-full flex-col  overflow-auto px-6 py-6 gap-2 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-3.75">
        <Heading title="Open a Support Ticket" />
        <form className="flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Issue Category
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      showIcon={false}
                      aria-invalid={fieldState.invalid}
                      // disabled={isSubmitting}
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

            <Controller
              control={form.control}
              name="subject"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Subect
                  </FieldLabel>
                  <Input
                    placeholder="Subject "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    // disabled={isSubmitting}
                    type="text"
                    className="h-11.25! md:h-14! w-full border-black-200! border-[0.5px]"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel
                    htmlFor="screenshot"
                    className="text-m-medium text-brand-800"
                  >
                    Screenshot
                  </FieldLabel>
                  <label
                    htmlFor="screenshot"
                    className="relative flex  w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-[0.5px] border-black-200 bg-white px-2 py-5 text-center"
                  >
                    {field.value ? (
                      <>
                        <Image
                          src={URL.createObjectURL(field.value)}
                          alt={`Selected screenshot: ${field.value.name}`}
                          fill
                          unoptimized
                          className="absolute inset-0 h-full w-full object-cover opacity-20"
                        />
                        <span className="relative flex items-center gap-2">
                          <span className="max-w-full truncate text-sm font-medium text-brand-800">
                            {field.value.name}
                          </span>
                          <button
                            type="button"
                            aria-label="Remove screenshot"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              field.onChange(null);
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
                        <span>Attach a screenshot</span>
                      </span>
                    )}
                    <Input
                      id="screenshot"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={(event) =>
                        field.onChange(event.target.files?.[0] ?? null)
                      }
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
            <Controller
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1 ">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Message
                  </FieldLabel>
                  <Textarea
                    placeholder="How can we help?"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    // disabled={isSubmitting}
                    className="w-full resize-none border-black-200! border-[0.5px]"
                    rows={5}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Button className="h-14 w-full max-w-145 m-auto mb-8">Create a Ticket</Button>
        </form>
      </div>
    </div>
  );
};

export default NewSupportTicketPage;

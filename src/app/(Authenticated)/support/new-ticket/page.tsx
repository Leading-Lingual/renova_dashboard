"use client";
import { CreateSupportTicketMutation } from "@/actions/support/support.mutation";
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
import { CreateTicketDataType } from "@/types/support.types";
import { CreateTicketSchema } from "@/validations/support.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ChevronRight, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const NewSupportTicketPage = () => {
  const router = useRouter();

  const { mutate: CreateNewTicket, isPending } = useMutation(
    CreateSupportTicketMutation,
  );
  const form = useForm({
    resolver: zodResolver(CreateTicketSchema),
    defaultValues: {
      category: "",
      subject: "",
      screenshots: [],
      message: "",
    },
  });

  const items = [
    { label: "Account & profile", value: "ACCOUNT_PROFILE" },
    { label: "Payment", value: "PAYMENTS" },
    { label: "Pickup & delivery", value: "PICKUP_DELIVERY" },
    { label: "Safety & Security", value: "SAFETY_SECURITY" },
  ];

  const onSubmit = (data: CreateTicketDataType) => {
    CreateNewTicket(data, {
      onSuccess: () => {
        toast.success("New ticket created!");
        router.push("/support");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create new ticket");
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col  overflow-auto px-6 py-6 gap-2 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-3.75">
        <Heading title="Open a Support Ticket" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
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
                      disabled={isPending}
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
                    disabled={isPending}
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
              name="screenshots"
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
                    {field.value?.[0] ? (
                      <>
                        <Image
                          src={URL.createObjectURL(field.value[0])}
                          alt={`Selected screenshot: ${field.value[0].name}`}
                          fill
                          unoptimized
                          className="absolute inset-0 h-full w-full object-cover opacity-20"
                        />
                        <span className="relative flex items-center gap-2">
                          <span className="max-w-full truncate text-sm font-medium text-brand-800">
                            {field.value[0].name}
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
                        <span>Attach a screenshot</span>
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
                      disabled={isPending}
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
                    disabled={isPending}
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
          <Button
            type="submit"
            disabled={isPending}
            className="h-14 w-full max-w-145 m-auto mb-8"
          >
            {isPending && <Loader2 className="animate-spin" />} Create a Ticket
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewSupportTicketPage;

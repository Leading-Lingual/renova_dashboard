"use client";
import { ReplyTicketMutation } from "@/actions/support/support.mutation";
import { getTicketDetailQuery } from "@/actions/support/support.query";
import Heading from "@/components/Heading";
import Pill from "@/components/Pill";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { formatText } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const TicketDetailContent = ({ ticketId }: { ticketId: string }) => {
  const { data, isPending } = useQuery(getTicketDetailQuery(ticketId));
  const { mutate: repyTicket, isPending: isSubmitting } =
    useMutation(ReplyTicketMutation);

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const router = useRouter();
  const details = [
    {
      title: "Category",
      detail: formatText(data?.category ?? ""),
    },
    {
      title: "Description",
      detail: data?.description,
    },
    ...[
      data && data?.attachments.length > 0
        ? {
            title: "Attachments",
            detail: (
              <Pill variant="grey" className="border bg-transparent">
                Proof.png
              </Pill>
            ),
          }
        : {},
    ],
    {
      title: "Created on",
      detail: dayjs(data?.createdAt).format("DD MMM, HH:mm A"),
    }
  ];

  const messages = data?.messages ?? [];

  const onSubmit = (data: { ticketId: string; body: { message: string } }) => {
    repyTicket(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to send reply");
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col  overflow-auto px-6 py-6 gap-2 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      {isPending ?<Loader2 className="animate-spin m-auto"/>:<div className="flex flex-col gap-3.75">
        <Heading title={data?.subject ?? ""} subtitle={data?.ticketNumber} />
        <div className="flex flex-col gap-6">
          <SectionCard
            title="Ticket Detail"
            subtitle="Details concerning this ticket"
            useAccordion={false}
          >
            <div className="flex flex-col gap-2 w-full ">
              {details.map((detail) => (
                <div
                  key={detail.title}
                  className="grid grid-cols-2 items-center text-sm"
                >
                  <p className="text-ink">{detail.title}</p>
                  {typeof detail.detail === "string" ? (
                    <p className="font-medium">{detail.detail}</p>
                  ) : (
                    detail.detail
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard
            title="Conversations"
            subtitle="Details concerning this ticket"
            useAccordion={false}
          >
            <div className="flex flex-col gap-2 w-full">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-bold">
                        {message.authorRole === "USER"
                          ? "me"
                          : "Renova Support"}
                      </p>
                      <p className="text-s">
                        {dayjs(message.createdAt).format("DD MMM, HH:mm A")}
                      </p>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <hr className="my-0.5" />
                </div>
              ))}
              <form
                onSubmit={form.handleSubmit((values) =>
                  onSubmit({ ticketId, body: values }),
                )}
                className="flex flex-col gap-2"
              >
                <Controller
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="flex-1 "
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-bold"
                      >
                        Reply
                      </FieldLabel>
                      <Textarea
                        placeholder="Your response"
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        disabled={isSubmitting}
                        className="w-full resize-none border-black-200! border-[0.5px]"
                        rows={5}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11.25 w-fit"
                >
                  {isSubmitting && <Loader2 className="animate-spin" />} Send
                  reply
                </Button>
              </form>
            </div>
          </SectionCard>
        </div>
      </div>}
    </div>
  );
};

export default TicketDetailContent;

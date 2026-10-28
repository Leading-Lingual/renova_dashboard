"use client";
import Heading from "@/components/Heading";
import Pill from "@/components/Pill";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const TicketDetailContent = ({ ticketId }: { ticketId: string }) => {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const router = useRouter();
  const details = [
    {
      title: "Category",
      detail: "Payments",
    },
    {
      title: "Description",
      detail:
        "My ₦21,000 earning for CJ-10479 is still pending, it’s over 2 weeks, despite after the delivery was verified.",
    },
    {
      title: "Attachments",
      detail: (
        <Pill variant="grey" className="border bg-transparent">
          Proof.png
        </Pill>
      ),
    },
  ];

  const messages = [
    {
      id: "mmm8u",
      from: "Renova Support",
      date: "2020-04-02T08:02:17-05:00",
      message:
        "Thanks for reporting this. We are checking the settlement for CJ-10479 and will update you here.",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col  overflow-auto px-6 py-6 gap-2 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col gap-3.75">
        <Heading
          title="Earning still pending for CJ-10479"
          subtitle="TKT-48102"
        />
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
                      <p className="text-sm font-bold">{message.from}</p>
                      <p className="text-s">
                        {dayjs(message.date).format("DD MMM, HH:mm A")}
                      </p>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <hr className="my-0.5" />
                </div>
              ))}
              <form className="flex flex-col gap-2">
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
                <Button className="h-11.25 w-fit">Send reply</Button>
              </form>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailContent;

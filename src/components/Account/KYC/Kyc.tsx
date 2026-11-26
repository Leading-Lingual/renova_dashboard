"use client";

import { getKycDetails, getUserProfile } from "@/actions/user/user.query";
import { submitKycMutation } from "@/actions/user/user.mutation";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { kycSubmissionSchema } from "@/validations/kyc.validation";
import { KycSubmissionFormValues } from "@/types/kyc.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { formatText } from "@/lib/utils";
// import Pill from "@/components/Pill";
// import { useRouter } from "next/navigation";

const Kyc = () => {
  // const router = useRouter();
  const { data: profile, isPending: isProfilePending } = useQuery(getUserProfile);
  const { data: kyc, isPending: isKycPending } = useQuery(getKycDetails);
  const { mutate: submitKyc, isPending: isSubmitting } = useMutation(submitKycMutation);
  const isIndividual = profile?.accountType === "INDIVIDUAL";
  const isBusinessAccount =
    profile?.accountType === "BUSINESS" || profile?.accountType === "NGO";
  const form = useForm<KycSubmissionFormValues>({
    resolver: zodResolver(kycSubmissionSchema),
    defaultValues: { nin: "", rcNumber: "", companyName: "" },
  });

  const handleSubmit = (values: KycSubmissionFormValues) => {
    if (!profile) return;

    const payload = isIndividual
      ? { nin: values.nin.trim() }
      : {
          rcNumber: values.rcNumber.trim(),
          companyName: values.companyName.trim(),
        };

    submitKyc(
      { payload, idempotencyKey: crypto.randomUUID() },
      {
        onSuccess: () => toast.success("KYC verification submitted"),
        onError: (error) => toast.error(error.message || "Failed to submit KYC"),
      },
    );
  };

  const isPending = isProfilePending || isKycPending || isSubmitting;

  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Complete KYC"
        subtitle="Keep your account safe by completing these checks"
      />
      {/* <div className="flex flex-col gap-6">
        <div
          onClick={() => router.push("/account/verify-identity")}
          className="flex px-4 items-center justify-between border rounded-[8px] gap-1 py-3 cursor-pointer"
        >
          <Heading
            title="Verify your Identity"
            subtitle="Identity verification is a must"
            containerClass="w-fit!"
          />
          <Pill variant="grey">Not started</Pill>
          <ChevronRight />
        </div>
        <div
          onClick={() => router.push("/account/verify-address")}
          className="flex px-4 items-center justify-between border rounded-[8px] gap-1 py-3 cursor-pointer"
        >
          <Heading
            title="Verify your Address"
            subtitle="Address verification is a must"
            containerClass="w-fit!"
          />
          <Pill variant="grey">Not started</Pill>
          <ChevronRight />
        </div>
      </div> */}

      {kyc && (
        <div className="rounded-md border p-4 text-sm" aria-live="polite">
          <p>
            Verification status: <strong>{formatText(kyc.status)}</strong>
          </p>
          {kyc.identifierLast4 && (
            <p className="mt-1">Submitted ID ending in {kyc.identifierLast4}</p>
          )}
          {kyc.verifiedName && <p className="mt-1">Verified name: {kyc.verifiedName}</p>}
          {kyc.status === "FAILED" && (
            <p className="mt-1">Attempts remaining: {kyc.attemptsRemaining}</p>
          )}
        </div>
      )}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          {isIndividual && (
            <Controller
              control={form.control}
              name="nin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-m-medium text-brand-800">
                    NIN
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    className="h-11.25! md:h-14!"
                    placeholder="Enter your NIN"
                    disabled={isPending || kyc?.status === "VERIFIED"}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          )}
          {isBusinessAccount && (
            <>
              <Controller
                control={form.control}
                name="companyName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-m-medium text-brand-800">
                      Company / Organization Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      className="h-11.25! md:h-14!"
                      placeholder="Enter your company or organization name"
                      disabled={isPending || kyc?.status === "VERIFIED"}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="rcNumber"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-m-medium text-brand-800">
                      Registration Certificate Number (RC)
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      className="h-11.25! md:h-14!"
                      placeholder="Enter your RC number"
                      disabled={isPending || kyc?.status === "VERIFIED"}
                    />
                    <p className="text-sm text-muted-foreground">
                      You can find a Nigerian company&apos;s Registration Certificate (RC) number{" "}
                      <strong>
                        on its official Corporate Affairs Commission (CAC) documents or by
                        searching the{" "}
                      </strong>
                      <a
                        href="https://icrp.cac.gov.ng/public-search/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold underline"
                      >
                        CAC Public Search
                      </a>
                      <strong> portal</strong>.
                    </p>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </>
          )}
        </div>
        <Button
          type="submit"
          disabled={
            isPending ||
            !profile ||
            (!isIndividual && !isBusinessAccount) ||
            kyc?.status === "VERIFIED"
          }
          className="h-14 w-full max-w-145 m-auto mb-8"
        >
          {isSubmitting ? "Submitting..." : "Verify Identity"}
        </Button>
      </form>
    </div>
  );
};

export default Kyc;

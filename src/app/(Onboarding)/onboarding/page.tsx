"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { OnbaordingStages } from "./onboardingEnum";
import AccountSetup from "../AccountSetup";
import PersonalInfo from "../PersonalInfo";
import { onboardingSchema } from "@/validations/onboarding.validation";
import { OnboardingFormValues } from "@/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { completeOnboardingMutation } from "@/actions/user/user.mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getUserProfile } from "@/actions/user/user.query";

const { INITIAL, PERSONAL_INFO } = OnbaordingStages;
const OnboardingPage = () => {
  const [stage, setStage] = useState<OnbaordingStages>(INITIAL);
  const { mutate: completeOnboarding, isPending } = useMutation(
    completeOnboardingMutation,
  );
  const router = useRouter();
  const { data } = useQuery(getUserProfile);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      accountType: data?.accountType || "INDIVIDUAL",
      activities: [],
      fullName: data?.fullName || "",
      phoneNumber: "",
      location: {
        country: "",
        state: "",
        city: undefined,
        formattedAddress: "",
        placeId: undefined,
        latitude: undefined,
        longitude: undefined,
        source: "MANUAL",
      },
      referralCode: "",
    },
    mode: "onSubmit",
  });

  const handleAccountSetupContinue = async () => {
    const isValid = await form.trigger(["accountType", "activities"]);

    if (!isValid) {
      return;
    }

    setStage(PERSONAL_INFO);
  };

  const handleBack = () => {
    setStage(INITIAL);
  };

  const handleSubmit = (data: OnboardingFormValues) => {
    console.log("Complete onboarding payload:", data);
    completeOnboarding(data, {
      onSuccess: () => {
        toast.success("onboarding completed");
        router.push("/home");
      },
      onError: (error) => {
        toast.error(error.message ? error.message : "onboarding completed");
      },
    });
  };

  return (
    <div className="max-w-178.5 mx-auto flex bg-white md:rounded-2xl md:pt-12 md:px-18.75 md:py-[92.5px] w-full flex-col gap-4 md:gap-24 h-full overflow-auto no-scrollbar">
      {stage === PERSONAL_INFO && (
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2"
          disabled={isPending}
        >
          <ArrowLeft />
          <span className="hidden md:block">Back</span>
        </button>
      )}

      {stage === INITIAL && (
        <AccountSetup form={form} onContinue={handleAccountSetupContinue} />
      )}

      {stage === PERSONAL_INFO && (
        <PersonalInfo
          form={form}
          onSubmit={handleSubmit}
          isSubmiting={isPending}
        />
      )}
    </div>
  );
};

export default OnboardingPage;

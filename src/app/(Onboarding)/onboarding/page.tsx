"use client";
import { useState } from "react";
import { OnbaordingStages } from "./onboardingEnum";
import AccountSetup from "../AccountSetup";
import PersonalInfo from "../PersonalInfo";
import { ArrowLeft } from "lucide-react";
import { AccountType } from "@/types/onboarding.type";

const { INITIAL, PERSONAL_INFO } = OnbaordingStages;
const OnboardingPage = () => {
  const [stage, setStage] = useState<OnbaordingStages>(INITIAL);
  const [accountType, setAccountType] = useState<AccountType>("individual");

  const renderStage = () => {
    switch (stage) {
      case INITIAL:
        return (
          <AccountSetup
            onContinue={(account) => {
              setAccountType(account);
              setStage(PERSONAL_INFO);
            }}
          />
        );
      case PERSONAL_INFO:
        return <PersonalInfo accountType={accountType} />;
      default:
        break;
    }
  };

  return (
    <div className="max-w-178.5 mx-auto flex bg-white md:rounded-2xl md:pt-12 md:px-18.75 md:py-[92.5px]  w-full  flex-col gap-4 md:gap-24 h-full overflow-auto no-scrollbar">
      {stage === PERSONAL_INFO && (
        <div className="flex" onClick={() => setStage(INITIAL)}>
          <ArrowLeft />
          <p className="hidden md:block">Back </p>
        </div>
      )}
      {renderStage()}
    </div>
  );
};

export default OnboardingPage;

import { onboardingSchema } from "@/validations/onboarding.validation";
import * as z from "zod"
export type AccountType = "INDIVIDUAL" | "AGENT" | "NGO";

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export interface UserAuth {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  isProfileComplete: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  accountType: AccountType;
  activities?: [];
  fullName?: string;
  phoneNumber?: string;
  location: {
    country?: string;
    state?: string;
    city?: string;
    formattedAddress?: string;
    placeId?: string;
    latitude?: string;
    longitude?: string;
    source?: string;
  };
  referralCode?: string;
  avatarUrl?: string;
  status: "INCOMPLETE" | "COMPLETE";
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}
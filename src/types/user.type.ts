import { onboardingSchema } from "@/validations/onboarding.validation";
import * as z from "zod"
export type AccountType = "INDIVIDUAL" | "BUSINESS" | "NGO";

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export interface UserAuth {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  isProfileComplete: boolean;
}

export type Status =  "INCOMPLETE" | "COMPLETE"

export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  accountType: AccountType;
  activities?: string[];
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
  status:Status;
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}
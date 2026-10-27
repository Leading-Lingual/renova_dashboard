import { onboardingSchema } from "@/validations/onboarding.validation";
import * as z from "zod";
import { Listing, MaterialType } from "./listing.types";
export type AccountType = "INDIVIDUAL" | "BUSINESS" | "NGO";

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export interface UserAuth {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  isProfileComplete: boolean;
}

export type Status = "INCOMPLETE" | "COMPLETE";

export const ACTIVITIES = {
  SELL: "SELL",
  BUY: "BUY",
  // COLLECT: "COLLECT",
  PROCESS_RECYCLE: "PROCESS_RECYCLE",
  RUN_ENVIRONMENTAL_CAMPAIGNS: "RUN_ENVIRONMENTAL_CAMPAIGNS",
  ORGANIZE_COLLECTION_DRIVES: "ORGANIZE_COLLECTION_DRIVES",
  MANAGE_COMMUNITY_OUTREACH: "MANAGE_COMMUNITY_OUTREACH",
  PARTNER_WITH_RECYCLERS: "PARTNER_WITH_RECYCLERS",
} as const;

export type UserAppActivity = (typeof ACTIVITIES)[keyof typeof ACTIVITIES];

export interface Location {
  country?: string;
  state?: string;
  city?: string;
  formattedAddress?: string;
  placeId?: string;
  latitude?: string;
  longitude?: string;
  source?: string;
}
export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  accountType: AccountType;
  activities?: string[];
  fullName?: string;
  phoneNumber?: string;
  location: Location;
  referralCode?: string;
  avatarUrl?: string;
  status: Status;
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: "SCAN_CONFIRMED";
  entityId: string;
  title: string;
  materialType: MaterialType;
  quantityKg: string;
  amountNgn: string;
  pointsAwarded: number;
  imageUrl: string;
  createdAt: string;
}

export interface Dashboard {
  context: {
    accountType: AccountType;
    activities: string[];
    capabilities: {
      canListMaterials: boolean;
      canBrowseMarketplace: boolean;
      canBuy: boolean;
      canCollect: boolean;
      canProcessRecycle: boolean;
      canRunEnvironmentalCampaigns: boolean;
      canOrganizeCollectionDrives: boolean;
      canManageCommunityOutreach: boolean;
      canPartnerWithRecyclers: boolean;
    };
  };
  rewards: {
    balance: number;
    unit: "POINTS";
  };
  overview: {
    confirmedScans: number;
    listings: {
      all: number;
      draft: number;
      available: number;
      archived: number;
    };
    totalRecordedQuantityKg: string;
    totalEstimatedListingValue: string;
    quantityUnit: string;
    totalActivities: number;
    valueCurrency: string;
  };
  recentListings: Listing[];
  recentActivity: Activity[];
}

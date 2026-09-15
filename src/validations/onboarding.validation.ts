import { array, number, object, string } from "zod";

export const onboardingSchema = object({
  accountType: string().min(1,
   "Please select an account type",
  ),
  activities: array(string())
    .min(1, "Select at least one activity"),
  fullName: string().min(1, "Full name is required"),
  phoneNumber: string().min(1, "Phone number is required"),
  location: object({
    country: string().trim().min(1, "Country is required"),
    state: string().trim().min(1, "State is required"),
    city: string().optional(),
    formattedAddress: string().trim().min(1, "Address is required"),
    placeId: string().optional(),
    latitude: number().optional(),
    longitude: number().optional(),
    source: string(),
  }),

  referralCode: string().optional(),
});
import { array, number, object, string } from "zod";
import * as z from "zod";

export const locationSchema = object({
  country: string().trim().min(1, "Country is required"),
  state: string().trim().min(1, "State is required"),
  city: string().optional(),
  formattedAddress: string().trim().min(1, "Address is required"),
  placeId: string().optional(),
  latitude: number().optional(),
  longitude: number().optional(),
  source: string().optional(),
});

export const listingSchema = object({
  status: string(),
  materialType: string().min(1, "Please select a material type"),
  quantityKg: number("Please enter quantity")
    .nonnegative("Quantity must be a positive number")
    .min(0, "Please enter quantity"),
  pricePerKg: number("Please set price")
    .nonnegative("Price must be a positive number")
    .min(0, "Please set price"),
  pickupPreference: string()
    .trim()
    .min(1, "please select your preferred pickup preference"),
  scanId: string().optional(),
  images: array(z.instanceof(File))
    .max(3, "You can upload a maximum of 3 images")
    .min(1, "Please upload at least one image"),
  currency: string().min(1, "please select a currency"),
  unit: string().min(1, "Please select a unit"),

  phoneNumber: string().optional(),
  location: locationSchema.optional(),
}).superRefine((data, ctx) => {
  if (data.pickupPreference === "RENOVA_DROPOFF") {
    return;
  }

  if (!data.phoneNumber?.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["phoneNumber"],
      message: "Phone number is required",
    });
  }

  if (!data.location) {
    ctx.addIssue({
      code: "custom",
      path: ["location"],
      message: "Location is required",
    });
  }
});

import * as z from "zod";
import { locationSchema } from "@/validations/listing.validation";

export const AddressSchema = z.object({
  phoneNumber: z.string().trim().min(1, "Please enter your phone number"),
  location: locationSchema,
});

const deliveryLocationSchema = locationSchema.partial().extend({
  country: z.string().trim().min(1, "Country is required"),
  state: z.string().trim().min(1, "State is required"),
});

export const CheckoutSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("CART"),
    listingId: z.never().optional(),
    deliveryLocation: deliveryLocationSchema,
  }),
  z.object({
    mode: z.literal("BUY_NOW"),
    listingId: z.string().trim().min(1, "Select a listing to checkout"),
    deliveryLocation: deliveryLocationSchema,
  }),
]);

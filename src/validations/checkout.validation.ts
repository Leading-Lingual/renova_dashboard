import * as z from "zod";
import { locationSchema } from "@/validations/listing.validation";

export const AddressSchema = z.object({
  phoneNumber: z.string().trim().min(1, "Please enter your phone number"),
  location: locationSchema,
});

export const CheckoutSchema = z.object({
  listingIds: z
    .array(z.string().min(1))
    .min(1, "Add at least one listing to checkout"),
  phoneNumber: z.string().trim().min(1, "Please enter your phone number"),
  location: locationSchema,
});

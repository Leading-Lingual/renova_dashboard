import { AddressSchema, CheckoutSchema } from "@/validations/checkout.validation";
import z from "zod";

export type addressFormValues = z.infer<typeof AddressSchema>;
export type checkoutFormValues = z.infer<typeof CheckoutSchema>;

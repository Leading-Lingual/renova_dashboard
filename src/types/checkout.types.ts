import { AddressSchema, CheckoutSchema } from "@/validations/checkout.validation";
import z from "zod";

export type addressFormValues = z.infer<typeof AddressSchema>;
export type checkoutFormValues = z.infer<typeof CheckoutSchema>;

export type CheckoutRequest = z.infer<typeof CheckoutSchema>;

export interface CheckoutSummary {
  subtotal: string | number;
  serviceFee: string | number;
  logisticsFee: string | number;
  total: string | number;
  currency: string;
}

export interface CheckoutPreviewResponse {
  summary: CheckoutSummary;
}

export interface CheckoutResponse {
  purchaseId: string;
  purchaseNumber: string;
  summary: CheckoutSummary;
  payment: {
    reference: string;
    authorizationUrl: string;
    expiresAt: string;
  };
}

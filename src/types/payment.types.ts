import type { CheckoutResponse } from "./checkout.types";

export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED" | "EXPIRED" | "REVIEW";
export type PurchaseStatus = "PAID" | "AWAITING_PAYMENT" | "PAYMENT_FAILED" | "EXPIRED" | "REVIEW";

export interface PaymentVerificationResponse {
  purchaseId: string;
  paymentStatus: PaymentStatus;
  purchaseStatus: PurchaseStatus;
}

export type RetryPaymentResponse = Partial<CheckoutResponse> &
  Pick<CheckoutResponse, "payment">;

export type PurchaseResponse = Record<string, unknown>;
export type PaymentReceiptResponse = Record<string, unknown>;

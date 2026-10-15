import { CheckoutSchema } from "@/validations/checkout.validation";
import type { CheckoutRequest, CheckoutResponse } from "@/types/checkout.types";
import { z } from "zod";

const storageKey = "renova.checkout";
const sessionSchema = z.object({
  body: CheckoutSchema,
  idempotencyKey: z.uuid().optional(),
  checkout: z.object({
    purchaseId: z.string().min(1),
    purchaseNumber: z.string().optional(),
    reference: z.string().min(1),
    authorizationUrl: z.url(),
  }).optional(),
});

export type CheckoutSession = z.infer<typeof sessionSchema>;

export function readCheckoutSession(): CheckoutSession | null {
  const raw = sessionStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    const result = sessionSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch { return null; }
}

export function saveCheckoutRequest(values: CheckoutRequest) {
  const body = CheckoutSchema.parse(values);
  const previous = readCheckoutSession();
  if (previous && JSON.stringify(previous.body) === JSON.stringify(body)) return;
  sessionStorage.setItem(storageKey, JSON.stringify({ body }));
}

export function startCheckout(): CheckoutSession & { idempotencyKey: string } {
  const session = readCheckoutSession();
  if (!session) throw new Error("Return to checkout and select your delivery address.");
  const attempt = { ...session, idempotencyKey: session.idempotencyKey ?? crypto.randomUUID() };
  sessionStorage.setItem(storageKey, JSON.stringify(attempt));
  return attempt;
}

export function saveCheckoutPayment(session: CheckoutSession, result: CheckoutResponse) {
  const next = sessionSchema.parse({ ...session, checkout: {
    purchaseId: result.purchaseId,
    purchaseNumber: result.purchaseNumber,
    reference: result.payment.reference,
    authorizationUrl: result.payment.authorizationUrl,
  } });
  sessionStorage.setItem(storageKey, JSON.stringify(next));
  return next.checkout!;
}

export function openCheckoutPayment(authorizationUrl: string) {
  const url = new URL(authorizationUrl);
  if (url.protocol !== "https:" || (url.hostname !== "checkout.paystack.com" && !url.hostname.endsWith(".paystack.com"))) {
    throw new Error("The backend returned an invalid Paystack payment URL.");
  }
  window.location.assign(url.href);
}

export function completeCheckoutSession(reference: string) {
  const session = readCheckoutSession();
  if (session?.checkout?.reference === reference) {
    sessionStorage.removeItem(storageKey);
  }
}

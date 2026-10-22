"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyPaymentMutation } from "@/actions/payment/payment.mutation";
import { completeCheckoutSession, readCheckoutSession } from "@/lib/checkout-session";
import PaymentSuccessfulModal from "./PaymentSuccessfulModal";
import { Button } from "@/components/ui/button";

const statusMessages = {
  PENDING: "Your payment is processing. Check its status again shortly.",
  FAILED: "Your payment failed. Please check your payment status before trying again.",
  EXPIRED: "Your payment has expired.",
  REVIEW: "Your payment is under review. Please wait for confirmation before making another payment.",
};

export default function PaymentCallback({ reference }: { reference: string }) {
  const router = useRouter();
  const started = useRef(false);
  const [open, setOpen] = useState(false);
  const [purchaseNumber, setPurchaseNumber] = useState<string>();
  const toastId = `payment-verification-${reference}`;
  const verification = useMutation({
    ...verifyPaymentMutation,
    onMutate: () => {
      toast.loading("Verifying your payment…", { id: toastId });
    },
    onSuccess: (...args) => {
      verifyPaymentMutation.onSuccess?.(...args);
      const [result] = args;
      if (result.paymentStatus === "SUCCESS" && result.purchaseStatus === "PAID") {
        toast.success("Payment successful", { id: toastId });
        try {
          const stored = readCheckoutSession()?.checkout;
          if (stored?.reference === reference) setPurchaseNumber(stored.purchaseNumber);
          completeCheckoutSession(reference);
        } catch {
          // A storage failure must not hide a backend-confirmed successful payment.
        }
        setOpen(true);
      } else if (result.paymentStatus === "FAILED" || result.paymentStatus === "EXPIRED") {
        toast.error(statusMessages[result.paymentStatus], { id: toastId });
      } else {
        toast.info(result.paymentStatus === "SUCCESS"
          ? "Payment received; purchase confirmation is processing."
          : statusMessages[result.paymentStatus], { id: toastId });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Unable to verify your payment. Please check again before paying again.", { id: toastId });
    },
  });
  const { mutate } = verification;

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!reference) {
      toast.error("The payment callback is missing a payment reference.");
      return;
    }
    mutate(reference);
  }, [reference, mutate]);

  const paid = verification.data?.paymentStatus === "SUCCESS" && verification.data.purchaseStatus === "PAID";
  return <>
    <div className="flex flex-col gap-4" aria-live="polite">
      {!!reference && !paid && <Button disabled={verification.isPending} onClick={() => mutate(reference)}>Check payment status</Button>}
      {paid && <Button onClick={() => router.push("/marketplace")}>Continue Shopping</Button>}
    </div>
    <PaymentSuccessfulModal open={open} onOpenChange={setOpen} purchaseNumber={purchaseNumber} />
  </>;
}

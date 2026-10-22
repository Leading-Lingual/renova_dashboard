"use client";
import Heading from "@/components/Heading";
import SectionCard from "@/components/SectionCard";
import { ArrowLeft} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, Suspense, useRef, useState } from "react";
import PaymentCallback from "@/components/payment/PaymentCallback";
import { useMutation } from "@tanstack/react-query";
import { checkoutMutation } from "@/actions/checkout/checkout.mutation";
import { openCheckoutPayment, saveCheckoutPayment, startCheckout } from "@/lib/checkout-session";
import { toast } from "sonner";
import Wallet from "@iconify-react/clarity/wallet-line"
import Wallet2 from "@iconify-react/arcticons/eset-payment-protection"

type PaymentOption = "WALLET" | "GATEWAY"

const PaymentPage = () => {
  const route = useRouter();
  const params = useSearchParams();
  const isCallback = params.has("reference") || params.has("trxref");
  const reference = params.get("reference")?.trim() || params.get("trxref")?.trim() || "";
  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(null );
  const checkout = useMutation(checkoutMutation);
  const submitting = useRef(false);

  const continueWithGateway = async () => {
    if (submitting.current) return;
    submitting.current = true;
    try {
      const session = startCheckout();
      if (session.checkout) {
        openCheckoutPayment(session.checkout.authorizationUrl);
        return;
      }
      const result = await checkout.mutateAsync({ body: session.body, idempotencyKey: session.idempotencyKey });
      const payment = saveCheckoutPayment(session, result);
      openCheckoutPayment(payment.authorizationUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to open payment. Please try again.");
    } finally {
      submitting.current = false;
    }
  };
  const items: {
    icon: ReactElement;
    key: PaymentOption;
    title: string;
    text: string;
  }[] = [
    {
      icon: <Wallet className="size-6"/>,
      key: "WALLET",
      title: "Use from my wallet",
      text: "Make payment using the wallet",
    },
    {
      icon: <Wallet2 className="size-6 stroke-[2.5px]"/>,
      key: "GATEWAY",
      title: "Use the payment gateway",
      text: "Make payment using the payment gateway",
    },
  ];

  return (
    <div className="flex text-[24px] h-full w-full flex-col gap-4 overflow-auto px-6 py-6 md:gap-6 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => route.back()}
      />
      <Heading
        title="Payment Method"
        subtitle="Payment method"
        titleClassName="text-[24px]"
        subTitleClassName="text-s md:text-sm"
      />
      {isCallback ? <PaymentCallback key={reference} reference={reference} /> : <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-full flex flex-col">
          <SectionCard
            title="Payment Options"
            subtitle="Select a payment option to complete your purchase."
            titleClassName="text-xl"
            subTitleClassName="text-s md:text-sm"
          >
   <div className="flex flex-col md:flex-row no-scrollbar w-full gap-4">
      {items.map((item) => (
        <div
          key={item.text}
          onClick={() => {
            if (submitting.current) return;
            setSelectedOption(item.key);
            if (item.key === "GATEWAY") void continueWithGateway();
          }}
          className={`flex flex-col gap-2.5 border px-4 py-2.5 rounded-2xl flex-1 ${selectedOption === item.key ? "border-brand-400 bg-overlay" : "border-black-50"}`}
        >
          {item.icon}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">{item.title}</p>
            <p className="text-s">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
          </SectionCard>
        </div>
      </div>}
    </div>
  );
};

export default function Payment() {
  return <Suspense fallback={null}><PaymentPage /></Suspense>;
}

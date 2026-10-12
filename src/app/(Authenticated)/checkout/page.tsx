"use client";
import AddressSelector, { OptionType } from "@/components/AddressSelector";
import CheckOutNewAddress from "@/components/Checkout/CheckOutNewAddress";
import OrderSummary from "@/components/Checkout/OrderSummary";
import Heading from "@/components/Heading";
import SectionCard from "@/components/SectionCard";
import { getUserProfile } from "@/actions/user/user.query";
import { checkoutFormValues } from "@/types/checkout.types";
import { CheckoutSchema } from "@/validations/checkout.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useBuyNowStore } from "@/stores/buyNow.store";
import EmptyState from "@/components/EmptyState";
import { getCartItems } from "@/actions/cart/cart.query";
import useQueryParams from "@/hooks/useQueryParams";

const CheckoutPage = () => {
  const route = useRouter();
  const { get } = useQueryParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data: userProfile } = useQuery(getUserProfile);
  const { data: cartData } = useQuery(getCartItems);
  const buyNowItem = useBuyNowStore((state) => state.item);

  const checkoutData = useMemo(
    () => (get("how") === "buynow" && buyNowItem ? buyNowItem : cartData),
    [buyNowItem, cartData, get],
  );

  const checkoutListings = useMemo(
    () => ( get("how") === "buynow" && buyNowItem ? buyNowItem?.items : cartData?.items),
    [buyNowItem, cartData, get],
  );
  const [addressPreference, setAddressPrefence] = useState<OptionType | null>(
    null,
  );
  const listingIds = useMemo(
    () => checkoutListings?.map((l) => l.listingId),
    [checkoutListings],
  );

  const form = useForm<checkoutFormValues>({
    resolver: zodResolver(CheckoutSchema),
    mode: "onChange",
    defaultValues: {
      listingIds: listingIds,
      phoneNumber: "",
      location: undefined,
    },
  });
  const { setValue, trigger } = form;

  const phoneNumber = useWatch({ control: form.control, name: "phoneNumber" });
  const location = useWatch({ control: form.control, name: "location" });
  const showProceed = CheckoutSchema.safeParse({
    listingIds,
    phoneNumber,
    location,
  }).success;
  const isAddressFilled = Boolean(
    location?.formattedAddress?.trim() &&
    location.state?.trim() &&
    location.country?.trim(),
  );

  useEffect(() => {
    setValue("listingIds", listingIds ?? [], { shouldValidate: true });
    void trigger();
  }, [checkoutListings, listingIds, setValue, trigger]);

  useEffect(() => {
    if (addressPreference !== "ACCOUNT_ADDRESS" || !userProfile) return;

    setValue(
      "location",
      {
        country: userProfile.location.country ?? "",
        state: userProfile.location.state ?? "",
        formattedAddress: userProfile.location.formattedAddress ?? "",
      },
      { shouldValidate: true },
    );
    setValue("phoneNumber", userProfile.phoneNumber ?? "", {
      shouldValidate: true,
    });
    void trigger();
  }, [addressPreference, setValue, trigger, userProfile]);

  const clearAddress = () => {
    form.reset({
      listingIds,
      phoneNumber: "",
      location: undefined,
    });
    setAddressPrefence(null);
  };
  return (
    <div className="flex text-[24px] h-full w-full flex-col gap-4 overflow-auto px-6 py-6 md:gap-6 md:px-8">
      <ArrowLeft
        className="shrink-0 cursor-pointer"
        onClick={() => route.back()}
      />
      <Heading
        title="Checkout"
        subtitle="Provide the necessary details of where the material should be delivered to, as well as how you can be contacted."
        titleClassName="text-[24px]"
        subTitleClassName="text-s md:text-sm"
      />
      {checkoutListings?.length === 0 ? (
        <EmptyState
          title="Nothing to checkout"
          subtitle="Add items to cart or click buy now to checkout items"
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full flex flex-col gap-3.25">
            <SectionCard
              title="Buyer Information"
              subtitle="Where would you like for this material to be delivered to? Add your delivery address to calculate logistics."
              titleClassName="text-xl"
              subTitleClassName="text-s md:text-sm"
            >
              <AddressSelector
                selected={addressPreference}
                onSelect={(selected) => {
                  if (selected === "ACCOUNT_ADDRESS") {
                    setAddressPrefence(selected);
                  } else {
                    clearAddress();
                    setIsOpen(selected === "NEW_ADDRESS");
                  }
                }}
              />
            </SectionCard>
            {addressPreference === "NEW_ADDRESS" && isAddressFilled && (
              <div className="flex gap-3.25">
                <div className="border-l-8 px-2 border-brand-500 flex flex.col gap-1 flex-1 flex-col">
                  <p className="text-m-bold">New Address</p>
                  <p className="text-sm">
                    {[location?.city, location?.state, location?.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Clear new address"
                  onClick={() => {
                    clearAddress();
                  }}
                  className="rounded-full bg-black-50 size-6 flex shrink-0 justify-center items-center"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
            <CheckOutNewAddress
              open={isOpen}
              onOpenChange={setIsOpen}
              onAdd={(address) => {
                setValue("location", address.location, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                setValue("phoneNumber", address.phoneNumber, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                void trigger();
                setAddressPrefence("NEW_ADDRESS");
                setIsOpen(false);
              }}
            />
          </div>
          <OrderSummary
            isCheckout
            cartListing={checkoutData}
            showProceed={showProceed}
          />
        </div>
      )}
    </div>
  );
};

export default function Checkout() {
  return (
    <Suspense fallback={null}>
      <CheckoutPage />
    </Suspense>
  );
}
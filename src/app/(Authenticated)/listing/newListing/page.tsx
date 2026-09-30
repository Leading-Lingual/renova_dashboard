"use client";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { ArrowLeft, Loader2 } from "lucide-react";
import PickupSection from "@/components/NewListing/PickupSection";
import PricingSection from "@/components/NewListing/PricingSection";
import ItemDetailsSection from "@/components/NewListing/ItemDetailsSection";
import SectionWrapper from "@/components/NewListing/SectionWrapper";
import { listingFormValues } from "@/types/listing.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema } from "@/validations/listing.validation";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateListingMutation } from "@/actions/listing/listing.mutation";
import { toast } from "sonner";
import { NewListingStages } from "./newListingEnum";
import { ReactElement, useState } from "react";
import PickUpInfoSection from "@/components/NewListing/PickUpInfoSection";
import PickupOptionModal from "@/components/NewListing/PickupOptionModal";
import { getUserProfile } from "@/actions/user/user.query";
import { useWindowSize } from "@/hooks/useWindowSize";

const { INITIAL, PICKUP_INFO } = NewListingStages;

const NewListing = () => {
  const [stage, setStage] = useState<NewListingStages>(INITIAL);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isSubmittingDraft, setIsSubmittingDraft] = useState(false);
  const { data } = useQuery(getUserProfile);
  const { isMobile } = useWindowSize();

  const router = useRouter();

  const { mutate: CreateNewListing, isPending } = useMutation(
    CreateListingMutation,
  );

  const form = useForm<listingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      materialType: "",
      quantityKg: undefined,
      pricePerKg: undefined,
      pickupPreference: "",
      scanId: "",
      images: [],
      currency: "NGN",
      unit: "KG",
      phoneNumber: "",
      location: undefined,
      status: "AVAILABLE",
    },
  });

  const selectedPreference = useWatch({
    control: form.control,
    name: "pickupPreference",
  });

  const isDropoff = selectedPreference === "RENOVA_DROPOFF";

  const handleBack = () => {
    if (isPending) return;

    if (stage === PICKUP_INFO) {
      setStage(INITIAL);
      return;
    }

    router.back();
  };

  const onSubmit = (data: listingFormValues) => {
    CreateNewListing(data, {
      onSuccess: () => {
        toast.success("New listing created!");
        router.push("/listing");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create new listing");
      },
    });
  };

  const handleNext = async () => {
    if (isDropoff) {
      form.handleSubmit(onSubmit)();
      return;
    }

    const isValid = await form.trigger([
      "materialType",
      "quantityKg",
      "currency",
      "unit",
      "pricePerKg",
      "pickupPreference",
    ]);

    if (!isValid) return;

    setIsPickupModalOpen(true);
  };

  const sections: {
    initial: {
      title: string;
      children: ReactElement;
      subtitle?: string;
    }[];
    pickupInfo: {
      title: string;
      children: ReactElement;
      subtitle?: string;
    }[];
  } = {
    initial: [
      {
        title: "Item Details",
        children: <ItemDetailsSection form={form} isSubmitting={isPending} />,
      },
      {
        title: isMobile ? "Set your price" : "Pricing",
        children: <PricingSection form={form} isSubmitting={isPending} />,
      },
      {
        title: "Fulfillment Method",
        subtitle: "How will you get this material to Renova/buyer?",
        children: <PickupSection form={form} isSubmitting={isPending} />,
      },
    ],
    pickupInfo: [
      {
        title: isMobile ? "" : "Contact Info",
        children: <PickUpInfoSection form={form} isSubmitting={isPending} />,
      },
    ],
  };

  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (stage === INITIAL) {
      handleNext();
      return;
    }

    form.setValue("status", "AVAILABLE");
    setIsSubmittingDraft(false);
    form.handleSubmit(onSubmit)(event);
  };

  const handlePickupOption = (option: "ACCOUNT_ADDRESS" | "NEW_ADDRESS") => {
    if (option === "ACCOUNT_ADDRESS") {
      form.setValues({
        location: {
          country: data?.location.country ?? "",
          state: data?.location.state ?? "",
          formattedAddress: data?.location.formattedAddress ?? "",
        },
        phoneNumber: data?.phoneNumber,
      });
      form.setValue("status", "AVAILABLE");
      setIsSubmittingDraft(false);
      form.handleSubmit(onSubmit)();
      return;
    }

    setStage(PICKUP_INFO);
    setIsPickupModalOpen(false);
  };

  const handleSaveDraft = () => {
    form.setValue("status", "DRAFT");
    setIsSubmittingDraft(true);
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto px-6 py-6 md:gap-6 md:px-8">
      <ArrowLeft className="shrink-0 cursor-pointer" onClick={handleBack} />

      <Heading
        title={stage === INITIAL ? "List Waste" : "Pickup Information"}
        subtitle={
          stage === INITIAL
            ? "Provide the necessary details of the material you want to sell."
            : "Provide the necessary details of where the material will be picked-up from, as well as how you can be contacted."
        }
        titleClassName="text-xl md:text-2xl"
        subTitleClassName="text-s md:text-sm"
      />

      <form
        onSubmit={handleFormSubmit}
        className="flex w-full flex-col gap-8 text-xl"
      >
        {sections[stage === INITIAL ? "initial" : "pickupInfo"].map(
          ({ title, subtitle, children }) => (
            <SectionWrapper containerClassName={`${stage === PICKUP_INFO ? "border-none px-0 py-0":""}`} key={title} title={title} subtitle={subtitle}>
              {children}
            </SectionWrapper>
          ),
        )}

        <div className="flex flex-col md:flex-row w-full gap-4">
          <Button
            type="button"
            onClick={handleSaveDraft}
            variant="outline"
            className="h-14! w-full md:flex-1"
            disabled={isPending}
          >
            {isPending && isSubmittingDraft && (
              <Loader2 className="animate-spin" />
            )}
            Save as draft
          </Button>

          <Button
            disabled={isPending}
            type="submit"
            className="h-14! w-full md:flex-1"
          >
            {isPending && !isSubmittingDraft && (
              <Loader2 className="animate-spin" />
            )}
            {isDropoff
              ? "List Waste Material"
              : stage === INITIAL
                ? "Next"
                : "List Waste Material"}
          </Button>
        </div>
      </form>
      <PickupOptionModal
        open={isPickupModalOpen}
        onOpenChange={setIsPickupModalOpen}
        onSubmit={handlePickupOption}
        handleSaveDraft={() => {
          handleSaveDraft();
          setIsPickupModalOpen(false);
        }}
        isPending={isPending}
        isSubmittingDraft={isSubmittingDraft}
      />
    </div>
  );
};

export default NewListing;

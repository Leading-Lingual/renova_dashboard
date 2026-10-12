"use client";
import type { ForwardRefExoticComponent, SVGProps } from "react";
import type { StaticImageData } from "next/image";
import EmptyStateImage from "../../../public/bro.svg";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import { Plus } from "lucide-react";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { useRouter } from "next/navigation";
import SellerEmptyStateImg from "../../../public/rafiki.svg";
import MarketplaceIcon from "@iconify-react/roentgen/marketplace";
import Pickup02Icon from "@iconify-react/hugeicons/pickup-02";
import PickupEmptyStateImg from "../../../public/pickupempty.svg";
import { IconProps } from "@iconify-react/material-symbols/123";

type ButtonConfig = {
  text: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height" | "xmlns"> &
      IconProps
  >;
  onClick?: () => void;
};

type EmptyStateConfig = {
  image: StaticImageData | string;
  title: string;
  subText: string;
  firstButton?: ButtonConfig;
  secondButton?: ButtonConfig;
};

type EmptyStateKey =
  | "hasAll"
  | "hasBuyandCollector"
  | "hasCollectorandSeller"
  | "onlySell"
  | "onlyBuy"
  | "onlyPickup"
  | "default";

const HomeEmptyState = ({ activities }: { activities?: string[] }) => {
  const router = useRouter();

  const isBuyer =
    !!activities?.includes("BUY") || !!activities?.includes("PROCESS_RECYCLE");
  const isSeller = !!activities?.includes("SELL");
  const isCollector = !!activities?.includes("COLLECT");

  const emptyStateDetails: Record<EmptyStateKey, EmptyStateConfig> = {
    hasAll: {
      image: EmptyStateImage,
      title: "No Activities",
      subText: `You currently do not have any listed waste material, purchase made or pickup to make.`,
      firstButton: { text: "Scan Material", icon: ScanFilledIcon },
      secondButton: {
        text: "Create New Listing",
        icon: Plus,
        onClick: () => router.push("/listing/newListing"),
      },
    },
    hasBuyandCollector: {
      image: EmptyStateImage,
      title: "No Activities",
      subText: `You currently do not have any purchase made or pickup to make.`,
      firstButton: { text: "View Pickups", icon: Pickup02Icon },
      secondButton: {
        text: "View Marketplace",
        icon: MarketplaceIcon,
        onClick: () => router.push("/marketplace"),
      },
    },
    hasCollectorandSeller: {
      image: EmptyStateImage,
      title: "No Activities",
      subText: `You currently do not have any listed waste material or pickup to make.`,
      firstButton: { text: "Scan Material", icon: ScanFilledIcon },
      secondButton: {
        text: "Create New Listing",
        icon: Plus,
        onClick: () => router.push("/listing/newListing"),
      },
    },
    onlySell: {
      image: SellerEmptyStateImg,
      title: "No Listing",
      subText: "You currently do not have any listed waste materials.",
      firstButton: { text: "Scan Material", icon: ScanFilledIcon },
      secondButton: {
        text: "Create New Listing",
        icon: Plus,
        onClick: () => router.push("/listing/newListing"),
      },
    },
    onlyBuy: {
      image: SellerEmptyStateImg,
      title: "No Purchase",
      subText:
        "You currently do not have any waste materials you’ve purchased or bought.",
      secondButton: {
        text: "View Marketplace",
        icon: MarketplaceIcon,
        onClick: () => router.push("/marketplace"),
      },
    },
    onlyPickup: {
      image: PickupEmptyStateImg,
      title: "No Pickup",
      subText: "You currently do not have any waste materials to pickup.",
      secondButton: {
        text: "View Pickups",
        icon: Pickup02Icon,
        // onClick: () => router.push("/pickup"),
      },
    },
    default: {
      image: EmptyStateImage,
      title: "No Activity",
      subText: "You currently have no activity on your dashboard.",
    },
  };

  const getEmptyStateKey = (): EmptyStateKey => {
    if (isBuyer && isSeller) return "hasAll";
    if (isBuyer && isCollector) return "hasBuyandCollector";
    if (isSeller && isCollector) return "hasCollectorandSeller";
    if (isSeller) return "onlySell";
    if (isBuyer) return "onlyBuy";
    if (isCollector) return "onlyPickup";
    return "default";
  };

  const details = emptyStateDetails[getEmptyStateKey()];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Heading
          title="My Activities"
          subtitle="View and manage all the waste materials here"
        />
      </div>
      <EmptyState
        title={details.title}
        subtitle={details.subText}
        image={details.image}
        firstButton={details.firstButton}
        secondButton={details.secondButton}
      />
    </div>
  );
};

export default HomeEmptyState;

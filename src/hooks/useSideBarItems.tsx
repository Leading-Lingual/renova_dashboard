import { ForwardRefExoticComponent, SVGProps, useMemo } from "react";
import HomeFilledIcon from "@iconify-react/tabler/home-filled";
import { IconProps } from "@iconify-react/griddy-icons/activity";
import { useMutation } from "@tanstack/react-query";
import { logoutMutation } from "@/actions/auth/auth.mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AccountCogOutlineIcon from "@iconify-react/mdi/account-cog-outline";
import CustomerSupport1RemixIcon from "@iconify-react/streamline/customer-support-1-remix";
import { ArrowLeft } from "lucide-react";
import MarketplaceIcon from '@iconify-react/roentgen/marketplace';
import ListingLabDarkIcon from '@iconify-react/selfhst/listing-lab-dark';
import Pickup02Icon from '@iconify-react/hugeicons/pickup-02';
import CreditcardIcon from '@iconify-react/quill/creditcard';
import DecentWorkAndEconomicGrowthRemixIcon from '@iconify-react/streamline-sharp/decent-work-and-economic-growth-remix';

export interface SidebarItem {
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height" | "xmlns"> &
      IconProps
  >;
  text: string;
  route?: string;
  onClick?: () => void;
}

const useSidebarItems = () => {
  const { mutate: logout } = useMutation(logoutMutation);
  const route = useRouter();

  function onSubmit() {
    logout(undefined, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Logout successful");
        route.push("/login");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  const overviewItems: SidebarItem[] = [
    {
      Icon: HomeFilledIcon,
      text: "Home",
      route: "/home",
    },
  ];
  const featureItems: SidebarItem[] = useMemo(() => {
    return [
      {
        Icon: ListingLabDarkIcon,
        text: "My Listings",
        route: "/listing",
      },
      {
        Icon: MarketplaceIcon,
        text: "Marketplace",
        route: "#",
      },
      {
        Icon: MarketplaceIcon,
        text: "Orders",
        route: "#",
      },
      {
        Icon: Pickup02Icon,
        text: "Pickups",
        route: "#",
      },
      {
        Icon: CreditcardIcon,
        text: "Wallet & Transactions",
        route: "#",
      },
            {
        Icon: DecentWorkAndEconomicGrowthRemixIcon,
        text: "Impact",
        route: "#",
      },
    ];
  }, []);

  const generalItems: SidebarItem[] = [
    {
      Icon: AccountCogOutlineIcon,
      text: "Account",
      route: "#",
    },
    {
      Icon: CustomerSupport1RemixIcon,
      text: "Help & Support",
      route: "#",
    },
    {
      Icon: ArrowLeft,
      text: "Logout",
      onClick: onSubmit,
    },
  ];

  return { featureItems, generalItems, overviewItems };
};
export default useSidebarItems;

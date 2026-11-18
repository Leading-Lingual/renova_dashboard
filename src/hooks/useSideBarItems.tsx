import { ForwardRefExoticComponent, SVGProps, useMemo } from "react";
import HomeFilledIcon from "@iconify-react/tabler/home-filled";
import { IconProps } from "@iconify-react/griddy-icons/activity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "@/actions/auth/auth.mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AccountCogOutlineIcon from "@iconify-react/mdi/account-cog-outline";
import CustomerSupport1RemixIcon from "@iconify-react/streamline/customer-support-1-remix";
import { ArrowLeft } from "lucide-react";
import MarketplaceIcon from "@iconify-react/roentgen/marketplace";
import ListingLabDarkIcon from "@iconify-react/selfhst/listing-lab-dark";
// import Pickup02Icon from "@iconify-react/hugeicons/pickup-02";
import CreditcardIcon from "@iconify-react/quill/creditcard";
import DecentWorkAndEconomicGrowthRemixIcon from "@iconify-react/streamline-sharp/decent-work-and-economic-growth-remix";
import ShoppingCartOutlinedIcon from "@iconify-react/ant-design/shopping-cart-outlined";
import { getUserProfile } from "@/actions/user/user.query";
import { ACCESS, hasAccess } from "@/lib/user-access";
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
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation(logoutMutation);
  const route = useRouter();
  const { data } = useQuery(getUserProfile);

  function onSubmit() {
    logout(undefined, {
      onSettled: (data) => {
        toast.success(data?.message ?? " successful");
        route.replace("/login");
        setTimeout(() => queryClient.clear(), 300);
      },
    });
  }

  const overviewItems: SidebarItem[] = [
    { Icon: HomeFilledIcon, text: "Home", route: "/home" },
  ];

  const userActivities = data?.activities;

  const featureItems: SidebarItem[] = useMemo(() => {
    const activities = userActivities ?? [];
    const can = (allowed: readonly string[]) => hasAccess(activities, allowed);

    const impactItem: SidebarItem = {
      Icon: DecentWorkAndEconomicGrowthRemixIcon,
      text: "Impact",
      route: "#",
    };

    const gated: { allowed: readonly string[]; item: SidebarItem }[] = [
      {
        allowed: ACCESS.listings,
        item: {
          Icon: ListingLabDarkIcon,
          text: "My Listings",
          route: "/listing",
        },
      },
      {
        allowed: ACCESS.marketplace,
        item: {
          Icon: MarketplaceIcon,
          text: "Marketplace",
          route: "/marketplace",
        },
      },
      {
        allowed: ACCESS.orders,
        item: { Icon: ShoppingCartOutlinedIcon, text: "Orders", route: "/orders" },
      },
      // {
      //   allowed: ACCESS.pickups,
      //   item: { Icon: Pickup02Icon, text: "Pickups", route: "#" },
      // },
      {
        allowed: ACCESS.wallet,
        item: {
          Icon: CreditcardIcon,
          text: "Wallet & Transactions",
          route: "/wallet-and-transactions",
        },
      },
    ];

    const allowedItems = gated.filter((g) => can(g.allowed)).map((g) => g.item);

    return [...allowedItems];
  }, [userActivities]);

  const generalItems: SidebarItem[] = [
    { Icon: AccountCogOutlineIcon, text: "Account", route: "/account" },
    { Icon: CustomerSupport1RemixIcon, text: "Help & Support", route: "/support" },
    { Icon: ArrowLeft, text: "Logout", onClick: onSubmit },
  ];

  return { featureItems, generalItems, overviewItems };
};

export default useSidebarItems;

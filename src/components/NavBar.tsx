"use client";
import { useSidebar } from "@/context/SidebarProvider";
import BaselineStarRateIcon from "@iconify-react/ic/baseline-star-rate";
import Cart from "@iconify-react/ant-design/shopping-cart-outlined";
import { Menu } from "lucide-react";
import SearchCategory from "./SearchCategories";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/actions/user/user.query";
import { getFirstWord, getInitials } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useShowNavBar } from "@/hooks/useShowNavBar";
import Link from "next/link";
import { getCartItems } from "@/actions/cart/cart.query";
import Notification from "./Notification/Notification";

const NavBar = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const { data } = useQuery(getUserProfile);
  const { isMobile } = useWindowSize();
  const showNavBar = useShowNavBar();
  const { data: cartData, isLoading } = useQuery(getCartItems);

  return !isMobile || showNavBar ? (
    <nav className="border-b border-b-black-50 py-4 w-full flex justify-between items-center px-6 md:px-8">
      <div className="flex gap-4 items-center">
        <Menu onClick={() => setIsOpen(!isOpen)} className="block lg:hidden" />
        <div className="hidden md:flex flex-col">
          <div className="flex gap-1 items-center">
            <p className="text-heading-xs-semibold text-black-500">
              Welcome Back, {getFirstWord(data?.fullName ?? "")}!
            </p>
            <div className="flex gap-1 items-center">
              <BaselineStarRateIcon className="size-4 text-accent-600" />
              <p className="text-m-bold text-black-400">4.3</p>
            </div>
          </div>
          <p className="text-s text-black-500">
            Let’s keep the planet clean and your impact growing
          </p>
        </div>
      </div>
      <div className="flex gap-6 md:gap-7">
        <SearchCategory />
        <Link href={"/cart"} className="relative">
          {cartData?.items.length !== 0 && !isLoading && (
            <div className="absolute rounded-full size-5 bg-danger-500 flex -right-1 -top-1">
              <p className="text-white m-auto text-2s-medium">
                {cartData?.items.length}
              </p>
            </div>
          )}
          <div className="rounded-full size-8 md:size-10 bg-black-50 flex">
            <Cart className="m-auto size-4 md:size-6 text-black-500" />
          </div>
        </Link>
        <Notification />
        <div className="hidden md:flex gap-3 ">
          <div className="flex rounded-full bg-brand-500 text-white size-10">
            <p className="m-auto text-m-bold">
              {getInitials(data?.fullName ?? "")}
            </p>
          </div>
          <div className="">
            <p className="text-s font-semibold text-black-500">
              {data?.fullName}
            </p>
            <p className="text-2s-medium font-normal">{data?.email}</p>
          </div>
        </div>
      </div>
    </nav>
  ) : null;
};

export default NavBar;

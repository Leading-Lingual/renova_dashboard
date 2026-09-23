"use client";

import Image from "next/image";
import Logo from "@/assets/logo3.svg";
import { usePathname } from "next/navigation";
import useSidebarItems from "@/hooks/useSideBarItems";
import Link from "next/link";
import Heading from "./Heading";
import SideBarImage from "../../public/sidebarimage.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarProvider";
import { X } from "lucide-react";

const SideBar = () => {
  const pathname = usePathname();
  const { overviewItems, generalItems, featureItems } = useSidebarItems();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:max-w-[288px] w-full border-r border-r-black-50 px-6 py-4.5 md:py-4 flex flex-col gap-10 md:gap-4 h-full bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0 lg:flex lg:z-auto",
        )}
      >
        <div className="flex items-center justify-between">
          <X onClick={close} className="md:hidden"/>
          <Image alt="logo" src={Logo} className="w-19.25 h-6 md:w-auto md:h-auto" />
        </div>
        <hr className="my-2.5 bg-brand-100 hidden md:block" />
        <div className="flex flex-col gap-6 overflow-auto no-scrollbar">
          <div className="flex flex-col gap-2">
            <p className="text-s">OVERVIEW</p>
            <div className="flex flex-col">
              {overviewItems.map((item) => (
                <Link href={item.route ?? "#"} key={item.text} onClick={close}>
                  <div
                    onClick={item.onClick}
                    className={`w-full p-3 flex gap-2 rounded-[8px] items-center ${pathname.includes(item.route ?? "#") ? "bg-brand-500" : ""}`}
                  >
                    <item.Icon
                      className={`size-6 ${pathname.includes(item.route ?? "#") ? " text-white " : "text-black-400"}`}
                    />
                    <p
                      className={`${pathname.includes(item.route ?? "#") ? " text-white text-m-bold" : "text-black-500 text-m-medium"}`}
                    >
                      {item.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-s">FEATURES</p>
            <div className="flex flex-col">
              {featureItems.map((item) => (
                <Link href={item.route ?? "#"} key={item.text} onClick={close}>
                  <div
                    onClick={item.onClick}
                    className={`w-full p-3 flex gap-2 rounded-[8px] items-center ${pathname.includes(item.route ?? "#") ? "bg-brand-500" : ""}`}
                  >
                    <item.Icon
                      className={`size-6 ${pathname.includes(item.route ?? "#") ? " text-white fill-white" : "text-black-400 fill-black-400"}`}
                    />
                    <p
                      className={`${pathname.includes(item.route ?? "#") ? " text-white text-m-bold" : "text-black-500 text-m-medium"}`}
                    >
                      {item.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-s">GENERAL</p>
            <div className="flex flex-col">
              {generalItems.map((item) => (
                <Link href={item.route ?? "#"} key={item.text} onClick={close}>
                  <div
                    onClick={item.onClick}
                    className={`w-full p-3 flex gap-2 rounded-[8px] items-center ${pathname.includes(item.route ?? "#") ? "bg-brand-500" : ""}`}
                  >
                    <item.Icon
                      className={`size-6 ${pathname.includes(item.route ?? "#") ? " text-white " : "text-black-400"}`}
                    />
                    <p
                      className={`${pathname.includes(item.route ?? "#") ? " text-white text-m-bold" : "text-black-500 text-m-medium"}`}
                    >
                      {item.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-brand-500 px-4 py-3 flex flex-col gap-4">
            <Heading
              titleClassName="text-white"
              subTitleClassName="text-white text-2s-medium!"
              title="Make an impact"
              subtitle="Every Listing and recycle you create help reduce waste and build a cleaner planet."
            />
            <Image src={SideBarImage} alt="image" className="m-auto" />
            <Button variant="secondary">
              <p className="">Learn More</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

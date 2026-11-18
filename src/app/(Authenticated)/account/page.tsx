"use client";

import { ReactElement, Suspense } from "react";
import useQueryParams from "@/hooks/useQueryParams";
import Profile from "@/components/Account/Profile/Profile";
import Kyc from "@/components/Account/KYC/Kyc";
import Settings from "@/components/Account/Settings/Settings";
import Security from "@/components/Account/Security/Security";
import DeleteAccount from "@/components/Account/DeleteAccount/DeleteAccount";
import UserIcon from "@iconify-react/ri/user-line";
// import IdIcon from "@iconify-react/mdi/badge-account-horizontal-outline";
import SecurityIcon from "@iconify-react/hugeicons/web-security";
import { SettingsIcon } from "lucide-react";
import UserRemoveIcon from "@iconify-react/ri/user-minus-line";
import SessionIcon from "@iconify-react/codicon/session-in-progress-compact";
import SessionManagement from "@/components/Account/SessionManagement/SessionManagement";

type tabTypes =
  | "Profile"
  | "KYC"
  | "Security"
  | "Settings"
  | "Delete-Account"
  | "Session-Management";

const AccountPage = () => {
  const { get, set } = useQueryParams();

  const tabParam = get("tab");
  const tab: tabTypes = (tabParam as tabTypes) ?? "Profile";

  const tabs: { title: string; key: tabTypes; icon: ReactElement }[] = [
    {
      title: "Profile",
      key: "Profile",
      icon: <UserIcon className="size-5 hidden md:flex" />,
    },
    // {
    //   title: "KYC",
    //   key: "KYC",
    //   icon: <IdIcon className="size-5 hidden md:flex" />,
    // },
    {
      title: "Security",
      key: "Security",
      icon: <SecurityIcon className="size-5 hidden md:flex" />,
    },
    {
      title: "Session Management",
      key: "Session-Management",
      icon: <SessionIcon className="size-5 hidden md:flex" />,
    },
    {
      title: "Settings & Preference",
      key: "Settings",
      icon: <SettingsIcon className="size-5 hidden md:flex" />,
    },
    {
      title: "Delete Account",
      key: "Delete-Account",
      icon: <UserRemoveIcon className="size-5 hidden md:flex" />,
    },
  ];

  const renderBasedOnAccountTab = () => {
    switch (tab) {
      case "Profile":
        return <Profile />;
      case "KYC":
        return <Kyc />;
      case "Security":
        return <Security />;
      case "Session-Management":
        return <SessionManagement />;
      case "Settings":
        return <Settings />;
      case "Delete-Account":
        return <DeleteAccount />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-11.5 px-6 py-2 md:px-8 md:py-4 h-full w-full min-w-0 overflow-hidden">
      <div className="xl:h-full xl:w-60.25 xl:shrink-0 flex flex-col gap-6 md:gap-3.25 min-w-0">
        <p className="text-xl font-bold">Account</p>
        <div className="flex xl:flex-col gap-3 md:gap-2.25 overflow-x-auto xl:overflow-visible min-w-0">
          {tabs.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                set({ tab: item.key });
              }}
              className={`rounded-md xl:rounded-none cursor-pointer py-1.5 xl:py-4 text-black-500 flex gap-4 items-center justify-center xl:justify-start px-3 shrink-0 xl:shrink xl:w-full whitespace-nowrap ${tab === item.key ? "xl:border-l-8 xl:border-brand-500 xl:px-2 bg-brand-50 font-bold" : "border xl:border-none xl:px-4 font-medium"}`}
            >
              {item.icon}
              <p className="text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-full w-full min-w-0 xl:flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-3 md:gap-7.75">
        {renderBasedOnAccountTab()}
      </div>
    </div>
  );
};

export default function Account() {
  return (
    <Suspense fallback={null}>
      <AccountPage />
    </Suspense>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import EyeHideSolidIcon from "@iconify-react/clarity/eye-hide-solid";
import MoneyIcon from "@iconify-react/tdesign/money";
import EmptyStateImage from "../../../../public/bro.svg";
import EmptyState from "@/components/EmptyState";
import Overview from "@/components/Home/Overview";
import Heading from "@/components/Heading";
import ListingOverveiw from "@/components/Home/ListingOverveiw";
import RecentActivities from "@/components/Home/RecentActivities";
import Pill from "@/components/Pill";
import { Loader2, Plus } from "lucide-react";
import ScanFilledIcon from "@iconify-react/boxicons/scan-filled";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/actions/user/user.query";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: dashboardData, isPending } = useQuery(getDashboard);

  const router = useRouter();

  const hasData =
    dashboardData &&
    (dashboardData?.recentActivity.length !== 0 ||
      dashboardData.recentListings.length !== 0);

  const accountType = dashboardData?.context.accountType;
  const activities = dashboardData?.context.activities;
  const recentActivities = dashboardData?.recentActivity;
  const recentListing = dashboardData?.recentListings;
  const totalWasteRecovered = dashboardData?.overview.totalRecordedQuantityKg;
  const totalValue = dashboardData?.overview.totalEstimatedListingValue;
  const ecosystemActivity = dashboardData?.overview.totalActivities;

  return (
    <div className="flex py-6 flex-col gap-8 h-full px-6 md:px-8 overflow-auto w-full">
      {isPending ? (
        <Loader2 className="animate-spin m-auto" />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-0.5">
                <p className="text-m-bold capitalize ">
                  {accountType?.toLocaleLowerCase()}
                </p>
                <p className="text-s font-normal">
                  Manage your listings, sales, purchases and collections.{" "}
                </p>
              </div>
              {accountType !== "NGO" && (
                <div className="flex gap-3">
                  {activities?.map((item) => (
                    <Pill key={item} small className="capitalize">
                      {item.toLocaleLowerCase()}
                    </Pill>
                  ))}
                </div>
              )}
            </div>
            <div className=" bg-brand-500 text-white md:text-inherit md:bg-transparent  md:shadow-[0px_1px_4px_0px_#0000000D,0px_1px_4px_0px_#0000001A] rounded-2xl p-4 flex gap-7 items-center justify-between md:items-start md:justify-start">
              <div className="flex gap-4">
                <div className="size-9 rounded-full bg-brand-50 flex">
                  <MoneyIcon className="size-4  m-auto text-brand-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-s">Wallet Balance</p>
                  <div className="flex gap-6 items-center">
                    <p className=""> 0.00</p>
                    <EyeHideSolidIcon className="size-4" />
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-full md:rounded-md bg-transparent border-white md:border-brand-500! h-fit md:h-8  md:px-4!"
              >
                <p className="text-s font-semibold md:text-heading-xs-semibold text-white md:text-brand-700">
                  View Wallet
                </p>
              </Button>
            </div>
          </div>
          <div className={`w-full ${hasData ? "block" : "hidden md:block"}`}>
            <Overview
              totalWasteRecovered={totalWasteRecovered}
              totalValue={totalValue}
              ecosystemActivity={ecosystemActivity}
            />
          </div>
          {hasData ? (
            <>
              <ListingOverveiw listing={recentListing ?? []} />
              <RecentActivities activities={recentActivities ?? []} />
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Heading
                  title="My Activities"
                  subtitle="View and manage all the waste materiasl here"
                />
              </div>
              <EmptyState
                title="No Activities"
                subtile="You currently do not have any listed waste material, purchase
                made or pickup to make."
                image={EmptyStateImage}
                firstButton={{ text: "Scan Material", icon: ScanFilledIcon }}
                secondButton={{
                  text: "Create New Listing",
                  icon: Plus,
                  onClick: () => router.push("/listing/newListing"),
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

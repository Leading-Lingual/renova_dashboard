"use client";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";
import EmptyStateImage from "../../../../public/bro.svg";
import { Button } from "@/components/ui/button";
import { formatDecimal, formatNumber } from "@/lib/utils";
import EyeHideSolidIcon from "@iconify-react/clarity/eye-hide-solid";
import EyeSolidIcon from "@iconify-react/clarity/eye-solid";
import OverviewCard from "@/components/Home/OverviewCard";
import MoneyIcon from "@iconify-react/tdesign/money";
import { useState } from "react";
import WalletTransactionsTable from "@/components/wallet/WalletTransactionsTable";
import { ListFilter, Loader2 } from "lucide-react";
import FilterDrawer from "@/components/wallet/FilterDrawer";
import { useWindowSize } from "@/hooks/useWindowSize";
import AllTransactions from "@/components/wallet/AllTransactions";
import { useQuery } from "@tanstack/react-query";
import {
  getWalletQuery,
  getWalletTransactionsQuery,
} from "@/actions/wallet/wallet.query";

const WalletPage = () => {
  const { data, isPending } = useQuery(getWalletQuery);
  const { data: transactionsData, isPending: gettingTransactions } = useQuery(
    getWalletTransactionsQuery(),
  );
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const { isMobile } = useWindowSize();

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const router = useRouter();
  const overviewItems = [
    {
      title: "Total Earned",
      value: formatNumber(formatDecimal(data?.lifetimeEarnings ?? 0)),
      increase: 0,
    },
    {
      title: "Pending Earning",
      value: formatNumber(formatDecimal(data?.pending ?? 0)),
      increase: 0,
    },
  ];

  return (
    <div className="flex h-full w-full overflow-auto px-6 py-6 md:gap-6 md:px-8 ">
      <div className="flex flex-col gap-5 w-full">
        <Heading
          title="Wallet & Transactions"
          subtitle="View and manage all transaction here. Track your earnings and manage your payouts"
          titleClassName="text-xl font-bold!"
          subTitleClassName="text-s md:text-sm"
        />
        {isPending || gettingTransactions ? (
          <Loader2 className="animate-spin m-auto" />
        ) : (
          <div className="flex flex-col gap-9.75">
            <div className="flex p-4 rounded-[8px] border border-brand-100 flex-col gap-6 lg:gap-0 lg:flex-row justify-between w-full">
              <div className="flex flex-col justify-between gap-3.75 lg:gap-0">
                <div className="flex gap-2 text-sm items-center">
                  <p className="">Available Balance</p>
                  <button
                    type="button"
                    onClick={() => setIsBalanceVisible((visible) => !visible)}
                    aria-label={
                      isBalanceVisible ? "Hide balance" : "Show balance"
                    }
                    aria-pressed={isBalanceVisible}
                    className="cursor-pointer"
                  >
                    {isBalanceVisible ? (
                      <EyeSolidIcon className="size-6" aria-hidden="true" />
                    ) : (
                      <EyeHideSolidIcon className="size-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p className="text-xl font-bold">
                  {isBalanceVisible
                    ? `₦ ${formatNumber(formatDecimal(data?.available ?? 0))}`
                    : "₦ ••••••"}
                </p>
              </div>
              <div className="flex gap-5 lg:gap-10 ">
                <Button
                  disabled={!data?.canWithdraw}
                  onClick={() =>
                    router.push("/wallet-and-transactions/withdraw")
                  }
                  className="h-11.25 lg:h-14 lg:w-67.25 flex-1"
                >
                  Make Withdrawal
                </Button>
                {/* <Button
                  variant="outline"
                  className="h-11.25 lg:h-14 flex-1 lg:w-67.25"
                >
                  Fund Wallet
                </Button> */}
              </div>
            </div>
            {transactionsData?.items.length === 0 ? (
              <EmptyState
                title="No Transaction Yet"
                subtitle="All available balance, transactions and withdrawals will appear here."
                image={EmptyStateImage}
                containerClassName="shadow-none m-auto"
                secondButton={{
                  text: "back to home",
                  onClick: () => router.push("/home"),
                }}
              />
            ) : (
              <div className="flex flex-col gap-7.75">
                <div className="flex flex-col gap-2">
                  <Heading title="Overview" />
                  <div className="grid grid-cols-2 lg:flex gap-4">
                    {overviewItems.map((item) => (
                      <OverviewCard
                        key={item.title}
                        title={item.title}
                        Icon={MoneyIcon}
                        value={`₦ ${item.value}`}
                        increase={item.increase}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <Heading
                      title="Transaction History"
                      subtitle={
                        isMobile
                          ? ""
                          : "View your wallet activity and payout history."
                      }
                    />
                    <Button
                      onClick={() =>
                        isMobile ? setShowAll(true) : setShowFilter(true)
                      }
                      variant={isMobile ? "ghost" : "outline"}
                      className="md:border-black-100"
                    >
                      {isMobile ? (
                        <p className="text-brand-500 font-bold"> View All</p>
                      ) : (
                        <>
                          Filter <ListFilter />
                        </>
                      )}
                    </Button>
                    <FilterDrawer
                      onOpenChange={setShowFilter}
                      open={showFilter}
                      search={search}
                      setSearch={setSearch}
                    />
                  </div>

                  <WalletTransactionsTable  transactions={transactionsData?.items}/>
                  <AllTransactions transactions={transactionsData?.items} onOpenChange={setShowAll} open={showAll} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;

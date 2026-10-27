"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import AddBankAccount from "@/components/Withdraw/AddBankAccount";
import Withdraw from "@/components/Withdraw/Withdraw";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WithdrawPage = () => {
  const router = useRouter();
  const [hasAccount, setHasAccount] = useState(false);
  const handleBack = () => router.back();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-auto px-6 py-6 gap-6 md:px-8">
      <div className="flex flex-col gap-[6.5px]">
        <ArrowLeft className="shrink-0 cursor-pointer" onClick={handleBack} />

        <Heading
          title={hasAccount ? "Withdraw Funds" : "Link Account"}
          subtitle={
            hasAccount
              ? "Enter how much you’d like to withdraw"
              : "Looks like your account has not being linked. Please go ahead and provide all the necessary information to link account"
          }
          titleClassName="text-xl"
          subTitleClassName="text-s "
        />
      </div>
      {hasAccount ? (
        <Withdraw />
      ) : (
        <div className="w-full">
          <Button
            variant="ghost"
            onClick={() => setShowAdd(true)}
            className="flex gap-2 font-bold w-fit text-sm md:text-base px-0"
          >
            <Plus className="size-6" /> <p className="">Add New Bank Account</p>
          </Button>
          <AddBankAccount
            open={showAdd}
            onOpenChange={setShowAdd}
            onAdd={() => {
              setHasAccount(true);
              setShowAdd(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WithdrawPage;

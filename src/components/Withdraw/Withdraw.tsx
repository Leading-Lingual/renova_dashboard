"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddBankAccount from "@/components/Withdraw/AddBankAccount";
import { formatNumber } from "@/lib/utils";
import { BankAccount, WithdrawFormValues } from "@/types/wallet.types";
import { createWithdrawSchema } from "@/validations/wallet.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AVAILABLE_BALANCE = 0;

const initialAccounts: BankAccount[] = [];

const quickAmounts = [
  { label: "5K", amount: 5000 },
  { label: "10K", amount: 10000 },
  { label: "20K", amount: 20000 },
  { label: "30K", amount: 30000 },
];

const Withdraw = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [accounts, setAccounts] = useState(initialAccounts);
  const withdrawSchema = createWithdrawSchema(AVAILABLE_BALANCE);
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: "", account: initialAccounts?.[0]?.accountNumber },
  });

  const setAmount = (amount: number) => {
    form.setValue("amount", String(amount), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeAccount = (account: BankAccount) => {
    const nextAccounts = accounts.filter((item) => item.id !== account.id);
    setAccounts(nextAccounts);

    if (form.getValues("account") === account.accountNumber) {
      form.setValue("account", nextAccounts[0]?.accountNumber ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const addAccount = () => {
    setShowAdd(false);
  };

  const onSubmit = (values: WithdrawFormValues) => {
    const account = accounts.find(
      (item) => item.accountNumber === values.account,
    );
    if (!account) {
      form.setError("account", { message: "Select an available account" });
      return;
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="border rounded-[16px] w-full p-4 md:p-6 flex flex-col gap-8 items-center">
          <div className="flex flex-col">
            <Controller
              control={form.control}
              name="amount"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-fit flex flex-col m-auto text-center"
                >
                  <div className="flex gap-2 justify-center items-center">
                    <p className="text-2xl font-bold">₦</p>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="0"
                      aria-invalid={fieldState.invalid}
                      type="text"
                      inputMode="decimal"
                      value={formatNumber(field.value)}
                      onChange={(event) => {
                        const value = event.target.value.replace(/,/g, "");
                        if (value === "" || /^\d*\.?\d{0,2}$/.test(value))
                          field.onChange(value);
                      }}
                      className="rounded-none border-none field-sizing-content! md:w-fit! md:max-w-87.75 p-0 h-fit! text-2xl! font-bold! focus-visible:border-none! focus-visible:ring-0 aria-invalid:border-none aria-invalid:ring-0"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <hr className="m-2.5 h-0.75 bg-black-300 md:min-w-95.75" />
            <div className="flex gap-2 font-bold items-center justify-center">
              <p className="text-sm">Available balance:</p>
              <p className="text-xl">{formatNumber(AVAILABLE_BALANCE)}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 md:gap-10">
            {quickAmounts.map((amount) => (
              <Button
                type="button"
                variant="outline"
                key={amount.label}
                disabled={AVAILABLE_BALANCE < amount.amount}
                onClick={() => setAmount(amount.amount)}
                className="py-2 px-4 border border-black-100 rounded-[8px]"
              >
                ₦ {amount.label}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setAmount(AVAILABLE_BALANCE)}
              className="py-2 px-4 border border-black-100 rounded-[8px]"
            >
              Max
            </Button>
          </div>
        </div>

        <div className="border rounded-[16px] w-full p-4 md:p-6 flex flex-col gap-6">
          <Heading
            title="Account Destination"
            subtitle="Where should we send your funds"
          />
          <Controller
            control={form.control}
            name="account"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  {accounts.map((bank) => (
                    <div key={bank.id} className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-center p-1 w-full">
                        <div className="flex gap-4 items-center md:min-w-119.5">
                          <Layers className="size-6" />
                          <div className="flex flex-col md:flex-row gap-2 md:items-center flex-1">
                            <div className="flex flex-col gap-1">
                              <p className="text-sm md:text-base font-bold">
                                {bank.bank}
                              </p>
                              <p className="text-s md:text-sm">
                                **** **** {bank.accountNumber.slice(-4)}
                              </p>
                            </div>
                            <div className="flex gap-3.25 items-center justify-end flex-1">
                              {bank.isDefault && (
                                <Button
                                  type="button"
                                  variant="secondary"
                                  className="border-solid h-6.75 text-[10px] font-medium md:h-10 md:text-base md:font-bold"
                                >
                                  Default
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => removeAccount(bank)}
                                className="border-black-100 h-6.75 text-[10px] font-medium md:h-10 md:text-base md:font-bold"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        <RadioGroupItem
                          value={bank.accountNumber}
                          id={`withdraw-account-${bank.id}`}
                          className="size-6 border-4 border-black-50"
                        />
                      </div>
                      <hr className="mx-0.5" />
                    </div>
                  ))}
                  {accounts.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No bank accounts saved yet.
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAdd(true)}
                    className="flex gap-2 font-bold w-fit text-sm md:text-base px-0"
                  >
                    <Plus className="size-6" />{" "}
                    <span>Add New Bank Account</span>
                  </Button>
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full max-w-145 place-self-center h-14"
        >
          Continue
        </Button>
      </form>
      <AddBankAccount
        open={showAdd}
        onOpenChange={setShowAdd}
        onAdd={addAccount}
      />
    </div>
  );
};

export default Withdraw;

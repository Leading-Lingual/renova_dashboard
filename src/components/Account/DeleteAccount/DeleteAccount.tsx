"use client";
import Heading from "@/components/Heading";
// import PasswordToggle from "@/components/PasswordToggle";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
// import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordIcon from "@iconify-react/mdi/password-outline";
import { Checkbox } from "@/components/ui/checkbox";
import UserIcon from "@iconify-react/ri/user-line";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeletionCheck } from "@/actions/user/user.query";
import { formatText } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "@/validations/auth.validation";
import { AccountDeletionType } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { deleteAccountMutation } from "@/actions/user/user.mutation";
import { logoutMutation } from "@/actions/auth/auth.mutation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
  const { data, isPending: checking } = useQuery(getDeletionCheck);
  const { mutate: deleteAccount, isPending: deleting } = useMutation(
    deleteAccountMutation,
  );
  const { mutateAsync: logout } = useMutation(logoutMutation);
  const queryClient = useQueryClient();
  const router = useRouter();

  // const [passwordInputType, setPasswordInputType] = useState<
  //   "text" | "password"
  // >("password");

  const form = useForm<AccountDeletionType>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      fullName: "",
      password: "",
      acknowledged: false,
    },
  });

  const handleSubmit = (payload: AccountDeletionType) => {
    deleteAccount(payload, {
      onSuccess: async (result) => {
        toast.success(result.message || "Account deleted");
        try {
          await logout();
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Unable to log out",
          );
          return;
        }
        queryClient.clear();
        router.replace("/login");
        router.refresh();
      },
      onError: (error) =>
        toast.error(error.message || "Unable to delete account"),
    });
  };

  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading title="Delete Account" subtitle="Delete your account" />
      {!checking && !data?.canDelete && (
        <div className="flex flex-col gap-2 border p-4 bg-accent-100/30 rounded-lg">
          <p className="font-bold">Cannot Delete Account</p>
          <div className=" text-s md:text-sm text-black-500 flex flex-col gap-2 justify-start">
            <p className="">
              You currently cannot delete your account as you have the following
              pending activities:
            </p>
            <ul className="list-disc ml-8">
              {data?.blockers.map((item, index) => (
                <li key={index} className="">
                  <p className="font-bold">{formatText(item.code)} </p>
                  {item.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-bold">Confirm Account Deletion</p>
        <div className="text-s text-black-500 flex flex-col gap-2 justify-start border-l-[6px] border-danger-500 px-2">
          <p className="">
            Please be aware that deleting your Renova account is permanent. Once
            your account deletion has been processed:
          </p>
          <ul className="list-disc ml-8">
            <li>
              All your account records and information will be permanently
              deleted.
            </li>
            <li>Your account cannot be recovered.</li>
            <li>You cannot undo the deletion once it has been processed.</li>
          </ul>
          <p className="">
            To proceed with deleting your account, please enter your full name
            exactly as it appears on your Renova profile, provide your password,
            and confirm that you understand the consequences of deleting your
            account.
          </p>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-16"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Fullname
                  </FieldLabel>

                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <UserIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Enter your name"
                      disabled={!data?.canDelete || deleting}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-m-medium text-brand-800"
                  >
                    Password
                  </FieldLabel>

                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <PasswordIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={"password"}
                      placeholder="********"
                      disabled={!data?.canDelete || deleting}
                    />
                    {/* <InputGroupAddon align="inline-end">
                      <PasswordToggle
                        inputType={passwordInputType}
                        onAction={() =>
                          setPasswordInputType((prev) =>
                            prev === "password" ? "text" : "password",
                          )
                        }
                      />
                    </InputGroupAddon> */}
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="acknowledged"
              render={({ field, fieldState }) => (
                <div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      disabled={!data?.canDelete || deleting}
                      className="size-8 border-black-100 rounded-md"
                      aria-invalid={fieldState.invalid}
                    />
                    <p className="text-sm">
                      I understand the consequences of deleting my account.
                    </p>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={!data?.canDelete || deleting}
          className="h-14 m-auto w-full max-w-xl bg-danger-500 hover:bg-danger-400"
        >
          {deleting && <Loader2 className="animate-spin" />}
          Delete Account
        </Button>
      </form>
    </div>
  );
};

export default DeleteAccount;

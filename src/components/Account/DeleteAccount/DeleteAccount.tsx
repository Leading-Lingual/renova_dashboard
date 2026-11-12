import Heading from "@/components/Heading";
import PasswordToggle from "@/components/PasswordToggle";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordIcon from "@iconify-react/mdi/password-outline";
import { Checkbox } from "@/components/ui/checkbox";
import UserIcon from "@iconify-react/ri/user-line";

const DeleteAccount = () => {
  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");

  const form = useForm({
    defaultValues: {
      fullname: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading title="Delete Account" subtitle="Delete your account" />
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
      <form className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="fullname"
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
                      type={passwordInputType}
                      placeholder="********"
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
            <div className="flex items-center gap-3">
              <Checkbox className="size-8 border-black-100 rounded-md"/>
              <p className="text-sm">
                I understand the consequences of deleting my account.
              </p>
            </div>
          </div>
        </div>
        <Button className="h-14 m-auto w-full max-w-xl bg-danger-500 hover:bg-danger-400">
          Delete Account
        </Button>
      </form>
    </div>
  );
};

export default DeleteAccount;

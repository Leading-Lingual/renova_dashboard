"use client";
import AuthWrapper from "@/components/AuthWrapper";
import FormHeader from "@/components/FormHeader";
import PasswordToggle from "@/components/PasswordToggle";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PasswordIcon from "@iconify-react/mdi/password";
import { ArrowRightCircle } from "lucide-react";
import { passwordCriteria } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const ResetPasswordPage = () => {
  const queryParams = useQueryParams();
  const router = useRouter();
  const showResetPage = queryParams.get("token");

  useEffect(() => {
    if (!showResetPage) {
      return router.push("/forgot-password");
    }
  }, [showResetPage, router]);
  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState<
    "text" | "password"
  >("password");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    console.log(data);
    form.reset();
  }

  return (
    <AuthWrapper>
      <div className="flex bg-white md:rounded-2xl md:px-18.75 md:py-[92.5px] w-full gap-6 md:gap-11  flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          <FormHeader
            title="Reset Password"
            subtitle="In order to keep your account safe you need to create a strong password."
          />
          <div className="flex flex-col gap-4">
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
                        placeholder="Create your password"
                      />
                      <InputGroupAddon align="inline-end">
                        <PasswordToggle
                          inputType={passwordInputType}
                          onAction={() =>
                            setPasswordInputType((prev) =>
                              prev === "password" ? "text" : "password",
                            )
                          }
                        />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-m-medium text-brand-800"
                    >
                      Confirm Password
                    </FieldLabel>

                    <InputGroup className="h-14">
                      <InputGroupAddon>
                        <PasswordIcon className="size-6" />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type={confirmPasswordInputType}
                        placeholder="Confirm your password"
                      />
                      <InputGroupAddon align="inline-end">
                        <PasswordToggle
                          inputType={confirmPasswordInputType}
                          onAction={() =>
                            setConfirmPasswordInputType((prev) =>
                              prev === "password" ? "text" : "password",
                            )
                          }
                        />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
            <div className="flex flex-col gap-2">
              <p className="text-black-500 text-heading-xs-semibold">
                Your Password must contain
              </p>
              <div className="flex flex-col gap-1">
                {passwordCriteria.map((criteria, index) => (
                  <div key={index} className={`flex gap-2 items-center`}>
                    <ArrowRightCircle className="size-4 text-black-200" />
                    <p className="text-2s-medium text-black-300">
                      {criteria.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center text-black-500">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="text-white h-14 w-full"
          >
            Reset Password
          </Button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;

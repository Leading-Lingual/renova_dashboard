"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import EmailFilledIcon from "@iconify-react/griddy-icons/email-filled";
import FormHeader from "@/components/FormHeader";
import { ForgetPasswordStages } from "./forgetPasswordEnum";
import { ResetPasswordIcon } from "@/assets/ResetPassordIcon";
import { forgetPasswordSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const { INITIAL, CHECK_EMAIL } = ForgetPasswordStages;

const ForgetPassword = () => {
  const [stage, setStage] = useState<ForgetPasswordStages>(INITIAL);
  const isInitialStage = stage === INITIAL;

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof forgetPasswordSchema>) {
    console.log(data);
    form.reset();
    setStage(CHECK_EMAIL);
  }

  return (
    <AuthWrapper>
      <div className="flex bg-white justify-center-safe md:rounded-2xl md:px-18.75 md:py-[92.5px] w-full gap-6 md:gap-11 flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          {!isInitialStage && <ResetPasswordIcon className="m-auto" />}
          <FormHeader
            title={isInitialStage ? "Forgot Password" : "Check your mail"}
            subtitle={
              isInitialStage
                ? "Enter the email address you used to create your account. You will receive a link to create a new password."
                : "We have sent a password recover instructions to your email."
            }
          />
          {isInitialStage && (
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-m-medium text-brand-800"
                    >
                      Email
                    </FieldLabel>
                    <InputGroup className="h-14">
                      <InputGroupAddon>
                        <EmailFilledIcon className="size-6" />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
          )}
        </div>
        <div className="flex flex-col gap-4 items-center text-black-500">
          <Button
            className="text-white w-full h-14"
            onClick={isInitialStage ? form.handleSubmit(onSubmit) : undefined}
          >
            {isInitialStage ? "Send Reset Link" : "Check email"}
          </Button>
          <div className="text-m-medium gap-1">
            {isInitialStage
              ? "Never mind!"
              : "Did not receive the email? Check your spam folder or"}
            {isInitialStage ? (
              <Link href={"/login"} className="text-brand-500 text-m-bold ml-1">
                Take me back to Login
              </Link>
            ) : (
              <Button
                size="fit"
                variant="ghost"
                onClick={() => setStage(INITIAL)}
              >
                <p className="text-brand-500! text-m-bold! ml-1">
                  {" "}
                  try another email
                </p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ForgetPassword;

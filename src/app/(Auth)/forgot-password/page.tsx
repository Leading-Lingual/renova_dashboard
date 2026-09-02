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
// import { ResetPasswordIcon } from "@/assets/ResetPassordIcon";
import {
  forgetPasswordSchema,
  verifyEmailSchema,
} from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordMutation,
  verifyPasswordOTP,
} from "@/actions/auth/auth.mutation";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const { INITIAL, CHECK_EMAIL } = ForgetPasswordStages;

const ForgetPassword = () => {
  const [stage, setStage] = useState<ForgetPasswordStages>(INITIAL);
  const isInitialStage = stage === INITIAL;
  const { mutate: forgotPassword, isPaused: isSubmitting } = useMutation(
    forgotPasswordMutation,
  );
  const { mutate: verifyCode, isPending: isVerifying } =
    useMutation(verifyPasswordOTP);
  const router = useRouter();

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  function onSubmit(forgotPasswordData: z.infer<typeof forgetPasswordSchema>) {
    forgotPassword(forgotPasswordData, {
      onSuccess: (data) => {
        toast.success(data.message);
        otpForm.setValue("email", forgotPasswordData.email);
        setStage(CHECK_EMAIL);
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  function onCodeSubmit(data: z.infer<typeof verifyEmailSchema>) {
    verifyCode(data, {
      onSuccess(data) {
        toast.success("Otp verified");
        router.push(`/reset-password?token=${data.resetToken}`);
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <AuthWrapper>
      <div className="flex bg-white justify-center-safe md:rounded-2xl md:px-18.75 md:py-[92.5px] w-full gap-6 md:gap-11 flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          {/* {!isInitialStage && <ResetPasswordIcon className="m-auto" />} */}
          <FormHeader
            title={isInitialStage ? "Forgot Password" : "Check your mail"}
            subtitle={
              isInitialStage
                ? "Enter the email address you used to create your account."
                : // You will receive a link to create a new password."
                  // : "We have sent a password recover instructions to your email."
                  `We sent a 6-digit verification code to ${otpForm.getValues("email")}. Please enter the code below.`
            }
          />
          {isInitialStage ? (
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
          ) : (
            <form
              className="flex flex-col gap-6"
              onSubmit={otpForm.handleSubmit(onCodeSubmit)}
            >
              <Controller
                control={otpForm.control}
                name="otp"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputOTP
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="flex w-full justify-between">
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={0}
                        />
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={1}
                        />
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={2}
                        />
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={3}
                        />
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={4}
                        />
                        <InputOTPSlot
                          aria-invalid={fieldState.invalid}
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
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
            disabled={isSubmitting || isVerifying}
            className="text-white w-full h-14"
            onClick={
              isInitialStage
                ? form.handleSubmit(onSubmit)
                : otpForm.handleSubmit(onCodeSubmit)
            }
          >
            {(isSubmitting || isVerifying) && (
              <Loader2 className="animate-spin" />
            )}
            {/* {isInitialStage ? "Send Reset Link" : "Check email"} */}
            Submit
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

"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import PasswordToggle from "@/components/PasswordToggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import { GoogleLogo } from "@/assets/GoogleLogo";
import PasswordIcon from "@iconify-react/mdi/password";
import EmailFilledIcon from "@iconify-react/griddy-icons/email-filled";
import FormHeader from "@/components/FormHeader";
import { passwordCriteria } from "@/lib/utils";
import { ArrowRightCircle, Loader2 } from "lucide-react";
import { SignUpStages } from "./signUpEnum";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { signUpSchema, verifyEmailSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  resendOTP,
  signUpMutation,
  verifyEmailMutation,
} from "@/actions/auth/auth.mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useResendCountdown } from "@/hooks/useResendCountdown";

const { INITIAL, EMAIL_VERIFICATION } = SignUpStages;

const SignupPage = () => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [stage, setStage] = useState<SignUpStages>(INITIAL);
  const isInitialStage = stage === INITIAL;
  const { mutate: signup, isPending: isLoadingSignUp } =
    useMutation(signUpMutation);
  const { mutate: verifyEmail, isPending: isLoadingVerification } =
    useMutation(verifyEmailMutation);
  const { mutate: resend } = useMutation(resendOTP);
  const router = useRouter();
  const { formattedTime, startCountdown, isCounting } = useResendCountdown(600);

  const signupform = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userType: "INDIVIDUAL",
    },
  });

  const otpForm = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  function onSubmit(signupData: z.infer<typeof signUpSchema>) {
    signup(signupData, {
      onSuccess: (data) => {
        toast.success(data.message);
        otpForm.setValue("email", signupData.email);
        setStage(EMAIL_VERIFICATION);
        signupform.reset();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  function onCodeSubmit(data: z.infer<typeof verifyEmailSchema>) {
    verifyEmail(data, {
      onSuccess(data) {
        toast.success(data.message);
        otpForm.reset();
        router.push("/login");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  const handleResendCode = () => {
    resend(
      { email: otpForm.getValues("email") },
      {
        onSuccess(data) {
          toast.success(data.message);
          startCountdown();
        },

        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const password = useWatch({
    control: signupform.control,
    name: "password",
  });

  useEffect(() => {
    signupform.setValue("confirmPassword", password, {
      shouldValidate: true,
    });
  }, [password, signupform]);

  const renderBasedOnStage = () => {
    switch (stage) {
      case INITIAL:
        return (
          <>
            <Button
              variant="outline"
              className=" h-14 text-heading-xs-semibold"
            >
              <GoogleLogo />
              <p>Create with Google Account</p>
            </Button>
            <div className="flex items-center gap-4 w-full">
              <hr className="bg-black-100 w-full h-0.5 border-none" />
              <p className="text-black">or</p>
              <hr className="bg-black-100 w-full h-0.5 border-none" />
            </div>
            <form className="flex flex-col gap-6">
              <Controller
                control={signupform.control}
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
              <div className="flex flex-col gap-4">
                <Controller
                  control={signupform.control}
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
                          type={inputType}
                          placeholder="Create your password"
                        />
                        <InputGroupAddon align="inline-end">
                          <PasswordToggle
                            inputType={inputType}
                            onAction={() =>
                              setInputType((prev) =>
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
            </form>
          </>
        );
      case EMAIL_VERIFICATION:
        return (
          <>
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
            <div className="text-m-medium gap-1 flex items-center m-auto">
              <p>Didn’t recieve a code</p>
              <Button
                size="fit"
                variant={"ghost"}
                onClick={handleResendCode}
                disabled={isCounting}
                className={"cursor-pointer"}
              >
                <p className="text-brand-500! text-m-bold!">
                  {isCounting
                    ? `Resend Code in ${formattedTime}`
                    : "Resend OTP"}
                </p>
              </Button>
            </div>
          </>
        );
    }
  };
  return (
    <AuthWrapper
      useFullScreen={!isInitialStage}
      text="Recycle. Earn. Impact. Repeat."
      subtext="
              Upgrade to a smarter way of managing waste. Create your account
              and start turning recyclables into real rewards. Every item you
              recycle brings you one step closer to earning more."
    >
      <div className="flex bg-white md:rounded-2xl justify-center-safe md:px-18.75 md:py-[92.5px] w-full gap-6 md:gap-11 flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          <FormHeader
            title={isInitialStage ? "Create Account" : "OTP Verification"}
            subtitle={
              isInitialStage
                ? "Sign up to join the future of smarter recycling"
                : `We sent a 6-digit verification code to ${otpForm.getValues("email")}. Please enter the code below.`
            }
          />
          {renderBasedOnStage()}
        </div>
        <div className="flex flex-col gap-4 items-center text-black-500">
          <Button
            disabled={isLoadingSignUp || isLoadingVerification}
            className="text-white w-full h-14"
            onClick={
              isInitialStage
                ? signupform.handleSubmit(onSubmit)
                : otpForm.handleSubmit(onCodeSubmit)
            }
          >
            {(isLoadingSignUp || isLoadingVerification) && (
              <Loader2 className="animate-spin" />
            )}
            {isInitialStage ? "Create Account" : "Submit OTP"}
          </Button>
          <div className="text-m-medium gap-1 flex items-center">
            <p>
              {isInitialStage
                ? "Already have an account?"
                : "Noticed a typo in your Email"}
            </p>
            {isInitialStage ? (
              <Link href={"/login"} className="text-brand-500 text-m-bold">
                Log In
              </Link>
            ) : (
              <Button
                size="fit"
                variant="ghost"
                onClick={() => setStage(INITIAL)}
                className="cursor-pointer"
              >
                <p className="text-brand-500! text-m-bold!">
                  Edit Email Address
                </p>
              </Button>
            )}
          </div>
          {isInitialStage && (
            <p className="text-m-medium">
              By submitting, you have agreed to our{" "}
              <span className="text-brand-500 ">Privacy Policy</span> and{" "}
              <span className="text-brand-500 ">Terms</span>
            </p>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignupPage;

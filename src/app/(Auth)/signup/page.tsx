"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import PasswordToggle from "@/components/PasswordToggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import AuthWrapper from "@/components/AuthWrapper";
import { GoogleLogo } from "@/assets/GoogleLogo";
import PasswordIcon from "@iconify-react/mdi/password";
import EmailFilledIcon from "@iconify-react/griddy-icons/email-filled";
import FormHeader from "@/components/FormHeader";
import { passwordCriteria } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import { SignUpStages } from "./signUpEnum";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const { INITIAL, EMAIL_VERIFICATION } = SignUpStages;

const SignupPage = () => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [stage, setStage] = useState<SignUpStages>(INITIAL);
  const isInitialStage = stage === INITIAL;

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
              <Field>
                <FieldLabel
                  htmlFor="input-field-email"
                  className="text-m-medium text-brand-800"
                >
                  Email
                </FieldLabel>
                <InputGroup className="h-14">
                  <InputGroupAddon>
                    <EmailFilledIcon className="size-6" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="input-field-email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </InputGroup>
              </Field>
              <div className="flex flex-col gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="input-field-username"
                    className="text-m-medium text-brand-800"
                  >
                    Password
                  </FieldLabel>

                  <InputGroup className="h-14">
                    <InputGroupAddon>
                      <PasswordIcon className="size-6" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="input-field-password"
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
                </Field>
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
            <Field>
              <InputOTP
                id="digits-only"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup className="flex w-full justify-between">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
            <div className="text-m-medium gap-1 flex m-auto">
              <p>Didn’t recieve a code</p>
              <span className="text-brand-500 text-m-bold">
                Resend Code in 1m:05s
              </span>
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
                : "We sent a 6-digit verification code to user@example.com. Please enter the code below."
            }
          />
          {renderBasedOnStage()}
        </div>
        <div className="flex flex-col gap-4 items-center text-black-500">
          <Button
            className="text-white w-full h-14"
            onClick={() =>
              isInitialStage ? setStage(EMAIL_VERIFICATION) : undefined
            }
          >
            {isInitialStage ? "Create Account" : "Submit OTP"}
          </Button>
          <div className="text-m-medium gap-1 flex">
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
                className="text-brand-500 text-m-bold"
              >
                <p className="text-brand-500! text-m-bold!">Edit Email Address</p>
              </Button>
            )}
          </div>
          {isInitialStage && (
            <p className="text-m-medium">
              By submitting, you have agreed to our{" "}
              <span className="text-brand-500 ">Privacy Policy</span> and <span className="text-brand-500 ">Terms</span>
            </p>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignupPage;

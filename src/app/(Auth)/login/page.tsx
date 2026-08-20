"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import { useState } from "react";
import PasswordToggle from "@/components/PasswordToggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import AuthWrapper from "@/components/AuthWrapper";
import { GoogleLogo } from "@/assets/GoogleLogo";
import PasswordIcon from "@iconify-react/mdi/password";
import EmailFilledIcon from "@iconify-react/griddy-icons/email-filled";
import FormHeader from "@/components/FormHeader";

const LoginPage = () => {
  const [inputType, setInputType] = useState<"password" | "text">("password");

  return (
    <AuthWrapper
      text="Let’s Go Again"
      subtext="Sign in and keep earning rewards with every recycle. see your progress, rewards, new opportunities and make a difference."
    >
      <div className="flex bg-white md:rounded-2xl md:px-18.75 md:py-[92.5px] justify-center-safe w-full gap-6 md:gap-11 flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          <FormHeader
            title="Welcome back"
            subtitle="Sign in to track and manage your waste operations."
          />
          <Button variant="outline" className="h-14 text-heading-xs-semibold">
            <GoogleLogo />
            <p>Sign in with Google Account</p>
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
                  placeholder="Enter your password"
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
          </form>
        </div>
        <div className="flex flex-col gap-4 items-center text-black-500">
          <Button className="text-white h-14 w-full">Log in</Button>
          <div className="text-m-medium flex gap-1">
            <p>Don&lsquo;t have an account?</p>
            <Link href={"/signup"} className="text-brand-500 text-m-bold">
              Sign up
            </Link>{" "}
            |{" "}
            <Link
              href={"/forgot-password"}
              className="text-brand-500 text-m-bold"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default LoginPage;

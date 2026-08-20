"use client";
import AuthWrapper from "@/components/AuthWrapper";
import FormHeader from "@/components/FormHeader";
import PasswordToggle from "@/components/PasswordToggle";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
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

const ResetPasswordPage = () => {
  const queryParams = useQueryParams();
  const router = useRouter();
  const showResetPage = queryParams.get("token");

  useEffect(() => {
    if (!showResetPage) {
      return router.push("/forget-password");
    }
  }, [showResetPage, router]);
  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState<
    "text" | "password"
  >("password");

  return (
    <AuthWrapper>
      <div className="flex bg-white md:rounded-2xl md:px-18.75 md:py-[92.5px] w-full gap-6 md:gap-11  flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          <FormHeader
            title="Reset Password"
            subtitle="In order to keep your account safe you need to create a strong password."
          />
          <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-6">
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
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="input-field-username"
                  className="text-m-medium text-brand-800"
                >
                  Confirm Password
                </FieldLabel>

                <InputGroup className="h-14">
                  <InputGroupAddon>
                    <PasswordIcon className="size-6" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="input-field-password"
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
              </Field>
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
          <Button className="text-white h-14 w-full">Reset Password</Button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;

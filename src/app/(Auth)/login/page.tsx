"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
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
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginMutation } from "@/actions/auth/auth.mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const { mutate: login, isPending } = useMutation(loginMutation);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    login(data, {
      onSuccess: () => {
        toast.success("Login successful");
        router.push("/onboarding");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Link
              href={"/forgot-password"}
              className="text-black-500 text-m-bold ml-auto"
            >
              Forgot password?
            </Link>

            <div className="flex flex-col gap-4 items-center text-black-500">
              <Button
                disabled={isPending}
                type="submit"
                className="text-white h-14 w-full"
              >
                {isPending && <Loader2 className="animate-spin" />}
                Log in
              </Button>
              <div className="text-m-medium flex gap-1">
                <p>Don&lsquo;t have an account?</p>
                <Link href={"/signup"} className="text-brand-500 text-m-bold">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default LoginPage;

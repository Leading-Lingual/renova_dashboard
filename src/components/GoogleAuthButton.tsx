"use client";

import { Button } from "./ui/button";
import { GoogleLogo } from "@/assets/GoogleLogo";
import { useMutation } from "@tanstack/react-query";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { AccountType } from "@/types/auth.types";
import {
  googleLoginMutation,
  googleRegisterMutation,
} from "@/actions/auth/auth.mutation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SelectAccountTypeModal } from "./SelectAccountTypeModal";

interface GoogleAuthButtonProps {
  mode: "login" | "register";
}

export function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const router = useRouter();

  const { mutate: googleLogin, isPending: loggingIn } =
    useMutation(googleLoginMutation);
  const { mutate: googleSignUp, isPending: signingUp } = useMutation(
    googleRegisterMutation,
  );

  const isPending = loggingIn || signingUp;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerationId, setRegisterationId] = useState("");

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error("Google didn't return a valid credential. Please try again.");
      return;
    }

    if (mode === "register") {
      setRegisterationId(idToken);
      setIsModalOpen(true);
    } else {
      googleLogin(
        { idToken },
        {
          onSuccess: () => {
            toast.success("Login successful");
            router.push("/onboarding");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  const handleRegister = (idToken: string, userType: AccountType) => {
    googleSignUp(
      { idToken, userType },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          router.push("/login");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <div className="relative h-14">
      <Button
        disabled={isPending}
        type="button"
        variant="outline"
        className="h-14! w-full text-heading-xs-semibold pointer-events-none"
      >
        {isPending && <Loader2 className="animate-spin" />}

        <GoogleLogo />
        <p>
          {mode === "register"
            ? "Create with Google Account"
            : "Sign in with Google Account"}
        </p>
      </Button>

      {!isPending && (
        <div className="absolute inset-0 overflow-hidden opacity-0 [&>div]:h-full! [&>div]:w-full! [&_iframe]:h-full! [&_iframe]:w-full!">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => toast.error("Google sign-in failed")}
            useOneTap={mode === "login"}
          />
        </div>
      )}

      <SelectAccountTypeModal
        onSubmit={({ userType }) => handleRegister(registerationId, userType as AccountType)}
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
    </div>
  );
}

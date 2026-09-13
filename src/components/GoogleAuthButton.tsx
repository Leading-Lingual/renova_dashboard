"use client";
import { Button } from "./ui/button";
import { GoogleLogo } from "@/assets/GoogleLogo";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import {
  googleLoginMutation,
  googleRegisterMutation,
} from "@/actions/auth/auth.mutation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface GoogleAuthButtonProps {
  mode: "login" | "register";
  onAuthStateChange?: (isAuthenticating: boolean) => void;
}

export function GoogleAuthButton({
  mode,
  onAuthStateChange,
}: GoogleAuthButtonProps) {
  const router = useRouter();

  const { mutate: googleLogin, isPending: loggingIn } =
    useMutation(googleLoginMutation);
  const { mutate: googleSignUp, isPending: signingUp } = useMutation(
    googleRegisterMutation,
  );

  const isPending = loggingIn || signingUp;

  useEffect(() => {
    onAuthStateChange?.(isPending);
  }, [isPending, onAuthStateChange]);

  const handleContinuewithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => {
      if (mode === "register") {
        googleSignUp(
          { code },
          {
            onSuccess: (result) => {
              toast.success("Sign in successful");
              if (result.isProfileComplete) {
                router.push("/home");
              } else {
                router.push("/onboarding");
              }
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      } else {
        googleLogin(
          { code },
          {
            onSuccess: (result) => {
              toast.success("Login successful");
              if (result.isProfileComplete) {
                router.push("/home");
              } else {
                router.push("/onboarding");
              }
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error("failed to sign in with google");
    },
  });

  return (
    <div className="relative h-14">
      <Button
        disabled={isPending}
        type="button"
        variant="outline"
        onClick={() => handleContinuewithGoogle()}
        className="h-14! w-full text-heading-xs-semibold"
      >
        {isPending && <Loader2 className="animate-spin" />}

        <GoogleLogo />
        <p>
          {mode === "register"
            ? "Create with Google Account"
            : "Sign in with Google Account"}
        </p>
      </Button>
    </div>
  );
}

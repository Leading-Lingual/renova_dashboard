import { mutationOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import {
  GoogleLoginPayload,
  LoginPayload,
  LoginResponse,
  ResendEmailVerifyPayload,
  SignUpPayload,
  SignUpResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  VerifyPasswordOTP,
} from "@/types/auth.types";

export const loginMutation = mutationOptions({
  mutationKey: ["auth", "login"],
  mutationFn: (payload: LoginPayload) =>
    apiClient<LoginResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        ...payload,
      }),
    }),
});

export const signUpMutation = mutationOptions({
  mutationKey: ["auth", "sign-up"],
  mutationFn: (payload: SignUpPayload) =>
    apiClient<SignUpResponse>("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const verifyEmailMutation = mutationOptions({
  mutationKey: ["verify-email"],
  mutationFn: (payload: VerifyEmailPayload) =>
    apiClient<VerifyEmailResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify({ action: "signup", ...payload }),
    }),
});

export const resendOTP = mutationOptions({
  mutationKey: ["auth", "resendOTP"],

  mutationFn: (payload: ResendEmailVerifyPayload) =>
    apiClient<{ message: string }>("/v1/auth/email/resend", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const forgotPasswordMutation = mutationOptions({
  mutationKey: ["auth", "forgotPassword"],

  mutationFn: (payload: ResendEmailVerifyPayload) =>
    apiClient<{ message: string }>("/v1/auth/password/forgot", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const verifyPasswordOTP = mutationOptions({
  mutationKey: ["auth", "verifyPasswordOTP"],

  mutationFn: (payload: ResendEmailVerifyPayload) =>
    apiClient<{ resetToken: string }>("/v1/auth/password/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const resetPasswordMutation = mutationOptions({
  mutationKey: ["auth", "resetPassword"],

  mutationFn: (payload: VerifyPasswordOTP) =>
    apiClient<{ message: string }>("/v1/auth/password/reset", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const logoutMutation = mutationOptions({
  mutationKey: ["auth", "logout"],

  mutationFn: () =>
    apiClient<{ message: string }>("/api/logout", {
      method: "POST",
    }),
});

export const googleRegisterMutation = mutationOptions({
  mutationKey: ["auth", "google", "register"],
  mutationFn: (payload: GoogleLoginPayload) =>
    apiClient<LoginResponse>("/api/google", {
      method: "POST",
      body: JSON.stringify({
        action: "signup",
        ...payload,
      }),
    }),
});

export const googleLoginMutation = mutationOptions({
  mutationKey: ["auth", "google", "login"],
  mutationFn: (payload: GoogleLoginPayload) =>
    apiClient<LoginResponse>("/api/google", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        ...payload,
      }),
    }),
});

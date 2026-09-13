import {
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
  verifyEmailSchema,
} from "@/validations/auth.validation";
import * as z from "zod";

export type LoginPayload = z.infer<typeof loginSchema>;
export type SignUpPayload = Omit<
  z.infer<typeof signUpSchema>,
  "confirmPassword"
>;
export type VerifyEmailPayload = z.infer<typeof verifyEmailSchema>;
export type ResendEmailVerifyPayload = {
  email: string;
};
export type VerifyPasswordOTP = z.infer<typeof resetPasswordSchema>;

export interface SignUpResponse {
  message: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl: string;
  };
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  csrfToken: string;
  isProfileComplete: boolean;
}

export interface VerifyEmailResponse {
  message: string;
}

export type AccountType = "INDIVIDUAL" | "AGENT" | "NGO";

export interface GoogleRegisterPayload {
  registrationToken: string;
}

export interface GoogleLoginPayload {
  code: string;
}

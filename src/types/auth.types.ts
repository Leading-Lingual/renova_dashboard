import { loginSchema, resetPasswordSchema, signUpSchema, verifyEmailSchema } from "@/validations/auth.validation";
import * as z from "zod";

export type LoginPayload = z.infer<typeof loginSchema>;
export type SignUpPayload = z.infer<typeof signUpSchema>;
export type VerifyEmailPayload= z.infer<typeof verifyEmailSchema>;
export type ResendEmailVerifyPayload = {
  email:string
}
export type VerifyPasswordOTP= z.infer<typeof resetPasswordSchema>

export interface SignUpResponse {
  message: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  csrfToken: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export type AccountType =  "INDIVIDUAL" | "AGENT" | "NGO"

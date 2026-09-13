import { email, object, string } from "zod";

export const loginSchema = object({
  email: email("Please enter your email address"),
  password: string().trim().nonempty("Please enter your password"),
});

export const signUpSchema = object({
  email: email("Please enter your email address"),
  password: string()
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character.",
    ),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const verifyEmailSchema = object({
  email:  email("Please enter your email address"),
  otp: string().trim().min(6, "Please input your 6-digit verification code"),
});

export const forgetPasswordSchema = object({
  email: email("Please enter your email address"),
});

export const resetPasswordSchema = object({
  resetToken: string(),
  newPassword: string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character.",
    ),
  confirmPassword: string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

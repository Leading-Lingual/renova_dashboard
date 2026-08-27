import { array, object, string } from "zod";

export const AccountSetUpSchema = object({
  accountType: string(),
  options: array(string()).min(1, "Select at least one option"),
});

export const PersonInfoSchema = object({
  name: string(),
  phone: string(),
  location: string(),
  referralCode: string().optional()
});
import { z } from "zod";

export const kycSubmissionSchema = z
  .object({
    nin: z.string(),
    rcNumber: z.string(),
    companyName: z.string(),
  })
  .superRefine((values, context) => {
    if (!values.nin.trim() && !values.rcNumber.trim() && !values.companyName.trim()) {
      context.addIssue({
        code: "custom",
        path: ["nin"],
        message: "Enter your NIN or company registration details",
      });
      return;
    }

    if (values.rcNumber.trim() && !values.companyName.trim()) {
      context.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company or organization name is required",
      });
    }

    if (values.companyName.trim() && !values.rcNumber.trim()) {
      context.addIssue({
        code: "custom",
        path: ["rcNumber"],
        message: "RC number is required",
      });
    }
  });

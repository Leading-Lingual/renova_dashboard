import { z } from "zod";
import { kycSubmissionSchema } from "@/validations/kyc.validation";

export type KycSubmissionFormValues = z.infer<typeof kycSubmissionSchema>;
export type KycSubmission =
  | { nin: string }
  | { rcNumber: string; companyName: string };

export type KycVerificationType = "NIN" | "CAC" | null;
export type KycVerificationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "VERIFIED"
  | "FAILED"
  | "REVOKED";

export interface KycVerification {
  id: string | null;
  accountType: "INDIVIDUAL" | "BUSINESS" | "NGO" | "ADMIN" | null;
  type: KycVerificationType;
  status: KycVerificationStatus;
  identifierLast4: string | null;
  verifiedName: string | null;
  verifiedAt: string | null;
  revokedAt: string | null;
  revocationReason: string | null;
  attemptsRemaining: number;
  isKycVerified: boolean;
}

import {
  bankSchema,
  createWithdrawSchema,
} from "@/validations/wallet.validation";
import z from "zod";

export type bankFormValues = z.infer<typeof bankSchema>;

export type WithdrawFormValues = z.infer<
  ReturnType<typeof createWithdrawSchema>
>;
export type BankAccount = {
  id: string;
  bank: string;
  accountNumber: string;
  isDefault: boolean;
};

export interface WalletTransaction {
  id: string;
  description: string;
  amount: string;
  date: string;
  status: string;
  reference?: string;
  type: "CREDIT" | "DEBIT";
}

export interface getWalletResponse {
  currency: string;
  pending: string;
  available: string;
  held: string;
  withdrawn: string;
  negative: string;
  canWithdraw: boolean;
  lifetimeEarnings: string;
  totalPaidToBank: string;
  totalPayoutCharges: string;
  totalReversedEarnings: string;
  payoutInProgress: string;
  nextReleaseAt: string;
}

export type TransactionTypes =
  | "EARNING_CREDIT"
  | "EARNING_RELEASE"
  | "DISPUTE_HOLD"
  | "DISPUTE_RELEASE"
  | "REFUND_REVERSAL"
  | "PAYOUT_RESERVE"
  | "PAYOUT_SUCCESS"
  | "PAYOUT_RELEASE"
  | "ADJUSTMENT";

export type TransactionDestination = "EXTERNAL";
export type TransactionEntityTypes =
  | "ORDER"
  | "DELIVERY_JOB"
  | "PAYOUT"
  | "REFUND"
  | "DISPUTE";
export interface Transaction {
  id: string;
  type: TransactionTypes;
  from: TransactionDestination;
  to: TransactionDestination;
  amount: string;
  currency: string;
  reference: string;
  description: string;
  relatedEntity: {
    type: TransactionEntityTypes;
    id: string;
    reference: string;
  };
  metadata: {
    additionalProp1: string;
  };
  createdAt: string;
}
export interface getTransactionsResponse {
  items: Transaction[];
  nextCursor: string;
}

export type EarningTypes = "SELLER_ORDER" | "COLLECTOR_DELIVERY";
export type EarningStatus =
  | "PENDING"
  | "AVAILABLE"
  | "HELD"
  | "REVERSED"
  | "WITHDRAWN";

export type EarningSourceType = "ORDER" | "DELIVERY_JOB";

export interface Earning {
  id: string;
  type: EarningTypes;
  status: EarningStatus;
  amount: string;
  reversedAmount: string;
  remainingAmount: string;
  currency: string;
  source: {
    type: EarningSourceType;
    id: string;
    reference: string;
    materials: string[];
  };
  releaseAt: string;
  releasedAt: string;
  createdAt: string;
}
export interface getEarningResponse {
  items: Earning[];
  nextCursor: string;
}

export interface PayoutAccount {
  id: string;
  bankCode: string;
  bankName: string;
  accountName: string;
  maskedAccountNumber: string;
  updatedAt: string;
  isDefault: boolean
}

export interface PayoutAccountsResponse{
  items:PayoutAccount[],
  defaultAccountId: string
}
export interface getPayoutAccounts {
  items: PayoutAccount[];
}

export interface Bank {
  name: string;
  code: string;
  active: boolean;
}
export type BanksResponse = Bank[];


export type PayoutStatus =
  | "INITIALIZING"
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "REVERSED"
  | "REVIEW";

export interface Payout {
  amount: string;
  transferFee: string;
  stampDuty: string;
  totalDebit: string;
  currency: string;
  id: string;
  reference: string;
  status: PayoutStatus;
  failureReason: string;
  destination: {
    bankCode: string;
    bankName: string;
    accountName: string;
    maskedAccountNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface PayoutsResponse {
  items: Payout[];
  defaultAccountId: string;
}

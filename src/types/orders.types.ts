import { CartListing, CartListingSummary } from "./cart.types";
import { SellerDetails } from "./listing.types";
import { Location } from "./user.type";

export type OrderTimeLineType =
  | "ORDER_PLACED"
  | "PAYMENT_CONFIRMED"
  | "SELLER_NOTIFIED"
  | "ORDER_READY"
  | "RECEIPT_CONFIRMED"
  | "PAYMENT_FAILED"
  | "PAYMENT_EXPIRED"
  | "PAYMENT_UNDER_REVIEW"
  | "PAYMENT_RETRY_STARTED";

export type OrderStatus =
  | "AWAITING_PAYMENT"
  | "PAID"
  | "READY_FOR_FULFILLMENT"
  | "COMPLETED"
  | "PAYMENT_FAILED"
  | "EXPIRED";

export interface OrderCount {
  all: number;
  inProgress: number;
  completed: number;
  awaitingPayment: number;
  paid: number;
  readyForFulfillment: number;
  paymentFailed: number;
  expired: number;
}

export interface OrderTimeline {
  id: string;
  type: OrderTimeLineType;
  paymentAttemptId: string;
  metadata: {
    purchaseId: string;
  };
  occurredAt: string;
}

export interface Review {
  id: string;
  rating?: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  purchaseId: string;
  status: OrderStatus;
  buyer: SellerDetails;
  seller: SellerDetails;
  items: CartListing[];
  deliveryLocation: Location;
  summary: CartListingSummary;
  paidAt: string;
  readyAt: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  canReview: true;
  review: Review;
  timeline: OrderTimeline[];
}

export interface GetOrdersResponse {
  items: Order[];
  counts: OrderCount;
  nextCursor: string;
}

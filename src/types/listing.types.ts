import { listingSchema } from "@/validations/listing.validation";
import * as z from "zod";
import { AccountType, Location } from "./user.type";

export type listingFormValues = z.infer<typeof listingSchema>;

export type ImageOjectType = {
  id: string;
  url: string;
  expiresAt: string;
  width: number;
  height: number;
};

export type PickupPreference = "COLLECTOR_PICKUP" | "RENOVA_DROPOFF";
export type MaterialType =
  | "PLASTIC_PET"
  | "PLASTIC_HDPE"
  | "IRON"
  | "ALUMINIUM"
  | "COPPER"
  | "E_WASTE"
  | "GLASS"
  | "PAPER";

export type ListingSort = "NEWEST" | "OLDEST" | "PRICE_ASC" | "PRICE_DESC";

export type ListingStatus =
  | "DRAFT"
  | "AVAILABLE"
  | "ARCHIVED"
  | "PENDING"
  | "SOLD";

export type SellerDetails = {
  id: string;
  fullName: string;
  avatarUrl: string;
  accountType?: AccountType;
  phoneNumber?: string;
  averageRating: string;
  reviewCount: number;
};
export interface Listing {
  id: string;
  scanId: string;
  materialName: string;
  materialType: MaterialType;
  quantityKg: string;
  pricePerKg: string;
  estimatedTotal: string;
  unit: string;
  currency: string;
  pickupPreference: PickupPreference;
  status: ListingStatus;
  images?: ImageOjectType[];
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  location?: Location;
  seller?: SellerDetails;
  isSaved?: boolean;
}

export interface Count {
  all: number;
  draft: number;
  available: number;
  archived: number;
}

export interface GetListingResponse {
  items: Listing[];
  nextCursor: string;
  counts: Count;
}

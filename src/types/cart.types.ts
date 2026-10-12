import { Listing, SellerDetails } from "./listing.types";

export interface CartListing extends Pick<
  Listing,
  | "materialType"
  | "materialName"
  | "quantityKg"
  | "pricePerKg"
  | "estimatedTotal"
  | "unit"
  | "currency"
  | "pickupPreference"
> {
  listingId: string;
  imageUrl: string | null;
  seller: Pick<SellerDetails, "id" | "fullName" | "avatarUrl">;
  isAvailable: boolean;
}

export interface CartListingSummary {
  itemCount: number;
  subtotal: string;
  serviceFee: string;
  logisticsFee: string;
  total: string;
  currency: string;
}

export interface CartListingsResponse {
  items: CartListing[];
  summary: CartListingSummary;
}

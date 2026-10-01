import { Listing } from "./listing.types";

export type MarketplaceCount = {
  available: number;
  saved: number;
};
export interface GetMarketplaceListingResponse {
  items: Listing[];
  nextCursor: string;
  counts: MarketplaceCount;
}

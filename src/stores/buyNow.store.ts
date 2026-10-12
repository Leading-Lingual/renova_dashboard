import type { Listing } from "@/types/listing.types";
import { create } from "./createStore";
import { CartListingsResponse } from "@/types/cart.types";

interface BuyNowStore {
  item: CartListingsResponse | null;
  setBuyNowItem: (item: Listing) => void;
  clearBuyNowItem: () => void;
  getBuyNowItem: () => CartListingsResponse | null;
}

export const useBuyNowStore = create<BuyNowStore>()((set, get) => ({
  item: null,
  setBuyNowItem: (item) =>
    set({
      item: item ? {
        items: [
          {
            materialType: item.materialType,
            materialName: item.materialType,
            quantityKg: item.quantityKg,
            pricePerKg: item.pricePerKg,
            estimatedTotal: item.estimatedTotal,
            unit: item.unit,
            currency: item.currency,
            pickupPreference: item.pickupPreference,
            seller: {
              id: item.seller?.id ?? "",
              fullName: item.seller?.fullName ?? "",
              avatarUrl: item.seller?.avatarUrl ?? "",
            },
            isAvailable: true,
            listingId: item.id,
            imageUrl: item.images?.[0].url ?? "",
          },
        ],
        summary: {
          itemCount: 1,
          subtotal: item.estimatedTotal,
          serviceFee: "500",
          logisticsFee: "0",
          total: item.estimatedTotal,
          currency: item.currency,
        },
      } : null,
    }),
  clearBuyNowItem: () => set({ item: null }),
  getBuyNowItem: () => get().item,
}));

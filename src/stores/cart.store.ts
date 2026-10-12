import { create } from "./createStore";
import { persist } from "zustand/middleware";
import type { Listing } from "@/types/listing.types";

interface CartStore {
  items: Listing[];
  addToCart: (item: Listing) => void;
  removeFromCart: (listingId: Listing["id"]) => void;
  clearCart: () => void;
  getItemsInCart: () => Listing[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) =>
        set((state) =>
          state.items.some((cartItem) => cartItem.id === item.id)
            ? state
            : { items: [...state.items, item] },
        ),
      removeFromCart: (listingId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== listingId),
        })),
      clearCart: () => set({ items: [] }),
      getItemsInCart: () => [...get().items],
    }),
    {
      name: "renova-cart",
      skipHydration: true,
    },
  ),
);

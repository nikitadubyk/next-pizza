import { create } from "zustand";

import { CreateCartItemValues } from "@/types";

import { API } from "../services";
import { CartStateItem, getCartDetails } from "../lib";

export interface CartState {
  error: boolean;
  loading: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
}

const initialLoadingStateRequest = { loading: true, error: false };

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  addCartItem: async () => {},
  removeCartItem: async () => {},
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(initialLoadingStateRequest);
      const data = await API.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  fetchCartItems: async () => {
    try {
      set(initialLoadingStateRequest);
      const data = await API.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));

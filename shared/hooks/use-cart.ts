import { useEffect } from "react";

import { CreateCartItemValues } from "@/types";

import { useCartStore } from "../store";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
  loading: boolean;
  totalAmount: number;
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
};

/**
 * Custom hook that provides cart-related state and actions.
 *
 * @returns {ReturnProps} An object containing loading state, total amount, items in the cart,
 *                        and functions to remove an item, add an item, and update item quantity.
 */
export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};

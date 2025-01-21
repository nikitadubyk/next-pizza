import { CartDTO } from "@/types";

import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  disabled?: boolean;
  pizzaSize?: number;
  pizzaType?: number;
  ingredients: { name: string; price: number }[];
};

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
}

/**
 * Extracts detailed information from the cart data and formats it for display.
 *
 * @param {CartDTO} data - The cart data transfer object containing items and total amount.
 * @returns {ReturnProps} An object containing formatted cart items and total amount.
 */
export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    disabled: false,
    quantity: item.quantity,
    pizzaSize: item.productItem.size,
    name: item.productItem.product.name,
    price: calcCartItemTotalPrice(item),
    pizzaType: item.productItem.pizzaType,
    imageUrl: item.productItem.product.imageUrl,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};

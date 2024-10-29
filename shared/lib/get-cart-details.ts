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

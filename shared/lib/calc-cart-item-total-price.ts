import { CartItemDTO } from "@/types";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  const pizzaPrices = Number(
    (item.productItem.price * item.quantity).toFixed(2)
  );

  return Number((ingredientsPrice + pizzaPrices).toFixed(2));
};

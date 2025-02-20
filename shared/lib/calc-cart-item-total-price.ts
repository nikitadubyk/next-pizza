import { CartItemDTO } from "@/types";

/**
 * Calculates the total price of a cart item, including the price of the base pizza and any added ingredients.
 * The price is rounded to two decimal places.
 *
 * @param item - The cart item object, containing information about the pizza, quantity, and added ingredients.
 * @returns The total price of the cart item, rounded to two decimal places.
 *
 * @example
 * const totalPrice = calcCartItemTotalPrice(cartItem); // Returns the total price as a number
 */
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

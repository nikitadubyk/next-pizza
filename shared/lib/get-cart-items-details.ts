import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

import { CartStateItem } from "./get-cart-details";

interface GetCartItemsDetails {
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  ingredients: CartStateItem["ingredients"];
}

/**
 * Generates a string representation of the cart item's details based on its properties.
 *
 * @param {{ pizzaSize?: string; pizzaType?: string; ingredients?: Array<{ name: string }> }} params - The parameters containing pizza size, type, and ingredients.
 * @returns {string} A formatted string detailing the pizza size, type, and ingredients.
 */
export const getCartItemsDetails = ({
  pizzaSize,
  pizzaType,
  ingredients,
}: GetCartItemsDetails) => {
  const details = [];

  if (pizzaType && pizzaSize) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details?.join(", ");
};

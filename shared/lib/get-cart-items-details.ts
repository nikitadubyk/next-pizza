import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

import { CartStateItem } from "./get-cart-details";

interface GetCartItemsDetails {
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  ingredients: CartStateItem["ingredients"];
}

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

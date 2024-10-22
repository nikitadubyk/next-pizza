import { Ingredient, ProductItem } from "@prisma/client";

import { PizzaSize, PizzaType } from "../constants";

interface CalcTotalPizzaPrice {
  size: PizzaSize;
  type: PizzaType;
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
}

/**
 * Function for calculating the total cost of a pizza
 *
 * @param size - pizza size
 * @param type - type pastry
 * @param items - pizzas list
 * @param ingredients - available inigredients
 * @param selectedIngredients - selected ingredients
 *
 * @returns total cost of a pizza
 */
export const calcTotalPizzaPrice = ({
  size,
  type,
  items,
  ingredients,
  selectedIngredients,
}: CalcTotalPizzaPrice) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price ?? 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, item) => acc + item.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return totalPrice;
};

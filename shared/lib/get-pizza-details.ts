import { ProductItem, Ingredient } from "@prisma/client";

import { mapPizzaType, PizzaSize, PizzaType } from "../constants";

import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

interface GetPizzaDetails {
  type: PizzaType;
  size: PizzaSize;
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
}

/**
 * Converts the first letter of the string to lowercase.
 * @param {string} name - The string to convert.
 * @returns {string} The string with the first letter converted to lowercase.
 */
const lowerTitle = (name: string) =>
  name[0].toLowerCase() + name.slice(1).toLowerCase();

/**
 * Calculates total price and creates a text description for a pizza.
 * @param {GetPizzaDetails} params - The details required for the pizza calculation.
 * @param {PizzaSize} params.size - The size of the pizza.
 * @param {PizzaType} params.type - The type of the pizza.
 * @param {ProductItem[]} params.items - The list of product items.
 * @param {Ingredient[]} params.ingredients - The list of available ingredients.
 * @param {Set<number>} params.selectedIngredients - The set of selected ingredient IDs.
 * @returns {{ totalPrice: number, textDetails: string }} - An object containing the total price and pizza details as text.
 */
export const getPizzaDetails = ({ size, type, ...props }: GetPizzaDetails) => {
  const totalPrice = calcTotalPizzaPrice({
    size,
    type,
    ...props,
  });

  const textDetails = `${size} см, ${lowerTitle(mapPizzaType[type])} тесто`;

  return { totalPrice, textDetails };
};

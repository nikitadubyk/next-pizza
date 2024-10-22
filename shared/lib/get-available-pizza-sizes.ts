import { ProductItem } from "@prisma/client";

import { pizzaSizes, PizzaType } from "../constants";

interface GetAvailablePizzaSizes {
  type: PizzaType;
  items: ProductItem[];
}

/**
 * Filters available pizza sizes based on the selected pizza type and items.
 *
 * @param {Object} params - The parameters for filtering pizza sizes.
 * @param {string} params.type - The selected pizza type to filter by.
 * @param {Array<Object>} params.items - The array of available pizza items to filter.
 * @param {string} params.items[].pizzaType - The type of each pizza item.
 * @param {number} params.items[].size - The size of each pizza item.
 *
 * @returns {Array<Object>} The list of pizza sizes with a `disabled` property indicating availability.
 */
export const getAvailablePizzaSizes = ({
  type,
  items,
}: GetAvailablePizzaSizes) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    ...item,
    disabled: !filteredPizzasByType.some((pizza) => pizza.size === +item.value),
  }));
};

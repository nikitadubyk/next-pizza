import { useSet } from "react-use";
import { useState, useEffect } from "react";
import { ProductItem } from "@prisma/client";

import { getAvailablePizzaSizes } from "../lib";
import { PizzaSize, PizzaType } from "../constants";
import { Variant } from "../components/shared/group-variants";

interface ReturnedProps {
  type: PizzaType;
  size: PizzaSize;
  availablePizzaSizes: Variant[];
  selectedIngredients: Set<number>;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (key: number) => void;
}

/**
 * Custom hook to manage pizza type, size, and selected ingredients based on available options.
 * @param {ProductItem[]} items - The list of product items for the pizza.
 * @returns {ReturnedProps} - The current pizza options, selected ingredients, and functions to update them.
 */
export const usePizzaOptions = (items: ProductItem[]): ReturnedProps => {
  const [type, setType] = useState<PizzaType>(1);
  const [size, setSize] = useState<PizzaSize>(20);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availablePizzaSizes = getAvailablePizzaSizes({ type, items });

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => +item.value === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find((value) => !value.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    type,
    size,
    setType,
    setSize,
    addIngredient,
    selectedIngredients,
    availablePizzaSizes,
  };
};

import { useSet } from "react-use";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PriceRange {
  priceTo?: number;
  priceFrom?: number;
}

interface QueryFilters extends PriceRange {
  sizes: string;
  pizzaTypes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  prices: PriceRange;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
  setSizes: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setPrices: (name: keyof PriceRange, value: number) => void;
}

/**
 * Custom hook to manage and update pizza filter options from URL search parameters.
 * @returns {ReturnProps} - The current filter states and functions to update them.
 */
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const getSearchParams = (name: keyof QueryFilters) =>
    searchParams.get(name)?.split(",") || "";

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set(getSearchParams("ingredients"))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set(searchParams.has("sizes") ? getSearchParams("sizes") : [])
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set(searchParams.has("pizzaTypes") ? getSearchParams("pizzaTypes") : [])
  );

  const [prices, setPrices] = useState<PriceRange>({
    priceTo: Number(searchParams.get("priceTo")) || undefined,
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
  });

  const updatePrice = (name: keyof PriceRange, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      prices,
      pizzaTypes,
      selectedIngredients,
      setSizes: toggleSizes,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices]
  );
};

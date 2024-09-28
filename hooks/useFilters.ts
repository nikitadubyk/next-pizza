import { useSet } from "react-use";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PriceProps {
  priceTo?: number;
  priceFrom?: number;
}

interface QueryFilters extends PriceProps {
  sizes: string;
  pizzaTypes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  prices: PriceProps;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
  setSizes: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setPrices: (name: keyof PriceProps, value: number) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
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

"use client";

import { Input } from "@/shared/components/ui/input";
import { pizzaSizes, pizzaTypes } from "@/shared/constants";
import { CheckboxFiltersGroup } from "@/shared/components/shared/checkbox-filters-group";
import {
  useFilters,
  useQueryFilters,
  useFilterIngredients,
} from "@/shared/hooks";

import { RangeSlider } from "../ui";

import { Title } from "./title";

interface FiltersProps {
  className?: string;
}

const commonPriceProps = {
  min: 0,
  max: 1000,
  type: "number" as const,
};

export const Filters = ({ className }: FiltersProps) => {
  const { isLoading, ingredients } = useFilterIngredients();

  const filters = useFilters();

  useQueryFilters(filters);

  const {
    sizes,
    prices,
    setSizes,
    setPrices,
    setPizzaTypes,
    pizzaTypes: types,
    selectedIngredients,
    setSelectedIngredients,
  } = filters;

  const ingredientItems = ingredients?.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        className="mb-5"
        title="Тип теста"
        items={pizzaTypes}
        selectedIds={types}
        onClickCheckbox={setPizzaTypes}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mb-5"
        items={pizzaSizes}
        selectedIds={sizes}
        onClickCheckbox={setSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            {...commonPriceProps}
            placeholder="0"
            value={prices?.priceFrom?.toString() || ""}
            onChange={(e) => setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            {...commonPriceProps}
            min={100}
            placeholder="30000"
            value={prices?.priceTo?.toString() || ""}
            onChange={(e) => setPrices("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          step={10}
          max={1000}
          value={[prices.priceFrom ?? 0, prices.priceTo ?? 1000]}
          onValueChange={([priceFrom, priceTo]) => {
            setPrices("priceTo", priceTo);
            setPrices("priceFrom", priceFrom);
          }}
        />
      </div>

      <CheckboxFiltersGroup
        limit={6}
        className="mt-5"
        title="Ингредиенты"
        isLoading={isLoading}
        items={ingredientItems}
        selectedIds={selectedIngredients}
        onClickCheckbox={setSelectedIngredients}
        defaultItems={ingredientItems?.slice(0, 6)}
      />
    </div>
  );
};

"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useFilters, useFilterIngredients } from "@/hooks";
import { FilterCheckbox } from "@/components/shared/filter-checkbox";
import { CheckboxFiltersGroup } from "@/components/shared/checkbox-filters-group";

import { RangeSlider } from "../ui";

import { Title } from "./title";

interface FiltersProps {
  className?: string;
}

interface PriceRange {
  priceTo: number;
  priceFrom: number;
}

const commonPriceProps = {
  min: 0,
  max: 1000,
  type: "number" as const,
};

export const Filters = ({ className }: FiltersProps) => {
  const filters = useFilters();
  const { isLoading, ingredients, ...checkboxProps } = useFilterIngredients();
  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const ingredientItems = ingredients?.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const onSetPrice = (name: keyof PriceRange, value: number) => {
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        className="mb-5"
        title="Тип теста"
        selectedIds={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mb-5"
        selectedIds={filters.sizes}
        onClickCheckbox={filters.setSizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            {...commonPriceProps}
            placeholder="0"
            defaultValue={0}
            value={priceRange.priceFrom.toString()}
            onChange={(e) => onSetPrice("priceFrom", Number(e.target.value))}
          />
          <Input
            {...commonPriceProps}
            min={100}
            placeholder="30000"
            value={priceRange.priceTo.toString()}
            onChange={(e) => onSetPrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          step={10}
          max={1000}
          value={[priceRange.priceFrom, priceRange.priceTo]}
          onValueChange={([priceFrom, priceTo]) => {
            setPriceRange({ priceTo, priceFrom });
          }}
        />
      </div>

      <CheckboxFiltersGroup
        {...checkboxProps}
        limit={6}
        title="Формат"
        className="mt-5"
        isLoading={isLoading}
        items={ingredientItems}
        defaultItems={ingredientItems?.slice(0, 6)}
      />
    </div>
  );
};

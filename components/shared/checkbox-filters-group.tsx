"use client";

import { useSet } from "react-use";
import { useState, useEffect, ChangeEvent } from "react";

import { useDebounce } from "@/hooks";

import { Input } from "../ui/input";

import { FilterCheckbox, FilterChecboxProps } from "./filter-checkbox";

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  limit?: number;
  className?: string;
  defaultItems?: Item[];
  defaultValue?: string[];
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  onChange,
  limit = 5,
  className,
  defaultItems,
  defaultValue,
  searchInputPlaceholder = "Поиск...",
}: CheckboxFiltersGroupProps) => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const debounceValue = useDebounce(search, 500);
  const [selected, { add, toggle }] = useSet<string>(new Set([]));

  const onCheckedChange = (value: string) => {
    toggle(value);
  };

  useEffect(() => {
    if (defaultValue) {
      defaultValue.forEach(add);
    }
  }, [defaultValue?.length]);

  useEffect(() => {
    onChange?.(Array.from(selected));
  }, [selected]);

  const list = showAll
    ? items.filter((value) =>
        value.text.toLowerCase().includes(debounceValue.toLowerCase())
      )
    : defaultItems || items;

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            value={search}
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            text={item.text}
            value={item.value}
            key={String(item.value)}
            endAdornment={item.endAdornment}
            checked={selected.has(item.value)}
            onCheckedChange={() => onCheckedChange(item.value)}
          />
        ))}
        {list.length === 0 && search && <p>Ничего не найдено...</p>}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            className="text-primary mt-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

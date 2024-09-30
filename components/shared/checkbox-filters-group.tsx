"use client";

import { useSet } from "react-use";
import { useState, useEffect, ChangeEvent } from "react";

import { useDebounce } from "@/hooks";

import { Input } from "../ui/input";

import { FilterCheckbox, FilterChecboxProps } from "./filter-checkbox";
import { Skeleton } from "../ui";

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  limit?: number;
  className?: string;
  isLoading?: boolean;
  defaultItems?: Item[];
  defaultValue?: string[];
  selectedIds: Set<string>;
  searchInputPlaceholder?: string;
  onClickCheckbox: (id: string) => void;
  onChange?: (values: string[]) => void;
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  onChange,
  isLoading,
  limit = 5,
  className,
  selectedIds,
  defaultItems,
  defaultValue,
  onClickCheckbox,
  searchInputPlaceholder = "Поиск...",
}: CheckboxFiltersGroupProps) => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const debounceValue = useDebounce(search, 500);

  useEffect(() => {
    if (defaultValue) {
      defaultValue.forEach(onClickCheckbox);
    }
  }, [defaultValue?.length]);

  useEffect(() => {
    onChange?.(Array.from(selectedIds));
  }, [selectedIds]);

  const list = showAll
    ? items.filter((value) =>
        value.text.toLowerCase().includes(debounceValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {new Array(limit).fill(null).map((_, index) => (
          <Skeleton key={index} className="h-6 w-full mb-4 rounded-full" />
        ))}
        <Skeleton className="h-6 w-28 mb-4 rounded-full" />
      </div>
    );
  }

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
            checked={selectedIds.has(item.value)}
            onCheckedChange={() => onClickCheckbox(item.value)}
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

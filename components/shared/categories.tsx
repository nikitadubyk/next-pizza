"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useCategoriesStore } from "@/store";

interface CategoriesProps {
  className?: string;
}

const cats = [
  { id: 1, name: "Пицца" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Коктейли" },
  { id: 5, name: "Кофе" },
  { id: 6, name: "Напитки" },
  { id: 7, name: "Десерты" },
];

export const Categories = ({ className }: CategoriesProps) => {
  const activeId = useCategoriesStore((store) => store.activeCategoryId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map(({ id, name }) => (
        <Link
          key={id}
          href={`#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeId === id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

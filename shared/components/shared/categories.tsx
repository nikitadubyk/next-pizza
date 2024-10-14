"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import { useCategoriesStore } from "@/shared/store";

interface CategoriesProps {
  className?: string;
  categories?: Category[];
}

export const Categories = ({ className, categories }: CategoriesProps) => {
  const activeId = useCategoriesStore((store) => store.activeCategoryId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories?.map(({ id, name }) => (
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

"use client";

import { useSet } from "react-use";
import { useState, useEffect } from "react";

import { API } from "@/services";
import { Ingredient } from "@prisma/client";

interface ReturnProps {
  isLoading: boolean;
  selectedIds: Set<string>;
  ingredients: Ingredient[];
  onClickCheckbox: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, { toggle }] = useSet<string>(new Set([]));
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const ingredients = await API.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getIngredients();
  }, []);

  return {
    isLoading,
    ingredients,
    selectedIds,
    onClickCheckbox: toggle,
  };
};

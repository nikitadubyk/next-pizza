"use client";

import { useState, useEffect } from "react";

import { API } from "@/shared/services";
import { Ingredient } from "@prisma/client";

interface ReturnProps {
  isLoading: boolean;
  ingredients: Ingredient[];
}

/**
 * Custom hook that fetches and filters a list of ingredients.
 * @returns {ReturnProps} An object containing loading state and the list of ingredients.
 */
export const useFilterIngredients = (): ReturnProps => {
  const [isLoading, setIsLoading] = useState(true);
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

  return { isLoading, ingredients };
};

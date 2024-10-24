import qs from "qs";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Filters } from "./use-filters";

/**
 * Custom hook to update the URL query parameters based on selected filters.
 * @param {Filters} filters - The current filter states.
 */
export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters]);
};

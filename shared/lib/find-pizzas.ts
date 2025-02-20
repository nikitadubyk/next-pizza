import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sizes?: string;
  sortBy?: string;
  priceTo?: string;
  priceFrom?: string;
  pizzaTypes?: string;
  ingredients?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

/**
 * Parses a comma-separated string of numbers into an array of numbers.
 * Returns an empty array if the input is undefined or empty.
 *
 * @param item - The comma-separated string of numbers.
 * @returns An array of numbers, or an empty array if the input is invalid.
 */
const getFilterNumbers = (item?: string) => item?.split(",").map(Number);

/**
 * Retrieves a list of pizza categories with associated products based on specified search parameters.
 *
 * @param params - The search parameters, including:
 *   - query: A search string (not currently used).
 *   - sizes: A comma-separated string of pizza sizes (e.g., "10,12,14").
 *   - sortBy: The sorting criteria (not currently used).
 *   - priceTo: The maximum price.
 *   - priceFrom: The minimum price.
 *   - pizzaTypes: A comma-separated string of pizza type IDs (e.g., "1,2,3").
 *   - ingredients: A comma-separated string of ingredient IDs (e.g., "1,2,3").
 *
 * @returns A promise that resolves to an array of categories, each containing products that match the criteria.
 *          Returns an empty array if no categories are found.
 *
 * @example
 * const pizzas = await findPizzas({ sizes: "10,12", priceTo: "20", pizzaTypes: "1,2" });
 */
export const findPizzas = async (params: GetSearchParams) => {
  const sizes = getFilterNumbers(params.sizes);
  const pizzaTypes = getFilterNumbers(params.pizzaTypes);
  const ingredientsIds = getFilterNumbers(params.ingredients);

  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsIds
            ? {
                some: {
                  id: {
                    in: ingredientsIds,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            orderBy: {
              price: "asc",
            },
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
      },
    },
  });

  return categories;
};

import { Category, Product, ProductItem, Ingredient } from "@prisma/client";

import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

interface ProductExtend extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}

interface CategoryWithProducts extends Category {
  products: ProductExtend[];
}

export const getAll = async () => {
  const { data } = await axiosInstance.get<CategoryWithProducts[]>(
    ApiRoutes.Categories
  );
  return data;
};

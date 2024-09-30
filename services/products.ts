import { Product } from "@prisma/client";

import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRoutes.ProductsSearch,
    query
      ? {
          params: { query },
        }
      : {}
  );
  return data;
};

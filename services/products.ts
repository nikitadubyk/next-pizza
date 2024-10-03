import { Product } from "@prisma/client";

import { ProductWithRelations } from "@/@types";

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

export const getById = async (id: string) => {
  const { data } = await axiosInstance.get<ProductWithRelations>(
    ApiRoutes.Product.replace("[id]", id)
  );

  return data;
};

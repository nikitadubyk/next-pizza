import { Ingredient } from "@prisma/client";

import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getAll = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.Ingredients);
  return data;
};

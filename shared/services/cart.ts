import { CartDTO } from "@/types";

import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  const response = await axiosInstance.get<CartDTO>(ApiRoutes.Cart);
  return response.data;
};

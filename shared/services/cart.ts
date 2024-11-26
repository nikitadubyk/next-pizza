import { CartDTO } from "@/types";

import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

/**
 * Fetches the current user's cart data.
 *
 * @returns {Promise<CartDTO>} A promise that resolves to the CartDTO object containing the user's cart data.
 * @throws {Error} Throws an error if the request fails or if there is an issue with the API response.
 */
export const getCart = async (): Promise<CartDTO> => {
  const response = await axiosInstance.get<CartDTO>(ApiRoutes.Cart);
  return response.data;
};

/**
 * Updates the quantity of a specific item in the user's cart.
 *
 * @param {number} itemId - The ID of the item to be updated.
 * @param {number} quantity - The new quantity for the specified item.
 * @returns {Promise<CartDTO>} A promise that resolves to the updated CartDTO object after modifying the item's quantity.
 * @throws {Error} Throws an error if the request fails or if there is an issue with the API response.
 */
export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  const response = await axiosInstance.patch<CartDTO>(
    ApiRoutes.UpdateCartItem.replace("[id]", String(itemId)),
    { quantity }
  );
  return response.data;
};

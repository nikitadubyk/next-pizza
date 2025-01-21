import { CartDTO, CreateCartItemValues } from "@/types";

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

/**
 * Removes an item from the cart by its ID.
 *
 * @param {number} id - The ID of the cart item to be removed.
 * @returns {Promise<CartDTO>} The updated cart data transfer object after removal.
 */
export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const response = await axiosInstance.delete<CartDTO>(
    ApiRoutes.DeleteCartItem.replace("[id]", String(id))
  );
  return response.data;
};

/**
 * Add item to cart.
 *
 * @param {CreateCartItemValues} values - The values for create new item in cart.
 * @returns {Promise<CartDTO>} The updated cart data transfer object after removal.
 */
export const addCartItem = async (
  values: CreateCartItemValues
): Promise<CartDTO> => {
  const response = await axiosInstance.post<CartDTO>(ApiRoutes.Cart, values);
  return response.data;
};

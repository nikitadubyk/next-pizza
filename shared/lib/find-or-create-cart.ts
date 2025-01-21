import { prisma } from "@/prisma/prisma-client";

/**
 * Finds an existing cart by token or creates a new one if it doesn't exist.
 *
 * @param {string} token - The token associated with the user's cart.
 * @returns {Promise<Cart>} The user's cart object, either found or newly created.
 */
export const findOrCreateCart = async (token: string) => {
  let userCart = await prisma.cart.findFirst({
    where: { token },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: { token },
    });
  }

  return userCart;
};

import { prisma } from "@/prisma/prisma-client";

import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

/**
 * Updates the total amount of a user's cart based on the items in the cart.
 *
 * @param {string} token - The unique token identifying the user's cart.
 * @returns {Promise<Object|null>} The updated cart object including items, or null if no cart was found.
 * @throws {Error} Throws an error if there is an issue retrieving or updating the cart.
 */
export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          ingredients: true,
          productItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.items.reduce(
    (acc, item) => acc + calcCartItemTotalPrice(item),
    0
  );

  return await prisma.cart.update({
    data: { totalAmount },
    where: { id: userCart.id },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          ingredients: true,
          productItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { CreateCartItemValues } from "@/types";
import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";

/**
 * Handles the GET request to retrieve the user's cart based on the token in cookies.
 *
 * @param {NextRequest} req - The request object containing the HTTP request details.
 * @returns {Promise<NextResponse>} The response object containing the user's cart or an empty cart if no token is found.
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: { OR: [{ token }] },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
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

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

/**
 * Handles the POST request to add an item to the user's cart.
 *
 * @param {NextRequest} req - The request object containing the HTTP request details.
 * @returns {Promise<NextResponse>} The response object containing the updated cart or an error message.
 */
export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          quantity: 1,
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            connect: data.ingredients?.map((id: number) => ({ id })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", token);
    return response;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}

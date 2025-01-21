import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the PATCH request to update the quantity of an item in the user's cart.
 *
 * @param {NextRequest} req - The incoming request object containing the item quantity.
 * @param {{ params: { id: string } }} params - An object containing route parameters, specifically the cart item ID.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the updated cart or an error message.
 * @throws {Error} Throws an error if there is an issue with database operations or request processing.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as { quantity: number };

    if (!token) {
      return NextResponse.json({ message: "Токен не удалось найти" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({
        message: "Не удалось найти товар из корзины",
      });
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Не удалось обновить корзину" },
      { status: 500 }
    );
  }
}

/**
 * Handles the DELETE request to remove a cart item.
 *
 * @param {NextRequest} req - The request object containing the HTTP request details.
 * @param {{ params: { id: string } }} params - The parameters from the request, including the cart item ID.
 * @returns {Promise<NextResponse>} The response object containing the updated cart or an error message.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Токен не удалось найти" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Не удалось найти товар из корзины" });
    }

    await prisma.cartItem.delete({
      where: { id: Number(params.id) },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не удалось удалить корзину" },
      { status: 500 }
    );
  }
}

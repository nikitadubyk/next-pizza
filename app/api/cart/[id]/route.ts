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

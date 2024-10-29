import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("cartToken")?.value;

  if (!token) {
    return NextResponse.json({ items: [], totalAmount: 0 });
  }

  const userCart = await prisma.cart.findFirst({
    where: { token },
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
}

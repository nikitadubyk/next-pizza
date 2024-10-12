import { NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const response = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });
  return NextResponse.json(response);
}

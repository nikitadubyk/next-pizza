import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products = await prisma.product.findMany();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredProducts.slice(0, 5));
}

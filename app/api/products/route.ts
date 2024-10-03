import { NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const response = await prisma.product.findMany();
  return NextResponse.json(response);
}

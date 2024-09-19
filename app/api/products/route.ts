import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const response = await prisma.product.findMany();
  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const product = await prisma.product.delete({ where: { id } });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
}

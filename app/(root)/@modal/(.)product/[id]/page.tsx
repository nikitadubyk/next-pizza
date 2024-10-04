import { notFound } from "next/navigation";

import { API } from "@/services";
import { ChooseProductModal } from "@/components/shared";

interface ProductModalPageProps {
  params: { id: string };
}

export default async function ProductModalPage({
  params,
}: ProductModalPageProps) {
  const { id } = params;

  const product = await API.products.getById(id);

  if (!product) {
    return notFound();
  }

  console.log("product", product);

  return <ChooseProductModal product={product} />;
}

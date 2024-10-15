import { notFound } from "next/navigation";

import { API } from "@/shared/services";
import { ChooseProductModal } from "@/shared/components/shared";

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

  return <ChooseProductModal product={product} />;
}

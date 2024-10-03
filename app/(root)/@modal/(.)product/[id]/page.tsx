import { notFound } from "next/navigation";

import { API } from "@/services";
import { PizzaSize } from "@/@types";
import {
  Title,
  Container,
  ProductImage,
  GroupVariants,
  ChooseProductModal,
} from "@/components/shared";

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

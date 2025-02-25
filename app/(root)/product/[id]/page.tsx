import { notFound } from "next/navigation";

import { API } from "@/shared/services";
import { Container, ProductForm } from "@/shared/components/shared";
interface ProductDetailsPageProps {
  params: { id: string };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = params;

  const product = await API.products.getById(id);

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}

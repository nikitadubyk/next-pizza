import { notFound } from "next/navigation";

import { API } from "@/shared/services";
import { PizzaSize } from "@/types";
import {
  Title,
  Container,
  PizzaImage,
  GroupVariants,
} from "@/shared/components/shared";

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
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={PizzaSize.Medium} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            size="md"
            text={product.name}
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            soluta voluptatum non necessitatibus maiores sequi ex eos voluptates
            praesentium veniam alias, delectus magnam minus, sunt eum ab,
            laboriosam odit ad?
          </p>

          <div className="flex flex-col gap-4 mt-5">
            <GroupVariants
              value="1"
              items={[
                {
                  value: "1",
                  name: "Маленькая",
                },
                {
                  value: "2",
                  name: "Средняя",
                },
                {
                  value: "3",
                  name: "Большая",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

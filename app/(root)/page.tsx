import { Suspense } from "react";

import { findPizzas, GetSearchParams } from "@/shared/lib";
import {
  Title,
  Filters,
  Container,
  SortPopup,
  Categories,
  ProductsGroupList,
} from "@/shared/components/shared";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <Suspense>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10">
        <Container className="flex justify-between">
          <Categories categories={categories} />
          <SortPopup />
        </Container>
      </div>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="min-w-[250px]">
            <Filters />
          </div>
          <div className="flex flex-col gap-16">
            {categories?.map((category) => (
              <ProductsGroupList
                key={category.id}
                title={category.name}
                categoryId={category.id}
                items={category.products}
              />
            ))}
          </div>
        </div>
      </Container>
    </Suspense>
  );
}

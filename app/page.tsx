import {
  Title,
  Filters,
  Container,
  SortPopup,
  Categories,
  ProductsGroupList,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10">
        <Container className="flex justify-between">
          <Categories />
          <SortPopup />
        </Container>
      </div>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="min-w-[250px]">
            <Filters />
          </div>
          <div className="flex flex-col gap-16">
            <ProductsGroupList
              title="Пиццы"
              categoryId={1}
              items={[
                {
                  id: 1,
                  name: "Сырная",
                  items: [{ price: 150 }],
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                },
                {
                  id: 2,
                  name: "Мясная с аджикой",
                  items: [{ price: 150 }],
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                },
              ]}
            />
            <ProductsGroupList
              title="Комбо"
              categoryId={2}
              items={[
                {
                  id: 1,
                  name: "Чикен бокс",
                  items: [{ price: 150 }],
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EEB05826E64288A83EFCF67DA86AAE.avif",
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

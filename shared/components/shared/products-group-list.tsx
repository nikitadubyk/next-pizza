"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIntersection } from "react-use";

import { Routes } from "@/shared/services";
import { ProductWithRelations } from "@/types";
import { cn, generatePath } from "@/shared/lib";
import { useCategoriesStore } from "@/shared/store";

import { Title } from "./title";
import { ProductCard } from "./product-card";

interface ProductsGroupListProps {
  title: string;
  className?: string;
  categoryId: number;
  listClassName?: string;
  items: ProductWithRelations[];
}

export const ProductsGroupList = ({
  title,
  items,
  className,
  categoryId,
  listClassName,
}: ProductsGroupListProps) => {
  const route = useRouter();
  const intersectionRef = useRef<HTMLDivElement>(null);
  const setActiveCategoryId = useCategoriesStore(
    (store) => store.setActiveCategoryId
  );

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [title, categoryId, intersection?.isIntersecting]);

  return (
    <div id={title} ref={intersectionRef} className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-12", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            count={i % 2}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
            onClick={() =>
              route.push(
                generatePath(Routes.Product.Details, { id: product.id })
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

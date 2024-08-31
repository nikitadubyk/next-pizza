"use client";

import { useRef, useEffect } from "react";
import { useIntersection } from "react-use";

import { cn } from "@/lib/utils";

import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoriesStore } from "@/store";

interface ProductItem {
  price: number;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  items: ProductItem[];
}

interface ProductsGroupListProps {
  title: string;
  items: Product[];
  className?: string;
  categoryId: number;
  listClassName?: string;
}

export const ProductsGroupList = ({
  title,
  items,
  className,
  categoryId,
  listClassName,
}: ProductsGroupListProps) => {
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
          />
        ))}
      </div>
    </div>
  );
};

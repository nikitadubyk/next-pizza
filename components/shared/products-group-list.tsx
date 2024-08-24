import React from "react";

import { Title } from "./title";
import { ProductCard } from "./product-card";

interface ProductsGroupListProps {
  title: string;
  items: any[];
  className?: string;
}

export const ProductsGroupList = ({
  title,
  items,
  className,
}: ProductsGroupListProps) => (
  <div className={className}>
    <Title text={title} size="lg" className="font-extrabold mb-5" />
    <div className="grid grid-cols-3 gap-12">
      {items.map((item, i) => (
        <ProductCard
          key={item.id}
          price={390}
          count={i % 2}
          name="Маргарита"
          imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
        />
      ))}
    </div>
  </div>
);

"use client";

import toast from "react-hot-toast";

import { useCartStore } from "@/shared/store";
import { ProductWithRelations } from "@/types";

import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface ProductFormProps {
  onSubmit?: VoidFunction;
  product: ProductWithRelations;
}

export const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.items[0];
  const isPizzaForm = product.items.some((value) => !!value.pizzaType);

  const handleSubmit = async (
    productItemId?: number,
    ingredients?: number[]
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        ingredients,
        productItemId: itemId,
      });

      toast.success(`${product.name} успешно добавлен в корзину`);

      onSubmit?.();
    } catch (err) {
      toast.success(`Не удалось добавить продукт в корзину`);
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm {...product} loading={loading} onSubmit={handleSubmit} />
    );
  }

  return (
    <ChooseProductForm {...product} loading={loading} onSubmit={handleSubmit} />
  );
};

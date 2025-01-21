"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { ProductWithRelations } from "@/types";
import { Dialog, DialogContent } from "@/shared/components/ui";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal = ({
  product,
  className,
}: ChooseProductModalProps) => {
  const router = useRouter();
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={router.back}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            {...product}
            loading={loading}
            onSubmit={handleSubmit}
          />
        ) : (
          <ChooseProductForm
            {...product}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";
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
  const isPizzaForm = product.items.some((value) => !!value.pizzaType);

  return (
    <Dialog open={!!product} onOpenChange={router.back}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm {...product} onSubmit={() => {}} />
        ) : (
          <ChooseProductForm {...product} onSubmit={() => {}} />
        )}
      </DialogContent>
    </Dialog>
  );
};

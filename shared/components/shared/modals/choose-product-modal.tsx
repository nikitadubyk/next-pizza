"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";
import { ProductWithRelations } from "@/types";
import { Dialog, DialogContent } from "@/shared/components/ui";
import { ProductForm } from "@/shared/components/shared";

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal = ({
  product,
  className,
}: ChooseProductModalProps) => {
  const router = useRouter();

  return (
    <Dialog open={!!product} onOpenChange={router.back}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};

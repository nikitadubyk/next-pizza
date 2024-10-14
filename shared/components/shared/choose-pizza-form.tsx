"use client";

import { useState } from "react";
import { ProductItem } from "@prisma/client";

import { cn } from "@/shared/lib/utils";
import { Title, PizzaImage } from "@/shared/components/shared";

import { Button } from "../ui";

interface ChoosePizzaFormProps {
  name: string;
  imageUrl: string;
  loading?: boolean;
  className?: string;
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm = ({
  name,
  items,
  loading,
  imageUrl,
  onSubmit,
  className,
}: ChoosePizzaFormProps) => {
  const [] = useState();

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium,
          eius? Quos quibusdam harum, temporibus enim ea vitae dignissimos,
          quasi fugiat quas excepturi iste ullam illo tenetur quam repudiandae
          animi voluptate.
        </p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {350} ₽
        </Button>
      </div>
    </div>
  );
};

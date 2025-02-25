import Image from "next/image";
import { Plus } from "lucide-react";

import { cn } from "@/shared/lib";
import { Ingredient } from "@prisma/client";

import { Button } from "../ui";

import { Title } from "./title";
import { CountButton } from "./count-button";

interface ProductCardProps {
  name: string;
  price: number;
  count?: number;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
  ingredients: Ingredient[];
}

export const ProductCard = ({
  name,
  price,
  count,
  onClick,
  imageUrl,
  className,
  ingredients,
}: ProductCardProps) => (
  <div onClick={onClick} className={cn(className)}>
    <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
      <Image alt="Logo" width={215} height={215} src={imageUrl} />
    </div>
    <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
    <p className="text-sm text-gray-400">
      {ingredients.map((ingredient) => ingredient.name).join(", ")}
    </p>

    <div className="flex justify-between items-center mt-4">
      <span className="text-[20px]">
        от <b>{price} ₽</b>
      </span>

      {count ? (
        <CountButton value={count} size="lg" />
      ) : (
        <Button variant="secondary">
          <Plus className="w-4 h-4 mr-1" />
          Добавить
        </Button>
      )}
    </div>
  </div>
);

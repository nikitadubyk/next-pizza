import Image from "next/image";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui";

import { Title } from "./title";
import { CountButton } from "./count-button";

interface ProductCardProps {
  name: string;
  price: number;
  count?: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard = ({
  name,
  price,
  count,
  imageUrl,
  className,
}: ProductCardProps) => (
  <div className={cn(className)}>
    <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
      <Image alt="Logo" width={215} height={215} src={imageUrl} />
    </div>
    <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
    <p className="text-sm text-gray-400">
      Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
      альфредо, чеснок
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

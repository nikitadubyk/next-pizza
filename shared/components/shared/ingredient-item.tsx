import { CircleCheck } from "lucide-react";

import { cn } from "@/shared/lib";

interface IngredientItemProps {
  name: string;
  price: number;
  imageUrl: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const IngredientItem = ({
  name,
  price,
  active,
  onClick,
  imageUrl,
  className,
}: IngredientItemProps) => (
  <div
    className={cn(
      "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
      { "border border-primary": active },
      className
    )}
    onClick={onClick}
  >
    {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
    <img width={110} height={110} src={imageUrl} alt="ingrediet" />
    <span className="text-xs mb-1">{name}</span>
    <span className="font-bold">{price} ₽</span>
  </div>
);

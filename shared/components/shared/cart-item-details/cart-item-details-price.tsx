import { cn } from "@/shared/lib/utils";

interface CartItemDetailsPriceProps {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice = ({
  value,
  className,
}: CartItemDetailsPriceProps) => (
  <h2 className={cn("font-bold", className)}>{value} ₽</h2>
);

import { cn } from "@/shared/lib/utils";
import { PizzaSize, PizzaType } from "@/shared/constants";

interface CartItemInfoProps {
  name: string;
  details: string;
  type?: PizzaType;
  className?: string;
  pizzaSize?: PizzaSize;
}

export const CartItemInfo = ({
  name,
  details,
  className,
}: CartItemInfoProps) => {
  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};

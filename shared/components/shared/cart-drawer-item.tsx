import React from "react";
import { Trash2Icon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { PizzaSize, PizzaType } from "@/shared/constants";

import { CountButton } from "./count-button";
import * as CartItem from "./cart-item-details";
import { OperationType } from "@/types";

interface CartDrawerItemProps extends CartItem.CartItemProps {
  id: number;
  type?: PizzaType;
  className?: string;
  pizzaSize?: PizzaSize;
  onClickCountButton?: (type: OperationType) => void;
}

export const CartDrawerItem = ({
  id,
  name,
  type,
  price,
  details,
  imageUrl,
  quantity,
  pizzaSize,
  className,
  onClickCountButton,
}: CartDrawerItemProps) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info
          name={name}
          type={type}
          details={details}
          pizzaSize={pizzaSize}
        />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton value={quantity} onClick={onClickCountButton} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

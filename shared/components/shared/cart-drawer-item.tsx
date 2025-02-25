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
  onRemove?: () => void;
  onClickCountButton?: (type: OperationType) => void;
}

export const CartDrawerItem = ({
  name,
  type,
  price,
  details,
  imageUrl,
  quantity,
  disabled,
  onRemove,
  pizzaSize,
  className,
  onClickCountButton,
}: CartDrawerItemProps) => (
  <div
    className={cn(
      "flex bg-white p-5 gap-6",
      {
        "opacity-50 pointer-events-none": disabled,
      },
      className
    )}
  >
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
            size={16}
            onClick={onRemove}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          />
        </div>
      </div>
    </div>
  </div>
);

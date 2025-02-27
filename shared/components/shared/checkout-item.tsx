"use client";

import { X } from "lucide-react";

import { OperationType } from "@/types";
import { cn } from "@/shared/lib/utils";

import * as CartItemDetails from "./cart-item-details";

interface CheckoutItemProps extends CartItemDetails.CartItemProps {
  className?: string;
  onClickRemove?: () => void;
  onClickCountButton?: (type: OperationType) => void;
}

export const CheckoutItem = ({
  name,
  price,
  details,
  imageUrl,
  quantity,
  disabled,
  className,
  onClickRemove,
  onClickCountButton,
}: CheckoutItemProps) => (
  <div
    className={cn(
      "flex items-center justify-between",
      {
        "opacity-50 pointer-events-none": disabled,
      },
      className
    )}
  >
    <div className="flex items-center gap-5 flex-1">
      <CartItemDetails.Image src={imageUrl} />
      <CartItemDetails.Info name={name} details={details} />
    </div>

    <CartItemDetails.Price value={price} />

    <div className="flex items-center gap-5 ml-20">
      <CartItemDetails.CountButton
        onClick={onClickCountButton}
        value={quantity}
      />
      <button type="button" onClick={onClickRemove}>
        <X
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          size={20}
        />
      </button>
    </div>
  </div>
);

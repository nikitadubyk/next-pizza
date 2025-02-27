import { OperationType } from "@/types";
import { getCartItemsDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface CheckoutCartProps {
  loading?: boolean;
  className?: string;
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: OperationType
  ) => void;
}

export const CheckoutCart = ({
  items,
  loading,
  className,
  removeCartItem,
  onClickCountButton,
}: CheckoutCartProps) => (
  <WhiteBlock title="1. Корзина" className={className}>
    <div className="flex flex-col gap-5">
      {loading
        ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
        : items.map((item) => (
            <CheckoutItem
              id={item.id}
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              disabled={item.disabled}
              onClickRemove={() => removeCartItem(item.id)}
              onClickCountButton={(type) =>
                onClickCountButton(item.id, item.quantity, type)
              }
              details={getCartItemsDetails({
                ingredients: item.ingredients,
                pizzaType: item.pizzaType as PizzaType,
                pizzaSize: item.pizzaSize as PizzaSize,
              })}
            />
          ))}
    </div>
  </WhiteBlock>
);

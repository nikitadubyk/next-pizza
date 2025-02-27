import { ArrowRight, Package, Percent, Truck } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { Button, Skeleton } from "../ui";

import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface CheckoutSidebarProps {
  loading?: boolean;
  className?: string;
  totalAmount: number;
}

export const CheckoutSidebar = ({
  loading,
  className,
  totalAmount,
}: CheckoutSidebarProps) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  const checkoutDetails = [
    {
      value: `${totalAmount} ₽`,
      label: "Стоимость корзины:",
      icon: <Package size={18} className="mr-2 text-gray-400" />,
    },
    {
      label: "Налоги:",
      value: `${vatPrice} ₽`,
      icon: <Percent size={18} className="mr-2 text-gray-400" />,
    },
    {
      label: "Доставка:",
      value: `${DELIVERY_PRICE} ₽`,
      icon: <Truck size={18} className="mr-2 text-gray-400" />,
    },
  ];

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>

      {checkoutDetails.map((detail, index) => (
        <CheckoutItemDetails
          key={index}
          title={
            <div className="flex items-center">
              {detail.icon}
              {detail.label}
            </div>
          }
          value={
            loading ? (
              <Skeleton className="h-6 w-16 rounded-[6px]" />
            ) : (
              detail.value
            )
          }
        />
      ))}

      <Button
        type="submit"
        loading={loading}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};

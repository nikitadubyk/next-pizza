"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, PropsWithChildren, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { OperationType } from "@/types";
import { Routes } from "@/shared/services";
import { useCartStore } from "@/shared/store";
import { cn, getCartItemsDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants";
import {
  Sheet,
  Button,
  SheetClose,
  SheetTitle,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui";

import { Title } from "./title";
import { CartDrawerItem } from "./cart-drawer-item";

export const CartDrawer = ({ children }: PropsWithChildren) => {
  const [redirecting, setRedirecting] = useState(false);
  const [totalAmount, fetchCartItems, items] = useCartStore((state) => [
    state.totalAmount,
    state.fetchCartItems,
    state.items,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: OperationType
  ) => {
    const newQuantity =
      type === OperationType.Plus ? quantity + 1 : quantity - 1;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn("flex flex-col h-full")}>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>

          {!totalAmount && (
            <div className="flex flex-col h-full items-center justify-center w-72 mx-auto">
              <Image
                width={120}
                height={120}
                alt="Empty cart"
                src="/assets/images/empty-box.png"
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      disabled={item.disabled}
                      quantity={item.quantity}
                      details={getCartItemsDetails({
                        ingredients: item.ingredients,
                        pizzaSize: item.pizzaSize as PizzaSize,
                        pizzaType: item.pizzaType as PizzaType,
                      })}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href={Routes.Checkout}>
                    <Button
                      type="submit"
                      loading={redirecting}
                      className="w-full h-12 text-base"
                      onClick={() => setRedirecting(true)}
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

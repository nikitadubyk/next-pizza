"use client";

import { useForm, FormProvider } from "react-hook-form";

import { OperationType } from "@/types";
import { useCart } from "@/shared/hooks";
import {
  Title,
  Container,
  CheckoutCart,
  CheckoutSidebar,
  CheckoutAddressForm,
  CheckoutPersonalForm,
} from "@/shared/components/shared";

const defaultValues = {
  email: "",
  phone: "",
  lastName: "",
  firstName: "",
};

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm({
    defaultValues,
  });

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: OperationType
  ) => {
    const newQuantity =
      type === OperationType.Plus ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart
              items={items}
              loading={loading}
              removeCartItem={removeCartItem}
              onClickCountButton={onClickCountButton}
            />

            <CheckoutPersonalForm />

            <CheckoutAddressForm />
          </div>

          <div className="w-[450px]">
            <CheckoutSidebar loading={loading} totalAmount={totalAmount} />
          </div>
        </div>
      </FormProvider>
    </Container>
  );
}

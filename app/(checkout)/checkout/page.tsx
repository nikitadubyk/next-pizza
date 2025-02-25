"use client";

import { useForm, FormProvider } from "react-hook-form";

import {
  Title,
  Container,
  CheckoutPersonalForm,
  WhiteBlock,
} from "@/shared/components/shared";

const defaultValues = {
  email: "",
  phone: "",
  lastName: "",
  firstName: "",
};

export default function CheckoutPage() {
  const form = useForm({
    defaultValues,
  });

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <WhiteBlock title="1. Корзина">контент</WhiteBlock>
            <CheckoutPersonalForm />
          </div>

          <div className="w-[450px]">
            <WhiteBlock title="3. Способ оплаты">контент</WhiteBlock>
          </div>
        </div>
      </FormProvider>
    </Container>
  );
}

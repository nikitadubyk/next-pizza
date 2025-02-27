"use client";

import { Controller, useFormContext } from "react-hook-form";

import { FormTextarea } from "../form";
import { ErrorText } from "../error-text";
import { WhiteBlock } from "../white-block";
import { AddressInput } from "../address-input";

interface CheckoutAddressFormProps {
  className?: string;
}

export const CheckoutAddressForm = ({
  className,
}: CheckoutAddressFormProps) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          rows={5}
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};

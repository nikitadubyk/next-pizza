"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "../../ui/input";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { RequiredSymbol } from "../required-symbol";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  name,
  label,
  required,
  className,
  ...props
}: FormInputProps) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

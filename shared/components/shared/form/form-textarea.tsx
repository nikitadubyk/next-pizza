"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { Textarea } from "../../ui/textarea";
import { ClearButton } from "../clear-button";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
}

export const FormTextarea = ({
  name,
  label,
  required,
  className,
  ...props
}: FormTextareaProps) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};

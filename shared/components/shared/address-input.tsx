"use client";

import React from "react";
import "react-dadata/dist/react-dadata.css";
import { AddressSuggestions } from "react-dadata";

interface AddressInputProps {
  onChange?: (value?: string) => void;
}

export const AddressInput = ({ onChange }: AddressInputProps) => (
  <AddressSuggestions
    onChange={(data) => onChange?.(data?.value)}
    inputProps={{ placeholder: "Введите адрес" }}
    token={process.env.NEXT_PUBLIC_DADATA_TOKEN || ""}
  />
);

import React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/shared/lib";
import { OperationType } from "@/types";
import { Button } from "@/shared/components/ui/button";

import { CountIconButton } from "./count-icon-button";

export interface CountButtonProps {
  value?: number;
  size?: "sm" | "lg";
  className?: string;
  onClick?: (type: OperationType) => void;
}

export const CountButton = ({
  onClick,
  className,
  value = 1,
  size = "sm",
}: CountButtonProps) => {
  const isSmallSize = size === "sm";

  const getCountIconButton = (type: OperationType) => (
    <CountIconButton size={size} type={type} onClick={() => onClick?.(type)} />
  );

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      {getCountIconButton(OperationType.Minus)}
      <b className={isSmallSize ? "text-sm" : "text-md"}>{value}</b>
      {getCountIconButton(OperationType.Plus)}
    </div>
  );
};

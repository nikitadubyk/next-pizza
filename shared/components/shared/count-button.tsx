import React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/components/ui/button";

interface CountButtonProps {
  value?: number;
  size?: "sm" | "lg";
  className?: string;
}

export const CountButton = ({
  className,
  value = 1,
  size = "sm",
}: CountButtonProps) => (
  <div
    className={cn("inline-flex items-center justify-between gap-3", className)}
  >
    <Button
      variant="outline"
      className={cn(
        "p-0 hover:bg-primary hover:text-white",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-sm"
          : "w-[38px] h-[38px] rounded-se-md"
      )}
    >
      <Minus className={size === "sm" ? "h-4" : "h-5"} />
    </Button>
    <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>
    <Button
      variant="outline"
      className={cn(
        "p-0 hover:bg-primary hover:text-white",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-sm"
          : "w-[38px] h-[38px] rounded-md"
      )}
    >
      <Plus className={size === "sm" ? "h-4" : "h-5"} />
    </Button>
  </div>
);

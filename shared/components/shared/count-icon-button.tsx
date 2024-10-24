import { Minus, Plus } from "lucide-react";

import { OperationType } from "@/types";
import { cn } from "@/shared/lib/utils";

import { Button } from "../ui/button";

import { CountButtonProps } from "./count-button";

interface IconButtonProps extends Pick<CountButtonProps, "size"> {
  disabled?: boolean;
  onClick?: () => void;
  type?: OperationType;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  type,
  onClick,
  disabled,
  size = "sm",
}) => {
  const buttonSizeClassName = size === "sm" ? "h-4" : "h-5";
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-[10px]"
          : "w-[38px] h-[38px] rounded-md"
      )}
    >
      {type === OperationType.Plus ? (
        <Plus className={buttonSizeClassName} />
      ) : (
        <Minus className={buttonSizeClassName} />
      )}
    </Button>
  );
};

import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface ClearButtonProps {
  className?: string;
  onClick?: VoidFunction;
}

export const ClearButton = ({ onClick, className }: ClearButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
      className
    )}
  >
    <X className="h-5 w-5" />
  </button>
);

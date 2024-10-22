"use client";

import { cn } from "@/shared/lib";

export type Variant = {
  text: string;
  value: string;
  disabled?: boolean;
};

interface GroupVariantsProps {
  value?: string;
  className?: string;
  items: readonly Variant[];
  onClick?: (value: string) => void;
}

export const GroupVariants = ({
  items,
  value,
  onClick,
  className,
}: GroupVariantsProps) => (
  <div
    className={cn(
      className,
      "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none"
    )}
  >
    {items.map((item) => (
      <button
        key={item.text}
        onClick={() => onClick?.(item.value)}
        className={cn(
          "flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
          {
            "bg-white shadow": item.value === value,
            "text-gray-500 opacity-50 pointer-events-none": item.disabled,
          }
        )}
      >
        {item.text}
      </button>
    ))}
  </div>
);

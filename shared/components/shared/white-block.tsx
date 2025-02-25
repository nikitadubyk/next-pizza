import { PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

import { Title } from "./title";

interface WhiteBlockProps extends PropsWithChildren {
  title?: string;
  className?: string;
  contentClassName?: string;
  endAdornment?: React.ReactNode;
}

export const WhiteBlock = ({
  title,
  children,
  className,
  endAdornment,
  contentClassName,
}: WhiteBlockProps) => (
  <div className={cn("bg-white rounded-3xl", className)}>
    {title && (
      <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
        <Title text={title} size="sm" className="font-bold" />
        {endAdornment}
      </div>
    )}

    <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
  </div>
);

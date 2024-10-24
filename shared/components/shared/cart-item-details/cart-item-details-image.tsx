import { cn } from "@/shared/lib/utils";

interface CartItemDetailsImageProps {
  src: string;
  className?: string;
}

export const CartItemDetailsImage = ({
  src,
  className,
}: CartItemDetailsImageProps) => (
  <img className={cn("w-[60px] h-[60px]", className)} src={src} />
);

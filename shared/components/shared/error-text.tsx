import { cn } from "@/shared/lib/utils";

interface ErrorTextProps {
  text: string;
  className?: string;
}

export const ErrorText = ({ text, className }: ErrorTextProps) => (
  <p className={cn("text-red-500 text-sm", className)}>{text}</p>
);

import { cn } from "@/shared/lib/utils";

interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
);

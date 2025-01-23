import { ProductItem } from "@prisma/client";

import { cn } from "@/shared/lib";
import { Title } from "@/shared/components/shared";

import { Button } from "../ui";

interface ChooseProductFormProps {
  name: string;
  imageUrl: string;
  loading?: boolean;
  className?: string;
  items: ProductItem[];
  onSubmit: () => void;
}

export const ChooseProductForm = ({
  name,
  loading,
  imageUrl,
  onSubmit,
  className,
}: ChooseProductFormProps) => (
  <div className={cn(className, "flex flex-1")}>
    <div className="p-7 flex items-center flex-1 justify-center">
      <img
        src={imageUrl}
        alt="Выбранный продукт"
        className="z-10 w-[350px] h-[350px]"
      />
    </div>

    <div className="w-[490px] bg-[#f7f6f5] p-7">
      <Title text={name} size="md" className="font-extrabold mb-1" />

      <Button
        loading={loading}
        onClick={() => onSubmit?.()}
        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
      >
        Добавить в корзину за {350} ₽
      </Button>
    </div>
  </div>
);

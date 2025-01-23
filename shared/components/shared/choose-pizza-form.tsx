"use client";

import { Ingredient, ProductItem } from "@prisma/client";

import { usePizzaOptions } from "@/shared/hooks";
import { cn, getPizzaDetails } from "@/shared/lib";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants";
import {
  Title,
  PizzaImage,
  GroupVariants,
  IngredientItem,
} from "@/shared/components/shared";

import { Button } from "../ui";

interface ChoosePizzaFormProps {
  name: string;
  imageUrl: string;
  loading?: boolean;
  className?: string;
  items: ProductItem[];
  ingredients: Ingredient[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm = ({
  name,
  items,
  loading,
  imageUrl,
  onSubmit,
  className,
  ingredients,
}: ChoosePizzaFormProps) => {
  const {
    type,
    size,
    setSize,
    setType,
    addIngredient,
    currentItemId,
    availablePizzaSizes,
    selectedIngredients,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails({
    size,
    type,
    items,
    ingredients,
    selectedIngredients,
  });

  const onClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1 h-[550px]")}>
      <PizzaImage size={size} imageUrl={imageUrl} />

      <div className="flex flex-col w-[550px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <div className="overflow-auto scrollbar">
          <p className="text-gray-400">{textDetails}</p>

          <div className="mt-6">
            <GroupVariants
              className="mb-2"
              value={size?.toString()}
              items={availablePizzaSizes}
              onClick={(value) => setSize(+value as PizzaSize)}
            />

            <GroupVariants
              items={pizzaTypes}
              value={type?.toString()}
              onClick={(value) => setType(+value as PizzaType)}
            />
          </div>

          <div className="bg-gray-50 p-5 rounded-md mt-5">
            <div className="grid grid-cols-3 gap-3">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          loading={loading}
          onClick={onClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

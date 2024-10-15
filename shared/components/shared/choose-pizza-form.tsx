"use client";

import { useState } from "react";
import { Ingredient, ProductItem } from "@prisma/client";

import { cn } from "@/shared/lib/utils";
import {
  Title,
  PizzaImage,
  GroupVariants,
  IngredientItem,
} from "@/shared/components/shared";
import {
  PizzaSize,
  PizzaType,
  pizzaSizes,
  pizzaTypes,
} from "@/shared/constants";

import { Button } from "../ui";
import { useSet } from "react-use";

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
  const [type, setType] = useState<PizzaType>(1);
  const [size, setSize] = useState<PizzaSize>(20);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price ?? 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, item) => acc + item.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return (
    <div className={cn(className, "flex flex-1 h-[550px]")}>
      <PizzaImage size={size} imageUrl={imageUrl} />

      <div className="flex flex-col w-[550px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <div className="overflow-auto scrollbar">
          <p className="text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium, eius? Quos quibusdam harum, temporibus enim ea vitae
            dignissimos, quasi fugiat quas excepturi iste ullam illo tenetur
            quam repudiandae animi voluptate.
          </p>

          <div className="mt-6">
            <GroupVariants
              className="mb-2"
              items={pizzaSizes}
              value={size?.toString()}
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

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

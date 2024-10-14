import { Ingredient, Product, ProductItem } from "@prisma/client";

export enum PizzaSize {
  Small = 20,
  Medium = 30,
  Large = 40,
}

export interface ProductWithRelations extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}

import { Ingredient, Product, ProductItem } from "@prisma/client";

export interface ProductWithRelations extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}

export enum OperationType {
  Plus = "plus",
  Minus = "minus",
}

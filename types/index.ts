import {
  Cart,
  Product,
  CartItem,
  Ingredient,
  ProductItem,
} from "@prisma/client";

export interface ProductWithRelations extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}

export enum OperationType {
  Plus = "plus",
  Minus = "minus",
}

export interface CartProductItemDTO extends ProductItem {
  product: Product;
}

export interface CartItemDTO extends CartItem {
  ingredients: Ingredient[];
  productItem: CartProductItemDTO;
}

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

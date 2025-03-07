export const mapPizzaSize = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const;

export const mapPizzaType = {
  1: "Традиционное",
  2: "Тонкое",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, text]) => ({
  text,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, text]) => ({
  text,
  value,
}));

export type PizzaType = keyof typeof mapPizzaType;
export type PizzaSize = keyof typeof mapPizzaSize;

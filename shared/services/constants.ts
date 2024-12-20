export enum ApiRoutes {
  Cart = "/cart",
  Product = "/products/[id]",
  Categories = "/categories",
  Ingredients = "/ingredients",
  UpdateCartItem = "/cart/[id]",
  ProductsSearch = "/products/search",
}

export const Routes = {
  Home: "/",
  Checkout: "/checkout",
  Product: {
    Details: "/product/[id]",
  },
};

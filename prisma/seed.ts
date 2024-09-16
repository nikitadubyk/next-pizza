import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";

import { prisma } from "./prisma-client";
import { _ingredients, categories, products } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  size,
  productId,
  pizzaType,
}: {
  size?: number;
  productId: number;
  pizzaType?: 1 | 2;
}) =>
  ({
    size,
    productId,
    pizzaType,
    price: randomDecimalNumber(190, 600),
  } as Prisma.ProductItemUncheckedCreateInput);

async function up() {
  await prisma.user.createMany({
    data: [
      {
        role: "USER",
        verified: new Date(),
        fullName: "Test User",
        email: "test@mail.com",
        password: hashSync("12345", 10),
      },
      {
        role: "USER",
        verified: new Date(),
        fullName: "Test User2",
        email: "test2@mail.com",
        password: hashSync("123412355", 10),
      },
      {
        role: "ADMIN",
        fullName: "Admin",
        verified: new Date(),
        email: "testadmin@mail.com",
        password: hashSync("123555545", 10),
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      categoryId: 1,
      name: "Пепперони фреш",
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      categoryId: 1,
      name: "Чоризо фреш",
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
    },
  });

  const seedProductIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  const otherProductItems = seedProductIds.map((productId) =>
    generateProductItem({ productId })
  );

  const defaultSizes = [20, 30, 40];

  const getDefaultProductItem = (productId: number, pizzaType?: 1 | 2) =>
    defaultSizes.map((size) =>
      generateProductItem({ size, productId, pizzaType })
    );

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      ...getDefaultProductItem(pizza1.id, 1),

      // Пицца "Сырная"
      ...getDefaultProductItem(pizza2.id, 1),

      // Пицца "Чоризо фреш"
      ...getDefaultProductItem(pizza3.id, 2),

      ...otherProductItems,
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      quantity: 2,
      productItemId: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

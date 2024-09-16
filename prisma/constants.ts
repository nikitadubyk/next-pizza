export const categories = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Напитки",
  },
];

export const _ingredients = [
  {
    price: 179,
    name: "Сырный бортик",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    price: 79,
    name: "Сливочная моцарелла",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    price: 79,
    name: "Сыры чеддер и пармезан",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    price: 59,
    name: "Острый перец халапеньо",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    price: 79,
    name: "Нежный цыпленок",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    price: 59,
    name: "Шампиньоны",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    price: 79,
    name: "Ветчина",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    price: 79,
    name: "Пикантная пепперони",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    price: 79,
    name: "Острая чоризо",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    price: 59,
    name: "Маринованные огурчики",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    price: 59,
    name: "Свежие томаты",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    price: 59,
    name: "Красный лук",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    price: 59,
    name: "Сочные ананасы",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
  },
  {
    price: 39,
    name: "Итальянские травы",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    price: 59,
    name: "Сладкий перец",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    price: 79,
    name: "Кубики брынзы",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    price: 79,
    name: "Митболы",
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    categoryId: 2,
    name: "Омлет с ветчиной и грибами",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
  },
  {
    categoryId: 2,
    name: "Омлет с пепперони",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
  },
  {
    categoryId: 2,
    name: "Кофе Латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
  },
  {
    categoryId: 3,
    name: "Дэнвич ветчина и сыр",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
  },
  {
    categoryId: 3,
    name: "Куриные наггетсы",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
  },
  {
    categoryId: 3,
    name: "Картофель из печи с соусом 🌱",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
  },
  {
    categoryId: 3,
    name: "Додстер",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
  },
  {
    categoryId: 3,
    name: "Острый Додстер 🌶️🌶️",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
  },
  {
    categoryId: 4,
    name: "Банановый молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
  },
  {
    categoryId: 4,
    name: "Карамельное яблоко молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
  },
  {
    categoryId: 4,
    name: "Молочный коктейль с печеньем Орео",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
  },
  {
    categoryId: 4,
    name: "Классический молочный коктейль 👶",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
  },
  {
    categoryId: 5,
    name: "Ирландский Капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
  },
  {
    categoryId: 5,
    name: "Кофе Карамельный капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
  },
  {
    categoryId: 5,
    name: "Кофе Кокосовый латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
  },
  {
    categoryId: 5,
    name: "Кофе Американо",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
  },
  {
    categoryId: 5,
    name: "Кофе Латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
  },
];

import { Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";

export const models = {
  product: Model,
  category: Model,
};

export const factories = {
  product: Factory.extend({
    id: () => faker.number.int(),
    name: () => faker.commerce.productName(),
    price: () => Number(faker.commerce.price()),
  }),
  category: Factory.extend({
    id: () => faker.number.int(),
    name: () => faker.commerce.department(),
  }),
};
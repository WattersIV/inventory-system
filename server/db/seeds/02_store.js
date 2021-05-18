import faker from "faker"

const createStores = (storesRequested) => {
  const stores = [];
  for (let i = 0; i < storesRequested; i++) {
    stores.push({
      name: faker.company.companyName(),
    });
  }
  return stores;
};

export const seed = function (knex) {
  //Clear stores then add seeds
  return knex("store")
    .del()
    .then(function () {
      return knex("store").insert(createStores(20));
    });
};
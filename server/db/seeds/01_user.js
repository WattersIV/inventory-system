import faker from "faker"
import { hashPassword } from '../../controllers/user/create.js'

const createUsers = (usersRequested) => {
  const users = [];
  for (let i = 0; i < usersRequested; i++) {
    users.push({
      username: faker.lorem.word() + faker.datatype.number(),
      password: hashPassword(faker.internet.password()),
    });
  }
  return users;
};

export const seed = function (knex) {
  //Clear users then add seeds
  return knex("user")
    .del()
    .then(function () {
      return knex("user").insert(createUsers(10));
    });
};
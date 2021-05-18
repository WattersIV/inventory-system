import faker from "faker"


const createBooks = (booksRequested) => {
  const books = [];
  for (let i = 0; i < booksRequested; i++) {
    console.log('books', i)
    books.push({
      name: faker.lorem.words(),
      author: faker.name.firstName() + faker.name.lastName(),
    });
  }
  return books;
};

export const seed = function (knex) {
  //Clear books then add seeds
  return knex("book")
    .del()
    .then(function () {
      return knex("book").insert(createBooks(200));
    });
};

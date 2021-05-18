const createStoreBook = (entries) => {
  //Creating a 30 entries for each store
  const storeBooks = [];
  let bookId = 1
  const stores = 20 //Can be a var and change with seed file
  const books = 200
  for (let storeId = 1; storeId <= stores; storeId++) {
    for (let i = 0; i < entries; i++ ){
      storeBooks.push({
        book_id: bookId,
        store_id: storeId,
        quantity: randomNumberBetween(0, 15),
      });
      if (bookId < books) {
        bookId++
        continue
      }
      bookId = 1
    }
  }
  return storeBooks;
};

const randomNumberBetween = (min, max) => {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

export const seed = function (knex) {
  //Clear entries then add seeds
  return knex("store_book")
  .del()
  .then(function () {
    return knex("store_book").insert(createStoreBook(10));
  });
};
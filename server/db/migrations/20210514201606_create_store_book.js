
exports.up = function(knex) {
  return knex.schema.createTable('store_book', (store_book) => {
    table.increments('id').primary();
    table.interger('quantity').unsigned().notNullable().defaultTo(0);
    table.timestamps(true, true);
    //Foreign keys may need to be bigInterger depending on the scale
    table.interger('book_id').unsigned().notNullable();
    table.interger('store').unsigned().notNullable();

    table
      .foreign('book_id')
      .references('id')
      .inTable('book')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .foreign('store_id')
      .references('id')
      .inTable('store')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.unique(['book_id', 'store_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('store_book', (store_book) => {
    table.dropForeign('book_id');
    table.dropForeign('store_id');
    
    table 
    .foreign('store_id')
    .references('id')
    .inTable('store')
    .onDelete('NO ACTION');

    table 
    .foreign('book_id')
    .references('id')
    .inTable('book')
    .onDelete('NO ACTION');
  })
};

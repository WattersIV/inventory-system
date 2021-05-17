
exports.up = function(knex) {
  return knex.schema.createTable('store_book', (table) => {
    table.increments('id').primary();
    table.integer('quantity').unsigned().notNullable().defaultTo(0);
    table.timestamps(true, true);
    //Foreign keys may need to be bigInterger depending on the scale
    table.integer('book_id').unsigned().notNullable();
    table.integer('store_id').unsigned().notNullable();

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
  return knex.schema.dropTable('store_book');
};

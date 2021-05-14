
exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('author', 1000).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};

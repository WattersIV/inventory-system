
exports.up = function(knex) {
  return knex.schema.createTable('book', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('author', 1000).notNullable();
    table.unique(['name', 'author']);
    table.unique('name');
    table.unique('author');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('book');
};


exports.up = function(knex) {
  return knex.schema.createTable('store', table => {
    table.increments('id').primary();
    table.string('name', 255).unique().notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('store');
};

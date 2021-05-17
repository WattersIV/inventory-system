exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('username', 20).unique();
    table.string('password', 255);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};

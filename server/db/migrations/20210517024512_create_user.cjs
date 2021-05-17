
exports.up = function(knex) {
  const timestamp = Date.now();
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('username', 20).unique();
    table.string('password', 255);
    table.timestamps(true, true);
    table.timestamp('last_login').defaultTo(timestamp);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};

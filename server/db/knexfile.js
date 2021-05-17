
export default {
  development: {
    client: 'postgresql',
    connection: `postres://postgres:1234@localhost:5432/inventory`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      loadExtensions: ['cjs']
    },
  },
};

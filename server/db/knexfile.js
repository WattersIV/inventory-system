import {} from 'dotenv/config'

export default {
  development: {
    client: 'postgresql',
    connection: `postres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: { directory: './seeds' },
  },
};

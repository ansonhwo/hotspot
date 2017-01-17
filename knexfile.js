exports.development = {
  client: 'postgresql',
  connection: {
    user: 'super',
    database: 'eventinfo'
  },
  seeds: {
    directory: './seeds/dev'
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
}

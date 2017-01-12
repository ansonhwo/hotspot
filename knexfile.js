exports.development = {
  client: 'postgresql',
  connection: {
    user: 'super',
    database: 'eventinfo'
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
}

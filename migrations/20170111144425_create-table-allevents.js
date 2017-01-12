exports.up = function(knex, Promise) {

  const query = knex.schema.createTableIfNotExists('allevents', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('host').notNullable()
    table.string('desc', 3000)
    table.integer('costlower')
    table.integer('costupper')
    table.dateTime('starttime')
    table.dateTime('endtime')
    table.float('longitude')
    table.float('latitude')
    table.string('address')
    table.string('image')
  })

  return query

};

exports.down = function(knex, Promise) {

  const query = knex.schema.dropTableIfExists('allevents')
  return query

};

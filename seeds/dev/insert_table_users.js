exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          name: 'Anson',
          email: 'ahwong19@gmail.com',
          host: true,
          registered: []
        }),
        knex('users').insert({
          name: 'Kyle',
          email: 'kyle@gmail.com',
          host: true,
          registered: []
        }),
        knex('users').insert({
          name: 'Amanda',
          email: 'amanda@gmail.com',
          host: false,
          registered: []
        }),
        knex('users').insert({
          name: 'James',
          email: 'james@gmail.com',
          host: false,
          registered: []
        })
      ]);
    });
};

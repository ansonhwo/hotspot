const express = require('express')
const bodyParser = require('body-parser')
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    user: 'super',
    database: 'eventinfo'
  }
})
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/search/events', (req, res) => {
  const urlquery = req.client.parser.incoming._parsedUrl.query
  const query = urlquery.substring(urlquery.indexOf('=') + 1).replace(/[+]/g, ' ')

  knex('allevents')
    .where('title', 'ilike', `%${query}%`)
    .orWhere('host', 'ilike', `%${query}%`)
    .orWhere('desc', 'ilike', `%${query}%`)
    .then((result) => { res.json(result) })
    .catch((err) => res.sendStatus(404))
})

app.post('/login', (req, res) => {
  knex('users')
    .where('email', req.body.email)
    .then((result) => { res.json(result) })
    .catch((err) => res.sendStatus(404))
})

app.listen(9999, () => { console.log('Listening on 9999') })
